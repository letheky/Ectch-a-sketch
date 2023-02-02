var $ = document.querySelector.bind(document);
var $$= document.querySelectorAll.bind(document);

const btnAll = $$('button')
const inputVal = $('.input-value')
const inputRange = $('.input-range')
const gridArea = $('.right')
const colorPicker = $('.color-picker')
let color = 'black'
let preInputValue = 16
let rightBlocks
const rainbow = ['red','orange','yellow','green','cyan','blue','violet']


//Init the features on first load
createGrid(16)
changeBackground()
features()

//Create grid width input range value
function createGrid(gridBlocks){
    for(let i=0; i<gridBlocks;i++){
        for(let j=0; j<gridBlocks;j++){
            const div = document.createElement('div')
            gridArea.appendChild(div)
            div.classList.add('right-block')
            rightBlocks = $$('.right-block')
        }
    }
    gridArea.setAttribute('style',`grid-template-columns:repeat(${gridBlocks},1fr);grid-template-rows:repeat(${gridBlocks},1fr)`)
}

function removeGrid(preGridBlocks){
    for(let i=0; i<preGridBlocks;i++){
        for(let j=0; j<preGridBlocks;j++){
            gridArea.removeChild($('.right-block'))
        }
    }
}

//set color by picking color at the color picking
function setColor(){
    console.log(colorPicker.value)
    return color = colorPicker.value
}

//set the rainbow color by clicking rainbow button
function setRainbowColor(){
    let randomColor = Math.floor(Math.random()*7)
    return color = rainbow[randomColor]
}

//change background color of blocks at the right side of the page
function changeBackground(){
    rightBlocks.forEach(block=>block.onmouseover = () =>{
        block.setAttribute('style',`background-color:${color}`)
    })
}

//take the color of color picker to assign to the value of global color
colorPicker.onchange = ()=>{
    color = colorPicker.value
}


//activating the present button
function features(){
    btnAll.forEach(
        btn=>btn.onclick = ()=>{
            $('.btn.active').classList.remove('active')
            btn.classList.add('active')
            checkActive()
        }
    )
}

//check active button to do painting the background
function checkActive(){
    switch($('.active').id){
        case 'color_picker':
            setColor() 
            changeBackground();
            break;
        case 'rainbow': 
            rightBlocks.forEach(block=>block.onmouseover = () =>{
                setRainbowColor();
                block.setAttribute('style',`background-color:${color}`)
            });
            break;
        case 'eraser': 
            rightBlocks.forEach(block=>block.onmouseover = () =>{
                block.removeAttribute('style')
            })
            break;
        default:
            rightBlocks.forEach(block=>{
                block.removeAttribute('style')
            });
            color = 'white';
            break;
    }
}

//Take the value of input range to display and change block grid on the right
inputRange.onchange = ()=>{
    removeGrid(preInputValue)
    inputVal.textContent = `${inputRange.value} X ${inputRange.value}`
    createGrid(inputRange.value)
    preInputValue = inputRange.value
    features()
    checkActive()
}




