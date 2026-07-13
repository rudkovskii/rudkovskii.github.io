/* i18n.js — словарь EN/RU. Никакого fetch: всё инлайн (рамка file:// из ТЗ).
   Все строки UI идут только отсюда через t('key'). {name} — имя питомца. */
window.RP_I18N = {
  en: {
    "meta.title": "Restling — a pet that grows as you learn to rest",

    "header.langAria": "Interface language",

    "hero.title": "Grows as you learn to rest",
    "hero.subtitle": "Your companion reads your sleep, HRV and readiness from Oura, Whoop or Apple Watch — and slowly blossoms as you learn to take care of yourself.",
    "hero.tryDemo": "Try the demo",
    "hero.getAccess": "Get early access",

    "choose.title": "Choose who grows beside you",
    "choose.subtitle": "One little creature to grow up alongside your mornings. You can change your mind anytime.",

    "pet.cat.character": "An orange tabby cat who takes her naps very seriously",
    "pet.dog.character": "A golden pup who naps in every sunbeam he can find",
    "pet.rabbit.character": "A bashful little bunny — her ears show how rested you are",
    "pet.capybara.character": "A capybara soaking in a warm spring — calm is her superpower",
    "pet.wolf.character": "A gentle grey wolf who only howls at bedtime",
    "pet.ostrich.character": "A fuzzy ostrich who tucks her head in for a good rest",

    "demo.title": "This morning, together",
    "demo.subtitle": "Move the sliders to your real morning numbers and watch how {name} feels. This is just today — over time she remembers the kind mornings and grows from them.",
    "demo.changePet": "change pet",
    "demo.styleLabel": "Art style",
    "demo.styleAria": "Pet art style",
    "style.sticker": "Sticker",
    "style.soft": "Soft",
    "style.pixel": "Pixel",
    "style.cartoon": "Cartoon",
    "style.real": "Real",
    "demo.nameLabel": "Name your companion",
    "demo.namePlaceholder": "Companion name",
    "demo.recoveryLabel": "Recovery",
    "demo.sceneAria": "Your pet, reflecting your recovery",
    "demo.fallbackNote": "{name}'s full look is still hatching — here's a stand-in for now.",

    "sliders.sleep": "Sleep",
    "sliders.hrv": "HRV",
    "sliders.readiness": "Readiness",
    "sliders.sleepAria": "Sleep duration in hours",
    "sliders.hrvAria": "Heart rate variability in milliseconds",
    "sliders.readinessAria": "Readiness score from 0 to 100",
    "units.h": "h",
    "units.m": "m",
    "units.ms": "ms",

    "presets.great": "Great night",
    "presets.rough": "Rough night",

    "state.radiant": "You're well rested — {name} is radiant this morning.",
    "state.steady": "A solid night. {name} feels calm and steady today.",
    "state.tired": "Yesterday took a lot out of you — {name} is a little tired this morning, and that's okay.",
    "state.drained": "Looks like a rough night. {name} is asking for a quiet morning under a blanket — still every bit herself, just worn out from how hard you pushed.",

    "petting.radiant": "{name} is thrilled you're here!",
    "petting.radiantBurst": "{name} can't stop bouncing — what a morning!",
    "petting.steady": "{name} squints happily.",
    "petting.tired": "{name} slowly opens one eye. A small, sleepy heart.",
    "petting.drained": "shh… {name} is resting",
    "petting.quiet": "{name} would love a little quiet right now.",

    "away.missed": "{name} missed you",
    "away.welcome": "{name} kept growing while you were away — welcome back.",

    "survey.question": "Does this match how you feel today?",
    "survey.yes": "Yes",
    "survey.no": "Not really",
    "survey.thanksYes": "{name} thought so too.",
    "survey.thanksNo": "Fair enough — every morning is different. {name} stays close either way.",

    "how.title": "How it works",
    "how.s1.title": "Connect your wearable",
    "how.s1.text": "Oura, Whoop or Apple Watch — the ring or strap you already sleep with.",
    "how.s2.title": "We read your recovery",
    "how.s2.text": "Sleep, HRV and readiness — the same numbers you check every morning. Restling doesn't count your workouts; it sees how your body answers them.",
    "how.s3.title": "Reflects today, grows over time",
    "how.s3.text": "Each morning {name} reflects your day. And out of many kind mornings, she slowly grows. A rough night doesn't undo any of it — that's just today's weather.",
    "how.tone": "It was never about doing more. {name} doesn't grow because you tried harder — she grows because you let yourself recover.",

    "connect.title": "Works with your device",
    "connect.subtitle": "Pick yours — connecting takes a minute once we launch.",
    "connect.garmin": "Garmin — coming later",
    "connect.modalTitle": "We're building this right now",
    "connect.modalText": "Leave your email — you'll be first to connect when {name} learns to read your mornings.",
    "connect.close": "Close",

    "forms.emailPlaceholder": "you@email.com",
    "forms.submit": "Send",
    "forms.emailAria": "Your email address",
    "connect.success": "You're on the list. We'll write the moment it's ready.",

    "cta.title": "Get early access",
    "cta.subtitle": "A creature that grows on your rest, not your step count.",
    "cta.success": "You're in. We'll write when your pet is ready.",

    "footer.about": "Restling is a tiny companion whose wellbeing follows your recovery — sleep, HRV and readiness from your wearable — and who slowly grows alongside you.",
    "footer.disclaimer": "Not a medical device. For gentle self-reflection only.",
    "footer.contact": "Contact us"
  },

  ru: {
    "meta.title": "Restling — питомец, который растёт, когда ты учишься отдыхать",

    "header.langAria": "Язык интерфейса",

    "hero.title": "Растёт, когда ты учишься отдыхать",
    "hero.subtitle": "Твой компаньон читает твои sleep, HRV и readiness из Oura, Whoop или Apple Watch — и потихоньку расцветает по мере того, как ты учишься беречь себя.",
    "hero.tryDemo": "Попробовать демо",
    "hero.getAccess": "Ранний доступ",

    "choose.title": "Выбери, кто будет расти рядом",
    "choose.subtitle": "Одно маленькое существо, которое будет взрослеть рядом с твоими утрами. Передумать можно в любой момент.",

    "pet.cat.character": "Рыжая табби-кошка, которая очень серьёзно относится к дрёме",
    "pet.dog.character": "Золотистый щенок, который дремлет в каждом солнечном пятне",
    "pet.rabbit.character": "Застенчивый кролик — по её ушам видно, как ты отдохнула",
    "pet.capybara.character": "Капибара в тёплом источнике — спокойствие её суперсила",
    "pet.wolf.character": "Мягкий серый волк, который воет только перед сном",
    "pet.ostrich.character": "Пушистая страусиха, которая прячет голову, чтобы как следует отдохнуть",

    "demo.title": "Это утро — вдвоём",
    "demo.subtitle": "Поставь слайдеры на свои реальные утренние цифры — и посмотри, как чувствует себя {name}. Это только сегодня — со временем она запоминает добрые утра и растёт из них.",
    "demo.changePet": "сменить питомца",
    "demo.styleLabel": "Стиль",
    "demo.styleAria": "Стиль отрисовки питомца",
    "style.sticker": "Стикер",
    "style.soft": "Мягкий",
    "style.pixel": "Пиксель",
    "style.cartoon": "Мультик",
    "style.real": "Живой",
    "demo.nameLabel": "Назови компаньона",
    "demo.namePlaceholder": "Имя компаньона",
    "demo.recoveryLabel": "Recovery",
    "demo.sceneAria": "Твой питомец, отражающий твоё восстановление",
    "demo.fallbackNote": "Настоящий облик {name} ещё вылупляется — пока тут дублёр.",

    "sliders.sleep": "Сон",
    "sliders.hrv": "HRV",
    "sliders.readiness": "Readiness",
    "sliders.sleepAria": "Длительность сна в часах",
    "sliders.hrvAria": "Вариабельность сердечного ритма в миллисекундах",
    "sliders.readinessAria": "Readiness от 0 до 100",
    "units.h": "ч",
    "units.m": "м",
    "units.ms": "ms",

    "presets.great": "Отличная ночь",
    "presets.rough": "Тяжёлая ночь",

    "state.radiant": "Ты отлично восстановилась — {name} сегодня сияет.",
    "state.steady": "Нормальная ночь. У {name} ровное, спокойное утро.",
    "state.tired": "Вчера забрал много сил — {name} сегодня немного вялая, и это нормально.",
    "state.drained": "Похоже, ночь была тяжёлой. {name} просит тихого утра под пледом — она всё та же, просто вымоталась оттого, как сильно ты себя загнала.",

    "petting.radiant": "{name} в восторге, что ты рядом!",
    "petting.radiantBurst": "{name} не может перестать скакать — вот это утро!",
    "petting.steady": "{name} довольно жмурится.",
    "petting.tired": "{name} медленно приоткрывает один глаз. Маленькое сонное сердечко.",
    "petting.drained": "тс-с… {name} отдыхает",
    "petting.quiet": "Сейчас {name} нужна тишина.",

    "away.missed": "{name} скучает по тебе",
    "away.welcome": "{name} потихоньку росла, пока тебя не было — с возвращением.",

    "survey.question": "Похоже на твоё сегодняшнее утро?",
    "survey.yes": "Да",
    "survey.no": "Не очень",
    "survey.thanksYes": "{name} тоже так думает.",
    "survey.thanksNo": "Понятно — каждое утро своё. {name} рядом в любом случае.",

    "how.title": "Как это работает",
    "how.s1.title": "Подключи носимое устройство",
    "how.s1.text": "Oura, Whoop или Apple Watch — кольцо или браслет, в котором ты и так спишь.",
    "how.s2.title": "Мы читаем твоё восстановление",
    "how.s2.text": "Sleep, HRV и readiness — те же цифры, которые ты смотришь каждое утро. Restling не считает твои тренировки — он видит, как твоё тело на них отвечает.",
    "how.s3.title": "Отражает сегодня, растёт со временем",
    "how.s3.text": "Каждое утро {name} отражает твой день. А из множества добрых утр она медленно растёт. Плохая ночь ничего не отматывает — это просто сегодняшняя погода.",
    "how.tone": "Дело никогда не в том, чтобы делать больше. {name} растёт не оттого, что ты старалась сильнее, а оттого, что ты позволила себе восстановиться.",

    "connect.title": "Работает с твоим устройством",
    "connect.subtitle": "Выбери своё — после запуска подключение займёт минуту.",
    "connect.garmin": "Garmin — позже",
    "connect.modalTitle": "Мы как раз это строим",
    "connect.modalText": "Оставь email — ты подключишься первой, когда {name} научится читать твои утра.",
    "connect.close": "Закрыть",

    "forms.emailPlaceholder": "you@email.com",
    "forms.submit": "Отправить",
    "forms.emailAria": "Твой email",
    "connect.success": "Ты в списке. Напишем, как только всё будет готово.",

    "cta.title": "Получить ранний доступ",
    "cta.subtitle": "Существо, которое растёт от твоего отдыха, а не от твоих шагов.",
    "cta.success": "Готово, ты с нами. Напишем, когда твой питомец будет готов.",

    "footer.about": "Restling — маленький компаньон, чьё самочувствие следует за твоим восстановлением (sleep, HRV и readiness из носимого устройства) и который растёт вместе с тобой.",
    "footer.disclaimer": "Не медицинское устройство. Только для бережного самонаблюдения.",
    "footer.contact": "Написать нам"
  }
};
