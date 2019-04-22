"use-strict";

let STORE = {
  picArray: []
};

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    if ($(".js-num-pic").val() > 50) {
      return alert("please choose between 1-50");
    }
    getDogImage($(".js-num-pic").val());
    $(".js-num-pic").val("");
  });
}

function getDogImage(numPic) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numPic}`)
    .then(response => response.json())
    .then(responseJson => (STORE.picArray = responseJson.message))
    .then(displayResults)
    .catch(error => alert("Something went wrong. Try again later."));
}

function displayResults() {
  $(".results-img").html(htmlTemplate());
  $(".results").removeClass("hidden");
}

function htmlTemplate() {
  let temp = [];
  for (let i = 0; i < STORE.picArray.length; i++) {
    temp.push(`<img src="${STORE.picArray[i]}" class="results-img">`);
  }
  console.log(temp);
  return temp.join("");
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});
