
const heading = document.getElementById("message");
const button = document.getElementById("btn");

button.addEventListener("click",function(){
    heading.innerText = "Mission 300 Commits! ";
    heading.style.color = "green";
    console.log("Button clicked! ");
});
