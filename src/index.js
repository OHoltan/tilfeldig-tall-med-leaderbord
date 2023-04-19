// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9nhBZISPcjLz0xTUdbvE_GrsOPhYUX-w",
  authDomain: "tall-opgave-med-leaderbord.firebaseapp.com",
  projectId: "tall-opgave-med-leaderbord",
  storageBucket: "tall-opgave-med-leaderbord.appspot.com",
  messagingSenderId: "59341825179",
  appId: "1:59341825179:web:079ad352434c0b0247123e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);










const input = document.querySelector('#input')
const output = document.querySelector('#output')

const desimal = Math.random()*100
const number = Math.round(desimal)

//console.log(number)

document.addEventListener('keydown', e => {
    if (e.key == "Enter") {
        if (input.value == number) {
            //console.log("correct")
            output.textContent = "Tallet er correct"
        } else if (input.value >= number) {
            //console.log("Number is smaller")
            output.textContent = "Tallet er mindre"
        } else {
            //console.log("number is bigger")
            output.textContent = "Tallet er Større"
        }
        input.value = "";
    }
})


