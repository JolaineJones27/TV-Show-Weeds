//declare variables
let dataFromApi;
let showName = `weeds`;

//function to fetch data
function getApiData() {
  fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dataFromApi = data;
      showData();
    })
    .catch((error) => console.error("Error:", error));
}
getApiData();

//selects HTML element and assigns it to the container
let container = document.querySelector(".container");
console.log(container);

//1st try....
//function showData() {
//for (item of dataFromApi) {
//let showDiv = document.createElement("div");
//showDiv.className = "show-info";

//let showTitle = item.show.name;
//let title = document.createElement("h2");
//title.textContent = showTitle;
//container.appendChild(title);
//console.log(showTitle);

//let network = item.show.network && item.show.network.name;
//let airsOn = document.createElement("p");
//airsOn.textContent = network;
//container.appendChild(airsOn);
//console.log(network);

//let imageUrl = item.show.image;
//let picture = document.createElement("img");
//picture.src = imageUrl;
//container.appendChild(picture);
//console.log(imageUrl);

//let summary = item.show.summary;
//let wrapUp = document.createElement("p");
//wrapUp.textContent = summary;
//container.appendChild(wrapUp);
//console.log(summary);
// }
//}

//puts API info on the page
function showData() {
  //gets HTML for each card
  let cardsHTML = "";

  //for of loop that repeats the array items assigning the elements to 'item'
  for (let item of dataFromApi) {
    let showTitle = item.show.name;
    //uses a conditional operator in case theres no info (MDN and GeeksforGeeks)
    let network = item.show.network ? item.show.network.name : "N/A";
    let imageUrl = item.show.image ? item.show.image.medium : "N/A";
    let summary = item.show.summary ? item.show.summary : "N/A";

    //puts card together using template literals with conditional operators (GeeksforGeeks)
    let cardHTML = `
      <div class="show-card">
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${showTitle}" class="show-image">`
            : ""
        }
        <div class="show-details">
          <h2 class="show-title">${showTitle}</h2>
          ${network ? `<p class="show-network">Network: ${network}</p>` : ""}
          <div class="show-summary">${summary}</div>
        </div>
      </div>
    `;
    //appends the data (MDN)
    cardsHTML += cardHTML;
  }
  //replaces the data
  container.innerHTML = cardsHTML;
}

//method looking for element
let form = document.getElementById("showForm");

//watches for submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //assigns it to the variable
  const select = document.getElementById("option");
  //gets the text
  const selectedShow = select.options[select.selectedIndex].text;

  //stops the data from displaying if nothing is chosen
  if (select.value !== "0") {
    //converts to lower case so correct show is chosen (W3 Schools)
    showName = selectedShow.toLowerCase();
    //calls and displays
    getApiData();
  }
});

//worked with Cassy on the beginning of this. Used MDN, GeeksforGeeks, Youtube and old codepins/VS Codes.
