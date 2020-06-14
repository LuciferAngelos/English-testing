import { questions as q } from './q.js';
import { variants as v } from './v.js'

let questionsWrapper = document.querySelector('.questions');
let counter = 0;
let techCounter = 1;
const buttons = document.querySelectorAll('button');
const nextButton = document.querySelector('#nextPage'),
    prevButton = document.querySelector('#prevPage'),
    toResults = document.querySelector('#toResults'),
    acceptNameButton = document.querySelector('#accept-modal');
let input = document.querySelector('#getName');
let answers = [];
let result = '';


function getRandomDatas(arr1, arr2) {
    let rand = Math.floor(Math.random() * (arr1.length));
    let splicedCodes = arr1.splice(rand, 1);
    let splicedVariants = arr2.splice(rand, 1);

    return `'${splicedCodes}'> ${splicedVariants}`

}

function addNewQuestionBlock(question, variant, techNum) {
    let questionCount = '';
    let q = '';
    let v = [];
    let c = [];

    for (let k in question) {
        questionCount = k;
        q = question[k];
        for (let key in variant) {
            v.push(variant[key])
            c.push(key)
        }
    }

    let questionBlock = `
            <div class="question-block">
                <p class="question">${questionCount}.${q}</p>
                <form class="answers">
                    <div>
                        <label for="answer-${techNum}">
                            <input type="radio" id='answer-${techNum}' name='question-${questionCount + 1}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 1}">
                            <input type="radio" id='answer-${techNum + 1}' name='question-${questionCount + 1}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 2}">
                            <input type="radio" id='answer-${techNum + 2}' name='question-${questionCount + 1}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 3}">
                            <input type="radio" id='answer-${techNum + 3}' name='question-${questionCount + 1}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                </form>
            </div>
        `;

    questionsWrapper.insertAdjacentHTML('beforeend', questionBlock)
}

function checkButtons() {
    if (counter >= 0 && counter <= 40) {
        nextButton.style.display = 'block';
    } else {
        nextButton.style.display = 'none';
    }
    if (counter > 19) {
        prevButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
    }
    if (counter == 50) {
        toResults.style.display = 'block';
    } else {
        toResults.style.display = 'none';
    }
}

function renderQuestions() {
    for (let i = counter; i < counter + 10; i++) {
        if (counter > 40) return;
        addNewQuestionBlock(q[i], v[i], techCounter);
        techCounter += 4;
    }
    counter += 10;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
        checkButtons()
    }
}

function prevQuestions() {
    counter -= 10;
    checkButtons()
    let drawedQuestions = document.querySelectorAll('.question-block');
    for (let i = counter; i < drawedQuestions.length; i++) {
        drawedQuestions[i].style.display = 'none';
    }
    for (let i = counter - 10; i < counter; i++) {
        drawedQuestions[i].style.display = 'flex';
    }
}

function nextQuestions() {
    let drawedQuestions = document.querySelectorAll('.question-block');
    for (let i = 0; i < drawedQuestions.length; i++) {
        drawedQuestions[i].style.display = 'none';
    }
    if (drawedQuestions.length > counter + 1) {
        for (let i = counter; i < counter + 10; i++) {
            drawedQuestions[i].style.display = 'flex';
        }
        counter += 10;
        checkButtons()
    } else {
        renderQuestions()
    }
}

function countCorrectAnswers(arr) {
    let totalSum = arr.reduce(function (sum, current) { return sum + current })
    return totalSum
}

function getResults() {
    let radioButtons = document.querySelectorAll('input[type=radio]');
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked && radioButtons[i].dataset.c % 17 == 0) {
            answers.push(1)
        } else {
            answers.push(0);
        }
    }
    if (countCorrectAnswers(answers) <= 10) {
        result += 'low';
    }
    if (countCorrectAnswers(answers) > 10 && countCorrectAnswers(answers) <= 30) {
        result += 'medium';
    }
    if (countCorrectAnswers(answers) > 40) {
        result += 'high';
    }

    console.log(result);
}

renderQuestions()

if (!localStorage.getItem('name')) {
    let warnModal = document.querySelector('.warn');
    warnModal.classList.add('active');
    let name = '';
    acceptNameButton.style.display = 'block';
    input.addEventListener('keydown', function (e) {
        if (this.value != '' && e.keyCode === 13) {
            name = input.value;
            localStorage.setItem('name', name);
            warnModal.classList.remove('active');
        }
    })

    acceptNameButton.addEventListener('click', function () {
        if (input.value != '') {
            name = input.value;
            localStorage.setItem('name', name);
            warnModal.classList.remove('active');
        }
    })

}


nextButton.addEventListener('click', nextQuestions);
prevButton.addEventListener('click', prevQuestions);
toResults.addEventListener('click', getResults)



export { getResults }