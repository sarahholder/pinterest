import utils from '../../helpers/utils';

const showBoards = () => {
  const domString = '<h2 class="m-1">Boards</h2>';
  utils.printToDom('home', domString);
};

export default { showBoards };
