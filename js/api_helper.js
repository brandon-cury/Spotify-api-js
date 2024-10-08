import { CLIENT_CREDENTIALS } from "./client_credentials.js";
export class ApiHelper {
  API = CLIENT_CREDENTIALS;
  formBody = "";
  token = null;
  type_search = "artist";
  time_expire = new Date().getTime() - 1000;
  ROUTES = {
    search_route: "/search?",
  };
  BASE_URL = "https://api.spotify.com/v1";

  constructor() {
    let formBodyArray = [];
    for (let property in this.API) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(this.API[property]);
      formBodyArray.push(encodedKey + "=" + encodedValue);
    }
    this.formBody = formBodyArray.join("&");
    this.setToken();
  }

  async setToken() {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: this.formBody,
    });
    let decided = await response.json();
    this.token = decided;
    this.time_expire = new Date().getTime() + decided.expires_in * 1000;
  }

  async getToken() {
    console.log(this.token);
    if (this.time_expire >= new Date().getTime()) {
      return this.token;
    } else {
      await this.setToken(true);
      return this.token;
    }
  }
  async getHeader() {
    return {
      Authorization: "Bearer" + " " + (await this.getToken()).access_token,
    };
  }
  async search(txt_search, type_search = "artist") {
    this.type_search = type_search;
    let url =
      this.BASE_URL +
      this.ROUTES.search_route +
      "q=" +
      encodeURI(txt_search) +
      "&type=" +
      this.type_search;
    let http_response = await fetch(url, {
      method: "GET",
      headers: await this.getHeader(),
    });
    return await http_response.json();
  }
  getIframeFirstTrack(link = "", type = "track") {
    return "https://open.spotify.com/embed/" + type + "/" + link;
  }
}
