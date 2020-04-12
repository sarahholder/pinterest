import utils from '../../helpers/utils';
// import pinsData from '../../helpers/data/pinsData';

const showPinModal = () => {
  let domString = '';
  domString += `
      <div class="modal-content text-left">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Pin</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
        <label for="edit-pin-title">Board Name:</label>
        <input type="text" class="form-control" id="edit-pin-board-name" placeholder="Edit board name here" value="pin.boardId">
      </div>
      <div class="form-group">
        <label for="edit-pin-name">Pin Name:</label>
        <input type="text" class="form-control" id="edit-pin-name" placeholder="add pin name here" value="pin.name">
      </div>
      <div class="form-group">
        <label for="edit-pin-img">Pin Image:</label>
        <input type="text" class="form-control" id="edit-pin-img" placeholder="edit pin image link here" value="pin.imageUr">
      </div>
      </div>
      <div id="shit" class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button id="save-pin-edit" type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
      </div>
    </div>`;
  utils.printToDom('printPinModal', domString);
};

export default { showPinModal };
