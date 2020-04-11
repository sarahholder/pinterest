const buildBoards = (board) => {
  let domString = '';
  domString += `<div id="${board.id}" class="card">`;
  domString += '  <div class="card-body">';
  domString += `    <h5 class="card-title">${board.name}</h5>`;
  domString += `    <p class="card-text">${board.description}</p>`;
  domString += '  </div>';
  domString += `  <img src="${board.img}" class="card-img-bottom" alt="...">`;
  domString += '     <div class="card-footer">';
  domString += '        <button class="show-pins mr-5 offset-2 col-5"><i class="fas fa-eye"></i> View Pins</button>';
  domString += '        <button class="delete-btn float-right mr-2"><i class="far fa-trash-alt"></i></button>';
  domString += '     </div>';
  domString += '</div>';
  return domString;
};

export default { buildBoards };
