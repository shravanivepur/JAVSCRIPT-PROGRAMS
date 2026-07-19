function greet(){
    console.log("Hello");
};
greet();

function add(amount,tax){
return amount + tax;
}
console.log(add(500,300));


let addition=function(a,b){
    return a + b;
};
console.log(addition(10,20));

//Arrow function

let greeting =(name)=>{
    return name;

};
console.log(greeting("shravani"));

//Default parameters

function def(name="guest"){
    console.log("hello" + name);
};
def();
def("shravani");


let multiply=(a=1,b=2)=>a*b;
console.log(multiply());
console.log(multiply(20,80));

//callback function
function gret(name,callback){
    console.log("Hello" + name);
}
function  saybye(){
    console.log("good bye");
};
gret("shravani",saybye);
saybye();

//call back with anonymous function
function calculate(a,b, callback){
    return callback(a,b);
}
let results=calculate(11,5 ,function(x,y){
    return x+y;
});
console.log(results);

//callback with asynchronous function
console.log("Start");
setTimeout(function(){
    console.log("execute after 2 seconds");
},2000);
console.log("End");

//Higher order function
function hi(name){
    console.log("hello" + name);
}
function process(callback){
    callback("shravani");
};
process(hi);
//
function multi(num){
    return function(value){
        return num*value;
    };
}
let double = multi(2);
console.log(double(5));

//binding
let person={
    name:"shravani",
      great(){
        console.log(this.name);
    }
    };
    person.great();

    // call example
    function hello(city,country){
        console.log("hello" + " I am " +  this.name + " from " + city + "," + country);
    }
let son={
    name:"madhav"
}
hello.call(son,"hydearabad","India");

//apply()
hello.call(son,["hydearabad","India"]);

//bind
function grt(){
    console.log("hello " + this.name);
}
let per={
    name:"shravani"
}
let newfunction=grt.bind(per);
newfunction();