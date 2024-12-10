const cat = localStorage.getItem("lastVisited");
let sideMessage = document.querySelector('#message');


const msToDays = 86400000;
const theDateToday = new Date();

if(!cat){
    message="Welcome! Let us know if you have any questions.";
    localStorage.setItem("lastVisited", new Date());
}else{
    let lastVisitedDate = localStorage.getItem("lastVisited");
    lastVisitedDate = new Date(lastVisitedDate);
    console.log(lastVisitedDate)
    let daysleft = ( Date.now() - lastVisitedDate.getTime()) / msToDays;
    message = daysleft > 1 ?`You last visited ${daysleft} days ago.` : "Back so soon! Awesome!";
    localStorage.setItem("lastVisited", new Date());
}
sideMessage.innerHTML=message;