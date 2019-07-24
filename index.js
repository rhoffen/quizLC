const q1Data = questionData.q1;
const q2Data = questionData.q2;

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

for (let index = 0; index < keyList.length; index++) {
    const node = document.createElement("H2");
    node.setAttribute("id", keyList[index]);
    const textnode = document.createTextNode(questionData[keyList[index]].question);
    node.appendChild(textnode);
    document.body.appendChild(node);
    for (let j = 0; j < optionList[index].length; j++) {

        
    }   
}

const q1 = document.getElementById("q1");
const q1o1 = document.getElementById("q1o1");
const q1o2 = document.getElementById("q1o2");
const q1o3 = document.getElementById("q1o3");

const q2 = document.getElementById("q2");
const q2o1 = document.getElementById("q2o1");
const q2o2 = document.getElementById("q2o2");
const q2o3 = document.getElementById("q2o3");

const optionListq1 = [q1o1, q1o2, q1o3];
const optionListq2 = [q2o1, q2o2, q2o3];

q1.innerHTML = '1) '  + q1Data.question;
q1o1.innerHTML = 'a. '  + q1Data.option1[0];
q1o2.innerHTML = 'b. '  + q1Data.option2[0];
q1o3.innerHTML = 'c. '  + q1Data.option3[0];

q2.innerHTML = '2) '  + q2Data.question;
q2o1.innerHTML = 'a. '  + q2Data.option1[0];
q2o2.innerHTML = 'b. '  + q2Data.option2[0];
q2o3.innerHTML = 'c. '  + q2Data.option3[0];

for (let index = 1; index <= optionListq1.length; index++) {
    let element = optionListq1[index-1];
    let optionKey = 'option' + index;
    let option = q1Data[optionKey];
    
    if (option[1]) {
        element.classList.add("correct");
    }
}

for (let index = 1; index <= optionListq2.length; index++) {
    let element = optionListq2[index-1];
    let optionKey = 'option' + index;
    let option = q2Data[optionKey];
    
    if (option[1]) {
        element.classList.add("correct");
    }
}
//Add event listener for hint buttons
const hints = document.querySelectorAll(".hint");
//console.log(hints);
hints.forEach(hint => addEventListener("click", handleHint));

//Add an event listener to each list item to detect clicks
const guesses = document.querySelectorAll("li");
guesses.forEach(guess => addEventListener("click", handleClick));


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
    const answer = event.target.classList[0]; //Checks for class of 'Correct' on clicked element
    
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
