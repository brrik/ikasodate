const canvas = document.querySelector("#mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;


const cWidth = canvas.width;
const cHeight = canvas.height;
const char1 = document.querySelector("#inv1").src;
const char2 = document.querySelector("#inv2").src;
let char = new Image;
char.src = char1;
let x = 0;
let y = 0;
let xInc = 1;
let yInc = 1;
const incMax = 3;
const incMin = 1;
const charX = 60;
const charY = 60;
const maxX = cWidth-charX;
const maxY = cHeight-charY;
const charRedrawInterval = 500;
const mainRedrawInterval = 10;
let clickObjX = 0;
let clickObjY = 0;

function main(){
    let xRnd = Math.floor(Math.random() * incMax)+incMin;
    let yRnd = Math.floor(Math.random() * incMax)+incMin;

    if(clickObjX == 0 && clickObjY == 0){
        if(x<0){
            x = 0;
            xInc = xRnd;
        }else if(x>=maxX){
            x = maxX;
            xInc = xRnd * -1;
        }

        if(y<0){
            y=0;
            yInc = yRnd;
        }else if(y>=maxY){
            y = maxY
            yInc = yRnd * -1;
        }
    }else{
        xInc = checkDirection(x,clickObjX);
        yInc = checkDirection(y,clickObjY);

        if(checkNowPosition(x,y)){
            clickObjX = 0;
            clickObjY = 0;
        }
    }

    x = x + xInc;
    y = y + yInc;

    console.log("x:" + x + " / y:" + y);
    console.log("x:" + clickObjX + " / y:" + clickObjY);

    drawChar();

}


function checkDirection(thisPos, ObjPos){
    if(ObjPos-thisPos>0){
        return 1;
    }else{
        return -1;
    }
}

function checkNowPosition(x,y){
    let xJudge = false;
    let yJudge = false;

    if(clickObjX-5 < x && x < clickObjX+5){
        xJudge = true;
    }else{
        xJudge = false;
    }

    if(clickObjY-5 < y && y < clickObjY+5){
        yJudge = true;
    }else{
        yJudge = false;
    }

    if(xJudge && yJudge){
        return true;
    }else{
        return false;
    }
}


function drawBG(){
    ctx.fillStyle = "#FFEEDD";
    ctx.fillRect(0,0,cWidth,cHeight);
}

function changeCharSrc(){
    if(char.src == char1){
        char.src = char2;
    }else{
        char.src = char1;
    }
}

function drawChar(){
    drawBG();
    ctx.drawImage(char,x,y,charX,charY);
}


canvas.addEventListener("click",e => {
    const rect = e.target.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    clickObjX = point["x"];
    clickObjY = point["y"];
})

let mainDrawInterval = setInterval(main,mainRedrawInterval);
let charDrawInterval = setInterval(changeCharSrc, charRedrawInterval);