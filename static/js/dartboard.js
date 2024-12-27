document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const setupGameMenu = document.getElementById("setupGameMenu");
    const startGameButton = document.getElementById("startGameButton");
    const closeMenuButton = document.getElementById("closeMenuButton");
    const gameTypeButtons = document.querySelectorAll(".game-type-option");
    const startGameSetupButton = document.getElementById("startGameSetupButton");
    const scoreDisplay = document.getElementById("score-value");
    const dartsThrownDisplay = document.getElementById("darts-value");
    const averageDisplay = document.getElementById("average-value");
    const one80Display = document.getElementById("one80-value");
    const highest3DartDisplay = document.getElementById("highest-average-value");
    const lastVisitDisplay = document.getElementById("current-average-value");
    const highestAverageDisplay = document.getElementById("highest-value");
    const lowestAverageDisplay = document.getElementById("lowest-value");
    const dartboard = document.getElementById("dartboard");
    const missButton = document.getElementById("missButton");
    const playerButtons = document.getElementById("player-option")

    let selectedGameType = null;

    // Game Variables
    let totalScore = 0;
    let dartsThrown = 0;
    let currentTurnScore = 0;
    let currentTurnDarts = 0;
    let one80Count = 0;
    let highest3DartAverage = 0;
    let highestAverage = null;
    let lowestAverage = null;

    // Show setup menu
    startGameButton.addEventListener("click", () => {
        setupGameMenu.classList.remove("hidden");
        setupGameMenu.classList.add("visible");
    });

    // Close setup menu
    closeMenuButton.addEventListener("click", () => {
        setupGameMenu.classList.remove("visible");
        setupGameMenu.classList.add("hidden");
    });

    // Select game type
    gameTypeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            gameTypeButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            selectedGameType = button.dataset.type;
        });
    });

    // Select number of players
    playerButtons.forEach((button) => {
        button.addEventListener("click", () => {
            playerButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            selectedPlayers = button.dataset.players;
    });
});

    // Start the game
    startGameSetupButton.addEventListener("click", () => {
        if (selectedGameType && selectedPlayers) {
            alert(`Starting game: ${selectedGameType} with ${selectedPlayers} players`);
            setupGameMenu.classList.remove("visible");
            setupGameMenu.classList.add("hidden");
            resetGameStats(); // Reset stats for the new game
        } else {
            alert("Please select a game type and number of players.");
        }
    });

    // Update the score and darts thrown display
    const updateScoreAndDarts = () => {
        scoreDisplay.textContent = totalScore;
        dartsThrownDisplay.textContent = dartsThrown;
    };

    // Update scoreboard averages
    const updateScoreBoard = () => {
        one80Display.textContent = one80Count;
        const turns = Math.floor(dartsThrown / 3);
        if (turns > 0) {
            const threeDartAverage = Math.min((totalScore / turns).toFixed(2), 180);
            averageDisplay.textContent = threeDartAverage;
            if (parseFloat(threeDartAverage) > highest3DartAverage) {
                highest3DartAverage = parseFloat(threeDartAverage);
                highest3DartDisplay.textContent = highest3DartAverage.toFixed(2);
            }
        } else {
            averageDisplay.textContent = "0";
        }
    };

    // Update high and low averages
    const updateHighAndLowAverages = () => {
        if (highestAverage === null || currentTurnScore > highestAverage) {
            highestAverage = currentTurnScore;
            highestAverageDisplay.textContent = highestAverage.toFixed(2);
        }
        if (lowestAverage === null || currentTurnScore < lowestAverage) {
            lowestAverage = currentTurnScore;
            lowestAverageDisplay.textContent = lowestAverage.toFixed(2);
        }
    };

    // Update last visit score
    const updateLastVisit = () => {
        lastVisitDisplay.textContent = currentTurnScore;
    };

    // Handle dart hit
    const handleDart = (score) => {
        totalScore += score;
        dartsThrown++;
        currentTurnScore += score;
        currentTurnDarts++;
        updateScoreAndDarts();

        if (currentTurnDarts === 3) {
            if (currentTurnScore === 180) {
                one80Count++;
            }
            updateLastVisit();
            updateHighAndLowAverages();
            currentTurnScore = 0;
            currentTurnDarts = 0;
            updateScoreBoard();
        }
    };

    // Dartboard click event
    dartboard.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.dataset.score) {
            const score = parseInt(target.dataset.score, 10);
            handleDart(score);
        }
    });

    // Handle miss button
    missButton.addEventListener("click", () => {
        dartsThrown++;
        currentTurnDarts++;
        updateScoreAndDarts();

        if (currentTurnDarts === 3) {
            updateLastVisit();
            updateHighAndLowAverages();
            currentTurnScore = 0;
            currentTurnDarts = 0;
            updateScoreBoard();
        }
    });

    // Reset game stats
    const resetGameStats = () => {
        totalScore = 0;
        dartsThrown = 0;
        currentTurnScore = 0;
        currentTurnDarts = 0;
        one80Count = 0;
        highest3DartAverage = 0;
        highestAverage = null;
        lowestAverage = null;

        scoreDisplay.textContent = "0";
        dartsThrownDisplay.textContent = "0";
        averageDisplay.textContent = "0";
        one80Display.textContent = "0";
        highest3DartDisplay.textContent = "0";
        lastVisitDisplay.textContent = "0";
        highestAverageDisplay.textContent = "0";
        lowestAverageDisplay.textContent = "0";
    };

    // Initialize scoreboard
    updateScoreAndDarts();
    updateScoreBoard();
});
