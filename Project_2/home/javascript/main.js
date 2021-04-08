

// 654959
// 654812
// 715538

/* Requests */

// Salad Section Request
const saladData = get("https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=6&apiKey=8f1e74b58b4a45bd8765fafb9337a781");
saladData.then((data) => {
  for(let i = 0; i < data.results.length; i++) {
    createSaladCard(data.results[i].image, data.results[i].id, data.results[i].title);
  }
});

// Videos Section Request
const videosData = get("https://api.spoonacular.com/food/videos/search?query=pasta&number=8&apiKey=8f1e74b58b4a45bd8765fafb9337a781");
videosData.then((data) => {
  for(let i = 0; i < data.videos.length; i++) {
    createVideoBox(data.videos[i].length, data.videos[i].rating, data.videos[i].views, data.videos[i].shortTitle, data.videos[i].thumbnail, data.videos[i].youTubeId);
  }
});

Random Joke Request
const jokeData = get("https://api.spoonacular.com/food/trivia/random&apiKey=8f1e74b58b4a45bd8765fafb9337a781");
jokeData.then((data) => {
  createRandomJoke(data.text);
}).catch(error => console.log(error));





createSaladCard("./images/home-pizza.jpg", "#", "title");
createVideoBox("100", "0.9234127", "10000", "Any Text Here...", "./images/home-pizza.jpg", "www.google.com");
createRandomJoke("title", "Some Text");

/* Salad Section */
function createSaladCard(_imgUrl, _url, _title) {
  const content = document.querySelector("#salad-section .content");

  const /* Elements */
    contentItem = document.createElement("div"),
    imgBox = document.createElement("div"),
    img = document.createElement("img"),
    mask = document.createElement("div"),
    link1 = document.createElement("a"),
    icon = document.createElement("span"),
    link2 = document.createElement("a"),
    itemTitle = document.createElement("h3");

  /* Text Content */
  link1.textContent = "Show More";
  itemTitle.textContent = _title;

  /* Add Classes */
  contentItem.classList.add("content__item");
  imgBox.classList.add("img-box");
  mask.classList.add("mask");
  link1.classList.add("link");
  icon.classList.add("fas", "fa-angle-right");
  link2.classList.add("link");
  itemTitle.classList.add("item-title");

  /* Add Attributes */
  img.setAttribute("src", _imgUrl);
  link1.setAttribute("href", _url);
  link2.setAttribute("href", _url);

  /* Append Childrens */
  link1.appendChild(icon);
  link2.appendChild(itemTitle);

  imgBox.appendChild(img);
  imgBox.appendChild(mask);
  imgBox.appendChild(link1);

  contentItem.appendChild(imgBox);
  contentItem.appendChild(link2);

  content.appendChild(contentItem);
}



/* Videos Section */
function createVideoBox(_length, _rate, _viewers, _cardTitle, _imgSrc, _link) {
  const content = document.querySelector("#videos-section .cards-box");
  const /* Elements */
    card = document.createElement("div"),
    cardImgBox = document.createElement("div"),
    vidImg = document.createElement("img"),
    vidLength = document.createElement("span"),
    loveBtn = document.createElement("span"),
    rateBox = document.createElement("div"),
    rate = document.createElement("span")
    viewers = document.createElement("span"),
    cardTitle = document.createElement("h3"),
    cardLinkBox = document.createElement("div"),
    link = document.createElement("a"),
    copyButton = document.createElement("span"),
    copyIcon = document.createElement("span");

  const /* Text Nodes */
    vidLengthText = document.createTextNode(_length),
    rateText = document.createTextNode(`${(_rate / 2) * 10}`.substring(0, 4)),
    viewersText = document.createTextNode(` ( ${_viewers} Viewers )`),
    cardTitleText = document.createTextNode(_cardTitle);

  link.textContent = "Go To YouTube";

  /* Append Text Nodes */
  vidLength.appendChild(vidLengthText);
  rate.appendChild(rateText);
  viewers.appendChild(viewersText);
  cardTitle.appendChild(cardTitleText);

  /* Add Classes */
  card.classList.add("card");
  cardImgBox.classList.add("mask-box", "card__img-box");
  vidImg.classList.add("vid-img");
  vidLength.classList.add("vid-length");
  loveBtn.classList.add("love-btn", "fas", "fa-heart");
  rateBox.classList.add("rate-box");
  rate.classList.add("rate");
  viewers.classList.add("viewers");
  cardTitle.classList.add("card__title");
  cardLinkBox.classList.add("card__link-box");
  link.classList.add("link");
  copyButton.classList.add("copy-btn");
  copyIcon.classList.add("icon", "fas" ,"fa-clipboard");

  /* Add Attributes */
  const fullLink = `http://youtube.com/watch?v=${_link}`;
  vidImg.setAttribute("src", _imgSrc);
  link.setAttribute("href", fullLink);
  link.setAttribute("data-url", fullLink);

  /* Append Element Child */
  rateBox.appendChild(rate);
  rateBox.appendChild(viewers);

  cardImgBox.appendChild(vidImg);
  cardImgBox.appendChild(vidLength);
  cardImgBox.appendChild(loveBtn);
  cardImgBox.appendChild(rateBox);

  copyButton.appendChild(copyIcon);

  cardLinkBox.appendChild(link);
  cardLinkBox.appendChild(copyButton);

  card.appendChild(cardImgBox);
  card.appendChild(cardTitle);
  card.appendChild(cardLinkBox);

  content.appendChild(card);

  copyButton.addEventListener('click', function() {
    console.log(this, link);
    CopyToClipboard(this.previousElementSibling, "url");
  });
}

