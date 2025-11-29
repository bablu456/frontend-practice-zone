let ar = [1,2,3,4,5];

console.log(ar)

ar.forEach(callback)

function callback(value,index){
    console.log(index," , ",value)
}

ar.forEach((value,index)=>{
    console.log(index," ,",value);
});


ar.forEach(function(value,index){
    console.log(index," ,",value)
})