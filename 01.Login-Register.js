const wrapper = document.querySelector('.wrapper');
const login = document.querySelector('.login-link');
const reg = document.querySelector('.register-link');
const btn_pop = document.querySelector('.login');
const btn_close = document.querySelector('.icon-close');

reg.addEventListener('click', () => {
    wrapper.classList.add('active');
});

login.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btn_pop.addEventListener('click', () =>{
    wrapper.classList.add('popup')
});

btn_close.addEventListener('click', () =>{
    wrapper.classList.remove('popup')
});