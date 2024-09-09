let coins = 0;
let level = 0;
let daysPlayed = 0;
let dogPrices = [100, 200, 500]; // Prices of dogs
let purchasedDogs = [];

// Display elements
const coinDisplay = document.getElementById("coin-display");
const levelDisplay = document.getElementById("level-display");
const dogIcons = document.getElementById("dog-icons");

function loadDogs() {
    dogPrices.forEach((price, index) => {
        let dogElement = document.createElement("img");
        dogElement.src = `dog${index + 1}.png`;
        dogElement.alt = `Dog ${index + 1}`;
        dogElement.onclick = () => {
            if (coins >= price && !purchasedDogs.includes(index)) {
                coins -= price;
                purchasedDogs.push(index);
                updateDisplay();
            }
        };
        dogIcons.appendChild(dogElement);
    });
}

// Tap to earn coins
dogIcons.onclick = function () {
    coins += 10;
    updateDisplay();
};

// Save progress to localStorage
document.getElementById("save-progress").onclick = function () {
    let progress = {
        coins: coins,
        level: level,
        purchasedDogs: purchasedDogs
    };
    localStorage.setItem("dogKombatProgress", JSON.stringify(progress));
};

// Load progress from localStorage
document.getElementById("load-progress").onclick = function () {
    let savedProgress = JSON.parse(localStorage.getItem("dogKombatProgress"));
    if (savedProgress) {
        coins = savedProgress.coins;
        level = savedProgress.level;
        purchasedDogs = savedProgress.purchasedDogs;
        updateDisplay();
    }
};

// Update coin and level display
function updateDisplay() {
    coinDisplay.textContent = coins;
    levelDisplay.textContent = level;
}

// Initialize game
loadDogs();
updateDisplay();
