let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let drawCount = 0;

let turn0 = true;

const winPatters = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


const resetGame = ()=>{
    turn0 = true;
    drawCount = 0;
    enableBtns();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "O"
            turn0 = false;
        }
        else{
            box.innerText = "X"
            turn0 = true;
        }
        box.disabled = true;

        drawCount++;

        if(drawCount==9){
            showDraw();
        }
        checkWinner();

    });
});

const disableBtns = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBtns = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) =>{
    msg.innerHTML = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
}

const showDraw = () =>{
    msg.innerHTML = `Oops! It's a draw`;
    msgContainer.classList.remove("hide");
    disableBtns();
    drawCount = 0;
}

const checkWinner = ()=>{
    for(let pattern of winPatters){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
