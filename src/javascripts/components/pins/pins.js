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
      domString += `
      <i id="floater" class="m-3 goBack far fa-arrow-alt-circle-left float-left fa-2x"></i>
      <div class="accordion" id="accordionExample">
        <h2 class="mb-0">
          <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <i class="fas fa-plus-circle"></i> add Pin</button>
        </h2>
      </div>
      <div class="form m-2">
        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class= "text-left row d-flex flex-wrap justify-content-center">
            <div class="form-group col-md-4">
              <label class="" for="add-pin-title">Pin Title:</label>
              <input type="text" class="form-control" id="add-pin-title" placeholder="add pin title here">
            </div>
            <div class="form-group col-md-4">
              <label for="add-pin-img">Pin Image:</label>
              <input type="text" class="form-control" id="add-pin-img" placeholder="add pin image link here">
            </div>
          </div>
          <button type="submit" class="btn btn-danger">Submit</button>
        </div>
      </div>`;
      domString += '<div class="card-columns justify-content-center ml-5 mr-5">';
      selectedPins.forEach((selectedPin) => {
        domString += `<div id="${selectedPin.id}" class="card">`;
        domString += `  <img src="${selectedPin.imageUrl}" class="card-img-bottom alt="...">`;
        domString += '<div class="card-body">';
        domString += '  <div class="row ">';
        domString += `    <p class="col-10 p-0 m-0 card-description">${selectedPin.name}</p>`;
        domString += '    <div class= "col-2 p-0 m-0">';
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
