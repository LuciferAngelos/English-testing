import { questions as q } from './q.js';
import { variants as v } from './v.js'
import { answers as a } from './a.js'

document.addEventListener('DOMContentLoaded', function () {

    let questionsWrapper = document.querySelector('.questions');
    let counter = 0;
    let techCounter = 1;
    const buttons = document.querySelectorAll('button');
    const nextButton = document.querySelector('#nextPage'),
        prevButton = document.querySelector('#prevPage'),
        toResults = document.querySelector('#toResults');


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

    function renderQuestions() {
        for (let i = counter; i < counter + 10; i++) {
            if (counter > 40) return;
            addNewQuestionBlock(q[i], v[i], techCounter);
            techCounter += 4;
        }
        counter += 10;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.display = 'none';
            if (counter >= 0 || counter < 40) {
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
    }

    renderQuestions()


    nextButton.addEventListener('click', function () {
        let drawedQuestions = document.querySelectorAll('.question-block');
        for (let i = 0; i < drawedQuestions.length; i++) {
            drawedQuestions[i].style.display = 'none';
        }
        if (drawedQuestions.length > counter + 1) {
            for (let i = counter; i < counter + 10; i++) {
                drawedQuestions[i].style.display = 'flex';
            }
            counter += 10;
        } else {
            renderQuestions()
        }

        console.log(`кол-во элементов после вперёд - ${drawedQuestions.length + 10}, каунтер - ${counter}`);


    })
    prevButton.addEventListener('click', function () {
        counter -= 10;
        let drawedQuestions = document.querySelectorAll('.question-block');
        for (let i = counter; i < drawedQuestions.length; i++) {
            drawedQuestions[i].style.display = 'none';
        }
        for (let i = counter - 10; i < counter; i++) {
            drawedQuestions[i].style.display = 'flex';
        }

        console.log(`кол-во элементов после назад - ${drawedQuestions.length}, каунтер - ${counter}`);


    })








})