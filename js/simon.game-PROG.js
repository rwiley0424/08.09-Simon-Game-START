// ALGORITHM..?
// grab all 4 buttoms in the simon container
// get em into an array of 4 elements(node list)
const buttons = document.querySelectorAll('.simon-container button')
let playing = false;//a boolean to keep track of whether game is alrady// playing or not  cuz only want keydown to happen if game is not playing (false)

// array to keep track of random btns; do this by saving btn color
let sequence = [];//an array to store sequence of randomly served buttons
let clicks = 0;//keep track of user button clicks to compare to sequence index
const h2 = document.querySelector('h2')//get teh h2 for providing feedback

// make each button clickable, to start just log the color which is the inof the button:
buttons.forEach(btn => btn.addEventListener('click', () => {
// check if this is the correct btn, does it line up w btnSequence
    if(btn.id == sequence[clicks]){//user clicked correct btn
        clicks++;//increment clicks with each user btn
        // if user has clicked through entire sequence correctly serve new btn:
        new Audio(`audio/${btn.id}.mp3`).play();//play sound with button click
        h2.textContent = 'Correct! Keep Going!' + clicks
        if(clicks == sequence.length)serveBtn();
    }else{//game over user clicked wrong button (not in sequence)
        new Audio(`audio/sat-on-the-cat.mp3`).play();
        h2.textContent = 'Game Over! Press any key to play again.';
        // NEW GAME RESET
        sequence = [];//reset the sequence for a new game
        playing = false;//toggle boolean so that 'keydown' starts new game
    }
}))

// GAME ON ! press any key to start game;
//  one of the 4 buttons flash.. this is user's cue to click the same button

// document lesten for key -- any key--and runs makes button flash when 
// any key is clicked -- flash consists of .5 sec delay before 
// rand btn vanishes then another .5 sec later, button reappears (opacity -- not display:none)

// start game by hitting any key once
// that generates a rand button but for next radn btn, user does not hit key
// all subsequent rand btns happend automatically


document.addEventListener('keydown', () => {
    if(!playing) serveBtn();
    playing = true;
    h2.textContent = 'GAME ON!'
      
});

function serveBtn(){
    let r = Math.floor(Math.random()* buttons.length);//0-3
    const btn = buttons[r]
// 1.0 sec delay then rand btn vanishes
    setTimeout(()=> {
        btn.style.opacity = '0';
        new Audio (`audio/${btn.id}.mp3`).play()
        // play btn sound
    // const sound = new Audio()
    // sound.src = `audio/${btn.id}.mp3
    // play.sound() 

    },1000)
    //.6 sec later, button reappears
    setTimeout(() => btn.style.opacity = '1' ,1600)
    // save the color of the served btn to the sequence arr:
    sequence.push(btn.id);//'green', 'red','green'...etc.
    clicks = 0;//user's turn to try to replicate sequence so reset clicks 
}

// make the random button play its 'color-coded sound'
