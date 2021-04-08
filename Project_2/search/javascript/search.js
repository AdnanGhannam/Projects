const createCard = (_imgUrl, _title, hasInfo = false, infoCount = 0, key = [], val = []) => {
  const content = document.querySelector("main .content .results-box");

  const /* Elements */
    card = document.createElement("div"),
    imgBox = document.createElement("div"),
    img = document.createElement("img"),
    cardTitleBox = document.createElement("div"),
    cardTitle = document.createElement("h3"),
    infoButton = document.createElement("div"),
    infoIcon = document.createElement("span"),
    infoBox = document.createElement("div");

  /* Add Classes */
  card.classList.add("card");
  imgBox.classList.add("img-box");
  img.classList.add("card__img");
  cardTitleBox.classList.add("card__title-box");
  cardTitle.classList.add("card__title");
  infoButton.classList.add("info-button");
  infoIcon.classList.add("fas", "fa-info");
  infoBox.classList.add("info-box");

  /* Add Attributes */
  img.setAttribute("src", _imgUrl);
  cardTitle.textContent = _title;

  /* Append Childs */
  cardTitleBox.appendChild(cardTitle);

  imgBox.appendChild(img);

  infoButton.appendChild(infoIcon);

  if(hasInfo) {
    for(let i = 0; i < infoCount; i++) {
      const p = document.createElement("p"),
            strong = document.createElement("strong");

      strong.textContent = key[i];
      p.appendChild(strong);
      p.textContent += `: ${val[i]}`;

      infoBox.appendChild(p);
    }
  }

  card.appendChild(imgBox);
  card.appendChild(cardTitleBox);
  card.appendChild(infoButton);
  card.appendChild(infoBox);

  content.appendChild(card);
}

const isNull = (p) => {
  return (p == "" || p == null);
}

// &apiKey=8f1e74b58b4a45bd8765fafb9337a781

window.addEventListener("load", () => {
  const query = sessionStorage.getItem("query");
  const searchType = sessionStorage.getItem("searchType");
  let url;
  const param = [
    (!isNull(sessionStorage.getItem("maxCarbs"))) ? `&maxCarbs=${sessionStorage.getItem("maxCarbs")}` : "",
    (!isNull(sessionStorage.getItem("maxProtein"))) ? `&maxProtein=${sessionStorage.getItem("maxProtein")}` : "",
    (!isNull(sessionStorage.getItem("maxCalories"))) ? `&maxCalories=${sessionStorage.getItem("maxCalories")}` : "",
    (!isNull(sessionStorage.getItem("maxFat"))) ? `&maxFat=${sessionStorage.getItem("maxFat")}` : "",
    (!isNull(sessionStorage.getItem("maxIron"))) ? `&maxIron=${sessionStorage.getItem("maxIron")}` : "",
    (!isNull(sessionStorage.getItem("maxMagnesium"))) ? `&maxMagnesium=${sessionStorage.getItem("maxMagnesium")}` : ""
  ];

  let str = "";
    for(p in param) {
    str += param[p];
  }

  if(searchType.toLowerCase() === "recipes") url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}${str}&number=10&apiKey=8f1e74b58b4a45bd8765fafb9337a781`;
  else url = `https://api.spoonacular.com/food/${searchType}/search?query=${query}&number=10&apiKey=8f1e74b58b4a45bd8765fafb9337a781`;
  console.log(url);
  const res = get(url);
  switch(searchType.toLowerCase()) {
    case "recipes":
      res.then(data => {
        for(let i = 0; i < data.results.length; i++) {
          // , true, 4, ["calories", "carbs", "fat", "protein"], [data.results[i].calories, data.results[i].carbs, data.results[i].fat, data.results[i].protein]
          createCard(data.results[i].image, data.results[i].title);
        }
      });
      break;
    case "ingredients":
      res.then(data => {
        for(let i = 0; i < data.results.length; i++) {
          createCard(data.results[i].image, data.results[i].title);
        }
      });
      break;
    case "products":
      res.then(data => {
        for(let i = 0; i < data.results.length; i++) {
          createCard(data.results[i].image, data.results[i].title);
        }
      });
      break;
    case "menuitems":
      res.then(data => {
        console.log(data);
        for(let i = 0; i < data.menuItems.length; i++) {
          createCard(data.menuItems[i].image, data.menuItems[i].title, true, 1, ["restaurantChain"], [data.menuItems[i].restaurantChain]);
        }
      });
      break;
  }
});

// Recipes           https://api.spoonacular.com/recipes/complexSearch?query=pasta        false
// Ingredients       https://api.spoonacular.com/food/ingredients/search?query=banana     false
// Grocery Products  https://api.spoonacular.com/food/products/search?query=pizza         false
// Menu Items        https://api.spoonacular.com/food/menuItems/search?query=burger       true    1

const selectList = document.querySelectorAll(".select-list");

let cuisine,
    diet,
    excludeIngredients;

selectList.forEach((el, i) => {
  el.addEventListener("click", function(e) {
    this.querySelector(".list").classList.toggle("visible");
    if(e.target.tagName.toLowerCase() === "li") {
      if(i === 0) cuisine = e.target.textContent;
      else if(i === 1) diet = e.target.textContent;
      else if(i === 2) excludeIngredients = e.target.textContent;
      el.querySelector(".text").textContent = e.target.textContent;
    }
  });
});

const inputBoxes = document.querySelectorAll(".number-box");

inputBoxes.forEach(el => {
  const input = el.querySelector(".number");
  input.addEventListener("keydown", e => {
    if(!((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8)) {
      e.preventDefault();
    }
  });

  const upButton = el.querySelector(".arrow-1"),
        downButton = el.querySelector(".arrow-2");

  upButton.addEventListener("click", () => input.value = Number(input.value) + 10);
  downButton.addEventListener("click", () => input.value = (Number(input.value) - 10 >= 0) ? Number(input.value) - 10 : 0);
});

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", () => {
  sessionStorage.setItem("query", document.querySelector("#query").value);
  sessionStorage.setItem("cuisine", cuisine);
  sessionStorage.setItem("diet", diet);
  sessionStorage.setItem("maxCarbs", document.querySelector("#max-carbs").value);
  sessionStorage.setItem("maxProtein", document.querySelector("#max-protein").value);
  sessionStorage.setItem("maxCalories", document.querySelector("#max-calories").value);
  sessionStorage.setItem("maxFat", document.querySelector("#max-fat").value);
  sessionStorage.setItem("maxIron", document.querySelector("#max-iron").value);
  sessionStorage.setItem("maxMagnesium", document.querySelector("#max-magnesium").value);
});


















///