/* Copy Button Event */
function CopyToClipboard(element, dataSetName) {
  const data = element.getAttribute(`data-${dataSetName}`);
  const input = document.createElement("input");
  input.value = data;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

/* Random Joke */
function createRandomJoke(_joke) {
  const randomJokeContainer = document.querySelector("#random-joke .container");

  const /* Elements */
    joke = document.createElement("p");

  joke.textContent = _joke;
  joke.setAttribute("id", "joke");

  randomJokeContainer.appendChild(joke);
}











const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sessionStorage.setItem("query", document.querySelector("#food-name").value);
  sessionStorage.setItem("searchType", document.querySelector("#search-list .list__item--active").dataset.type);
  window.open("../../search/search.html");
});




























/* Nav Bar Sticky */
const navBar = document.querySelector("#nav-bar");
let navBarSticky = false;

/* Analyzed Section */
const
  analyzedSection = document.querySelector("#analyzed-section"),
  analyzedSectionCards = analyzedSection.querySelectorAll(".card");
let analyzedSectionCardsReached = false;





/* Header */
// Search List Item
const searchListItem = document.querySelectorAll("#search-list .list__item");
searchListItem[0].parentElement.addEventListener('click', (e) => {
  if(e.target.classList.contains("list__item") && !e.target.classList.contains("list__item--active")) {
    searchListItem.forEach(el => {
      el.classList.remove("list__item--active");
    });
    e.target.classList.add("list__item--active");
  }
});




/* Videos Section Navigation */

let videosBoxLeft = 0,
    videosBoxReached = false,
    cardWidth,
    cardMargin,
    visibleCards,
    finalTransform;

const
  videosBox = document.querySelector("#videos-section .cards-box"),
  nextButton = document.querySelector("#videos-section #right-btn"),
  prevButton = document.querySelector("#videos-section #left-btn");

prevButton.addEventListener("click", () => {
  navButtonClicked();
  prev();
});

nextButton.addEventListener("click", () => {
  navButtonClicked();
  next();
});

function navButtonClicked() {
  cardWidth = videosBox.children[0].offsetWidth;
  visibleCards = Math.floor(videosBox.offsetWidth / cardWidth);
  finalTransform = ((videosBox.children.length - visibleCards) * cardWidth) + (cardMargin * (videosBox.children.length - visibleCards));
  console.log(finalTransform);
}

function prev() {
  if(videosBoxLeft > 0) {
    videosBoxLeft--;
    moveVideosBox()
  } else {
    videosBox.style.animation = "firstVideo .5s alternate ease";
    videosBox.addEventListener("animationend", function() {
      this.style.animation = "";
    });
  }
}

function next() {
  if(videosBoxLeft < videosBox.children.length - visibleCards) {
    videosBoxLeft++;
    moveVideosBox();
  } else {
    videosBox.style.animation = "lastVideo .5s alternate ease";
    videosBox.addEventListener("animationend", function() {
      this.style.animation = "";
    });
  }
}

function moveVideosBox() {
  const styles = window.getComputedStyle(videosBox.children[0]);
  cardMargin = Number(styles["margin-left"].substring(0, styles["margin-left"].length - 2)) + Number(styles["margin-right"].substring(0, styles["margin-right"].length - 2));
  videosBox.style.transform = `translateX(-${(videosBoxLeft * cardWidth) + (cardMargin * videosBoxLeft)}px)`;
}


/* Window On Scroll */
window.addEventListener("scroll", () => {

  // Nav Bar
  if(pageYOffset >= 300 && !navBarSticky) {
    navBarSticky = true;
    navBar.classList.add("sticky");
  }
  if(pageYOffset < 300 && navBarSticky) {
    navBarSticky = false;
    navBar.classList.remove("sticky");
  }

  // Analyzed Section
  if((pageYOffset + (innerHeight / 3) >= analyzedSection.offsetTop) && !analyzedSectionCardsReached) {
    analyzedSectionCards.forEach(el => {
      analyzedSectionCardsReached = true;
      el.classList.add("reached");
    });
  }

  // Videos Section
  if((pageYOffset + (innerHeight / 1.5) >= videosBox.offsetTop) && !videosBoxReached) {
    videosBoxReached = true;
    videosBox.classList.add("reached");
  }
});
