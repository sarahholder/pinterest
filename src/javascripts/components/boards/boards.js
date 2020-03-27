import utils from '../../helpers/utils';

const showBoards = () => {
  const domString = '<h2>Boards</s2>';
  utils.printToDom('home', domString);
};

export default { showBoards };
