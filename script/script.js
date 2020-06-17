let name = '';
let input = document.querySelector('#getName');
let cancel = document.querySelector('#cancel');
let accept = document.querySelector('#accept');
let backToNameInput = document.querySelector('#back-to-input');

if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
}

function clearInput() {
    name = '';
    input.value = null
}

function acceptButton() {
    let frontCard = document.querySelector('.front-card');
    let backCard = document.querySelector('.to-testing');

    if (input.value !== '') {
        frontCard.classList.add('rotate-180');
        frontCard.style.position = 'absolute';

        backCard.classList.add('rotate-360');
        backCard.style.position = 'relative';
    } else {
        let questionName = document.querySelector('#questionName')
        questionName.innerText = 'Возможно, ты введёшь имя?'
    }
}

function backToName() {
    let frontCard = document.querySelector('.front-card');
    let backCard = document.querySelector('.to-testing');

    frontCard.classList.remove('rotate-180');
    frontCard.style.position = 'absolute';

    backCard.classList.remove('rotate-360');
    backCard.style.position = 'relative';

}

input.addEventListener('change', function () {
    name = input.value;
    localStorage.setItem('name', name)
})

input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        acceptButton()
    }
})

cancel.addEventListener('click', clearInput)

accept.addEventListener('click', acceptButton)

backToNameInput.addEventListener('click', backToName)