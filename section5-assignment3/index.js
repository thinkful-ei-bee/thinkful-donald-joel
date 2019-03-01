'use strict';

let STORE = {
  picArray: [],
  breeds: [],
  appIsReady: false,
};

// Take breed input
// Is breed valid? Get list of all breeds at app start?
//

function getDogBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    // .then(responseJson => 
    //   displayResults(responseJson))
    .then(responseJson => makeBreeds(responseJson))
    .then(STORE.appIsReady = true)
    .catch(error => alert('Something went wrong. Try again later.'));
}

function getDogImage(numPic) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numPic}`)
    .then(response => response.json())
    // .then(responseJson => 
    //   displayResults(responseJson))
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

function makeBreeds(responseJson) {
  STORE.breeds = responseJson.message;
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    if(!STORE.appIsReady) {
      alert('Please wait for the app to finish background tasks');
      return;
    }
    getDogImage($('.js-breed-pic').val());
  });
}

$(function() {
  getDogBreeds();
  console.log('App loaded! Waiting for submit!');
  //watchForm();
});