import { answers as a } from './a.js'

const images = document.querySelectorAll('.current-image');
const paragraphs = document.querySelectorAll('.description-par');
let resultPar = document.querySelector('.user-result');
let userAnswers = document.querySelector('.user-answers');
const possibleReults = ['Low!', 'Medium!', 'High!'];
const acceptButton = document.querySelector('#toAnswersAccept');
const declineButton = document.querySelector('#toAnswersDecline');
const goodByePar = document.querySelector('.description-decline-text');
let questionsAndAnswers = JSON.parse(localStorage.getItem('QuestionsAndAnswers'));
const explanationButtons = document.querySelectorAll('.explanation-button');
const explanationPar = document.querySelectorAll('.explanation');
const questionMarkImage = document.querySelectorAll('.question-mark')

// for (let k in questionsAndAnswers) {
//     for (let j in questionsAndAnswers[k]) {
//         console.log(questionsAndAnswers[k][j]);
//     }
// }

// for (let value of Object.values(a)) {
//     console.log(value);

// }


//добавить вывод имени
function displayGeneralResults() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
        paragraphs[i].style.display = 'none';

        if (localStorage.getItem('result') == i) {
            images[i].style.display = 'flex';
            paragraphs[i].style.display = 'flex';
            resultPar.innerText = `Your result is ${possibleReults[i]}`;
            userAnswers.innerText = `Correct answers are ${localStorage.getItem('CorrectAnswers')} of 50!`;
        }
    }
};

function declineButtonTrigger() {
    goodByePar.style.display = 'flex';
}


for (let i = 0; i < explanationButtons.length; i++) {
    explanationPar[i].style.display = 'none';
    questionMarkImage[i].addEventListener('click', function () {
        explanationPar[i].style.display = (explanationPar[i].style.display == 'none') ? 'block' : 'none';
    })
    explanationButtons[i].addEventListener('click', function () {
        explanationPar[i].style.display = (explanationPar[i].style.display == 'none') ? 'block' : 'none';
    })
}



declineButton.addEventListener('click', declineButtonTrigger)
displayGeneralResults()
