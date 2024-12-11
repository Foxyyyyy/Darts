document.addEventListener("DOMContentLoaded", () => {
    const dartboard = document.getElementById("dartboard");
    const scoreDisplay = document.getElementById("score-value");
    const dartsThrownDisplay = document.getElementById("darts-value");
    const missButton = document.getElementById("missButton");

    let totalScore = 0;
    let dartsThrown = 0;

    // Function to update the scoreboard
    const updateScoreBoard = () => {
        scoreDisplay.textContent = totalScore;
        dartsThrownDisplay.textContent = dartsThrown;
    };

    // Event listener for dartboard clicks
    dartboard.addEventListener("click", (event) => {
        const target = event.target; // Get the clicked element

        // Check if the clicked element has a score
        if (target && target.dataset.score) {
            const score = parseInt(target.dataset.score, 10); // Get the score value
            totalScore += score;
            dartsThrown++;
            updateScoreBoard();
        }
    });

    // Event listener for "Miss" button
    missButton.addEventListener("click", () => {
        dartsThrown++; // Increment darts thrown
        // No change in totalScore because it's a miss
        updateScoreBoard();
    });

    document.getElementById("reset-stats-btn").addEventListener("click", function () {
        // Reset all stats
        document.getElementById("score-value").textContent = "0";
        document.getElementById("darts-value").textContent = "0";
        document.getElementById("average-value").textContent = "0";
        document.getElementById("one80-value").textContent = "0";
        document.getElementById("highest-average-value").textContent = "0";
        document.getElementById("current-average-value").textContent = "0";
        document.getElementById("highest-value").textContent = "0";
        document.getElementById("lowest-value").textContent = "0";
        alert("Stats have been reset!");
      });


    // Initialize the scoreboard
    updateScoreBoard();
});
