import utils from '../../helpers/utils';
import pins from '../../helpers/data/pins';

const viewBoardPins = (pins) => {
  let domString = '';
  domString += '<h2 class="m-1"></h2>';
  domString += '<div class="card-columns">';
  domString += `<div id="${pins.id}" class="card">`;
  // eslint-disable-next-line max-len
  domString += `<img src="${pins.img}" class="card-img-top" alt="image of ${pins.name}">`;
  domString += '<div class="card-body">';
  domString += `<h5 class="card-title">${pins.name}</h5>`;
  domString += '</div>';
  domString += '</div>';
  utils.printToDom('pins', domString);
};

export default { viewBoardPins };
