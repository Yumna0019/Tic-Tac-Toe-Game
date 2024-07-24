let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector(".msg");
let turnInfo = document.querySelector("#turn-info");

let turnO = true;
const win_patterns = [[0,1,2],
[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgBox.classList.add("hide");
    updateTurnInfo();
};

const updateTurnInfo = () => {
    turnInfo.innerText = turnO ? "It's O's turn" : "It's X's turn";
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        updateTurnInfo();
        checkWinner();
    });
});

const disableBoxes = () => {
    for(box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled =  false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = 'Congratulations, Winner is '+ winner;
    msgBox.classList.remove("hide");
    disableBoxes();
}


const showDraw = () => {
    msg.innerText = 'Draw Game';
    msgBox.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let allBoxesFilled = true;

    for (let pattern of win_patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    for (let box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }

    if (allBoxesFilled) {
        showDraw();
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
updateTurnInfo();
