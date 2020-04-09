const buildBoards = (board) => {
  let domString = '';
  domString += `<div id="${board.id}" class="card">`;
  domString += '  <div class="card-body">';
  domString += `    <h5 class="card-title">${board.name}</h5>`;
  domString += `    <p class="card-text">${board.description}</p>`;
  domString += '  </div>';
  domString += `  <img src="${board.img}" class="card-img-bottom" alt="...">`;
  domString += '     <div class="card-footer">';
  domString += '        <button class="show-pins col-5"><i class="far fa-eye"></i></button>';
  domString += '        <button id="hello" class="delete-btn col-5"><i class="far fa-trash-alt"></i></button>';
  domString += '     </div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
