
function ready(){
    var sound = new Audio();
    sound.src="/sound/ready.mp3";
    sound.play();
}
// Global Variable Declarations 
blackjack={
    'YOU':{
        "your_score":0,
        "win":0,
        "loose":0,
        "draw":0,
        "brust":1
    },
    'PC':{
        "pc_score":0,
        "brust":1
    }
};
const you= blackjack["YOU"];
const pc =blackjack["PC"];

// Array Of Images
var all_card=["img/a.png","img/2.jpg","img/3.png","img/4.jpg","img/5.jpg","img/6.jpg","img/7.png","img/8.jpg","img/9.jpg","img/10.png","img/joker.png","img/king.jpg","img/queen.jpg"];

var chance=0;
var ramdom=0;

// Onclik Hit Function 
document.querySelector("#hit").addEventListener("click",hit_f);

function hit_f(){
    var sound=new Audio("/sound/onhit.mp3").play();
    let img=document.createElement("img");
    var num=Number(Math.floor(Math.random()* all_card.length));
    img.src=all_card[num];
    let src=document.getElementById("your-card");            
    src.appendChild(img);
    if (num==0){
        you.your_score=you.your_score+11;
        document.getElementById("your-score").innerHTML=you.your_score;
    }
    if (num==10 | num==11 | num==12){
        you.your_score=you.your_score+10;
        document.getElementById("your-score").innerHTML=you.your_score;      
    }
    else{
        you.your_score=you.your_score+(num+1);
        document.getElementById("your-score").innerHTML=you.your_score;
    }
    if (you.your_score>21){
        console.log("You Brust..");
        you.brust=0;
        document.getElementById("you-brust").innerHTML="<h2>BRUST</h2>";
        deal();
   }
}

// Check Score Function 
function check_score(){
    console.log(you.your_score);
    console.log(pc.pc_score);
    if(you.brust==0 && pc.brust==0){
        you.draw=you.draw+1;
        document.getElementById("draws").innerHTML=you.draw;
        console.log("Both Brust",you.draw);
    }
    else if(you.your_score==pc.pc_score){
        you.draw=you.draw+1;
        document.getElementById("draws").innerHTML=you.draw;
        console.log("Both Same",you.draw);
    }
    else if (you.brust==0 && pc.brust==1){
        you.losse=you.loose+1;
        document.getElementById("loss").innerHTML=you.loose;
        var sound=new Audio("/sound/loose.mp3").play();
        console.log("You Brust Pc Safe",you.loose);
        you.brust=1;
        pc.brust=1;
    }
    else if (pc.brust==0 && you.brust==1){
        console.log("jk");
        you.win=you.win+1;
        document.getElementById("win").innerHTML=you.win;
        var sound=new Audio("/sound/win.mp3").play();
        console.log("Pc Brust You Safe",you.win);
        you.brust=1;
        pc.brust=1;
    }
    else if (you.your_score>pc.pc_score && pc.brust==1 && you.brust==1){
        you.win=you.win+1;
        document.getElementById("win").innerHTML=you.win;
        var sound=new Audio("/sound/win.mp3").play();
        console.log("You Greater",you.win);
    } 
    else if (you.your_score<pc.pc_score && pc.brust==1 && you.brust==1){
        you.win=you.loose+1;
        document.getElementById("loose").innerHTML=you.loose;
        var sound=new Audio("/sound/loose.mp3").play();
        console.log("You loose",you.loose);
    }
    else{
        you.loose=you.loose+1;
        document.getElementById("loss").innerHTML=you.loose;
        var sound=new Audio("/sound/loose.mp3").play();
        console.log("You Loose",you.loose);
    }
}


// Restart Fuction 
document.querySelector("#restart").addEventListener("click",reset_all);
function reset_all(){
    you_restart();
    pc_restart();
}
function you_restart(){
    let images=document.querySelector("#your-card").querySelectorAll("img");
    for( let i=0;i<images.length ;i++){
    images[i].remove();
    }
    document.querySelector("#your-score").innerHTML=0;
    document.querySelector("#you-brust").innerHTML="";
    you.your_score=0;
    you.brust=1;
}
function pc_restart(){
    let images=document.querySelector("#pc-card").querySelectorAll("img");
    for( let i=0;i<images.length ;i++){
    images[i].remove();
    }
    document.querySelector("#pc-score").innerHTML=0;
    document.querySelector("#pc-brust").innerHTML="";
    pc.pc_score=0;
    pc.brust=1;
}

// Calling PC functions
document.querySelector("#deal").addEventListener("click",deal);
function deal(){
    var chance=0;
    var ramdom=0;
    window.random=setInterval(get_card,1000);
}

// Fuction For get Random Card Computer
function get_card(){
    new Audio("/sound/onhit.mp3").play();
    window.chance=chance+1;
    console.log(chance);
    let num=Number(Math.floor(Math.random()* all_card.length)); //Here Is Problem
    if (num==0){
        pc.pc_score = pc.pc_score+11;
        document.getElementById("pc-score").innerHTML=pc.pc_score;
    }
    if (num==10 | num==11 | num==12){
        pc.pc_score = pc.pc_score+10;
        document.getElementById("pc-score").innerHTML=pc.pc_score;      
    }
    else{
        pc.pc_score = pc.pc_score+(num+1);
        document.getElementById("pc-score").innerHTML=pc.pc_score;
    }
    if (window.chance==3 || pc.pc_score>21) {
        clearInterval(window.random);
        if (pc.pc_score>21){
            pc.brust=0;
        document.getElementById("pc-brust").innerHTML="<h1> BRUST</h1>";
        }
        window.chance=0;
        check_score();
       }
    let img=document.createElement("img");
    img.src=all_card[num];
    let src=document.getElementById("pc-card");            
    src.appendChild(img);  
}

