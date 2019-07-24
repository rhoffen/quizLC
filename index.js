//List of question identifiers
const keyList = Object.keys(questionData);

//Construct array of multiple choice option identifiers
let optionList = [];

for (let index = 0; index < keyList.length; index++) {
    optionList[index] = [];
    for (let j = 0; j < 3; j++) {
        optionList[index][j] = `${keyList[index]}o${j+1}`;
    }
}

//For each question in the questionData object, create an <h2> element with the question text and append it to <body>
for (let index = 0; index < keyList.length; index++) {
    const h2Element = document.createElement("H2"); //Create an <h2> element
    const questionId = keyList[index]; //Set the ID attribute to q1, q2, etc.
    h2Element.setAttribute("id", questionId);
    const questionText = `${index+1}. ${questionData[keyList[index]].question}`; //Have question items be numbered sequentially and retrieve text from questionData object
    const h2Text = document.createTextNode(questionText); //Set the question text as a textnode
    h2Element.appendChild(h2Text); //Append the text to the <h2> element
    document.body.appendChild(h2Element); //Append the <h2> element to the document body

    //Create a <ul> element and append it to the question
    const list = document.createElement("ul"); //Create an unordered list element
    const listId = `list${keyList[index]}`; //Set the ID attribute of the list to "listq1, listq2, etc."
    list.setAttribute("id", listId); 
    document.getElementById(questionId).appendChild(list); //Append the list as a child of the question

    //Create a <li> item for each option
    for (let j = 0; j < optionList[index].length; j++) {
        const option = document.createElement("LI"); //Create <li> element
        const listItemId = optionList[index][j]; //Set the ID attribute of each list item with the option strings constructed for the optionList above
        option.setAttribute("id", listItemId);
        const optionKey = `option${j+1}`; //Construct a string to match the option keys in the questionData object
        const optionText = `${String.fromCharCode(97 +j)}) ${questionData[keyList[index]][optionKey][0]}`; //Set the text to a) first choice, b) second choice, etc.
        const listnode = document.createTextNode(optionText); //Make a text node from the option text
        option.appendChild(listnode); //Insert text into <li> element
        document.getElementById(listId).appendChild(option); //Attach list item to <ul> element

        //Add the .correct class to each of the correct answers
        const correct = questionData[keyList[index]][optionKey][1];
        if (correct) {
            option.classList.add("correct");
        }
    }

    //Create a hint button for each question
    const hintButton = document.createElement("BUTTON");
    const hintButtonId = `hint${index+1}`;
    hintButton.setAttribute("id", hintButtonId);
    hintButton.classList.add("hint");
    const hintButtonText = document.createTextNode("Hint");
    hintButton.appendChild(hintButtonText);
    document.body.appendChild(hintButton);
}

//Add an event listener to each list item to detect clicks
const guesses = document.querySelectorAll("li");
guesses.forEach(guess => addEventListener("click", handleClick, false));

//Add event listener for hint buttons
const hints = document.querySelectorAll(".hint");
hints.forEach(hint => addEventListener("mousedown", handleHint, false));


//Callback function to handle hint requests
function handleHint(event) {
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
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
    event.preventDefault();
    event.stopPropagation();
    const answer = event.target.classList[0]; //Checks for class of 'Correct' on clicked element
    const targetQuestionId = event.target.closest("h2").id; //Gets the id for the question associated with the list item by traversing the DOM up to the <h2> that contains the question ID.
    const resultBox = document.createElement("BUTTON");

    resultBox.classList.add("result");
    document.getElementById(targetQuestionId).appendChild(resultBox);

    if (answer === 'correct') { // If the <li> has a class of "correct"
        resultBox.style.display = "block"; //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "purple"; //Correct answer button text printed in purple
        resultBox.innerHTML = "Correct!"; //Correct answer text
    } else {
        resultBox.style.display = "block";  //Change display to "block" (from 'none' in the CSS file)
        resultBox.style.color = "red";  //Inorrect answer button text printed in red
        resultBox.innerHTML = questionData[targetQuestionId].incorrectText; //Incorrect answer text varies with question
    }
    setTimeout(function(){resultBox.style.display = "none"}, 3000); //Result button disappears in 3s
}
