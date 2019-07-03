const guesses = document.querySelectorAll("li");

guesses.forEach(guess => addEventListener("click", handleClick));

const responses = {
    "q1": {
        incorrect: "Incorrect.  Purple Rain was the best album of 1983!",
        buttonId: "result1"
    },
    "q2": {
        incorrect: "Incorrect.  Darryl McDaniel is the DMC of Run-DMC.",
        buttonId: "result2"
    }
}

function handleClick(event) {
    const answer = event.target.classList[0];
    const questionId = event.target.closest("ol").previousElementSibling.id;
    const resultBox = document.getElementById(responses[questionId].buttonId);

    if (answer === 'correct') {
        resultBox.style.display = "block";
        resultBox.style.color = "purple";
        resultBox.innerHTML = "Correct!";
    } else {
        resultBox.style.display = "block";
        resultBox.style.color = "red";
        resultBox.innerHTML = responses[questionId].incorrect;
    }
    setTimeout(function(){resultBox.style.display = "none"}, 3000);
}
