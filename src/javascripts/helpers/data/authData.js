import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const authDiv = $('#auth');
// const homeDiv = $('#home');
const boardsDiv = $('#boards');
const logoutButton = $('#navbar-logout-button');
const navHeadingDiv = $('#navHeading');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      logoutButton.removeClass('hide');
      navHeadingDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      boards.showBoards();
    } else {
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      boardsDiv.addClass('hide');
      navHeadingDiv.removeClass('hide');
    }
  });
};
export default { checkLoginStatus };
