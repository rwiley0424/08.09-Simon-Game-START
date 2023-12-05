
const buttons = document.querySelectorAll('.simon-container button')

let playing = false;
let sequence = [];
let clicks = 0;
const h2 = document.querySelector('h2')

buttons.forEach(btn => btn.addEventListener('click', () => {
    if(btn.id == sequence[clicks]){
        clicks++;
        new Audio(`audio/${btn.id}.mp3`).play();
        h2.textContent = 'Correct! Keep Going!' + clicks
        if(clicks == sequence.length)serveBtn();
    }else{
    new Audio(`audio/sat-on-the-cat.mp3`).play();
    h2.textContent = 'Game Over! Press any key to play again.';
    sequence = [];
    playing = false;
    }
}))

document.addEventListener('keydown', () => {
    if(!playing) serveBtn();
    playing = true;
    h2.textContent = 'GAME ON!'     
});

function serveBtn(){ 
    let r = Math.floor(Math.random()* buttons.length);
    const btn = buttons[r]

    setTimeout(()=> {
        btn.style.opacity = '0';
        new Audio (`audio/${btn.id}.mp3`).play()
    },1000)
  
    setTimeout(() => btn.style.opacity = '1' ,1600)
    sequence.push(btn.id);
    clicks = 0;
}

// make the random button play its 'color-coded sound'
