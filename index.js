const button = document.getElementById("myButton");
const diceImage = document.getElementById("diceImage");
const resultText = document.getElementById("resultText");
const historyList = document.getElementById("historyList");

const diceEmoji = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let history = [];
let isRolling = false;

function rollDice() {
    if (isRolling) return;

    isRolling = true;
    button.disabled = true;
    resultText.textContent = "";

    let count = 0;

    // add rolling animation class
    diceImage.classList.remove("landing");
    diceImage.classList.add("rolling");

    function roll() {
        let random = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `images/dice${random}.svg`;

        count++;

        if (count < 8) {
            setTimeout(roll, 60 + count * 25);
        } else {
            // stop rolling, trigger landing animation
            diceImage.classList.remove("rolling");
            diceImage.classList.add("landing");
            setTimeout(() => diceImage.classList.remove("landing"), 350);

            resultText.textContent = random === 6
                ? "you got 6 🎉"
                : "you got " + random;

            updateHistory(random);

            isRolling = false;
            button.disabled = false;
        }
    }

    roll();
}

function updateHistory(value) {
    history.unshift(value);

    if (history.length > 5) {
        history.pop();
    }

    historyList.innerHTML = "";

    history.forEach((num, index) => {
        let li = document.createElement("li");
        li.textContent = `${diceEmoji[num]} ${num}`;
        if (index === 0) li.classList.add("new");
        historyList.appendChild(li);
    });
}

// Button click
button.onclick = rollDice;

// Keyboard support — fixed double trigger when button is focused
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && document.activeElement !== button) {
        e.preventDefault();
        rollDice();
    }
});