import { TradHelper } from "./trad_helper.js";
import { ApiHelper } from "./api_helper.js";
import { CreateViews } from "./create_views.js";

//https://open.spotify.com/embed/artist/0kbYTNQb4Pb1rPbbaF0pT4
//Get lang
let spans = Array.from(document.getElementsByClassName("trad"));
let select_lang = document.getElementById("lang");
let trad_helper = new TradHelper(spans, "textkey");

//Get url
const urlParams = new URLSearchParams(window.location.search);
let lang_choisi = urlParams.get("lang");
if (!lang_choisi) {
  lang_choisi = "fr";
}
//Get spotify
let api_helper = new ApiHelper();

//Get type
let type = document.getElementById("type");
let value_type = type.value;

//Get search bar
let search_input = document.querySelector(".searchInput");
let form_submit = document.querySelector(".formSearch");
let txt_search = urlParams.get("search");

//Get div all-card
let all_card = document.getElementById("all-card");

//Get time_search
let timeout_search = "";

//Get cards (content son)
let cards = "";

//Get alert
let alert_div = document.querySelector(".alert");

//Get iframe
let iframeDiv = document.querySelector(".iframeDiv");
let iframe = document.getElementById("iframe");
//Get carousel
let carouselDiv = document.querySelector(".carouselDiv");
let carouselInner = document.querySelector(".carousel-inner");

//change language after selection
select_lang.addEventListener("change", (event) => {
  let lang_choisi = event.target.value;
  trad_helper.changeLange(lang_choisi);
});
trad_helper.changeLange(lang_choisi);
if (urlParams.get("lang")) {
  let options = Array.from(select_lang.getElementsByTagName("option"));
  options.forEach((option) => {
    if (option.value == urlParams.get("lang")) {
      option.selected = true;
    }
  });
}

//search if the search parameter exists in url
if (txt_search) {
  call_search(txt_search);
}

//search input
search_input.addEventListener("keyup", (event) => {
  let search_value = event.target.value;
  all_card.innerHTML = "";
  alert_div.classList.add("hidden");
  clearTimeout(timeout_search);
  timeout_search = setTimeout(() => {
    call_search(search_value);
  }, 2000);
});
//change submit
type.addEventListener("change", () => {
  call_search(search_input.value);
});
//search submit
form_submit.addEventListener("submit", (e) => {
  e.preventDefault();
  call_search(search_input.value);
});
async function call_search(txt_search) {
  value_type = type.value;
  iframe.src = "";
  iframe.classList.add("hidden");
  iframeDiv.classList.add("hidden");
  all_card.innerHTML = "";
  all_card.classList.add("hidden");

  carouselInner.innerHTML = "";
  carouselDiv.classList.add("hidden");

  if (txt_search.length > 2) {
    switch (value_type) {
      case "artist":
        await call_search_artists(txt_search);
        break;
      case "track":
        call_search_track(txt_search);
        break;
      case "album":
        await call_search_album(txt_search);
        break;
      case "playlist":
        await call_search_playlist(txt_search);
        break;
      case "show":
        await call_search_show(txt_search);
        break;
    }
  }
}
//artist search function
async function call_search_artists(search_value) {
  let getSearch = await api_helper.search(search_value);
  if (Object.keys(getSearch.artists.items).length === 0) {
    alert_div.classList.remove("hidden");
  } else {
    all_card.classList.remove("hidden");
    getSearch.artists.items.forEach((artist) => {
      let image = "img/default.jpg";
      if (artist.images.length != 0) {
        image = artist.images[0].url;
      }

      all_card.appendChild(
        CreateViews.createCard1(
          image,
          artist.name,
          artist.type,
          "followers :" + artist.followers.total,
          artist.id,
          artist.external_urls.spotify
        )
      );
    });
    cards = Array.from(document.getElementsByClassName("iframeCard"));
    afficheIframeCard();
  }
}
//track search function
async function call_search_track(search_value) {
  let getSearch = await api_helper.search(search_value, type.value);
  if (Object.keys(getSearch.tracks.items).length === 0) {
    alert_div.classList.remove("hidden");
  } else {
    carouselDiv.classList.remove("hidden");
    getSearch.tracks.items.forEach((track, i) => {
      let active = false;
      if (!i) {
        active = true;
      }
      carouselInner.appendChild(
        CreateViews.createIframe(
          api_helper.getIframeFirstTrack(track.id),
          active
        )
      );
    });
  }
}
//album search function
async function call_search_album(search_value) {
  let getSearch = await api_helper.search(search_value, type.value);
  if (Object.keys(getSearch.albums.items).length === 0) {
    alert_div.classList.remove("hidden");
  } else {
    all_card.classList.remove("hidden");
    getSearch.albums.items.forEach((album) => {
      let image = "img/default.jpg";
      if (album.images.length != 0) {
        image = album.images[0].url;
      }

      all_card.appendChild(
        CreateViews.createCard1(
          image,
          album.name,
          album.type,
          "release_date :" + album.release_date,
          album.id,
          album.external_urls.spotify
        )
      );
    });
    cards = Array.from(document.getElementsByClassName("iframeCard"));
    afficheIframeCard();
  }
}
//playlist search function
async function call_search_playlist(search_value) {
  let getSearch = await api_helper.search(search_value, type.value);
  console.log(getSearch.playlists.items);
  if (Object.keys(getSearch.playlists.items).length === 0) {
    alert_div.classList.remove("hidden");
  } else {
    all_card.classList.remove("hidden");
    getSearch.playlists.items.forEach((playlist) => {
      let image = "img/default.jpg";
      if (playlist.images.length != 0) {
        image = playlist.images[0].url;
      }

      all_card.appendChild(
        CreateViews.createCard1(
          image,
          playlist.name,
          playlist.type,
          "description :" + playlist.description,
          playlist.id,
          playlist.external_urls.spotify
        )
      );
    });
    cards = Array.from(document.getElementsByClassName("iframeCard"));
    afficheIframeCard();
  }
}
//frame display function
function afficheIframeCard() {
  cards.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element);
      iframe.classList.remove("hidden");
      iframeDiv.classList.remove("hidden");
      iframe.src = api_helper.getIframeFirstTrack(
        element.dataset.id,
        type.value
      );
      window.scrollTo(0, 0);
    });
  });
}
