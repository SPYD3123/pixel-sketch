const Defaultr = 0;
const Defaultg = 0;
const Defaultb = 0;
const Defaultcolor = `rgb(${Defaultr},${Defaultg},${Defaultb})`
const Defaultpenmode = 'color'
const Defaultsize = 125;
const Defaultpentype = 'drag';
const Defaultgridmode = 'plane';
const DefaultAnimation = 'on';


let currentsize = Defaultsize;
let currentcolor = Defaultcolor;
let currentpenmode = Defaultpenmode;
let currentpentype = Defaultpentype;
let currentgridmode = Defaultgridmode;
let currentAnimation = DefaultAnimation;

const grid = document.querySelector('.mid');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function creategrid() {
    grid.style.cssText = `grid-template-columns:repeat(${currentsize},auto);`
    for (let i = 0; i < currentsize * currentsize; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tiles')
        grid.appendChild(tile);
    }
    // if (currentgridmode=='patterned') {    
    //     grid.style.gap='1px'
    // }

    let tiles = document.querySelectorAll('.tiles')
    tiles.forEach(tile => {
        // pattern();
        tile.addEventListener('mouseover', changecolor)
        tile.addEventListener('mousedown', changecolor)
    });
}

function changecolor(e) {
    if (currentpentype == 'drag') {
        if (e.type === 'mouseover' && !mouseDown) return
    }
    if (currentpenmode == 'color') {
        animation(e);
        e.target.style.backgroundColor = currentcolor;
    }
    else if (currentpenmode == 'rainbow') {
        animation(e);
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`
    }
    else if (currentpenmode == 'grayscale') {
        animation(e);
        let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            e.target.style.backgroundColor = `rgba(${Defaultr},${Defaultg},${Defaultb}, ${currentOpacity + 0.12})`;
        }
        else {
            e.target.style.backgroundColor = `rgba(${Defaultr},${Defaultg},${Defaultb}, 1)`;
        }
    }
    else if (currentpenmode == 'eraser') {
        animation(e);
        e.target.style.backgroundColor = 'rgb(255,255,255)';
    }
}

function clear() {
    grid.innerHTML = ''
    creategrid();
    pattern();
}

function pattern() {
    if (currentgridmode == 'patterned') {
        let tiles = document.querySelectorAll('.tiles')
        tiles.forEach(tile => {
            tile.classList.add('borders')
        });
    }
    else if (currentgridmode == 'plane') {
        let tiles = document.querySelectorAll('.tiles')
        tiles.forEach(tile => {
            tile.classList.remove('borders')
        });
    }
}

function animation(e) {
    if (currentAnimation == 'on') {
        e.target.style.transition = 'all 0.3s';
    }
}

creategrid();
pattern();
