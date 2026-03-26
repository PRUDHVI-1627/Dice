const button = document.getElementById("myButton");
const diceImage = document.getElementById("diceImage");
const resultText = document.getElementById("resultText");
const historyList = document.getElementById("historyList");

let history = [];

function rollDice() {

    let count = 0;

    function roll() {
        let random = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `images/dice${random}.svg`;

        diceImage.style.transform = `
            rotate(${Math.random() * 60 - 30}deg)
            translateY(${Math.random() * -10}px)
        `;

        count++;

        if (count < 8) {
            setTimeout(roll, 60 + count * 25);
        } else {
            diceImage.style.transform = "rotate(0deg) translateY(0)";

            resultText.textContent = random === 6 
                ? "you got 6 🎉" 
                : "you got " + random;

            updateHistory(random);
        }
    }

    resultText.textContent = "";
    roll();
}

function updateHistory(value) {
    history.unshift(value);

    if (history.length > 5) {
        history.pop();
    }

    historyList.innerHTML = "";

    history.forEach(num => {
        let li = document.createElement("li");
        li.textContent = num;
        historyList.appendChild(li);
    });
}

// Button click
button.onclick = rollDice;

// Keyboard support (PRO feature)
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        rollDice();
    }
});