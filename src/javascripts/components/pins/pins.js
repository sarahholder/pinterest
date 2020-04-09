import pins from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const closePinsView = () => {
  $('#boards').removeClass('hide');
  $('#navHeadingPins').addClass('hide');
  $('#navHeadingBoards').removeClass('hide');
  $('#pins').addClass('hide');
};

const deletePinEvent = (e) => {
  const selectedPin = e.target.closest('.card').id;
  const selectedBoardId = e.target.closest('.board-id').id;
  pins.deletePin(selectedPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(selectedBoardId);
    })
    .catch((err) => console.error('cannot delete pin', err));
};

const printPins = (boardId) => {
  pins.getPinsByBoardId(boardId)
    .then((response) => {
      const selectedPins = response;
      let domString = '';
      domString += '<i class="m-3 goBack far fa-arrow-alt-circle-left fa-2x"></i>';
      domString += '<div class="card-columns justify-content-center ml-5 mr-5">';
      selectedPins.forEach((selectedPin) => {
        domString += `<div id="${selectedPin.id}" class="card">`;
        domString += `  <img src="${selectedPin.imageUrl}" class="card-img-bottom alt="...">`;
        domString += '<div class="card-body">';
        domString += '  <div class="row">';
        domString += `    <p class="col-9 p-0 m-0 card-description">${selectedPin.name}</p>`;
        domString += '    <div class= "col-3 p-0 m-0">';
        domString += `      <button id="${selectedPin.boardId}" class="board-id delete-btn"><i class="delete-pin far fa-trash-alt"></i></button>`;
        domString += '    </div>';
        domString += '  </div>';
        domString += '</div>';
        domString += '</div>';
      });
      utils.printToDom('pins', domString);
      $('body').on('click', '.goBack', closePinsView);
      $('body').on('click', '.delete-pin', deletePinEvent);
    })
    .catch((err) => console.error('Problem with printPins', err));
};

export default { printPins, closePinsView };
