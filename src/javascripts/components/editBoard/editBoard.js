import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';

const showModal = (boardId) => {
  boardData.getSingleBoard(boardId)
    .then((response) => {
      const board = response.data;
      let domString = '';
      domString += `
      <div class="modal-content text-left">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit ${board.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
        <label for="add-board-title">Board Name:</label>
        <input type="text" class="form-control" id="edit-board-name" placeholder="add board name here" value="${board.name}">
      </div>
      <div class="form-group">
        <label for="add-board-desc">Board Description:</label>
        <input type="text" class="form-control" id="edit-board-desc" placeholder="add board description here" value="${board.description}">
      </div>
      <div class="form-group">
        <label for="add-board-img">Board Image:</label>
        <input type="text" class="form-control" id="edit-board-img" placeholder="add board image link here" value="${board.img}">
      </div>
      </div>
      <div id=${boardId} class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button id="save-board-edit" type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
      </div>
    </div>`;
      utils.printToDom('printModal', domString);
    })
    .catch((err) => console.error('cant return modal content', err));
};

export default { showModal };
