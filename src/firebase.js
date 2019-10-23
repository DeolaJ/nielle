import firebase from 'firebase/app';
import config from './config';
import 'firebase/storage';
import 'firebase/firestore'; 

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()