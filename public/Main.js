document.addEventListener('DOMContentLoaded', effect);

const separator = document.querySelector(".separator");
const dev = document.querySelector(".dev");
const des = document.querySelector(".des");
const frame = document.querySelector(".frame");

function effect(){
    const main = document.querySelector(".main");
    main.addEventListener('mousemove',motion);

}

function motion (e) {
    const val = e.clientX;
    const width = window.innerWidth;
    const max = (width/2) + 100;
    const min = (width/2) - 100;

    if(val <= max && val >= min) {
        separator.style.left = val;

        if(val < width/2){
            dev.style.letterSpacing = (width / 2) / 30;
            des.style.letterSpacing = (width / 2) / 15;
        }

        if(val > width/2){
            dev.style.letterSpacing = (width / 2) / 15;
            des.style.letterSpacing = (width / 2) / 30;
        }

        frame.style.width = width - val;
    }
}
