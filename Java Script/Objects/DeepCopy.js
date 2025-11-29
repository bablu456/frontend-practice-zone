let obj = {person: {namee:"Rahul",age:30}}

let obj2 = JSON.parse(JSON.stringify(obj));

obj2.person.age = 40;

console.log(obj2)