/* config.js — внешние интеграции прототипа.
   Пустые значения = всё молча выключено, страница работает офлайн и с file://. */
window.RP_CONFIG = {
  // POST-endpoint для email-форм (Formspree или аналог), например:
  // "https://formspree.io/f/xxxxxx". Пусто — форма показывает локальный успех.
  formEndpoint: "",

  // Ключ/домен аналитики (Plausible domain или GA4 id). Пусто — только console.debug.
  analyticsKey: ""
};
