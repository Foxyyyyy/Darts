document.addEventListener("DOMContentLoaded", () => {
    const dartboard = document.getElementById("dartboard");
    const scoreDisplay = document.getElementById("score-value");
    const dartsThrownDisplay = document.getElementById("darts-value");
    const missButton = document.getElementById("miss-btn");

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

    // Event listener for the miss button
    missButton.addEventListener("click", () => {
        dartsThrown++;
        updateScoreBoard();
    });

    // Initialize the scoreboard
    updateScoreBoard();
});
