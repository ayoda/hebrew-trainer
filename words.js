// Hebrew words dataset parsed from Excel
const HEBREW_WORDS = [
  {
    "id": 1,
    "excel_row": 1,
    "russian": "Я",
    "hebrew": "אני",
    "transcription": "анИ́"
  },
  {
    "id": 2,
    "excel_row": 2,
    "russian": "Я студент.",
    "hebrew": "אני סטודנט.",
    "transcription": "анИ́ студÉнт"
  },
  {
    "id": 3,
    "excel_row": 3,
    "russian": "Ты (мужской. род.)",
    "hebrew": "אתה",
    "transcription": "атА́"
  },
  {
    "id": 4,
    "excel_row": 4,
    "russian": "Ты живешь здесь?",
    "hebrew": "אתה גר כאן?",
    "transcription": "атА́ гар кан?"
  },
  {
    "id": 5,
    "excel_row": 5,
    "russian": "Ты (женский. род.)",
    "hebrew": "את",
    "transcription": "ат"
  },
  {
    "id": 6,
    "excel_row": 6,
    "russian": "Ты работаешь сегодня?",
    "hebrew": "את עובדת היום?",
    "transcription": "ат овÉдeт hайОм?"
  },
  {
    "id": 7,
    "excel_row": 7,
    "russian": "Он",
    "hebrew": "הוא",
    "transcription": "hу"
  },
  {
    "id": 8,
    "excel_row": 8,
    "russian": "Он любит петь.",
    "hebrew": "הוא אוהב לשיר.",
    "transcription": "hу оhÉв лашИр"
  },
  {
    "id": 9,
    "excel_row": 9,
    "russian": "Она",
    "hebrew": "היא",
    "transcription": "hи"
  },
  {
    "id": 10,
    "excel_row": 10,
    "russian": "Она читает книгу.",
    "hebrew": "היא קוראת ספר.",
    "transcription": "hи корÉт сÉfeр"
  },
  {
    "id": 11,
    "excel_row": 11,
    "russian": "Мы",
    "hebrew": "אנחנו",
    "transcription": "анА́хну"
  },
  {
    "id": 12,
    "excel_row": 12,
    "russian": "Мы идем на море.",
    "hebrew": "אנחנו הולכים לים.",
    "transcription": "анА́хну hолхИ́м лаЯм"
  },
  {
    "id": 13,
    "excel_row": 13,
    "russian": "Вы (мужской. род. множественное. число.)",
    "hebrew": "אתם",
    "transcription": "атЭ́м"
  },
  {
    "id": 14,
    "excel_row": 14,
    "russian": "Вы хотите кофе?",
    "hebrew": "אתם רוצים קפה?",
    "transcription": "анИ́ потЭах эт хахалО́н"
  },
  {
    "id": 15,
    "excel_row": 15,
    "russian": "Вы (женский. род. множественное. число.)",
    "hebrew": "אתן",
    "transcription": "атÉн"
  },
  {
    "id": 16,
    "excel_row": 16,
    "russian": "Вы учите иврит?",
    "hebrew": "אתן לומדות עברית?",
    "transcription": "атÉн ломдОт иврИт?"
  },
  {
    "id": 17,
    "excel_row": 17,
    "russian": "Они (мужской. род. множественное. число.)",
    "hebrew": "הם",
    "transcription": "hэм"
  },
  {
    "id": 18,
    "excel_row": 18,
    "russian": "Они живут в Тель-Авиве.",
    "hebrew": "הם גרים בתל אביב.",
    "transcription": "hэм гарИ́м бетель авИ́в"
  },
  {
    "id": 19,
    "excel_row": 19,
    "russian": "Они (женский. род. множественное. число.)",
    "hebrew": "הן",
    "transcription": "hэн"
  },
  {
    "id": 20,
    "excel_row": 20,
    "russian": "Они работают вместе.",
    "hebrew": "הן עובדות יחד.",
    "transcription": "hэн овдот йА́хад"
  },
  {
    "id": 21,
    "excel_row": 21,
    "russian": "Это (мужской. род.)",
    "hebrew": "זה",
    "transcription": "зэ"
  },
  {
    "id": 22,
    "excel_row": 22,
    "russian": "Это интересная книга.",
    "hebrew": "זה ספר מעניין.",
    "transcription": "зэ сÉfeр меанйЕ́н"
  },
  {
    "id": 23,
    "excel_row": 23,
    "russian": "Это (женский. род.)",
    "hebrew": "זאת",
    "transcription": "зот"
  },
  {
    "id": 24,
    "excel_row": 24,
    "russian": "Это новая машина.",
    "hebrew": "זאת מכונית חדשה.",
    "transcription": "зот мехонИт хадашА́"
  },
  {
    "id": 25,
    "excel_row": 25,
    "russian": "Эти (мн. ч.)",
    "hebrew": "אלה",
    "transcription": "Э́ле"
  },
  {
    "id": 26,
    "excel_row": 26,
    "russian": "Это мои друзья.",
    "hebrew": "אלה חברים שלי.",
    "transcription": "Э́ле хаверИ́м шелИ́"
  },
  {
    "id": 27,
    "excel_row": 27,
    "russian": "Кто",
    "hebrew": "מי",
    "transcription": "ми"
  },
  {
    "id": 28,
    "excel_row": 28,
    "russian": "Кто это?",
    "hebrew": "מי זה?",
    "transcription": "ми зэ?"
  },
  {
    "id": 29,
    "excel_row": 29,
    "russian": "Что",
    "hebrew": "מה",
    "transcription": "ма"
  },
  {
    "id": 30,
    "excel_row": 30,
    "russian": "Который час?",
    "hebrew": "מה השעה?",
    "transcription": "ма hашаА́?"
  },
  {
    "id": 31,
    "excel_row": 31,
    "russian": "Где",
    "hebrew": "איפה",
    "transcription": "Э́йфо"
  },
  {
    "id": 32,
    "excel_row": 32,
    "russian": "Где твой дом?",
    "hebrew": "איפה הבית שלך?",
    "transcription": "Э́йфо hабА́ит шелхА́?"
  },
  {
    "id": 33,
    "excel_row": 33,
    "russian": "Когда",
    "hebrew": "מתי",
    "transcription": "матА́й"
  },
  {
    "id": 34,
    "excel_row": 34,
    "russian": "Когда ты едешь?",
    "hebrew": "מתי אתה נוסע?",
    "transcription": "матА́й атА́ носÉа?"
  },
  {
    "id": 35,
    "excel_row": 35,
    "russian": "Почему",
    "hebrew": "למה",
    "transcription": "лА́ма"
  },
  {
    "id": 36,
    "excel_row": 36,
    "russian": "Почему ты грустный?",
    "hebrew": "למה אתה עצוב?",
    "transcription": "лА́ма атА́ ацУв?"
  },
  {
    "id": 37,
    "excel_row": 37,
    "russian": "Как",
    "hebrew": "איך",
    "transcription": "эйх"
  },
  {
    "id": 38,
    "excel_row": 38,
    "russian": "Как тебя зовут?",
    "hebrew": "איך קוראים לך?",
    "transcription": "эйх коръИ́м лехА́?"
  },
  {
    "id": 39,
    "excel_row": 39,
    "russian": "Сколько",
    "hebrew": "כמה",
    "transcription": "кА́ма"
  },
  {
    "id": 40,
    "excel_row": 40,
    "russian": "Сколько это стоит?",
    "hebrew": "כמה זה עולה?",
    "transcription": "кА́ма зэ олÉ?"
  },
  {
    "id": 41,
    "excel_row": 41,
    "russian": "Какой (мужской. род.)",
    "hebrew": "איזה",
    "transcription": "Э́йзе"
  },
  {
    "id": 42,
    "excel_row": 42,
    "russian": "Какой цвет ты любишь?",
    "hebrew": "איזה צבע אתה אוהב?",
    "transcription": "Э́йзе цÉва атА́ оhÉв?"
  },
  {
    "id": 43,
    "excel_row": 43,
    "russian": "Какая (женский. род.)",
    "hebrew": "איזו",
    "transcription": "Э́йзо"
  },
  {
    "id": 44,
    "excel_row": 44,
    "russian": "Который сейчас час?",
    "hebrew": "איזו שעה עכשיו?",
    "transcription": "Э́йзо шаА́ ахшА́в?"
  },
  {
    "id": 45,
    "excel_row": 45,
    "russian": "Какие (мн. ч.)",
    "hebrew": "אילו",
    "transcription": "Э́йлу"
  },
  {
    "id": 46,
    "excel_row": 46,
    "russian": "Какие книги ты читаешь?",
    "hebrew": "אילו ספרים אתה קורא?",
    "transcription": "Э́йлу сфарИ́м атА́ корÉ?"
  },
  {
    "id": 47,
    "excel_row": 47,
    "russian": "Мой (м./ж. р.)",
    "hebrew": "שלי",
    "transcription": "шелИ́"
  },
  {
    "id": 48,
    "excel_row": 48,
    "russian": "Это моя книга.",
    "hebrew": "זה הספר שלי.",
    "transcription": "зэ hаСÉfeр шелИ́"
  },
  {
    "id": 49,
    "excel_row": 49,
    "russian": "Твой (мужской. род.)",
    "hebrew": "שלך",
    "transcription": "шелхА́"
  },
  {
    "id": 50,
    "excel_row": 50,
    "russian": "Это твоя сумка.",
    "hebrew": "זה התיק שלך.",
    "transcription": "зэ hатИк шелхА́"
  },
  {
    "id": 51,
    "excel_row": 51,
    "russian": "Твоя (женский. род.)",
    "hebrew": "שלך",
    "transcription": "шелА́х"
  },
  {
    "id": 52,
    "excel_row": 52,
    "russian": "Это твоя машина.",
    "hebrew": "זאת המכונית שלך.",
    "transcription": "зот hамехонИт шелА́х"
  },
  {
    "id": 53,
    "excel_row": 53,
    "russian": "Его",
    "hebrew": "שלו",
    "transcription": "шелО́"
  },
  {
    "id": 54,
    "excel_row": 54,
    "russian": "Это его дом.",
    "hebrew": "זה הבית שלו.",
    "transcription": "зэ hабА́ит шелО́"
  },
  {
    "id": 55,
    "excel_row": 55,
    "russian": "Её",
    "hebrew": "שלה",
    "transcription": "шелА́"
  },
  {
    "id": 56,
    "excel_row": 56,
    "russian": "Это ее работа.",
    "hebrew": "זאת העבודה שלה.",
    "transcription": "зот hааводА́ шелА́"
  },
  {
    "id": 57,
    "excel_row": 57,
    "russian": "Наш (м./ж. р.)",
    "hebrew": "שלנו",
    "transcription": "шелА́ну"
  },
  {
    "id": 58,
    "excel_row": 58,
    "russian": "Это наши деньги.",
    "hebrew": "זה הכסף שלנו.",
    "transcription": "зэ hаКе́сэф шелА́ну"
  },
  {
    "id": 59,
    "excel_row": 59,
    "russian": "Ваш (мужской. род. множественное. число.)",
    "hebrew": "שלכם",
    "transcription": "шелахЕ́м"
  },
  {
    "id": 60,
    "excel_row": 60,
    "russian": "Это ваше письмо.",
    "hebrew": "זה המכתב שלכם.",
    "transcription": "зэ hамихтА́в шелахЕ́м"
  },
  {
    "id": 61,
    "excel_row": 61,
    "russian": "Ваш (женский. род. множественное. число.)",
    "hebrew": "שלכן",
    "transcription": "шелахЕ́н"
  },
  {
    "id": 62,
    "excel_row": 62,
    "russian": "Это ваша фотография.",
    "hebrew": "זאת התמונה שלכן.",
    "transcription": "зот hатмунА́ шелахЕ́н"
  },
  {
    "id": 63,
    "excel_row": 63,
    "russian": "Их (мужской. род. множественное. число.)",
    "hebrew": "שלהם",
    "transcription": "шелахЭ́м"
  },
  {
    "id": 64,
    "excel_row": 64,
    "russian": "Это их дети.",
    "hebrew": "זה הילדים שלהם.",
    "transcription": "зэ hайеладИ́м шелахЭ́м"
  },
  {
    "id": 65,
    "excel_row": 65,
    "russian": "Их (женский. род. множественное. число.)",
    "hebrew": "שלהן",
    "transcription": "шелахЕ́н"
  },
  {
    "id": 66,
    "excel_row": 66,
    "russian": "Это их семья.",
    "hebrew": "זאת המשפחה שלהן.",
    "transcription": "зот hамишпахА́ шелахЕ́н"
  },
  {
    "id": 67,
    "excel_row": 67,
    "russian": "Быть",
    "hebrew": "להיות",
    "transcription": "лиhйОт"
  },
  {
    "id": 68,
    "excel_row": 68,
    "russian": "Я хочу быть врачом.",
    "hebrew": "אני רוצה להיות רופא.",
    "transcription": "анИ́ роцÉ́ лиhйОт рофÉ"
  },
  {
    "id": 69,
    "excel_row": 69,
    "russian": "Знать",
    "hebrew": "לדעת",
    "transcription": "ладА́ат"
  },
  {
    "id": 70,
    "excel_row": 70,
    "russian": "Я этого не знаю.",
    "hebrew": "אני לא יודע את זה.",
    "transcription": "анИ́ ло йодÉ́а эт зэ"
  },
  {
    "id": 71,
    "excel_row": 71,
    "russian": "Хотеть",
    "hebrew": "לרצות",
    "transcription": "лирцОт"
  },
  {
    "id": 72,
    "excel_row": 72,
    "russian": "Я хочу поехать за границу.",
    "hebrew": "אני רוצה לנסוע לחו\"ל.",
    "transcription": "анИ́ роцÉ́ линсО́а лехуц"
  },
  {
    "id": 73,
    "excel_row": 73,
    "russian": "Любить",
    "hebrew": "לאהוב",
    "transcription": "леэhО́в"
  },
  {
    "id": 74,
    "excel_row": 74,
    "russian": "Я люблю музыку.",
    "hebrew": "אני אוהב מוזיקה.",
    "transcription": "анИ́ оhÉв muzIkа"
  },
  {
    "id": 75,
    "excel_row": 75,
    "russian": "Делать",
    "hebrew": "לעשות",
    "transcription": "лаасОт"
  },
  {
    "id": 76,
    "excel_row": 76,
    "russian": "Что ты делаешь?",
    "hebrew": "מה אתה עושה?",
    "transcription": "ма атА́ осЭ́?"
  },
  {
    "id": 77,
    "excel_row": 77,
    "russian": "Идти",
    "hebrew": "ללכת",
    "transcription": "лалÉ́хет"
  },
  {
    "id": 78,
    "excel_row": 78,
    "russian": "Мы идем пешком.",
    "hebrew": "אנחנו הולכים ברגל.",
    "transcription": "анА́хну hолхИ́м берÉ́гель"
  },
  {
    "id": 79,
    "excel_row": 79,
    "russian": "Приходить",
    "hebrew": "לבוא",
    "transcription": "лавО́"
  },
  {
    "id": 80,
    "excel_row": 80,
    "russian": "Он приходит завтра.",
    "hebrew": "הוא בא מחר.",
    "transcription": "hу ба махАр"
  },
  {
    "id": 81,
    "excel_row": 81,
    "russian": "Есть (кушать)",
    "hebrew": "לאכול",
    "transcription": "леэхО́ль"
  },
  {
    "id": 82,
    "excel_row": 82,
    "russian": "Я ем завтрак.",
    "hebrew": "אני אוכל ארוחת בוקר.",
    "transcription": "анИ́ охÉль арухА́т бОкер"
  },
  {
    "id": 83,
    "excel_row": 83,
    "russian": "Пить",
    "hebrew": "לשתות",
    "transcription": "лиштOт"
  },
  {
    "id": 84,
    "excel_row": 84,
    "russian": "Я пью воду.",
    "hebrew": "אני שותה מים.",
    "transcription": "анИ́ шотÉ́ маИм"
  },
  {
    "id": 85,
    "excel_row": 85,
    "russian": "Говорить",
    "hebrew": "לדבר",
    "transcription": "ледабЭ́р"
  },
  {
    "id": 86,
    "excel_row": 86,
    "russian": "Мы говорим на иврите.",
    "hebrew": "אנחנו מדברים עברית.",
    "transcription": "анА́хну медаврИ́м иврИт"
  },
  {
    "id": 87,
    "excel_row": 87,
    "russian": "Слышать",
    "hebrew": "לשמוע",
    "transcription": "лишмО́а"
  },
  {
    "id": 88,
    "excel_row": 88,
    "russian": "Я плохо тебя слышу.",
    "hebrew": "אני לא שומע אותך טוב.",
    "transcription": "анИ́ ло шомÉ́а отхА́ тов"
  },
  {
    "id": 89,
    "excel_row": 89,
    "russian": "Видеть",
    "hebrew": "לראות",
    "transcription": "лиръОт"
  },
  {
    "id": 90,
    "excel_row": 90,
    "russian": "Я смотрю телевизор.",
    "hebrew": "אני רואה טלוויזיה.",
    "transcription": "анИ́ роЭ́ тeльeвIzyа"
  },
  {
    "id": 91,
    "excel_row": 91,
    "russian": "Читать/Звать",
    "hebrew": "לקרוא",
    "transcription": "ликрО́"
  },
  {
    "id": 92,
    "excel_row": 92,
    "russian": "Я читаю газету.",
    "hebrew": "אני קורא עיתון.",
    "transcription": "анИ́ корÉ́ ито́н"
  },
  {
    "id": 93,
    "excel_row": 93,
    "russian": "Писать",
    "hebrew": "לכתוב",
    "transcription": "лихтÓв"
  },
  {
    "id": 94,
    "excel_row": 94,
    "russian": "Я пишу письмо.",
    "hebrew": "אני כותב מכתב.",
    "transcription": "анИ́ котÉ́в михта́в"
  },
  {
    "id": 95,
    "excel_row": 95,
    "russian": "Спрашивать",
    "hebrew": "לשאול",
    "transcription": "лишъО́ль"
  },
  {
    "id": 96,
    "excel_row": 96,
    "russian": "Я хочу задать вопрос.",
    "hebrew": "אני רוצה לשאול שאלה.",
    "transcription": "анИ́ роцÉ́ лишъО́ль шеэлА́"
  },
  {
    "id": 97,
    "excel_row": 97,
    "russian": "Отвечать",
    "hebrew": "לענות",
    "transcription": "лаанOт"
  },
  {
    "id": 98,
    "excel_row": 98,
    "russian": "Он мне отвечает.",
    "hebrew": "הוא עונה לי.",
    "transcription": "hу онÉ́ ли"
  },
  {
    "id": 99,
    "excel_row": 99,
    "russian": "Думать",
    "hebrew": "לחשוב",
    "transcription": "лахшÓв"
  },
  {
    "id": 100,
    "excel_row": 100,
    "russian": "Я думаю об этом.",
    "hebrew": "אני חושב על זה.",
    "transcription": "анИ́ хошÉв аль зэ"
  },
  {
    "id": 101,
    "excel_row": 101,
    "russian": "Понимать",
    "hebrew": "להבין",
    "transcription": "леhавИн"
  },
  {
    "id": 102,
    "excel_row": 102,
    "russian": "Я понимаю, что ты говоришь.",
    "hebrew": "אני מבין מה אתה אומר.",
    "transcription": "анИ́ мевИн ма атА́ омÉр"
  },
  {
    "id": 103,
    "excel_row": 103,
    "russian": "Чувствовать",
    "hebrew": "להרגיש",
    "transcription": "леhаргИ́ш"
  },
  {
    "id": 104,
    "excel_row": 104,
    "russian": "Я чувствую себя сегодня хорошо.",
    "hebrew": "אני מרגיש טוב היום.",
    "transcription": "анИ́ маргИ́ш тов hайОм"
  },
  {
    "id": 105,
    "excel_row": 105,
    "russian": "Ехать",
    "hebrew": "לנסוע",
    "transcription": "линсО́а"
  },
  {
    "id": 106,
    "excel_row": 106,
    "russian": "Мы едем в Иерусалим.",
    "hebrew": "אנחנו נוסעים לירושלים.",
    "transcription": "анА́хну носцИ́м лирушалА́им"
  },
  {
    "id": 107,
    "excel_row": 107,
    "russian": "Работать",
    "hebrew": "לעבוד",
    "transcription": "лаавOд"
  },
  {
    "id": 108,
    "excel_row": 108,
    "russian": "Я работаю в офисе.",
    "hebrew": "אני עובד במשרד.",
    "transcription": "анИ́ овÉд бамисрАд"
  },
  {
    "id": 109,
    "excel_row": 109,
    "russian": "Учиться",
    "hebrew": "ללמוד",
    "transcription": "лилмOд"
  },
  {
    "id": 110,
    "excel_row": 110,
    "russian": "Я учу языки.",
    "hebrew": "אני לומד שפות.",
    "transcription": "анИ́ ломЭд сафОт"
  },
  {
    "id": 111,
    "excel_row": 111,
    "russian": "Помнить",
    "hebrew": "לזכור",
    "transcription": "лизкÓр"
  },
  {
    "id": 112,
    "excel_row": 112,
    "russian": "Я этого не помню.",
    "hebrew": "אני לא זוכר את זה.",
    "transcription": "анИ́ ло зохÉр эт зэ"
  },
  {
    "id": 113,
    "excel_row": 113,
    "russian": "Забывать",
    "hebrew": "לשכוח",
    "transcription": "лишкÓах"
  },
  {
    "id": 114,
    "excel_row": 114,
    "russian": "Не забудь это.",
    "hebrew": "אל תשכח את זה.",
    "transcription": "аль тишкА́х эт зэ"
  },
  {
    "id": 115,
    "excel_row": 115,
    "russian": "Открывать",
    "hebrew": "לפתוח",
    "transcription": "лифтÓах"
  },
  {
    "id": 116,
    "excel_row": 116,
    "russian": "Я открываю дверь.",
    "hebrew": "אני פותח את הדלת.",
    "transcription": "анИ́ потÉ́ах эт hадÉльeт"
  },
  {
    "id": 117,
    "excel_row": 117,
    "russian": "Закрывать",
    "hebrew": "לסגור",
    "transcription": "лисгО́р"
  },
  {
    "id": 118,
    "excel_row": 118,
    "russian": "Пожалуйста, закрой окно.",
    "hebrew": "בבקשה, סגור את החלון.",
    "transcription": "бевакашА́, сгор эт hахалО́н"
  },
  {
    "id": 119,
    "excel_row": 119,
    "russian": "Платить",
    "hebrew": "לשלם",
    "transcription": "лешалÉm"
  },
  {
    "id": 120,
    "excel_row": 120,
    "russian": "Я плачу наличными.",
    "hebrew": "אני משלם במזומן.",
    "transcription": "анИ́ мешалÉm бимезумАн"
  },
  {
    "id": 121,
    "excel_row": 121,
    "russian": "Покупать",
    "hebrew": "לקנות",
    "transcription": "ликнOт"
  },
  {
    "id": 122,
    "excel_row": 122,
    "russian": "Я хочу купить хлеб.",
    "hebrew": "אני רוצה לקנות לחם.",
    "transcription": "анИ́ роцÉ́ ликнOт льÉhem"
  },
  {
    "id": 123,
    "excel_row": 123,
    "russian": "Продавать",
    "hebrew": "למכור",
    "transcription": "лимкО́р"
  },
  {
    "id": 124,
    "excel_row": 124,
    "russian": "Он продает свою машину.",
    "hebrew": "הוא מוכר את המכונית שלו.",
    "transcription": "hу мохÉр эт hамехонИт шелО́"
  },
  {
    "id": 125,
    "excel_row": 125,
    "russian": "Готовить",
    "hebrew": "לבשל",
    "transcription": "левашÉль"
  },
  {
    "id": 126,
    "excel_row": 126,
    "russian": "Я люблю готовить.",
    "hebrew": "אני אוהב לבשל.",
    "transcription": "анИ́ оhÉв левашÉль"
  },
  {
    "id": 127,
    "excel_row": 127,
    "russian": "Чистить",
    "hebrew": "לנקות",
    "transcription": "ленакOт"
  },
  {
    "id": 128,
    "excel_row": 128,
    "russian": "Я убираю дом.",
    "hebrew": "אני מנקה את הבית.",
    "transcription": "анИ́ менакЕ́ эт hабА́ит"
  },
  {
    "id": 129,
    "excel_row": 129,
    "russian": "Играть",
    "hebrew": "לשחק",
    "transcription": "лесахÉk"
  },
  {
    "id": 130,
    "excel_row": 130,
    "russian": "Дети играют в парке.",
    "hebrew": "הילדים משחקים בפארק.",
    "transcription": "hайеладИ́м месахкИ́м бапАрк"
  },
  {
    "id": 131,
    "excel_row": 131,
    "russian": "Пробовать",
    "hebrew": "לנסות",
    "transcription": "ленасОт"
  },
  {
    "id": 132,
    "excel_row": 132,
    "russian": "Я пытаюсь понять.",
    "hebrew": "אני מנסה להבין.",
    "transcription": "анИ́ менасÉ́ леhавИн"
  },
  {
    "id": 133,
    "excel_row": 133,
    "russian": "Начинать",
    "hebrew": "להתחיל",
    "transcription": "леhатхИ́ль"
  },
  {
    "id": 134,
    "excel_row": 134,
    "russian": "Урок начинается сейчас.",
    "hebrew": "השיעור מתחיל עכשיו.",
    "transcription": "hашиУ́р матхИ́ль ахшА́в"
  },
  {
    "id": 135,
    "excel_row": 135,
    "russian": "Заканчивать",
    "hebrew": "לגמור",
    "transcription": "лигмО́р"
  },
  {
    "id": 136,
    "excel_row": 136,
    "russian": "Я закончил работу.",
    "hebrew": "סיימתי את העבודה.",
    "transcription": "сийА́мти эт hааводА́"
  },
  {
    "id": 137,
    "excel_row": 137,
    "russian": "Помогать",
    "hebrew": "לעזור",
    "transcription": "лаазО́р"
  },
  {
    "id": 138,
    "excel_row": 138,
    "russian": "Я хочу тебе помочь.",
    "hebrew": "אני רוצה לעזור לך.",
    "transcription": "анИ́ роцÉ́ лаазО́р лехА́"
  },
  {
    "id": 139,
    "excel_row": 139,
    "russian": "Беречь/Хранить",
    "hebrew": "לשמור",
    "transcription": "лишмÓр"
  },
  {
    "id": 140,
    "excel_row": 140,
    "russian": "Присмотри за этим, пожалуйста.",
    "hebrew": "תשמור על זה בבקשה.",
    "transcription": "тишмО́р аль зэ бевакашА́"
  },
  {
    "id": 141,
    "excel_row": 141,
    "russian": "Получать",
    "hebrew": "לקבל",
    "transcription": "лекабÉль"
  },
  {
    "id": 142,
    "excel_row": 142,
    "russian": "Я получил подарок.",
    "hebrew": "קיבלתי מתנה.",
    "transcription": "киба́лти матанА́"
  },
  {
    "id": 143,
    "excel_row": 143,
    "russian": "Давать",
    "hebrew": "לתת",
    "transcription": "латÉт"
  },
  {
    "id": 144,
    "excel_row": 144,
    "russian": "Я хочу тебе кое-что дать.",
    "hebrew": "אני רוצה לתת לך משהו.",
    "transcription": "анИ́ роцÉ́ латÉт лехА́ мА́шеhу"
  },
  {
    "id": 145,
    "excel_row": 145,
    "russian": "Показывать",
    "hebrew": "להראות",
    "transcription": "леhаръОт"
  },
  {
    "id": 146,
    "excel_row": 146,
    "russian": "Я тебе покажу.",
    "hebrew": "אני אראה לך.",
    "transcription": "анИ́ аръÉ́ лехА́"
  },
  {
    "id": 147,
    "excel_row": 147,
    "russian": "Сказать",
    "hebrew": "להגיד",
    "transcription": "леhагИ́д"
  },
  {
    "id": 148,
    "excel_row": 148,
    "russian": "Что он сказал?",
    "hebrew": "מה הוא אמר?",
    "transcription": "ма hу амАр?"
  },
  {
    "id": 149,
    "excel_row": 149,
    "russian": "Петь",
    "hebrew": "לשיר",
    "transcription": "лашИ́р"
  },
  {
    "id": 150,
    "excel_row": 150,
    "russian": "Она любит петь.",
    "hebrew": "היא אוהבת לשיר.",
    "transcription": "hи оhÉвeт лашИ́р"
  },
  {
    "id": 151,
    "excel_row": 151,
    "russian": "Танцевать",
    "hebrew": "לרקוד",
    "transcription": "лиркOд"
  },
  {
    "id": 152,
    "excel_row": 152,
    "russian": "Мы танцуем на вечеринке.",
    "hebrew": "אנחנו רוקדים במסיבה.",
    "transcription": "анА́хну рокдИ́м бамесИба"
  },
  {
    "id": 153,
    "excel_row": 153,
    "russian": "Гулять/Путешествовать",
    "hebrew": "לטייל",
    "transcription": "летайÉль"
  },
  {
    "id": 154,
    "excel_row": 154,
    "russian": "Мы гуляем по городу.",
    "hebrew": "אנחנו מטיילים בעיר.",
    "transcription": "анА́хну метайлИ́м баИр"
  },
  {
    "id": 155,
    "excel_row": 155,
    "russian": "Посещать",
    "hebrew": "לבקר",
    "transcription": "левакЭр"
  },
  {
    "id": 156,
    "excel_row": 156,
    "russian": "Я хочу навестить бабушку и дедушку.",
    "hebrew": "אני רוצה לבקר את סבא וסבתא.",
    "transcription": "анИ́ роцÉ́ левакЭр эт сАба вeсАвта"
  },
  {
    "id": 157,
    "excel_row": 157,
    "russian": "Ждать",
    "hebrew": "לחכות",
    "transcription": "лехакOт"
  },
  {
    "id": 158,
    "excel_row": 158,
    "russian": "Мы ждем автобус.",
    "hebrew": "אנחנו מחכים לאוטובוס.",
    "transcription": "анА́хну мехакИ́м леотобУс"
  },
  {
    "id": 159,
    "excel_row": 159,
    "russian": "Звонить",
    "hebrew": "להתקשר",
    "transcription": "леhиткашЭр"
  },
  {
    "id": 160,
    "excel_row": 160,
    "russian": "Я позвоню тебе завтра.",
    "hebrew": "אני אתקשר אליך מחר.",
    "transcription": "анИ́ эткашÉр элехА́ махАр"
  },
  {
    "id": 161,
    "excel_row": 161,
    "russian": "Одеваться",
    "hebrew": "להתלבש",
    "transcription": "леhитлабэш"
  },
  {
    "id": 162,
    "excel_row": 162,
    "russian": "Я быстро одеваюсь.",
    "hebrew": "אני מתלבש מהר.",
    "transcription": "анИ́ митлабÉсh махЕр"
  },
  {
    "id": 163,
    "excel_row": 163,
    "russian": "Мыться",
    "hebrew": "להתרחץ",
    "transcription": "леhитрахЭц"
  },
  {
    "id": 164,
    "excel_row": 164,
    "russian": "Я моюсь утром.",
    "hebrew": "אני מתרחץ בבוקר.",
    "transcription": "анИ́ митрахЭц бабОкер"
  },
  {
    "id": 165,
    "excel_row": 165,
    "russian": "Преуспеть",
    "hebrew": "להצליח",
    "transcription": "леhацлИ́ах"
  },
  {
    "id": 166,
    "excel_row": 166,
    "russian": "Я надеюсь преуспеть.",
    "hebrew": "אני מקווה להצליח.",
    "transcription": "анИ́ мекавÉ́ леhацлИ́ах"
  },
  {
    "id": 167,
    "excel_row": 167,
    "russian": "Чувствовать себя хорошо",
    "hebrew": "להרגיש טוב",
    "transcription": "леhаргИ́ш тов"
  },
  {
    "id": 168,
    "excel_row": 168,
    "russian": "Я чувствую себя сегодня очень хорошо.",
    "hebrew": "אני מרגיש טוב מאוד היום.",
    "transcription": "анИ́ маргИ́ш тов меОд hайОм"
  },
  {
    "id": 169,
    "excel_row": 169,
    "russian": "Чувствовать себя плохо",
    "hebrew": "להרגיש רע",
    "transcription": "леhаргИ́ш ра"
  },
  {
    "id": 170,
    "excel_row": 170,
    "russian": "Вчера я чувствовал себя плохо.",
    "hebrew": "אתמול הרגשתי רע.",
    "transcription": "этмОль hирга́шти ра"
  },
  {
    "id": 171,
    "excel_row": 171,
    "russian": "Дом",
    "hebrew": "בית",
    "transcription": "баИт"
  },
  {
    "id": 172,
    "excel_row": 172,
    "russian": "Это мой дом.",
    "hebrew": "זה הבית שלי.",
    "transcription": "зэ hабА́ит шелИ́"
  },
  {
    "id": 173,
    "excel_row": 173,
    "russian": "Книга",
    "hebrew": "ספר",
    "transcription": "сЭ́фер"
  },
  {
    "id": 174,
    "excel_row": 174,
    "russian": "Это хорошая книга.",
    "hebrew": "זה ספר טוב.",
    "transcription": "зэ сÉfeр тов"
  },
  {
    "id": 175,
    "excel_row": 175,
    "russian": "Стол",
    "hebrew": "שולחן",
    "transcription": "шульхА́н"
  },
  {
    "id": 176,
    "excel_row": 176,
    "russian": "Книга на столе.",
    "hebrew": "הספר על השולחן.",
    "transcription": "hаСÉfeр аль hашульхА́н"
  },
  {
    "id": 177,
    "excel_row": 177,
    "russian": "Стул",
    "hebrew": "כיסא",
    "transcription": "кисЭ́"
  },
  {
    "id": 178,
    "excel_row": 178,
    "russian": "Я сижу на стуле.",
    "hebrew": "אני יושב על הכיסא.",
    "transcription": "анИ́ йошÉв аль hакисЭ́"
  },
  {
    "id": 179,
    "excel_row": 179,
    "russian": "Дверь",
    "hebrew": "דלת",
    "transcription": "дÉ́лет"
  },
  {
    "id": 180,
    "excel_row": 180,
    "russian": "Дверь открыта.",
    "hebrew": "הדלת פתוחה.",
    "transcription": "hадÉ́лет птухА́"
  },
  {
    "id": 181,
    "excel_row": 181,
    "russian": "Окно",
    "hebrew": "חלון",
    "transcription": "халО́н"
  },
  {
    "id": 182,
    "excel_row": 182,
    "russian": "Я открываю окно.",
    "hebrew": "אני פותח את החלון.",
    "transcription": "анИ́ потЭshах эт hахалО́н"
  },
  {
    "id": 183,
    "excel_row": 183,
    "russian": "Деньги",
    "hebrew": "כסף",
    "transcription": "кЭ́сэф"
  },
  {
    "id": 184,
    "excel_row": 184,
    "russian": "У меня нет денег.",
    "hebrew": "אין לי כסף.",
    "transcription": "эйн ли кЭ́сэф"
  },
  {
    "id": 185,
    "excel_row": 185,
    "russian": "Еда",
    "hebrew": "אוכל",
    "transcription": "О́хель"
  },
  {
    "id": 186,
    "excel_row": 186,
    "russian": "Еда вкусная.",
    "hebrew": "האוכל טעים.",
    "transcription": "hаО́хель таИ́м"
  },
  {
    "id": 187,
    "excel_row": 187,
    "russian": "Вода",
    "hebrew": "מים",
    "transcription": "маИм"
  },
  {
    "id": 188,
    "excel_row": 188,
    "russian": "Я хочу воды.",
    "hebrew": "אני רוצה מים.",
    "transcription": "анИ́ роцЭ́ маИм"
  },
  {
    "id": 189,
    "excel_row": 189,
    "russian": "Мужчина/Человек",
    "hebrew": "איש",
    "transcription": "иш"
  },
  {
    "id": 190,
    "excel_row": 190,
    "russian": "Он приятный человек.",
    "hebrew": "הוא איש נחמד.",
    "transcription": "hу иш нехмАд"
  },
  {
    "id": 191,
    "excel_row": 191,
    "russian": "Женщина",
    "hebrew": "אישה",
    "transcription": "ишА́"
  },
  {
    "id": 192,
    "excel_row": 192,
    "russian": "Она умная женщина.",
    "hebrew": "היא אישה חכמה.",
    "transcription": "hи ишА́ хахамА́"
  },
  {
    "id": 193,
    "excel_row": 193,
    "russian": "Мальчик",
    "hebrew": "ילד",
    "transcription": "йЕ́лед"
  },
  {
    "id": 194,
    "excel_row": 194,
    "russian": "Мальчик играет.",
    "hebrew": "הילד משחק.",
    "transcription": "hайЕ́лед месахÉk"
  },
  {
    "id": 195,
    "excel_row": 195,
    "russian": "Девочка",
    "hebrew": "ילדה",
    "transcription": "йалдА́"
  },
  {
    "id": 196,
    "excel_row": 196,
    "russian": "Девочка рисует.",
    "hebrew": "הילדה מציירת.",
    "transcription": "hайалдА́ мецайÉрeт"
  },
  {
    "id": 197,
    "excel_row": 197,
    "russian": "Друг (мужской. род.)",
    "hebrew": "חבר",
    "transcription": "хавÉр"
  },
  {
    "id": 198,
    "excel_row": 198,
    "russian": "Это мой друг.",
    "hebrew": "זה החבר שלי.",
    "transcription": "зэ hахавÉр шелИ́"
  },
  {
    "id": 199,
    "excel_row": 199,
    "russian": "Подруга (женский. род.)",
    "hebrew": "חברה",
    "transcription": "хаверА́"
  },
  {
    "id": 200,
    "excel_row": 200,
    "russian": "Это моя подруга.",
    "hebrew": "זאת החברה שלי.",
    "transcription": "зот hахаверА́ шелИ́"
  }
];
