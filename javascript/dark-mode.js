// Dark mode 
const darkModeToggle = document.querySelector('.dark-mode-btn');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});