//передавать в футер сайта текущую версию через ЛС на каждую страницу
//передавать в тайтл страницы текущую версию

let title = document.querySelector('title');
let version = document.querySelectorAll('h1');

title.innerText = version[version.length - 1].innerText;

localStorage.setItem('version', `Version ${version[version.length - 1].innerText}`)
