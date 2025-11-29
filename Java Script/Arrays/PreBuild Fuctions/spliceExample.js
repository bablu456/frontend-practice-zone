const { ChartNoAxesColumnIcon } = require("lucide-react")

let num = [1,2,3,4,5,6,7]


// adding multiple elements with the help of .splice()
console.log(num)
num.splice(2,0,20,30)
console.log(num)

// removing multiple elennts with the help of splice()

num.splice(2,1)
console.log(num)

// adding and removing elements together with the help of splice

num.splice(1,2,1000,2000,3000)
console.log(num)