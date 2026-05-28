/**
 * ==========================================================================
 * HEBREW-TRAINER CORE APPLICATION LOGIC
 * Includes gamification, persistent storage, Audio Engine (Web Audio API),
 * custom anti-alignment shuffler, and dynamic Excel loader/parser (SheetJS).
 * ==========================================================================
 */

// Application Constants & Dynamic Variables
const ITEMS_PER_LEVEL = 10;
let activeDatabase = typeof HEBREW_WORDS !== 'undefined' ? [...HEBREW_WORDS] : [];
let totalLevels = Math.ceil(activeDatabase.length / ITEMS_PER_LEVEL);
let currentExcelFileName = 'default';

// Application State
let appState = {
  currentScreen: 'dashboard', // 'dashboard', 'game'
  currentGameMode: 'level', // 'level', 'random'
  currentLevel: 1, // 1 to totalLevels
  soundEnabled: true,
  
  // Active game session variables
  selectedLeftBtn: null, // Russian button element
  selectedRightBtn: null, // Hebrew button element
  correctMatches: 0,
  errorsCount: 0,
  timerInterval: null,
  secondsElapsed: 0,
  isProcessingMatch: false, // Locks interface during error animations
  activeLevelData: [], // Curated word list for the active level
};

// Web Audio API Synth Engine
const AudioEngine = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  playCorrect() {
    if (!appState.soundEnabled) return;
    this.init();
    
    const now = this.ctx.currentTime;
    
    // Satisfying soft high-pitched chime (arpeggio)
    const playNote = (freq, delay, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    playNote(523.25, 0.0, 0.3); // C5
    playNote(659.25, 0.08, 0.3); // E5
    playNote(783.99, 0.16, 0.4); // G5
  },

  playError() {
    if (!appState.soundEnabled) return;
    this.init();
    
    const now = this.ctx.currentTime;
    
    // Double pulse buzzing sound
    const playBuzz = (delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, now + delay); // Low frequency G2#
      
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.18);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.2);
    };

    playBuzz(0.0);
    playBuzz(0.1);
  },

  playVictory() {
    if (!appState.soundEnabled) return;
    this.init();
    
    const now = this.ctx.currentTime;
    
    // Triumphant arpeggio
    const playNote = (freq, delay, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    // Major C chord rising arpeggio
    playNote(261.63, 0.0, 0.4); // C4
    playNote(329.63, 0.1, 0.4); // E4
    playNote(392.00, 0.2, 0.4); // G4
    playNote(523.25, 0.3, 0.5); // C5
    playNote(659.25, 0.4, 0.5); // E5
    playNote(783.99, 0.5, 0.8); // G5
  }
};

// LocalStorage Persistent Progress System
const ProgressTracker = {
  STORAGE_KEY: 'hebrew_trainer_progress_v1',

  getProgress() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  // Save level result specific to the loaded Excel file!
  saveLevelResult(levelNum, stars, errors, timeSeconds) {
    const progress = this.getProgress();
    // Create a safe alphanumeric prefix representing the loaded file name
    const filePrefix = currentExcelFileName.replace(/[^a-zA-Z0-9]/g, '_');
    const levelKey = `${filePrefix}_level_${levelNum}`;
    
    // Keep the best score (highest star count, or minimum errors)
    const existing = progress[levelKey];
    if (!existing || stars > existing.stars || (stars === existing.stars && errors < existing.errors)) {
      progress[levelKey] = {
        completed: true,
        stars: stars,
        errors: errors,
        time: timeSeconds,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    }
  },

  resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс обучения для текущего файла?')) {
      const progress = this.getProgress();
      const filePrefix = currentExcelFileName.replace(/[^a-zA-Z0-9]/g, '_');
      const prefixMatch = `${filePrefix}_level_`;
      
      // Filter out keys matching this file's levels
      Object.keys(progress).forEach(key => {
        if (key.startsWith(prefixMatch)) {
          delete progress[key];
        }
      });
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
      UI.updateDashboard();
    }
  }
};

