/* pets.js — конфиг 5 питомцев (порядок = pet1…pet5).
   Графика живёт в assets/pets/<id>.js (см. assets/pets/CONTRACT.md).
   Здесь — метаданные и фолбэк-цвета, пока модуль питомца не зарегистрирован. */
window.RP_PETS = [
  {
    id: "cat",              // pet1 — предвыбрана. Мила, кремово-персиковая табби-кошка
    nameEn: "Mila", nameRu: "Мила",
    color: "#F6D8B8", colorDeep: "#E8B48C",   // фолбэк-blob и аватарка
    characterKey: "pet.cat.character"
  },
  {
    id: "capybara",         // pet2 — Юдзу, капибара в тёплом источнике
    nameEn: "Yuzu", nameRu: "Юдзу",
    color: "#C89B6C", colorDeep: "#A97F52",
    characterKey: "pet.capybara.character"
  },
  {
    id: "rabbit",           // pet3 — Кловер, пастельный кролик
    nameEn: "Clover", nameRu: "Кловер",
    color: "#F7EDE2", colorDeep: "#E0CDB8",
    characterKey: "pet.rabbit.character"
  },
  {
    id: "sloth",            // pet4 — Ферн, ленивец на ветке
    nameEn: "Fern", nameRu: "Ферн",
    color: "#B8B29A", colorDeep: "#8A7E6C",
    characterKey: "pet.sloth.character"
  },
  {
    id: "otter",            // pet5 — Пеббл, морская выдра на спине
    nameEn: "Pebble", nameRu: "Пеббл",
    color: "#8A6248", colorDeep: "#75513B",
    characterKey: "pet.otter.character"
  }
];
