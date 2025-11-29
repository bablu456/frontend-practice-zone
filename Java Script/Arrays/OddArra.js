let arr = [1,2,3,4,5,6,7,8]

let newarr = arr.map((Value,index)=>{
    if(Value % 2==1){
        return Value;
    }
    
});
console.log(newarr);