// Shuffling Helper with STRICT alignment check
// Re-shuffles the D column so that none of the options are in the same rows initially as column A.
function generateAntiAlignedShuffledList(originalList) {
  let list = [...originalList];
  let tries = 0;
  const maxTries = 100;
  
  while (tries < maxTries) {
    // Fisher-Yates Shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    
    // Check if any element ended up at the exact same row index as the original
    let hasAlignments = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === originalList[i].id) {
        hasAlignments = true;
        break;
      }
    }
    
    // If no elements align, we successfully generated a valid shuffled array!
    if (!hasAlignments) {
      return list;
    }
    
    tries++;
  }
  
  // Fallback: If we hit a very rare statistical anomaly where random shuffle keeps aligning,
  // let's do a simple shift or forced swap to break alignments.
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === originalList[i].id) {
      const nextIndex = (i + 1) % list.length;
      [list[i], list[nextIndex]] = [list[nextIndex], list[i]];
    }
  }
  
  return list;
}

// User Interface and DOM Controller
const UI = {
  // Screen Toggles
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.remove('active');
    });
    const target = document.getElementById(`${screenId}-screen`);
    target.classList.add('active');
    appState.currentScreen = screenId;
    
    // Smooth scroll top on screen change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Build the Dashboard screen
  updateDashboard() {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';
    
    const progress = ProgressTracker.getProgress();
    const filePrefix = currentExcelFileName.replace(/[^a-zA-Z0-9]/g, '_');
    let completedCount = 0;

    for (let i = 1; i <= totalLevels; i++) {
      const levelKey = `${filePrefix}_level_${i}`;
      const levelProgress = progress[levelKey];
      const isCompleted = !!levelProgress;
      
      if (isCompleted) completedCount++;

      // Calculations for display
      const startWordIdx = (i - 1) * ITEMS_PER_LEVEL + 1;
      const endWordIdx = Math.min(i * ITEMS_PER_LEVEL, activeDatabase.length);
      
      const card = document.createElement('div');
      card.className = `level-card ${isCompleted ? 'completed' : ''}`;
      card.dataset.level = i;
      
      // Stars HTML
      let starsHtml = '';
      const starCount = isCompleted ? levelProgress.stars : 0;
      for (let s = 1; s <= 3; s++) {
        starsHtml += `<span class="star ${s <= starCount ? 'star-filled' : ''}">★</span>`;
      }

      card.innerHTML = `
        <span class="level-badge">${isCompleted ? 'Пройдено ✓' : 'Уровень ' + i}</span>
        <h4 class="level-number">Уровень ${i}</h4>
        <span class="level-range">Слова ${startWordIdx}-${endWordIdx}</span>
        <div class="level-status-row">
          <span class="level-status-text">${isCompleted ? 'Рекорд: ' + levelProgress.errors + ' ош.' : 'Новый'}</span>
          <div class="level-stars">${starsHtml}</div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        GameEngine.startLevel(i);
      });
      
      grid.appendChild(card);
    }

    // Update progress numbers
    document.getElementById('completed-levels-count').innerText = `${completedCount}/${totalLevels}`;
    const fillPercent = totalLevels > 0 ? (completedCount / totalLevels) * 100 : 0;
    document.getElementById('overall-progress-fill').style.width = `${fillPercent}%`;
  },

  // Build the Game screen elements
  setupGameBoard(levelData) {
    const russianContainer = document.getElementById('russian-buttons');
    const hebrewContainer = document.getElementById('hebrew-buttons');
    
    russianContainer.innerHTML = '';
    hebrewContainer.innerHTML = '';
    
    // Left column is in normal sequential order
    levelData.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'word-btn';
      btn.dataset.id = item.id;
      btn.dataset.side = 'left';
      btn.innerHTML = `<span class="btn-word-text">${item.russian}</span>`;
      
      btn.addEventListener('click', () => UI.handleWordClick(btn));
      russianContainer.appendChild(btn);
    });

    // Right column is shuffled so that no item matches originally
    const shuffledData = generateAntiAlignedShuffledList(levelData);
    shuffledData.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'word-btn';
      btn.dataset.id = item.id;
      btn.dataset.side = 'right';
      btn.innerHTML = `<span class="btn-word-text">${item.transcription}</span>`;
      
      btn.addEventListener('click', () => UI.handleWordClick(btn));
      hebrewContainer.appendChild(btn);
    });
  },

  // Handlers for selection
  handleWordClick(button) {
    if (appState.isProcessingMatch) return; // Ignore input while playing animations
    
    const side = button.dataset.side;
    
    if (side === 'left') {
      // If correct already, do nothing
      if (button.classList.contains('correct')) return;
      
      // If already selected, deselect it
      if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        appState.selectedLeftBtn = null;
        return;
      }
      
      // Toggle / select Russian word
      document.querySelectorAll('#left-column .word-btn').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      button.classList.add('selected');
      appState.selectedLeftBtn = button;
      
      // If we already have a right button selected, evaluate the match!
      if (appState.selectedRightBtn) {
        this.evaluateSelectedMatch();
      }
      
    } else if (side === 'right') {
      // If correct already, do nothing
      if (button.classList.contains('correct')) return;
      
      // If already selected, deselect it
      if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        appState.selectedRightBtn = null;
        return;
      }
      
      // Toggle / select Transcription word
      document.querySelectorAll('#right-column .word-btn').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      button.classList.add('selected');
      appState.selectedRightBtn = button;
      
      // If we already have a left button selected, evaluate the match!
      if (appState.selectedLeftBtn) {
        this.evaluateSelectedMatch();
      }
    }
  },

  // Evaluate matching pair
  evaluateSelectedMatch() {
    const leftId = parseInt(appState.selectedLeftBtn.dataset.id);
    const rightId = parseInt(appState.selectedRightBtn.dataset.id);
    
    const leftBtn = appState.selectedLeftBtn;
    const rightBtn = appState.selectedRightBtn;
    
    if (leftId === rightId) {
      // CORRECT!
      leftBtn.classList.remove('selected');
      rightBtn.classList.remove('selected');
      leftBtn.classList.add('correct');
      rightBtn.classList.add('correct');
      
      // Find the Hebrew characters text from dataset
      const wordObj = appState.activeLevelData.find(item => item.id === leftId);
      if (wordObj && wordObj.hebrew) {
        // Dynamically insert Hebrew text inside correct buttons as educational feedback!
        const hebSpan = document.createElement('span');
        hebSpan.className = 'hebrew-reveal';
        hebSpan.innerText = wordObj.hebrew;
        
        leftBtn.appendChild(hebSpan.cloneNode(true));
        rightBtn.appendChild(hebSpan);
      }
      
      AudioEngine.playCorrect();
      
      // Reset variables
      appState.selectedLeftBtn = null;
      appState.selectedRightBtn = null;
      
      // Update progress
      appState.correctMatches++;
      this.updateGameProgress();
      
      // Check for win
      if (appState.correctMatches === appState.activeLevelData.length) {
        GameEngine.handleVictory();
      }
      
    } else {
      // INCORRECT!
      appState.isProcessingMatch = true;
      
      leftBtn.classList.remove('selected');
      rightBtn.classList.remove('selected');
      leftBtn.classList.add('error');
      rightBtn.classList.add('error');
      
      AudioEngine.playError();
      appState.errorsCount++;
      document.getElementById('stat-errors').innerText = appState.errorsCount;
      
      // Wait for blinking animation to finish
      setTimeout(() => {
        leftBtn.classList.remove('error');
        rightBtn.classList.remove('error');
        
        appState.selectedLeftBtn = null;
        appState.selectedRightBtn = null;
        appState.isProcessingMatch = false;
      }, 1500); // 1.5 seconds matches the blink-red 3 times animation duration (0.5s * 3)
    }
  },

  // Shake warning animation
  shakeButton(btn) {
    btn.classList.add('error');
    AudioEngine.playError();
    setTimeout(() => {
      btn.classList.remove('error');
    }, 500);
  },

  // Real-time Gameplay Header counters
  updateGameProgress() {
    const totalInLevel = appState.activeLevelData.length;
    const text = `${appState.correctMatches} / ${totalInLevel} совпадений`;
    document.getElementById('game-progress-text').innerText = text;
    
    const pct = totalInLevel > 0 ? (appState.correctMatches / totalInLevel) * 100 : 0;
    document.getElementById('game-progress-fill').style.width = `${pct}%`;
  },

  // Timer Tick
  tickTimer() {
    appState.secondsElapsed++;
    const minutes = Math.floor(appState.secondsElapsed / 60);
    const seconds = appState.secondsElapsed % 60;
    
    const format = (num) => String(num).padStart(2, '0');
    document.getElementById('stat-timer').innerText = `${format(minutes)}:${format(seconds)}`;
  },

  // Confetti particles generator
  spawnVictoryConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
    
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = `${Math.random() * 100}%`;
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = `${Math.random() * 2}s`;
      c.style.animationDuration = `${1.5 + Math.random() * 2}s`;
      c.style.transform = `scale(${0.4 + Math.random() * 0.8})`;
      container.appendChild(c);
    }
  }
};

// Core Game Flow Engine
const GameEngine = {
  
  // Launches gameplay for selected Level ID
  startLevel(levelNum) {
    appState.currentGameMode = 'level';
    appState.currentLevel = levelNum;
    appState.correctMatches = 0;
    appState.errorsCount = 0;
    appState.secondsElapsed = 0;
    appState.selectedLeftBtn = null;
    appState.selectedRightBtn = null;
    appState.isProcessingMatch = false;

    // Filter target word slices
    const startIndex = (levelNum - 1) * ITEMS_PER_LEVEL;
    const endIndex = Math.min(startIndex + ITEMS_PER_LEVEL, activeDatabase.length);
    appState.activeLevelData = activeDatabase.slice(startIndex, endIndex);

    // Setup HUD Info
    document.getElementById('current-level-title').innerText = `Уровень ${levelNum}`;
    document.getElementById('level-range-info').innerText = `Слова ${startIndex + 1} - ${endIndex}`;
    document.getElementById('level-range-info').classList.remove('hide');
    document.getElementById('stat-errors').innerText = '0';
    document.getElementById('stat-timer').innerText = '00:00';
    
    document.getElementById('btn-skip-level').classList.add('hide');

    // Build game grid
    UI.setupGameBoard(appState.activeLevelData);
    UI.updateGameProgress();

    // Start Timer
    clearInterval(appState.timerInterval);
    appState.timerInterval = setInterval(() => UI.tickTimer(), 1000);

    // Toggle Screen
    UI.showScreen('game');
  },

  // Launches special Random mix mode
  startRandomMix() {
    if (activeDatabase.length === 0) return;
    
    appState.currentGameMode = 'random';
    appState.correctMatches = 0;
    appState.errorsCount = 0;
    appState.secondsElapsed = 0;
    appState.selectedLeftBtn = null;
    appState.selectedRightBtn = null;
    appState.isProcessingMatch = false;

    // Get 10 random words (or less if db is smaller)
    const size = Math.min(ITEMS_PER_LEVEL, activeDatabase.length);
    const shuffledDb = [...activeDatabase].sort(() => 0.5 - Math.random());
    appState.activeLevelData = shuffledDb.slice(0, size);

    // Set HUD Info
    document.getElementById('current-level-title').innerText = `⚡ Случайный Микс`;
    document.getElementById('level-range-info').innerText = `${size} случайных слов`;
    document.getElementById('stat-errors').innerText = '0';
    document.getElementById('stat-timer').innerText = '00:00';
    
    document.getElementById('btn-skip-level').classList.add('hide');

    // Build game grid
    UI.setupGameBoard(appState.activeLevelData);
    UI.updateGameProgress();

    // Start Timer
    clearInterval(appState.timerInterval);
    appState.timerInterval = setInterval(() => UI.tickTimer(), 1000);

    // Toggle Screen
    UI.showScreen('game');
  },

  // Action on winning a level
  handleVictory() {
    clearInterval(appState.timerInterval);
    
    // Play celebratory sound
    setTimeout(() => {
      AudioEngine.playVictory();
    }, 200);

    // Calculate stars: 0-1 errors = 3, 2-3 errors = 2, 4+ errors = 1 star
    let stars = 1;
    if (appState.errorsCount <= 1) stars = 3;
    else if (appState.errorsCount <= 3) stars = 2;

    // Save level score if mode is level-based
    if (appState.currentGameMode === 'level') {
      ProgressTracker.saveLevelResult(appState.currentLevel, stars, appState.errorsCount, appState.secondsElapsed);
      UI.updateDashboard(); // Refreshes dashboard achievements
    }

    // Populate Victory Modal info
    const minutes = Math.floor(appState.secondsElapsed / 60);
    const seconds = appState.secondsElapsed % 60;
    const format = (num) => String(num).padStart(2, '0');
    
    document.getElementById('v-stat-time').innerText = `${format(minutes)}:${format(seconds)}`;
    document.getElementById('v-stat-errors').innerText = appState.errorsCount;
    
    // Accuracy
    const totalItems = appState.activeLevelData.length;
    const totalTries = totalItems + appState.errorsCount;
    const accuracyPct = totalTries > 0 ? Math.round((totalItems / totalTries) * 100) : 100;
    document.getElementById('v-stat-score').innerText = `${accuracyPct}%`;

    // Title subtitle updates
    const subTitle = document.getElementById('victory-subtitle');
    if (appState.currentGameMode === 'level') {
      subTitle.innerText = `Уровень ${appState.currentLevel} успешно завершен!`;
      
      // Hide next button if there is no next level
      if (appState.currentLevel >= totalLevels) {
        document.getElementById('btn-modal-next').classList.add('hide');
      } else {
        document.getElementById('btn-modal-next').classList.remove('hide');
      }
    } else {
      subTitle.innerText = `Случайный микс пройден!`;
      document.getElementById('btn-modal-next').classList.add('hide'); 
    }

    // Star UI modal update
    const starsDiv = document.getElementById('victory-stars');
    starsDiv.querySelectorAll('.star').forEach((starNode, index) => {
      starNode.classList.remove('active');
      if (index < stars) {
        starNode.classList.add('active');
      }
    });

    // Populate Dictionary accordion
    const tbody = document.getElementById('victory-dictionary-tbody');
    tbody.innerHTML = '';
    
    appState.activeLevelData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.russian}</td>
        <td class="hebrew-cell">${item.hebrew}</td>
        <td class="transcription-cell">${item.transcription}</td>
      `;
      tbody.appendChild(row);
    });

    // Launch overlay view
    UI.spawnVictoryConfetti();
    document.getElementById('victory-modal').classList.add('active');
  },

  // Navigates to next level sequentially
  loadNextLevel() {
    document.getElementById('victory-modal').classList.remove('active');
    if (appState.currentLevel < totalLevels) {
      this.startLevel(appState.currentLevel + 1);
    } else {
      alert('Поздравляем! Вы прошли все уровни в текущем наборе!');
      UI.showScreen('dashboard');
    }
  }
};

