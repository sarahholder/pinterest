import pins from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import showPinModal from '../editPins/editPins';
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

const makeAPin = (e) => {
  const selectedBoardId = e.target.closest('.form').id;
  e.preventDefault();
  const newPin = {
    boardId: selectedBoardId,
    name: $('#add-pin-title').val(),
    imageUrl: $('#add-pin-img').val(),
  };
  pins.addPin(newPin)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      printPins(selectedBoardId);
    })
    .catch((err) => console.error('could not add pin', err));
};

const showPinModalEvent = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.card').id;
  console.error('this is the card', boardId);
  showPinModal.showPinModal();
};

const printPins = (boardId) => {
  pins.getPinsByBoardId(boardId)
    .then((response) => {
      const selectedPins = response;
      let domString = '';
      domString += `
      <i id="floater" class="m-3 goBack far fa-arrow-alt-circle-left float-left fa-2x"></i>
      <div class="accordion" id="accordionExample">
        <h2 class="mb-0">
          <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <i class="fas fa-plus-circle"></i> add Pin</button>
        </h2>
      </div>
      <div class="form m-2" id="${boardId}">
        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class= "text-left row d-flex flex-wrap justify-content-center">
            <div class="form-group col-md-4">
              <label for="add-pin-title">Pin Title:</label>
              <input type="text" class="form-control" id="add-pin-title" placeholder="add pin name here">
            </div>
            <div class="form-group col-md-4">
              <label for="add-pin-img">Pin Image:</label>
              <input type="text" class="form-control" id="add-pin-img" placeholder="add pin image link here">
            </div>
          </div>
          <button id="addPin" type="submit" class="btn btn-danger">Submit</button>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div id="printPinModal" class="modal-dialog" role="document" appendTo="body">
        </div>
      </div>
      `;
      domString += '<div class="card-columns justify-content-center ml-5 mr-5">';
      selectedPins.forEach((selectedPin) => {
        domString += `<div id="${selectedPin.id}" class="card">`;
        domString += `  <img src="${selectedPin.imageUrl}" class="card-img-bottom alt="...">`;
        domString += '  <div class="card-body m-0 p-0">';
        domString += '      <div class="card-footer justify-content-center d-flex flex-row">';
        domString += `        <p class="card-description">${selectedPin.name}</>`;
        domString += '        <button type="button" id="edit-a-pin" data-toggle="modal" data-target="#exampleModal" class="btn-warning"><i class="fas fa-edit"></i></button>';
        domString += `        <button id="${selectedPin.boardId}" class="board-id delete-btn"><i class="delete-pin far fa-trash-alt"></i></button>`;
        domString += '      </div>';
        domString += '    </div>';
        domString += '</div>';
      });
      utils.printToDom('pins', domString);
      $('body').on('click', '.goBack', closePinsView);
      $('body').on('click', '.delete-pin', deletePinEvent);
      $('body').on('click', '#addPin', makeAPin);
      $('body').on('click', '#edit-a-pin', showPinModalEvent);
    })
    .catch((err) => console.error('Problem with printPins', err));
};
// <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div id="printPinModal" class="modal-dialog" role="document" appendTo="body">
// </div>
export default { printPins, closePinsView };
