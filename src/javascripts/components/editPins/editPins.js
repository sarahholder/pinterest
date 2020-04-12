import utils from '../../helpers/utils';
import pinsData from '../../helpers/data/pinsData';

const showPinModal = (pinId) => {
  pinsData.getSinglePin(pinId)
    .then((response) => {
      const pin = response.data;
      let domString = '';
      domString += `
          <div class="modal-content text-left">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">Edit ${pin.name} Pin: </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          <div id="${pin.boardId} class="modal-body">
            <div class="form-group">
              <label for="edit-pin-board-name">Edit Board Name:</label>
              <input type="text" class="form-control pin-id" id="edit-pin-board-id" placeholder="Edit board id here" value="${pin.boardId}">
            </div>
            <div class="form-group">
              <label for="edit-pin-name">Pin Name:</label>
              <input type="text" class="form-control" id="edit-pin-name" placeholder="add pin name here" value="${pin.name}">
            </div>
            <div class="form-group">
              <label for="edit-pin-img">Pin Image:</label>
              <input type="text" class="form-control" id="edit-pin-img" placeholder="edit pin image link here" value="${pin.imageUrl}>
            </div>
            <div id="${pin.id}" class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button id="save-pin-edit" type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
            </div>
          </div>`;
      utils.printToDom('printPinModal', domString);
    })
    .catch((err) => console.error('cant show pin modal content', err));
};

export default { showPinModal };
