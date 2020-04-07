const buildBoards = (board) => {
  let domString = '';
  domString += `<div id="${board.id}" class="card board">`;
  domString += '  <div class="card-body">';
  domString += `    <h5 class="card-title">${board.name}</h5>`;
  domString += `    <p class="card-text">${board.description}</p>`;
  domString += '  </div>';
  domString += `  <img src="${board.img}" class="card-img-bottom alt="...">`;
  domString += '</div>';
  return domString;
};

export default { buildBoards };
