// BUTTON CONSTANTS
const howBtn = document.querySelector('#btn__rule');
const scoreBtn = document.querySelector('#btn__score');
const xBtn = document.querySelector('#btn__x');

// MODAL CONSTANTS
const modalRules = document.querySelector('#olay__vwp');
const modalScore = document.querySelector('#modal__score')

// MODAL FUNCTION - SHOWS MODAL BY CLASS
function modal(modal, vis, btn, act){
    modal.classList.toggle(vis);
    btn.classList.toggle(act);
};

// ADD EVENT LISTENER CLICK TO MODAL BUTTONS
howBtn && howBtn.addEventListener('click', function(){
    modal(modalRules, 'visi__hid', howBtn, 'btn__1--act');
});

xBtn && xBtn.addEventListener('click', function(){
    howBtn && modal(modalRules, 'visi__hid', howBtn, 'btn__1--act');
    scoreBtn && modal(modalScore, 'visi__hid', scoreBtn, 'btn__1--act');
});

scoreBtn && scoreBtn.addEventListener('click', function(){
    modal(modalScore, 'visi__hid', scoreBtn, 'btn__1--act');
});