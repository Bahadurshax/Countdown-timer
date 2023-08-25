import { getTimeBetween } from "./utils.js";

const cards = document.querySelectorAll('.card');
let timer_id = null;

function init(date) {
    const time = getTimeBetween(date);

    cards.forEach(card => {
        const unit = card.dataset.unit;

        const bottom_half = card.querySelector('.bottom-half span');
        const flip_top = card.querySelector('.flip-top');
        
        flip_top.querySelector('span').textContent = time[unit];
        bottom_half.textContent = time[unit];
    })
}


function setTimer(date) {
    init(date);
    timer_id = setInterval(update, 1000, date);
}


function update(date) {
    const time = getTimeBetween(date);

    const { totalTimeInSeconds: timestamp } = time;

    if (timestamp < 1) {
        clearInterval(timer_id);
    }
    

    cards.forEach(card => {
        const unit = card.dataset.unit;
        flip(card, time[unit]);
    })
}


function flip(card, time_unit) {
    const flip_top = card.querySelector('.flip-top');
    const flip_bottom = card.querySelector('.flip-bottom');
    const top_half = card.querySelector('.top-half span');
    const bottom_half = card.querySelector('.bottom-half span');

    if (time_unit == flip_top.textContent) return; // if there is no change, the card does not flip

    flip_top.style.animation = 'flipTop .350s backwards';
    flip_bottom.style.animation = 'flipBottom .350s .350s backwards';

    top_half.textContent = time_unit;
    flip_bottom.querySelector('span').textContent = time_unit;

    flip_top.addEventListener('animationend', () => {
        flip_top.querySelector('span').textContent = top_half.textContent;
    })

    flip_bottom.addEventListener('animationend', () => {
        bottom_half.textContent = flip_bottom.textContent;
        flip_top.style.animation = 'initial';
        flip_bottom.style.animation = 'initial';
    })
}


const now = new Date();
const target_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14) // setting the timer for 14 days

setTimer(target_date);