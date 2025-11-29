function greet(name,callback){
    console.log('hello,${name}');
    callback();
}

function sayBye(){
    console.log("Good bye")
}

greet("Abhishek",sayBye);
