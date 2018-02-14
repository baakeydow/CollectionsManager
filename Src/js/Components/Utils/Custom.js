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

module.exports = {
    checkAvailability : checkAvailability,
    asyncForEach : asyncForEach,
    truncateText : truncateText
};
