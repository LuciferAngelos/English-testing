import { answers as a } from './a.js'

const images = document.querySelectorAll('.current-image');
const paragraphs = document.querySelectorAll('.description-par');
const acceptButton = document.querySelector('#toAnswersAccept');
const declineButton = document.querySelector('#toAnswersDecline');
const goodByePar = document.querySelector('.description-decline-text');
let questionsAndAnswers = JSON.parse(localStorage.getItem('QuestionsAndAnswers'))

// for (let k in questionsAndAnswers) {
//     for (let j in questionsAndAnswers[k]) {
//         console.log(questionsAndAnswers[k][j]);
//     }
// }

// for (let value of Object.values(a)) {
//     console.log(value);

// }

function displayGeneralResults() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
        paragraphs[i].style.display = 'none';

        if (localStorage.getItem('result') == i) {
            images[i].style.display = 'flex';
            paragraphs[i].style.display = 'flex';
        }
    }
};

function declineButtonTrigger() {
    goodByePar.style.display = 'flex';
}




declineButton.addEventListener('click', declineButtonTrigger)
displayGeneralResults()
