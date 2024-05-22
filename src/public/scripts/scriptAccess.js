var jwt = localStorage.getItem("jwt");
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const sendRegisterBtn = document.getElementById('sendRegister');
const sendLoginBtn = document.getElementById('sendLogin');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    console.log("funciono");
});

sendRegisterBtn.addEventListener('click', async () => {
    console.log("funciono");
});