// ==========================================================================
// EXCEL SCANNING AND PARSING FUNCTIONS (SheetJS integration)
// ==========================================================================

// Scan for local .xlsx files in the index.html directory
async function scanLocalXlsxFiles() {
  const select = document.getElementById('excel-file-select');
  const originalValue = select.value;
  
  // Clear all options except default
  select.innerHTML = '<option value="default">Встроенный список (words.js)</option>';
  
  try {
    const response = await fetch('./');
    if (!response.ok) return;
    const htmlText = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const links = Array.from(doc.querySelectorAll('a'));
    
    let count = 0;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.toLowerCase().endsWith('.xlsx')) {
        const decodedName = decodeURIComponent(href);
        // Avoid duplicates
        if (!Array.from(select.options).some(opt => opt.value === decodedName)) {
          const opt = document.createElement('option');
          opt.value = decodedName;
          opt.innerText = decodedName;
          select.appendChild(opt);
          count++;
        }
      }
    });
    
    // Restore value if it still exists
    if (Array.from(select.options).some(opt => opt.value === originalValue)) {
      select.value = originalValue;
    }
    
    console.log(`Scanned folder. Found ${count} Excel files locally.`);
  } catch (err) {
    console.warn("Could not scan directory, probably running under file:// or without folder listing:", err);
  }
}

