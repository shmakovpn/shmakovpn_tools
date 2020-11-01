// function sum(a,b){
//     return a+b;
// }

// function cube(a){
//     return a**3;
// }

//const sum = (a,b) => {return a+b}
const sum=(a,b)=>a+b
//const cube = (a) => {return a**3}
//const cube = a => {return a**3}
const cube=a=>a**3
console.log(sum(2,5))
console.log(cube(3))

// Context
function myLog() {
    console.log(this)
}

const arrowLog = () => console.log(this)
//
// myLog() // prints a not empty object
// arrowLog()  // prints an empty object

const person = {
    name: 'Elena',
    age: 20,
    log: myLog,
    arrowLog: arrowLog
}

person.log()  // prints a not empty object
person.arrowLog()  // prints an empty object