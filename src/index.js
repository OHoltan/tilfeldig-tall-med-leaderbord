// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    query, 
    orderBy 
} from "firebase/firestore";
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
const namefield = document.querySelector(".namefield")
const name = document.querySelector(".name")
const addScore = document.querySelector(".add")
const scoreboard = document.querySelector(".scorebord")




const desimal = Math.random()*100
let number = Math.round(desimal)
const scoreboardleanght = 10

let count = 0;
let timerId;  



// init services
const db = getFirestore()

// colection ref
const colref = collection(db, 'ScoreBoard')

// queries
const q = query(colref, orderBy("score"))




//console.log(number)

input.addEventListener('keydown', e => {
    if (e.key == "Enter") {
        if (count == 0) {
            startTimer()
        }

        if (input.value == number) {
            //console.log("correct")
            stopTimer()
            output.textContent = "Tallet er Riktig"
            namefield.classList.toggle("hidden")
            
        } else if (input.value >= number) {
            //console.log("Number is smaller")
            output.textContent = "Tallet er Mindre"
            addTen()
        } else {
            //console.log("number is bigger")
            output.textContent = "Tallet er Større"
            addTen()
        }
        input.value = "";
        
    }
    
})



addScore.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colref, {
        score : count,
        name : name.value
    })
    restart()
})


// Real time get collection data
onSnapshot(q, (snapshot) => {
    let playerScores = []
    snapshot.docs.forEach((doc) => {
        playerScores.push({...doc.data(), id: doc.id })
    })
    removeScores()
    inputscores(playerScores)

})


function restart() {

    
    let randomnumber = Math.random()*100
    number = Math.round(randomnumber)
    count = 0
    document.getElementById("score").textContent = `score : ${count}`;
    namefield.classList.toggle("hidden")
    
}

function inputscores(p1) {

    for (let i = 0; i < p1.length && i < scoreboardleanght; i++){ 
            
        const li = document.createElement('li')
        li.textContent = `#${i+1} Name : ${p1[i].name}  Score : ${p1[i].score}`
        li.classList.add("scorelistli")

        scoreboard.append(li)

    }   
}

function removeScores() {
    const elementsToRemove = document.querySelectorAll('.scorelistli');

    elementsToRemove.forEach(element => {
        element.remove();
    });
}


function incrementCount() {
    count++;
    document.getElementById("score").textContent = `score : ${count}`;
    // console.log(count)
}

function addTen() {
    count += 10;
}
  
function startTimer() {
    timerId = setInterval(incrementCount, 100);
}
  
function stopTimer() {
    clearInterval(timerId);
}

