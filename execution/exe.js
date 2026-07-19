
//call stack(LIFO)
function takeorder(){      
    preparefood();
}
function preparefood(){
    servefood();
} 
function servefood(){
    console.log("food is seved");
} 
takeorder();  


//varaible Environment
let x=10;
function demo(){
    let y=20;
    console.log(x);
    console.log(y);
};
demo();


//lexical environment
let a=100;
function first(){
    b=200;
    function second(){
        c=300;
        d=a+b+c;
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    
    }
    second();
}
first();



//scope
//global scope
let name="shravani"
function person(){
    console.log(name);
}
person();
console.log(name);



//function scope
function son(){
    let age=23;
    console.log(age);
}
son();


//block scope
{
    let city = "hyderabad";
    console.log(city);
};


{
    let x = 10;
    let y = 20;
    let z = 30;
   let result = x+y+z;
   console.log(result); 
};


function van(){
    let x=15;
    console.log(x);
}
van();




