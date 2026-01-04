

console.log("Welcome to My Journey Here I'm gonna show you the Logic For Prime or Not Prime Okay !! ");
let x = 1;
let number = 12;

for(let i =2;i<number;i++){
    if(number % i == 0){
        let x = 0;
    }
}
if(x){
    console.log(`this number is prime ${number}`);
}else{
    console.log(`this number isnt a prime okay !! `);
}
