var times = document.querySelector(".timer");
var Button = document.querySelector(".start");
var Qhead = document.querySelector(".Qheader");
var theQ = document. querySelector(".theQuestion");
var SelectionA = document.querySelector(".selectionA");
var SelectionB = document.querySelector(".selectionB");
var SelectionC = document.querySelector(".selectionC");
var SelectionD = document.querySelector(".selectionD");
var Hiscore = document.querySelector(".Hi-Score");
var Q = 0 ;
var Ans = " ";
var secondLeft = 180;
var timerinterval;





Button.addEventListener("click", function (){
Q = 1;
settime();
addQuestion();


})



function addQuestion(){
    if( Q == 1){
        console.log(Q);
    Qhead.textContent = " Question# " + Q;
    theQ.textContent = " which one of these is a Bolean type  varible ";

    SelectionA.textContent = " var luck = True";
    SelectionB.textContent = " var luck = 23";
    SelectionC.textContent = " var luck = 45";
    SelectionD.textContent = " var luck = why";

    }
    if (Q == 2){
        console.log(Q);
        Qhead.textContent = " Question# " + Q;
        theQ.textContent = " which one of these is a integer type  varible? ";

        SelectionA.textContent = " var luck = True";
         SelectionB.textContent = " var luck = FALSE";
         SelectionC.textContent = " var luck = 45";
          SelectionD.textContent = " var luck = why"
    }

    if (Q == 3){
        console.log(Q);
        Qhead.textContent = " Question# " + Q;
        theQ.textContent = " which one of these is a HTML ELEMENT ?";



         SelectionA.textContent = " var luck = fales";
         SelectionB.textContent = " <P>";
         SelectionC.textContent = " var selection = null";
          SelectionD.textContent = " #steam ";
    }
     
    if (Q == 4){
        console.log(Q);
        Qhead.textContent = " Question# " + Q;
        theQ.textContent = " which one of these is a HTML ELEMENT ?";



        SelectionA.textContent = " <Body>";
         SelectionB.textContent = " Git bash ";
         SelectionC.textContent = " var selection = null";
          SelectionD.textContent = " #steam "


    }

    if (Q == 5){
        console.log(Q);
        Qhead.textContent = " Question# " + Q;
        theQ.textContent = " True of false  is it possible to add javescript code directly into an HTML page?";

        SelectionA.textContent = " False";
        SelectionB.textContent = "  ";
        SelectionC.textContent = "  ";
         SelectionD.textContent = " True "



    }

    if (Q == 6) {
        console.log(Q);
        Qhead.textContent = "Congratulations!";
        theQ.textContent = "Your Score is: " + secondLeft;
        // Assuming initials are collected here or elsewhere before this point
        saveScore(initials, secondLeft); // Correctly save the score with initials
        SelectionA.textContent = "See Hi-score";
        // Other selections are cleared or hidden as needed
    }

}



function answercheck() {
    let correct = false;
    if ((Q == 1 && Ans == "A") || (Q == 2 && Ans == "C") || (Q == 3 && Ans == "B") || (Q == 4 && Ans == "A") || (Q == 5 && Ans == "D")) {
        correct = true;
        Q++;
    } else {
        secondLeft -= 5; // Deduct time for wrong answer
    }
    if (Q <= 5) {
        addQuestion();
    } else {
        endGame(); // Ensure endGame is called when the last question is answered
    }
}


SelectionA.addEventListener("click", function(){
    Ans = "A";
    answercheck();
    
    
    })
  SelectionB.addEventListener("click", function(){
        Ans = "B";
        answercheck();
        
        })
 SelectionC.addEventListener("click", function(){
            Ans = "C";
            answercheck();
           
            })
  SelectionD.addEventListener("click", function(){
                Ans = "D";
                answercheck();
               
                })
                                        


                function settime() {
                    timerinterval = setInterval(function() {
                        secondLeft--;
                        times.textContent = "Time: " + secondLeft;
                        if (secondLeft <= 0 || Q == 6) {
                            clearInterval(timerinterval);
                            endGame();
                        }
                    }, 1000);
                }

// At the end of the game or when the timer reaches 0
function endGame() {
    clearInterval(timerinterval); // Stop the timer
    Qhead.textContent = "Game Over!";
    theQ.textContent = "Enter your initials: ";
    // Hide current question choices
    SelectionA.style.display = "none";
    SelectionB.style.display = "none";
    SelectionC.style.display = "none";
    SelectionD.style.display = "none";
    // Create input for initials
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id", "initials");
    document.body.appendChild(initialsInput);
    // Create a submit button for initials
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    document.body.appendChild(submitButton);
    
    submitButton.addEventListener("click", function() {
        var initials = document.getElementById("initials").value;
        saveScore(initials, secondLeft);
    });


submitButton.addEventListener("click", function() {
    console.log("Submit button clicked"); // Debugging line
    var initials = document.getElementById("initials").value;
    console.log("Initials: ", initials); // Debugging line
    saveScore(initials, secondLeft);
});

}

// Function to save score and initials to localStorage
function saveScore(initials, score) {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // Keep only the top 5 high scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Optionally, navigate to high scores page or display them
    displayHighScores();
}


function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var highScoreList = document.createElement("ul");
    highScores.forEach(function(score) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = `${score.initials} - ${score.score}`;
        highScoreList.appendChild(scoreItem);
    });

    var highScoreHeader = document.getElementById("highScoreHeader");
    if (highScoreHeader) {
        // Remove existing high score list to avoid duplication
        if (highScoreHeader.nextSibling) {
            highScoreHeader.parentNode.removeChild(highScoreHeader.nextSibling);
        }
        // Append the new high score list after the header
        highScoreHeader.parentNode.insertBefore(highScoreList, highScoreHeader.nextSibling);
    } else {
        console.error("highScoreHeader element not found.");
    }
}

