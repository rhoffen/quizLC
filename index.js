const guesses = document.querySelectorAll("li");

guesses.forEach(guess => addEventListener("click", handleClick));

function handleClick(event) {
    const answer = event.target.classList[0];
    console.log(answer);
    const result = document.getElementById('result1');
    if (answer === 'correct') {
        result1.style.display = "block";
        result1.style.color = "purple";
        result1.innerHTML = "Correct!  Purple Rain was the best album of 1983!";
    } else {
        result1.style.display = "block";
        result1.style.color = "red";
        result1.innerHTML = "Incorrect.  Purple Rain was the best album of 1983!";
    }
}
