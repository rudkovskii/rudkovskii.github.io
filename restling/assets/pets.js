/* pets.js — конфиг 6 питомцев (порядок = pet1…pet6): кот, пёс, заяц, капибара, волк, страус.
   Графика живёт в assets/pets/<id>.js (базовый/sticker) и <id>.<style>.js (доп. стили),
   см. assets/pets/CONTRACT.md. Здесь — метаданные и фолбэк-цвета (blob/аватарка). */
window.RP_PETS = [
  {
    id: "cat",              // pet1 — предвыбрана. Мила, рыжая табби-кошка
    nameEn: "Mila", nameRu: "Мила",
    color: "#E6A45C", colorDeep: "#C9803B",
    characterKey: "pet.cat.character"
  },
  {
    id: "dog",              // pet2 — Бисквит, золотистый вислоухий щенок
    nameEn: "Biscuit", nameRu: "Бисквит",
    color: "#E7B26B", colorDeep: "#D2954A",
    characterKey: "pet.dog.character"
  },
  {
    id: "rabbit",           // pet3 — Кловер, пастельный кролик
    nameEn: "Clover", nameRu: "Кловер",
    color: "#F7EDE2", colorDeep: "#E0CDB8",
    characterKey: "pet.rabbit.character"
  },
  {
    id: "capybara",         // pet4 — Юдзу, капибара-«батон»
    nameEn: "Yuzu", nameRu: "Юдзу",
    color: "#C89B6C", colorDeep: "#A97F52",
    characterKey: "pet.capybara.character"
  },
  {
    id: "wolf",             // pet5 — Уиллоу, мягкий серый волк
    nameEn: "Willow", nameRu: "Уиллоу",
    color: "#AEB4BE", colorDeep: "#8C929C",
    characterKey: "pet.wolf.character"
  },
  {
    id: "ostrich",          // pet6 — Поппи, пушистый страус
    nameEn: "Poppy", nameRu: "Поппи",
    color: "#E9CBA5", colorDeep: "#D3AE82",
    characterKey: "pet.ostrich.character"
  }
];
