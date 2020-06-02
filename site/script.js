
const cards = document.querySelectorAll('.memory-card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let score=0;
let action;
let timeremaining;
let playing=false;
let audio;
let i=0;

document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload();  //reload page
    }else{
    	playing=true;
    	document.getElementById("startreset").innerHTML="Reset";

var audio = new Audio('audio.mp4');
audio.play();
    


timeremaining=80;
document.getElementById("timevalue").innerHTML=timeremaining;
startCountdown();


function flipCard(){

	
	hide("gameOver");
	if(lockBoard) return;
	if(this === firstCard) return;
	this.classList.toggle('flip');

	if(!hasFlippedCard){
		//first click
		hasFlippedCard=true;
		firstCard = this;

	}else{
		//second click
		hasFlippedCard=false;
		secondCard=this;
		checkForMatch();
	}
	
}




function checkForMatch(){
	//do cards match?
		// console.log(firstCard.dataset.framework);
		// console.log(secondCard.dataset.framework);

		let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
		isMatch ? disableCards() : unflipCards();

		
	       
        

}




function disableCards(){
	firstCard.removeEventListener('click',flipCard);
	secondCard.removeEventListener('click',flipCard);
	resetBoard();
	score++;
	document.getElementById("scorevalue").innerHTML=score;
	if(score==6){
		show("gameOver");
		document.getElementById("gameOver").innerHTML="<p>Game Over!</p><p>Your score is " + score + "</p>";
		audio.pause();
        audio.currentTime = 0;
        stopCountdown();
	}
}

function unflipCards(){
	lockBoard=true;
	setTimeout(() => {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			lockBoard=false;
			resetBoard();
		},1500);
	
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle(){
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random()*12);
		card.style.order=randomPos;
	});
})();

cards.forEach(card => card.addEventListener('click',flipCard));

function startCountdown(){
            action= setInterval(function(){
              timeremaining-=1;
              document.getElementById("timevalue").innerHTML=timeremaining;
              if(timeremaining==0){
                //game over
                clearInterval(action);
                stopCountdown();
                show("gameOver");
                document.getElementById("gameOver").innerHTML="<p>Game Over!</p><p>Your score is " + score + "</p>";
                audio.pause();
                audio.currentTime = 0;
                
              }

            },1000)

          }
          //STOP COUNTER
          function stopCountdown(){
            clearInterval(action);
          }
//HIDE AN ELEMENT
          function hide(Id){
            document.getElementById(Id).style.display="none";
          }
// SHOW AN ELEMENT
          function show(Id){
            document.getElementById(Id).style.display="block";
          }


      }
  }