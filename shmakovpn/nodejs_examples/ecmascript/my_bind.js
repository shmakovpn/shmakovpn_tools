function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {
    name: 'Mike',
    age: 22,
    job: 'Frontend'
}

const person2 = {
    name: 'Eva',
    age: 19,
    job: 'student',
}

function bind(obj, fn) {
    const localObj = {
        ...obj,
        fn
    }
    return function (...args) {
        localObj.fn(...args)
    }
}

function bind2(obj, fn) {
    const localObj = Object.create(obj, {
        fn: {
            value: fn
        },
    })
    return function (...args) {
        localObj.fn(...args)
    }
}

function bind3(obj, fn) {
    return function (...args) {
        fn.apply(obj)
    }
}

const logPerson1 = bind(person1, logPerson)
const logPerson2 = bind(person2, logPerson)

const logPerson3 = bind2(person1, logPerson)
const logPerson4 = bind2(person2, logPerson)

const logPerson5 = bind3(person1, logPerson)
const logPerson6 = bind3(person2, logPerson)


person1.age = 222
person2.age = 219

logPerson1()  // prints old value 22
logPerson2()  // prints old value 19

logPerson3()  // prints ok value 222
logPerson4()  // prints ok value 219

logPerson5()  // prints ok value 222
logPerson6()  // prints ok value 219