// Parse Excel ArrayBuffer and update active database
function loadExcelData(buffer, fileName) {
  try {
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Parse to arrays
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    const parsedWords = [];
    rows.forEach((row, idx) => {
      if (!row || row.length === 0) return;
      
      const colA = row[0];
      const colB = row[1];
      const colD = row[3];
      
      // Skip completely empty row
      if (colA === undefined && colB === undefined && colD === undefined) return;
      
      // Detect header: check row 0 for typical keywords
      const isHeader = idx === 0 && (
        String(colA || '').toLowerCase().includes('русск') || 
        String(colA || '').toLowerCase().includes('колонк') ||
        String(colA || '').toLowerCase().includes('перевод') ||
        String(colD || '').toLowerCase().includes('транскр') ||
        String(colD || '').toLowerCase().includes('произнош')
      );
      
      if (isHeader) return;
      
      parsedWords.push({
        id: parsedWords.length + 1,
        excel_row: idx + 1,
        russian: colA !== undefined && colA !== null ? String(colA).trim() : "",
        hebrew: colB !== undefined && colB !== null ? String(colB).trim() : "",
        transcription: colD !== undefined && colD !== null ? String(colD).trim() : ""
      });
    });
    
    if (parsedWords.length === 0) {
      alert("В файле Excel не найдено подходящих данных! Проверьте, что в колонках A, B и D есть тексты.");
      return;
    }
    
    // Update variables
    activeDatabase = parsedWords;
    totalLevels = Math.ceil(activeDatabase.length / ITEMS_PER_LEVEL);
    currentExcelFileName = fileName;
    
    // Update labels and HUD
    document.getElementById('current-file-label').innerText = `Текущий файл: ${fileName} (${activeDatabase.length} строк)`;
    
    // Refresh Grid
    UI.updateDashboard();
    
    alert(`Успешно загружено слов/предложений: ${activeDatabase.length} (Уровней: ${totalLevels}) из файла "${fileName}"!`);
    
  } catch (err) {
    console.error("Error parsing Excel file:", err);
    alert("Произошла ошибка при обработке Excel-файла! Убедитесь, что это валидный файл .xlsx.");
  }
}

