import axios from "axios";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function checkAvailability(url) {
  if (!url) {
    return false;
  }
  const response = await axios({
    method: 'get',
    url: url
  });
  return response.status !== 404;
}

function truncateText(str, length, ending) {
  if (!str) return '';
  length = length ? length : 100;
  ending = ending ? ending : '...';
  return (str.length > length) ?
    str.substring(0, length - ending.length).trim() + ending
    :
    str;
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = {
  checkAvailability: checkAvailability,
  asyncForEach: asyncForEach,
  truncateText: truncateText,
  shuffle: shuffle
};
