import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import buildBoardsComp from '../buildBoards/buildBoards';
import './boards.scss';


const printBoards = () => {
  boardData.getBoards()
    .then((boards) => {
      let domString = '';
      domString += '<h2 class="text-center"></h2>';
      domString += '<div class="card-columns justify-content-center m-5">';
      boards.forEach((board) => {
        domString += buildBoardsComp.buildBoards(board);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
    })
    .catch((err) => console.error('problem with printBoards', err));
};

export default { printBoards };
