import utils from '../../helpers/utils';
import pinData from '../../helpers/data/pinsData';

const showPinModal = (pinId) => {
  pinData.getSinglePin(pinId)
    .then((response) => {
      const wholePin = response.data;
      let domString = '';
      domString += `
            <div class="modal-content text-left modal2">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel2">Edit ${wholePin.name} Pin: </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="m-2">
                <div id="${pinId}" class="modal-body">
                  <div class="form-group">
                    <label for="edit-pin-board-id">Edit Board Name:</label>
                    <input type="text" class="form-control" id="edit-pin-board-id" placeholder="Edit board id here" value="${wholePin.boardId}">
                  </div>
                  <div class="form-group">
                    <label for="edit-pin-name">Pin Name:</label>
                    <input type="text" class="form-control" id="edit-pin-name" placeholder="add pin name here" value="${wholePin.name}">
                  </div>
                  <div class="form-group">
                    <label for="edit-pin-img">Pin Image:</label>
                    <input type="text" class="form-control" id="edit-pin-img" placeholder="edit pin image link here" value="${wholePin.imageUrl}">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button id="save-pin-edit" type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
                  </div>
                </div>
            </div>`;
      utils.printToDom('printPinModal', domString);
    })
    .catch((err) => console.error('Cannot edit pins', err));
};

export default { showPinModal };
