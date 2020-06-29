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
let totalAnswers = [];



function getRandomDatas(arr1, arr2) {
    let rand = Math.floor(Math.random() * (arr1.length));
    let splicedCodes = arr1.splice(rand, 1);
    let splicedVariants = arr2.splice(rand, 1);

    return `'${splicedCodes}'> ${splicedVariants}`

}

function addNewQuestionBlock(question, variant, techNum) {
    let questionCount;
    let q = '';
    let v = [];
    let c = [];

    for (let k in question) {
        questionCount = +k;
        q = question[k];
        for (let key in variant) {
            v.push(variant[key])
            c.push(key.trim(''))
        }
    }

    let questionBlock = `
            <div class="question-block">
                <p class="question">${questionCount}.${q}</p>
                <form class="answers">
                    <div>
                        <label for="answer-${techNum}">
                            <input type="radio" id='answer-${techNum}' name='question-${questionCount}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 1}">
                            <input type="radio" id='answer-${techNum + 1}' name='question-${questionCount}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 2}">
                            <input type="radio" id='answer-${techNum + 2}' name='question-${questionCount}' data-c=${getRandomDatas(c, v)}
                        </label>
                    </div>
                    <div>
                        <label for="answer-${techNum + 3}">
                            <input type="radio" id='answer-${techNum + 3}' name='question-${questionCount}' data-c=${getRandomDatas(c, v)}
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

function checkRadios() {
    let getQuestionBlocks = document.querySelectorAll('.question-block');

    for (let i = 0; i < getQuestionBlocks.length; i++) {
        let variantsForQuestion = getQuestionBlocks[i].querySelectorAll('input[type=radio]');
        let variantsForQuestionChecked = getQuestionBlocks[i].querySelectorAll('input[type=radio]:checked');
        let labelsForQuestion = getQuestionBlocks[i].querySelectorAll('label');
        let questionFromQuestionBlocks = getQuestionBlocks[i].querySelector('.question');

        for (let j = 0; j < variantsForQuestion.length; j++) {
            if (!variantsForQuestion.checked && variantsForQuestionChecked.length < 1) {
                labelsForQuestion[j].classList.add('uncheckedToggle');
                questionFromQuestionBlocks.classList.add('uncheckedToggle');

                setTimeout(function () {
                    labelsForQuestion[j].classList.remove('uncheckedToggle');
                    questionFromQuestionBlocks.classList.remove('uncheckedToggle');
                }, 1000);
            }
        }
        ;

    }
}

function forwardOrWarn() {
    let getAllQuestionBlocks = document.querySelectorAll('.question-block');
    let visibleQuestions = 0;
    let checkedRadiosInQuestion = 0;

    for (let i = 0; i < getAllQuestionBlocks.length; i++) {
        if (window.getComputedStyle(getAllQuestionBlocks[i]).getPropertyValue('display') == 'flex') {
            visibleQuestions += 1;
            for (let j = 0; j < 4; j++) {
                let currentQuestionRadio = getAllQuestionBlocks[i].querySelectorAll('form > div > label > input');
                if (currentQuestionRadio[j].checked) {
                    checkedRadiosInQuestion += 1;
                }
            }
        }
    }

    if (visibleQuestions == checkedRadiosInQuestion) {
        nextQuestions();
    } else {
        checkRadios();
    }
}

function toResultsOrWarn() {
    let getAllQuestionBlocksLength = document.querySelectorAll('.question-block').length;
    let getAllRadioButtons = document.querySelectorAll('input[type=radio]');
    let checkedAll = 0;

    for (let i = 0; i < getAllRadioButtons.length; i++) {
        if (!getAllRadioButtons[i].checked) {
            checkedAll;
        } else {
            checkedAll += 1;
        }
    }

    if (checkedAll == getAllQuestionBlocksLength) {
        getQuestionsAndAnswers()
        location.href = '../results.htm'
    } else {
        checkRadios();
    }
}

function countCorrectAnswers(arr) {
    let totalSum = arr.reduce(function (sum, current) { return sum + current });
    localStorage.setItem('CorrectAnswers', totalSum);
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
        result = '0';
        localStorage.setItem('result', result);
    }
    if (countCorrectAnswers(answers) > 10 && countCorrectAnswers(answers) <= 30) {
        result = '1';
        localStorage.setItem('result', result);
    }
    if (countCorrectAnswers(answers) > 40) {
        result = '2';
        localStorage.setItem('result', result);
    }

    toResultsOrWarn();
}

function getQuestionsAndAnswers() {
    let radioButtons = document.querySelectorAll('input[type=radio]');
    let labels = document.querySelectorAll('div > label')
    let questions = document.querySelectorAll('.question');
    let answersCounter = 0;


    for (let i = 0; i < questions.length; i++) {
        totalAnswers.push([]);
        totalAnswers[i].push(questions[i].textContent);

        for (let k = answersCounter; k < answersCounter + 4; k++) {
            if (radioButtons[k].dataset.c % 17 == 0) {
                totalAnswers[i].push(labels[k].textContent.trim());
                break;
            }
        }

        for (let k = answersCounter; k < answersCounter + 4; k++) {
            if (radioButtons[k].checked) {
                totalAnswers[i].push(labels[k].textContent.trim())
                totalAnswers[i].push(radioButtons[k].dataset.c);
                break;
            }
        }

        answersCounter += 4;
    }

    localStorage.setItem('QuestionsAndAnswers', JSON.stringify(totalAnswers))
}


renderQuestions();

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


nextButton.addEventListener('click', forwardOrWarn);
prevButton.addEventListener('click', prevQuestions);
toResults.addEventListener('click', getResults);
