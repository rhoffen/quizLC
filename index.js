const q1Data = questionData.q1;

const q1 = document.getElementById("q1");
const q1o1 = document.getElementById("q1o1");
const q1o2 = document.getElementById("q1o2");
const q1o3 = document.getElementById("q1o3");

const optionListq1 = [q1o1, q1o2, q1o3];

q1.innerHTML = '1) '  + q1Data.question;
q1o1.innerHTML = 'a. '  + q1Data.option1[0];
q1o2.innerHTML = 'b. '  + q1Data.option2[0];
q1o3.innerHTML = 'c. '  + q1Data.option3[0];

for (let index = 1; index <= optionListq1.length; index++) {
    let element = optionListq1[index-1];
    let optionKey = 'option' + index;
    let option = q1Data[optionKey];
    
    if (option[1]) {
        console.log(option);
        element.classList.add("correct");
        console.log(element.classList);
    }
}
//Add event listener for hint buttons
const hints = document.querySelectorAll(".hint");
//console.log(hints);
hints.forEach(hint => addEventListener("click", handleHint));

//Add an event listener to each list item to detect clicks
const guesses = document.querySelectorAll("li");
guesses.forEach(guess => addEventListener("click", handleClick));

//Response object to hold properties for different questions. Eventually, all the questions and answers will be stored in database fields.
const responses = {
    // "q1": {
    //     incorrect: "Incorrect.  Purple Rain was the best album of 1983!",
    //     buttonId: "result1"
    // },
    "q2": {
        incorrect: "Incorrect.  Darryl McDaniels is the DMC of Run-DMC.",
        buttonId: "result2"
    }
}

//Callback function to handle hint requests
function handleHint(event) {
    const id = event.target.id;
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
    console.log(event.target);
    
    const answer = event.target.classList[0]; //Checks for class of 'Correct' on clicked element
    console.log(answer);
    
    const questionId = event.target.closest("ul").previousElementSibling.id; //Gets the id for the question associated with the list item by traversing the DOM up to the <h2> that contains the question ID.
    const resultBox = document.getElementById(questionData[questionId].resultBoxId);  //Gets the button element associated with that question where the result will appear.  

    if (answer === 'correct') { // If the <li> has a class of "correct"
        resultBox.style.display = "block"; //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "purple"; //Correct answer button text printed in purple
        resultBox.innerHTML = "Correct!"; //Correct answer text
    } else {
        resultBox.style.display = "block";  //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "red";  //Inorrect answer button text printed in red
        resultBox.innerHTML = questionData[questionId].incorrectText; //Incorrect answer text varies with question
    }
    setTimeout(function(){resultBox.style.display = "none"}, 3000); //Result button disappears in 3s
}
