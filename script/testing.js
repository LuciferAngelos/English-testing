import { questions as q, questions } from './q.js';
import { variants as v } from './v.js'
import { answers as a } from './a.js'

document.addEventListener('DOMContentLoaded', function () {

    let questionsDiv = document.querySelector('.questions');

    questionsDiv.insertAdjacentHTML('afterbegin', `
        <div class="question-block">
        <p class="question">вопрос</p>
        <form class="answers">
            <div>
                <label for="answer1">
                    <input type="radio" id='answer1' name='question-1'> Вариант
                            </label>
                        </div>
                <div>
                    <label for="answer2">
                        <input type="radio" id='answer2' name='question-1'>Вариант
                            </label>
                        </div>
                    <div>
                        <label for="answer3">
                            <input type="radio" id='answer3' name='question-1'>Вариант
                            </label>
                        </div>
                        <div>
                            <label for="answer4">
                                <input type="radio" id='answer4' name='question-1'>Вариант
                            </label>
                        </div>
                    </form>
                    </div>
    `)




})