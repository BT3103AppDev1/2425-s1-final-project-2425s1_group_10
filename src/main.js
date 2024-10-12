import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBXeSuyAknp2ose0kxu8CwCbfKL8mQcj0w",
    authDomain: "bt3103-login-6c741.firebaseapp.com",
    projectId: "bt3103-login-6c741",
    storageBucket: "bt3103-login-6c741.appspot.com",
    messagingSenderId: "988255917610",
    appId: "1:988255917610:web:bffbb19f5ce8468e8c9553",
    measurementId: "G-GYYZ1MBSBV"
  };

initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')