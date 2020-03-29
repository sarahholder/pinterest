import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const navHeadingDiv = $('#navHeading');
const navHeadingBoardsDiv = $('#navHeadingBoards');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      navHeadingDiv.addClass('hide');
      navHeadingBoardsDiv.removeClass('hide');
      boards.printBoards();
    } else {
      authDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      navHeadingDiv.removeClass('hide');
      navHeadingBoardsDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};
export default { checkLoginStatus };
