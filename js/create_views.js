export class CreateViews {
  //constructor() {}

  /*
    <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="img/m.jpg" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>

              <p class="card-text">
                <small class="text-body-secondary"
                  >Last updated 3 mins ago</small
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    */
  static createCard1(
    image = "img/default.jpg",
    name = "Title",
    desc = "aucune description",
    sousDesc = "Last updated 3 mins ago",
    id = "",
    linkOpen = ""
  ) {
    //Create main div with class "card mb-3" and style
    const divPrincipale = document.createElement("div");
    divPrincipale.className = "card mb-3 iframeCard";
    divPrincipale.style.maxHeight = "200px";
    divPrincipale.dataset.id = id;
    divPrincipale.dataset.linkOpen = linkOpen;

    // Create the div with class "row g-0"
    const divRow = document.createElement("div");
    divRow.className = "row g-0";
    divRow.style.Height = "100%";

    // Create the div with the "col-md-4" class
    const divCol1 = document.createElement("div");
    divCol1.className = "col-2";

    // Create the image with the "img-fluid rounded-start" class and the src attribute
    const img = document.createElement("img");
    img.className = "img-fluid rounded-start";
    img.style.height = "100%";
    img.src = image;
    img.alt = name;
    // Add image to div "col-md-4"
    divCol1.appendChild(img);

    // Create the div with the "col-md-8" class
    const divCol2 = document.createElement("div");
    divCol2.className = "col-10";

    // Create the div with the "card-body" class
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    // Create the title with the "card-title" class and the text
    const titre = document.createElement("h5");
    titre.className = "card-title";
    titre.textContent = name;

    // Create the paragraph with the "card-text" class and the text
    const paragraphe = document.createElement("p");
    paragraphe.className = "card-text";
    paragraphe.innerHTML = desc;

    // Create the paragraph with the "card-text" class and the text "Last updated 3 mins ago"
    const small = document.createElement("small");
    small.className = "text-body-secondary";
    small.innerHTML = sousDesc;

    // Add the paragraph in the "card-text" paragraph
    paragraphe.appendChild(document.createElement("br"));
    paragraphe.appendChild(small);

    // Add title and paragraph to "card-body" div
    divCardBody.appendChild(titre);
    divCardBody.appendChild(paragraphe);

    // Add the "card-body" div to the "col-md-8" div
    divCol2.appendChild(divCardBody);

    // Add divs "col-md-4" and "col-md-8" to div "row g-0"
    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2);

    // Add div "row g-0" to main div "card mb-3"
    divPrincipale.appendChild(divRow);

    // Ajouter la div principale au document
    return divPrincipale;
  }
  /*
  <div class="carousel-item active">
      <iframe
        src="https://open.spotify.com/embed/track/3a9TMd2Yrza6HXqqlfMtfy"
        title="Spotify"
        allowfullscreen>
      </iframe>
  </div>
  */
  static createIframe(src, active = false) {
    // Create the div element
    let divElement = document.createElement("div");
    divElement.classList.add("carousel-item");
    if (active) {
      divElement.classList.add("active");
    }

    // Create the iframe element
    let iframeElement = document.createElement("iframe");
    iframeElement.src = src;
    iframeElement.title = "Spotify";
    iframeElement.setAttribute("allowfullscreen", "");

    // Add iframe element to div element
    divElement.appendChild(iframeElement);
    // retour
    return divElement; // Change document.body if you want to add it to another element
  }
}
