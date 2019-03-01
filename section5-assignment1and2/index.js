'use strict';

let STORE = {
  picArray: [],
  appIsReady: false,
};

// Take breed input
// Is breed valid? Get list of all breeds at app start?
//

function getDogImage(numPic) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numPic}`)
    .then(response => response.json())
    // .then(responseJson => 
    //   displayResults(responseJson))
    .then(responseJson => 
      makeArray(responseJson))
    .then(displayResults)
    .catch(error => alert('Something went wrong. Try again later.'));
}

function htmlTemplate() {
  let temp = [];
  for (let i = 0; i < STORE.picArray.length; i++) {
    temp.push(`<img src="${STORE.picArray[i]}" class="results-img">`)
  }
  return temp.join('');
}

function displayResults() {
  //console.log(responseJson);
  //replace the existing image with the new one
  $('.results-img').replaceWith(htmlTemplate());
  //display the results section
  $('.results').removeClass('hidden');
}

function makeArray(responseJson) {// convert response to array
  STORE.picArray = responseJson.message;
  console.log(STORE.picArray);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    if($('.js-num-pic').val() > 50) {
      alert('please choose between 1-50');
      return;
    }
    getDogImage($('.js-num-pic').val());
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});