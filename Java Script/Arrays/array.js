let arr = [11,22,33,44,55];

console.log(arr)

console.log(arr[0])

for(let i =0;i< arr.length;i++){
    console.log(i," : ",arr[i]);
}

let sum = 0;

for(let i=0;i<arr.length;i++){
    sum = sum + arr[i];

}
console.log(sum)
console.log()

for(let i = arr.length-1;i>=0;i--){
    console.log(arr[i]);
}