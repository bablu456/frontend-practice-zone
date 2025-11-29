let arr = [1,2,3,4,5];

console.log(arr)

let newarr = arr.map((value,index)=>{
    console.log(index," ,", value)
    return value * value;
});

console.log("New Array : ",newarr)

