/* pets.js — конфиг 5 питомцев (порядок = pet1…pet5 из ТЗ).
   Графика живёт в assets/pets/<id>.js (см. assets/pets/CONTRACT.md).
   Здесь — метаданные и фолбэк-цвета, пока модуль питомца не зарегистрирован. */
window.RP_PETS = [
  {
    id: "mochi",            // pet1 — предвыбран
    nameEn: "Mochi", nameRu: "Мочи",
    color: "#F6D8B8", colorDeep: "#E8B48C",   // фолбэк-blob и аватарка
    characterKey: "pet.mochi.character"
  },
  {
    id: "lumi",             // pet2
    nameEn: "Lumi", nameRu: "Люми",
    color: "#F2B8C6", colorDeep: "#D98FA5",
    characterKey: "pet.lumi.character"
  },
  {
    id: "fern",             // pet3
    nameEn: "Fern", nameRu: "Ферн",
    color: "#B8B29A", colorDeep: "#8A7E6C",
    characterKey: "pet.fern.character"
  },
  {
    id: "juno",             // pet4
    nameEn: "Juno", nameRu: "Джуно",
    color: "#B9AEDD", colorDeep: "#8C7AE6",
    characterKey: "pet.juno.character"
  },
  {
    id: "nimbus",           // pet5
    nameEn: "Nimbus", nameRu: "Нимбус",
    color: "#EDEAF5", colorDeep: "#9C8BC0",
    characterKey: "pet.nimbus.character"
  }
];
