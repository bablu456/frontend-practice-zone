let user = {namee : "Bablu", age:28};
let {name,age} = user

// here we are extracting values into variables okay

let {namee : userName,age:userAge} = user
console.log(userName)

// Destructing simplifies accessing properties