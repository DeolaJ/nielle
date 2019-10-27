import firebase from 'firebase/app';
import config from './config';
import 'firebase/storage';
import 'firebase/firestore'; 
import 'firebase/auth';

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();