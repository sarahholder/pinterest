import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const closePinsView = () => {
  $('#boards').removeClass('hide');
  $('#navHeadingPins').addClass('hide');
  $('#navHeadingBoards').removeClass('hide');
  $('#pins').addClass('hide');
};

$('body').on('click', '.goBack', closePinsView);

const printPins = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((response) => {
      const selectedPins = response;
      let domString = '';
      domString += '<i class="m-3 goBack far fa-arrow-alt-circle-left fa-2x"></i>';
      domString += '<div class="card-columns justify-content-center ml-5 mr-5">';
      selectedPins.forEach((selectedPin) => {
        domString += `<div id="${selectedPin.id}" class="card">`;
        domString += `  <img src="${selectedPin.imageUrl}" class="card-img-bottom alt="...">`;
        domString += `  <p class="card-description pt-3">${selectedPin.name}</p>`;
        domString += '</div>';
      });
      utils.printToDom('pins', domString);
    })
    .catch((err) => console.error('Problem with printPins', err));
};

export default { printPins, closePinsView };
