const Defaultcolor='#000000'
const Defaultpenmode='color'
const Defaultsize= 80;
const Defaultpentype='drag';
// const Defaultgridmode='patterned';


let currentsize=Defaultsize;
let currentcolor=Defaultcolor;
let currentpenmode=Defaultpenmode;
let currentpentype=Defaultpentype;
// let currentgridmode=Defaultgridmode;

const grid=document.querySelector('.mid');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function creategrid(){
    grid.style.cssText=`grid-template-columns:repeat(${currentsize},auto);`
    for (let i = 0; i < currentsize*currentsize; i++) {
        let tile=document.createElement('div');
        tile.classList.add('tiles')
        grid.appendChild(tile);
    }
    // if (currentgridmode=='patterned') {    
    //     grid.style.gap='1px'
    // }

    let tiles=document.querySelectorAll('.tiles')
    tiles.forEach(tile => {
        tile.addEventListener('mouseover',changecolor)
        tile.addEventListener('mousedown',changecolor)
    });
}

function changecolor(e){
    if (currentpentype=='drag') {
        if (e.type === 'mouseover' && !mouseDown) return
    }
    if (currentpenmode=='color') {
        e.target.style.cssText=`background-color:${currentcolor};`
    }

    
}

function clear(){
    grid.innerHTML=''
    creategrid()
}
creategrid();
