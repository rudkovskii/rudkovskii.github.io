/* i18n.js — словарь EN/RU. Никакого fetch: всё инлайн (рамка file:// из ТЗ).
   Все строки UI идут только отсюда через t('key'). {name} — имя питомца. */
window.RP_I18N = {
  en: {
    "meta.title": "Restling — a pet that rests when you rest",

    "header.langAria": "Interface language",

    "hero.title": "A pet that rests when you rest",
    "hero.subtitle": "Your companion mirrors your sleep, HRV and readiness from Oura, Whoop or Apple Watch. Well rested — it glows. Ran yourself down — it curls up and rests with you.",
    "hero.tryDemo": "Try the demo",
    "hero.getAccess": "Get early access",

    "choose.title": "Choose your companion",
    "choose.subtitle": "One little creature to live alongside your mornings. You can change your mind anytime.",

    "pet.cat.character": "A cream tabby cat who takes her naps very seriously",
    "pet.capybara.character": "A capybara soaking in a warm spring — calm is her superpower",
    "pet.rabbit.character": "A bashful little bunny — her ears show how rested you are",
    "pet.sloth.character": "A sloth who's been telling you to slow down all along",
    "pet.otter.character": "A sea otter floating on her back, favorite pebble on her chest",

    "demo.title": "This morning, together",
    "demo.subtitle": "Move the sliders to your real morning numbers — watch how {name} feels.",
    "demo.changePet": "change pet",
    "demo.styleLabel": "Art style",
    "demo.styleAria": "Pet art style",
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

    "state.radiant": "You're well rested — {name} is glowing today.",
    "state.steady": "A solid night. {name} feels calm and cozy.",
    "state.tired": "Yesterday took a lot out of you — {name} is moving slow with you.",
    "state.drained": "Looks like a rough night. {name} wants a slow, gentle day with you.",

    "petting.radiant": "{name} is thrilled you're here!",
    "petting.radiantBurst": "{name} can't stop bouncing — what a morning!",
    "petting.steady": "{name} squints happily.",
    "petting.tired": "{name} slowly opens one eye. A small, sleepy heart.",
    "petting.drained": "shh… {name} is resting",
    "petting.quiet": "{name} would love a little quiet right now.",

    "away.missed": "{name} missed you",
    "away.welcome": "{name} was waiting for you — welcome back.",

    "survey.question": "Does this match how you feel today?",
    "survey.yes": "Yes",
    "survey.no": "Not really",
    "survey.thanksYes": "{name} thought so too.",
    "survey.thanksNo": "Fair enough — every morning is different. {name} stays close either way.",

    "how.title": "How it works",
    "how.s1.title": "Connect your wearable",
    "how.s1.text": "Oura, Whoop or Apple Watch — the ring or strap you already sleep with.",
    "how.s2.title": "We read your recovery",
    "how.s2.text": "Sleep, HRV and readiness — the same numbers you check every morning.",
    "how.s3.title": "Your pet mirrors you",
    "how.s3.text": "Well recovered — it glows and plays. Worn down — it rests, and asks you to rest too.",
    "how.tone": "It's never about doing more. It's about noticing when you've run yourself down.",

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
    "cta.subtitle": "A pet that worries about your rest, not your step count.",
    "cta.success": "You're in. We'll write when your pet is ready.",

    "footer.about": "Restling is a tiny companion whose wellbeing follows your recovery — sleep, HRV and readiness from your wearable.",
    "footer.disclaimer": "Not a medical device. For gentle self-reflection only.",
    "footer.contact": "Contact us"
  },

  ru: {
    "meta.title": "Restling — питомец, который отдыхает, когда отдыхаешь ты",

    "header.langAria": "Язык интерфейса",

    "hero.title": "Питомец, который отдыхает, когда отдыхаешь ты",
    "hero.subtitle": "Твой компаньон отражает твои sleep, HRV и readiness из Oura, Whoop или Apple Watch. Выспалась и восстановилась — он сияет. Загнала себя — он сворачивается и отдыхает вместе с тобой.",
    "hero.tryDemo": "Попробовать демо",
    "hero.getAccess": "Ранний доступ",

    "choose.title": "Выбери своего компаньона",
    "choose.subtitle": "Одно маленькое существо рядом с твоими утрами. Передумать можно в любой момент.",

    "pet.cat.character": "Кремовая табби-кошка, которая очень серьёзно относится к дрёме",
    "pet.capybara.character": "Капибара в тёплом источнике — спокойствие её суперсила",
    "pet.rabbit.character": "Застенчивый кролик — по её ушам видно, как ты отдохнула",
    "pet.sloth.character": "Ленивец, который всегда говорил тебе не торопиться",
    "pet.otter.character": "Морская выдра дрейфует на спине с любимым камешком на груди",

    "demo.title": "Это утро — вдвоём",
    "demo.subtitle": "Поставь слайдеры на свои реальные утренние цифры — и посмотри, как чувствует себя {name}.",
    "demo.changePet": "сменить питомца",
    "demo.styleLabel": "Стиль",
    "demo.styleAria": "Стиль отрисовки питомца",
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
    "state.steady": "Нормальная ночь. У {name} ровное, довольное настроение.",
    "state.tired": "Вчера забрал много сил — {name} сегодня тоже не спешит.",
    "state.drained": "Похоже, ночь была тяжёлой. {name} просит тихий бережный день вдвоём.",

    "petting.radiant": "{name} в восторге, что ты рядом!",
    "petting.radiantBurst": "{name} не может перестать скакать — вот это утро!",
    "petting.steady": "{name} довольно жмурится.",
    "petting.tired": "{name} медленно приоткрывает один глаз. Маленькое сонное сердечко.",
    "petting.drained": "тс-с… {name} отдыхает",
    "petting.quiet": "Сейчас {name} нужна тишина.",

    "away.missed": "{name} скучает по тебе",
    "away.welcome": "С возвращением — {name} уже ждёт.",

    "survey.question": "Похоже на твоё сегодняшнее утро?",
    "survey.yes": "Да",
    "survey.no": "Не очень",
    "survey.thanksYes": "{name} тоже так думает.",
    "survey.thanksNo": "Понятно — каждое утро своё. {name} рядом в любом случае.",

    "how.title": "Как это работает",
    "how.s1.title": "Подключи носимое устройство",
    "how.s1.text": "Oura, Whoop или Apple Watch — кольцо или браслет, в котором ты и так спишь.",
    "how.s2.title": "Мы читаем твоё восстановление",
    "how.s2.text": "Sleep, HRV и readiness — те же цифры, которые ты смотришь каждое утро.",
    "how.s3.title": "Питомец отражает тебя",
    "how.s3.text": "Восстановилась — он сияет и играет. Вымоталась — он отдыхает и просит отдохнуть тебя.",
    "how.tone": "Дело никогда не в том, чтобы сделать больше. Дело в том, чтобы заметить, когда ты себя загнала.",

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
    "cta.subtitle": "Питомец, которого волнует твой отдых, а не количество шагов.",
    "cta.success": "Готово, ты с нами. Напишем, когда твой питомец будет готов.",

    "footer.about": "Restling — маленький компаньон, чьё самочувствие следует за твоим восстановлением: sleep, HRV и readiness из носимого устройства.",
    "footer.disclaimer": "Не медицинское устройство. Только для бережного самонаблюдения.",
    "footer.contact": "Написать нам"
  }
};
