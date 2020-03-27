import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import authData from './helpers/data/authData';
import home from './components/home/home';
import myNavbar from './components/myNavbar/myNavbar';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  myNavbar.logoutEvent();
  home.loginButton();
  authData.checkLoginStatus();
};
init();
