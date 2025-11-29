const { ChartNoAxesColumnIcon } = require("lucide-react");

let car = {
    brand : "Tesla",
    model : "Model S ",
    year : 2023
};
// let car = new Object();

car.brand = "Tata";
car.model = "Siera"
car.year = 2025

console.log(car)

// lets use objects properties okay 

console.log(car.brand)
console.log(car.model)
console.log(car.year)

// for dynamic key and special charachter

console.log(car["brand"])

let obj = {"full name": "Bablu"}
console.log(obj["full name"])