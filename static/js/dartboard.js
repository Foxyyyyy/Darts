document.addEventListener("DOMContentLoaded", () => {
    const dartboard = document.getElementById("dartboard");
    const scoreDisplay = document.getElementById("score-value");
    const dartsThrownDisplay = document.getElementById("darts-value");
    const averageDisplay = document.getElementById("average-value");
    const one80Display = document.getElementById("one80-value");
    const highest3DartDisplay = document.getElementById("highest-average-value");
    const lastVisitDisplay = document.getElementById("current-average-value"); // Now "Last Visit"
    const highestAverageDisplay = document.getElementById("highest-value");
    const lowestAverageDisplay = document.getElementById("lowest-value");
    const missButton = document.getElementById("missButton");
    const pinButton = document.getElementById("pin-button");
    const scoreBoard = document.getElementById("score-board");
    const extraStats = document.getElementById("extra-stats");

    let isPinned = false;

    // Toggle pin button functionality
    pinButton.addEventListener("click", () => {
        isPinned = !isPinned; // Toggle the pinned state

        if (isPinned) {
            pinButton.style.fill = "#000000"; // Keep the button black
            scoreBoard.style.maxHeight = "460px"; // Ensure the stats stay expanded
            scoreBoard.style.opacity = "1"; // Ensure visibility
            scoreBoard.style.overflow = "visible"; // Ensure nothing is cut off
            extraStats.style.maxHeight = "400px"; // Expand extra stats
            extraStats.style.opacity = "1"; // Make it visible
         }
         else {
            pinButton.style.fill = "#8f8a8a"; // Revert to default color
            scoreBoard.style.removeProperty("max-height"); // Allow hover to control max height
            scoreBoard.style.removeProperty("opacity"); // Allow hover to control opacity
            scoreBoard.style.removeProperty("overflow"); // Reset overflow
            extraStats.style.removeProperty("max-height"); // Allow hover to control extra stats
            extraStats.style.removeProperty("opacity"); // Reset to hover behavior
        }
    });

    let totalScore = 0;
    let dartsThrown = 0;
    let currentTurnScore = 0; // Tracks the score for the current turn (set of 3 darts)
    let currentTurnDarts = 0;
    let one80Count = 0;
    let highest3DartAverage = 0;
    let highestAverage = null;
    let lowestAverage = null;

    // Function to update total score and darts thrown immediately
    const updateScoreAndDarts = () => {
        scoreDisplay.textContent = totalScore;
        dartsThrownDisplay.textContent = dartsThrown;
    };

    // Function to update the rest of the scoreboard
    const updateScoreBoard = () => {
        one80Display.textContent = one80Count;

        // Calculate three-dart average if at least one turn has been completed
        const turns = Math.floor(dartsThrown / 3); // Number of completed turns (sets of 3 darts)
        if (turns > 0) {
            const threeDartAverage = Math.min((totalScore / turns).toFixed(2), 180); // Cap average at 180
            averageDisplay.textContent = threeDartAverage;

            // Update highest 3-dart average if the current three-dart average exceeds it
            if (parseFloat(threeDartAverage) > highest3DartAverage) {
                highest3DartAverage = parseFloat(threeDartAverage);
                highest3DartDisplay.textContent = highest3DartAverage.toFixed(2);
            }
        } else {
            averageDisplay.textContent = "0"; // No average if no turns are completed
        }
    };

    // Function to update highest and lowest averages
    const updateHighAndLowAverages = () => {
        const currentTurnAverage = currentTurnScore; // Use the total score of the current turn (3 darts)

        // Update highest average
        if (highestAverage === null || currentTurnAverage > highestAverage) {
            highestAverage = currentTurnAverage;
            highestAverageDisplay.textContent = highestAverage.toFixed(2);
        }

        // Update lowest average
        if (lowestAverage === null || currentTurnAverage < lowestAverage) {
            lowestAverage = currentTurnAverage;
            lowestAverageDisplay.textContent = lowestAverage.toFixed(2);
        }
    };

    // Function to update the last visit score
    const updateLastVisit = () => {
        lastVisitDisplay.textContent = currentTurnScore; // Update with the score of the last 3 darts
    };

    // Function to handle a dart being thrown
    const handleDart = (score) => {
        totalScore += score;
        dartsThrown++;
        currentTurnScore += score;
        currentTurnDarts++;

        // Update total score and darts thrown immediately
        updateScoreAndDarts();

        // Check if the turn is complete (3 darts thrown)
        if (currentTurnDarts === 3) {
            // Check for a 180
            if (currentTurnScore === 180) {
                one80Count++; // Increment 180's count
            }

            // Update the last visit score
            updateLastVisit();

            // Update highest and lowest averages for the turn
            updateHighAndLowAverages();

            // Reset for the next turn
            currentTurnScore = 0;
            currentTurnDarts = 0;

            // Update the rest of the scoreboard after a complete turn
            updateScoreBoard();
        }
    };

    // Event listener for dartboard clicks
    dartboard.addEventListener("click", (event) => {
        const target = event.target; // Get the clicked element

        // Check if the clicked element has a score
        if (target && target.dataset.score) {
            const score = parseInt(target.dataset.score, 10); // Get the score value
            handleDart(score);
        }
    });

    // Event listener for "Miss" button
    missButton.addEventListener("click", () => {
        dartsThrown++; // Increment darts thrown
        currentTurnDarts++; // Count as a dart in the current turn

        // Update total score and darts thrown immediately
        updateScoreAndDarts();

        // Check if the turn is complete (3 darts thrown)
        if (currentTurnDarts === 3) {
            // Update the last visit score
            updateLastVisit();

            // Update highest and lowest averages for the turn
            updateHighAndLowAverages();

            // Reset for the next turn
            currentTurnScore = 0;
            currentTurnDarts = 0;

            // Update the rest of the scoreboard after a complete turn
            updateScoreBoard();
        }
    });

    // Event listener for "Reset Stats" button
    document.getElementById("reset-stats-btn").addEventListener("click", function () {
        // Reset all stats
        totalScore = 0;
        dartsThrown = 0;
        currentTurnScore = 0;
        currentTurnDarts = 0;
        one80Count = 0;
        highest3DartAverage = 0;
        highestAverage = null;
        lowestAverage = null;

        // Reset UI
        scoreDisplay.textContent = "0";
        dartsThrownDisplay.textContent = "0";
        averageDisplay.textContent = "0";
        one80Display.textContent = "0";
        highest3DartDisplay.textContent = "0";
        lastVisitDisplay.textContent = "0"; // Reset Last Visit
        highestAverageDisplay.textContent = "0";
        lowestAverageDisplay.textContent = "0";
        alert("Stats have been reset!");
    });

    // Initialize the scoreboard
    updateScoreAndDarts();
    updateScoreBoard();
});
