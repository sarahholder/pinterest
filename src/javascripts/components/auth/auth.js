import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  let domString = '<h1>This is login h1</h1>';
  domString += '<button id="google-auth" class="loginBtn loginBtn--google">Login with Google</button>';
  utils.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
