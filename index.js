//Add event listener for hint buttons
const hints = document.querySelectorAll(".hint");
//console.log(hints);
hints.forEach(hint => addEventListener("click", handleHint));

//Add an event listener to each list item to detect clicks
const guesses = document.querySelectorAll("li");
guesses.forEach(guess => addEventListener("click", handleClick));

//Response object to hold properties for different questions. Eventually, all the questions and answers will be stored in database fields.
const responses = {
    "q1": {
        incorrect: "Incorrect.  Purple Rain was the best album of 1983!",
        buttonId: "result1"
    },
    "q2": {
        incorrect: "Incorrect.  Darryl McDaniels is the DMC of Run-DMC.",
        buttonId: "result2"
    }
}

//Callback function to handle hint requests
function handleHint(event) {
    const id = event.target.id;
    console.log(id);
    if (id === "hint1") {
        document.body.style.backgroundColor = "purple";
        event.target.style.fontSize = "30px";
        event.target.innerHTML = "Do a background check!"
        setTimeout(function() {
            document.body.style.backgroundColor = "";
            event.target.style.fontSize = "13.333px";
            event.target.innerHTML = "Hint";
        }, 3000);
    } else if (id === "hint2") {
        event.target.style.color = "red";
        event.target.style.fontSize = "30px";
        event.target.innerHTML = "It's tricky! (to rock a rhyme)"
        setTimeout(function() {
            event.target.style.color = "black";
            event.target.style.fontSize = "13.333px";
            event.target.innerHTML = "Hint";
        }, 3000);
    }
}

//Callback function to handle click events on list items.
function handleClick(event) {
    const answer = event.target.classList[0]; //Checks for class of 'Correct' on clicked element
    const questionId = event.target.closest("ol").previousElementSibling.id; //Gets the id for the question associated with the list item by traversing the DOM up to the <h2> that contains the question ID.
    const resultBox = document.getElementById(responses[questionId].buttonId);  //Gets the button element associated with that question where the result will appear.

    if (answer === 'correct') { // If the <li> has a class of "correct"
        resultBox.style.display = "block"; //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "purple"; //Correct answer button text printed in purple
        resultBox.innerHTML = "Correct!"; //Correct answer text
    } else {
        resultBox.style.display = "block";  //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "red";  //Inorrect answer button text printed in red
        resultBox.innerHTML = responses[questionId].incorrect; //Incorrect answer text varies with question
    }
    setTimeout(function(){resultBox.style.display = "none"}, 3000); //Result button disappears in 3s
}
