'use strict';

let STORE = {
  pic: [],
  breeds: [],
  appIsReady: false,
};

// Take breed input
// Is breed valid? Get list of all breeds at app start?
//

function getDogBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    // .then(responseJson => 
    //   displayResults(responseJson))
    .then(responseJson => makeBreeds(responseJson))
    .then(STORE.appIsReady = true)
    .catch(error => alert('Something went wrong in getDogBreeds. Try again later.'));
}

function getDogImage(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(myjson => displayResults(myjson))
    .catch(error => alert('Breed does not exist!'));
}


function displayResults(myjson) {
  if(myjson.status !== 'success') {
    throw new Error('');
  }
  let temp = `<img src="${myjson.message}" class="results-img">`;
  $('.results-img').replaceWith(temp);
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

// 

$(function() {
  getDogBreeds();
  console.log('App loaded! Waiting for submit!');
  watchForm();
});