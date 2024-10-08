export class TradHelper {
  lang = {
    fr: {
      name_projet: "Projet Spotify",
      fr: "Français",
      en: "Anglais",
      titre: "Je recherche sur Spotify",
      search_bouton: "Rechercher",
      alert: "Pas de resultat",
      track: "musiques",
      artist: "artistes",
      album: "albums",
      playlist: "playlists",
    },
    en: {
      name_projet: "Spotify Projet",
      fr: "French",
      en: "English",
      titre: "I search on Spotify",
      search_bouton: "Search",
      alert: "No result",
      track: "tracks",
      artist: "artists",
      album: "albums",
      playlist: "Playlists",
    },
  };
  key = "";
  SPANS = [];
  select_lang = "fr";

  constructor(spans, key) {
    this.key = key;
    this.SPANS = spans;
  }

  changeLange(lang_definie) {
    this.select_lang = lang_definie;

    this.SPANS.forEach((element) => {
      element.innerHTML = this.lang[this.select_lang][element.dataset.textkey];
    });
  }
}
