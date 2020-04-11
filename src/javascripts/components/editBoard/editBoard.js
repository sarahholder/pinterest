import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
// import boardData from '../../helpers/data/boardData';

const showModal = (boardId) => {
  boardData.getSingleBoard(boardId)
    .then((response) => {
      const board = response.data;
      let domString = '';
      domString += `
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit ${board.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group>
        <label for="add-board-title">Board Title:</label>
        <input type="text" class="form-control" id="edit-board-title" placeholder="add board title here">
      </div>
      <div class="form-group">
        <label for="add-board-desc">Board Description:</label>
        <input type="text" class="form-control" id="edit-board-desc" placeholder="add board description here">
      </div>
      <div class="form-group">
        <label for="add-board-img">Board Image:</label>
        <input type="text" class="form-control" id="edit-board-img" placeholder="add board image link here">
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-secondary">Save changes</button>
      </div>
    </div>`;
      utils.printToDom('printModal', domString);
    })
    .catch((err) => console.error('cant show modal', err));
};

export default { showModal };
