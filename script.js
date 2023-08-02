let searchData = [];

for (let i = 0; i <= 50; i++) {
  fetch("https://api.coincap.io/v2/assets")
    .then((data) => {
      return data.json();
    })
    .then(function (data) {
      if (data.data[i].id) {
        searchData.push(data.data[i].id);
        // console.log(data.data[i].id);
        // console.log(searchData);
      }
    });
}

console.log(searchData);

let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResults");

searchBox.addEventListener("keyup", (e) => {
  searchResult.style.display = "block";
  removeElements();
  for (let i of searchData) {
    if (
      i.toLowerCase().startsWith(searchBox.value.toLowerCase()) &&
      searchBox.value != ""
    ) {
      let listItem = document.createElement("li");

      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "link('" + i + "')");

      let word = "<b>" + i.substr(0, searchBox.value.length) + "</b>";
      word += i.substr(searchBox.value.length);

      listItem.innerHTML = word;
      console.log("word" + word);
      document.getElementById("list").appendChild(listItem);
    }
  }
});

function link(value) {
  window.open("https://www.google.com/search?q=" + value, "_blank");
}

function removeElements() {
  let items = document.querySelectorAll(".list-items");
  items.forEach((item) => {
    item.remove();
  });
  if (searchBox.value.length < 1) {
    searchResult.style.display = "none";
  }
}

