const buildPins = (selectedPin) => {
  let domString = '';
  domString += `<div id="${selectedPin.id}" class="card">`;
  domString += `  <img src="${selectedPin.imageUrl}" class="card-img-bottom alt="...">`;
  domString += `  <div id="${selectedPin.boardId}" class="card-body m-0 p-0">`;
  domString += '      <div class="card-footer justify-content-center d-flex flex-row">';
  domString += `        <p id="findPin" data-id="${selectedPin.id}" class="card-description">${selectedPin.name}</>`;
  domString += '        <button type="button" id="edit-a-pin" data-toggle="modal" data-target="#exampleModal2" class="btn-warning"><i class="fas fa-edit"></i></button>';
  domString += '        <button class="board-id delete-btn"><i class="delete-pin far fa-trash-alt"></i></button>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '</div>';
  return domString;
};

export default { buildPins };
