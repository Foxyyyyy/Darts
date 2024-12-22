document.addEventListener("DOMContentLoaded", () => {
    const dartboard = document.getElementById("dartboard");
    const scoreDisplay = document.getElementById("score-value");
    const dartsThrownDisplay = document.getElementById("darts-value");
    const averageDisplay = document.getElementById("average-value");
    const one80Display = document.getElementById("one80-value");
    const highest3DartDisplay = document.getElementById("highest-average-value");
    const lastVisitDisplay = document.getElementById("current-average-value"); // "Last Visit"
    const highestAverageDisplay = document.getElementById("highest-value");
    const lowestAverageDisplay = document.getElementById("lowest-value");
    const missButton = document.getElementById("missButton");
    const pinButton = document.getElementById("pin-button");
    const scoreBoard = document.getElementById("score-board");
    const extraStats = document.getElementById("extra-stats");

    let isPinned = false;

    // Pin button functionality
    pinButton.addEventListener("click", () => {
        isPinned = !isPinned;
        if (isPinned) {
            pinButton.style.fill = "#000000";
            scoreBoard.style.maxHeight = "460px";
            scoreBoard.style.opacity = "1";
            scoreBoard.style.overflow = "visible";
            extraStats.style.maxHeight = "400px";
            extraStats.style.opacity = "1";
        } else {
            pinButton.style.fill = "#8f8a8a";
            scoreBoard.style.removeProperty("max-height");
            scoreBoard.style.removeProperty("opacity");
            scoreBoard.style.removeProperty("overflow");
            extraStats.style.removeProperty("max-height");
            extraStats.style.removeProperty("opacity");
        }
    });

    let totalScore = 0;
    let dartsThrown = 0;
    let currentTurnScore = 0;
    let currentTurnDarts = 0;
    let one80Count = 0;
    let highest3DartAverage = 0;
    let highestAverage = null;
    let lowestAverage = null;

    const updateScoreAndDarts = () => {
        scoreDisplay.textContent = totalScore;
        dartsThrownDisplay.textContent = dartsThrown;
    };

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

    const updateHighAndLowAverages = () => {
        const currentTurnAverage = currentTurnScore;
        if (highestAverage === null || currentTurnAverage > highestAverage) {
            highestAverage = currentTurnAverage;
            highestAverageDisplay.textContent = highestAverage.toFixed(2);
        }
        if (lowestAverage === null || currentTurnAverage < lowestAverage) {
            lowestAverage = currentTurnAverage;
            lowestAverageDisplay.textContent = lowestAverage.toFixed(2);
        }
    };

    const updateLastVisit = () => {
        lastVisitDisplay.textContent = currentTurnScore;
    };

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

    dartboard.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.dataset.score) {
            const score = parseInt(target.dataset.score, 10);
            handleDart(score);
        }
    });

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

    const resetStats = () => {
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

    const showCustomAlert = (message) => {
        const alertBox = document.getElementById("customAlert");
        alertBox.querySelector("p").textContent = message;
        alertBox.style.display = "block";

        document.getElementById("closeAlert").addEventListener("click", () => {
            alertBox.style.display = "none";
        });
    };

    document.getElementById("reset-stats-btn").addEventListener("click", () => {
        resetStats();
        showCustomAlert("Stats have been reset!");
    });

    updateScoreAndDarts();
    updateScoreBoard();
});
