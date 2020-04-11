const buildBoards = (board) => {
  let domString = '';
  domString += `<div id="${board.id}" class="card">`;
  domString += '  <div class="card-body">';
  domString += `    <h5 class="card-title">${board.name}</h5>`;
  domString += `    <p class="card-text">${board.description}</p>`;
  domString += '  </div>';
  domString += `  <img src="${board.img}" class="card-img-bottom" alt="...">`;
  domString += '     <div class="card-footer">';
  domString += '        <button class="show-pins"><i class="fas fa-eye"></i></button>';
  domString += '        <button type="button" id="edit-a-board" data-toggle="modal" data-target="#exampleModal" class="btn-warning"><i class="fas fa-edit"></i></button>';
  domString += '        <button class="delete-btn"><i class="far fa-trash-alt"></i></button>';
  domString += '     </div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
