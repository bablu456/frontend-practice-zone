let names = ["bablu","shalu","abhishek"]

console.log(names)

for(let i =0;i<names.length;i++){
    console.log(names[i]);
}

for(let i = 0;i<names.length;i++){
    console.log(names[i]);
    
    for(let k = 0;k<names[i].length;k++){
        console.log(names[i][k]);
    }
}