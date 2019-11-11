import firebase from 'firebase/app';
import config from './config';
import 'firebase/storage';
import 'firebase/firestore'; 
import 'firebase/auth';
import 'firebase/functions';

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const auth = firebase.auth();

export const functions = firebase.functions()

export const provider = new firebase.auth.GoogleAuthProvider();