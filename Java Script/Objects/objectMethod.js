let student = {
    namee : "Ravi",
    greet : function(){
        console.log('Hello my name is {this.name}')
    }
};

student.greet();

// this refers to the object that calls the method