// Fetch and load a local Excel file from directory
async function fetchAndLoadLocalExcel(fileName) {
  if (fileName === 'default') {
    activeDatabase = typeof HEBREW_WORDS !== 'undefined' ? [...HEBREW_WORDS] : [];
    totalLevels = Math.ceil(activeDatabase.length / ITEMS_PER_LEVEL);
    currentExcelFileName = 'default';
    document.getElementById('current-file-label').innerText = 'Текущий файл: Встроенный список (words.js)';
    UI.updateDashboard();
    return;
  }
  
  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error("File fetch failed");
    const buffer = await response.arrayBuffer();
    loadExcelData(buffer, fileName);
  } catch (err) {
    console.error(err);
    alert(`Не удалось загрузить файл "${fileName}". Убедитесь, что веб-сервер запущен.`);
    document.getElementById('excel-file-select').value = currentExcelFileName;
  }
}

// ==========================================================================
// EVENT BINDINGS AND SETUP INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scan folder files and setup active database
  scanLocalXlsxFiles();
  UI.updateDashboard();
  
  // 2. Excel Selector Event hooks
  const fileSelect = document.getElementById('excel-file-select');
  fileSelect.addEventListener('change', (e) => {
    fetchAndLoadLocalExcel(e.target.value);
  });
  
  document.getElementById('btn-refresh-files').addEventListener('click', () => {
    scanLocalXlsxFiles();
  });
  
  const fileInput = document.getElementById('excel-file-input');
  document.getElementById('btn-upload-file').addEventListener('click', () => {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result;
      loadExcelData(buffer, file.name);
      
      // Add and select the uploaded file in select dropdown
      let opt = Array.from(fileSelect.options).find(o => o.value === file.name);
      if (!opt) {
        opt = document.createElement('option');
        opt.value = file.name;
        opt.innerText = `📂 ${file.name}`;
        fileSelect.appendChild(opt);
      }
      fileSelect.value = file.name;
    };
    reader.readAsArrayBuffer(file);
  });
  
  // 3. Dashboard Event hooks
  document.getElementById('btn-random-mix').addEventListener('click', () => {
    GameEngine.startRandomMix();
  });

  // 4. Gameplay Screen hooks
  document.getElementById('btn-back-to-levels').addEventListener('click', () => {
    if (confirm('Вы действительно хотите выйти в меню? Текущий прогресс уровня будет сброшен.')) {
      clearInterval(appState.timerInterval);
      UI.showScreen('dashboard');
    }
  });

  document.getElementById('btn-restart-level').addEventListener('click', () => {
    if (confirm('Начать прохождение этого уровня заново?')) {
      if (appState.currentGameMode === 'level') {
        GameEngine.startLevel(appState.currentLevel);
      } else {
        GameEngine.startRandomMix();
      }
    }
  });

  // 5. Modal actions hooks
  document.getElementById('btn-modal-levels').addEventListener('click', () => {
    document.getElementById('victory-modal').classList.remove('active');
    UI.showScreen('dashboard');
  });

  document.getElementById('btn-modal-replay').addEventListener('click', () => {
    document.getElementById('victory-modal').classList.remove('active');
    if (appState.currentGameMode === 'level') {
      GameEngine.startLevel(appState.currentLevel);
    } else {
      GameEngine.startRandomMix();
    }
  });

  document.getElementById('btn-modal-next').addEventListener('click', () => {
    GameEngine.loadNextLevel();
  });

  // 6. Sound controls
  const soundToggle = document.getElementById('sound-toggle');
  soundToggle.addEventListener('click', () => {
    appState.soundEnabled = !appState.soundEnabled;
    soundToggle.querySelector('.icon').innerText = appState.soundEnabled ? '🔊' : '🔇';
    soundToggle.style.opacity = appState.soundEnabled ? '1' : '0.6';
  });

  // 7. Help Modals triggers
  const helpModal = document.getElementById('help-modal');
  document.getElementById('help-toggle').addEventListener('click', () => {
    helpModal.classList.add('active');
  });

  document.getElementById('btn-close-help').addEventListener('click', () => {
    helpModal.classList.remove('active');
  });

  document.getElementById('btn-help-ok').addEventListener('click', () => {
    helpModal.classList.remove('active');
  });

  // Click outside to close modals
  window.addEventListener('click', (e) => {
    if (e.target === helpModal) {
      helpModal.classList.remove('active');
    }
  });
});
