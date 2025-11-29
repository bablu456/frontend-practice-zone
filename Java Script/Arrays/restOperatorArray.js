function sum(a,b,...arr){
    console.log("a : ",a," b : ",b);
    let s = 0;
    for(let i=0;i<arr.length;i++){
        s = s + arr[i];
    }
    console.log(s);
}

sum(1,2,3,4,5)