let arr = [1,2,3,4,5];

console.log(arr)

let newarr = arr.reduce((sum,value)=>{
    console.log("Sum : ",sum," , ","Value :",value)
    sum = sum + value;
    return sum;
},0)

// factorial 

let newar = arr.reduce((sum,value)=>{
    console.log("Sum : ",sum," , ","Value :",value)
    sum = sum * value;
    return sum;
},1)

console.log(newar)
