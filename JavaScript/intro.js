

const user = {
    fullName: "Bablu Kumar",
    role: "Full Stack Developer",
    isHardWorking: true,
    skills: ["Java","Spring Boot","SQL"]
};

function introduceUser(person){
    console.log("Hello I am , "+person.fullName);
    console.log("I work As "+person.role);
    console.log("My Skills Are "+person.skills);

    if(person.isHardWorking){
        console.log("I Commit code Daily! ");
    }
}

introduceUser(user);