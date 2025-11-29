let arr = [1,2,3,4,5,6]

console.log(arr)

let newarr = arr.filter((Value,index)=>{
    console.log(index," , ",Value);
    return Value % 2 == 0
});

console.log(newarr)

// let newar = arr.filter(Value,index)=>Value%2==0;

