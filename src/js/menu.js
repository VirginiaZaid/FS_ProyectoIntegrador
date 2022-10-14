/* Cuando hago CLICK .button, .nav TOGGLE 'activo' */
const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')
const menuItems = document.querySelectorAll('.nav.tab-nav > .ul > .li > .a')

const menu = document.querySelector('.nav.tab-nav > .ul')

button.addEventListener('click',()=>{
    nav.classList.toggle('activo')
})

menu.addEventListener(
    'click',
    ()=> {
        nav.classList.toggle('activo')
    })
