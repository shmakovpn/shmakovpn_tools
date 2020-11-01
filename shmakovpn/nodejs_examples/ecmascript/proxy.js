const person = {
    name: 'Box',
    age: 34,
    job: 'Fullstack',
}

const op = new Proxy(person, {
    get(target, prop) {
        console.log(`Getting prop ${prop}`)
        if(prop in target) {
            return target[prop]
        }
        return prop.split('_').map(p => target[p]).join(' ')
    },
    set(target, prop, value) {
        console.log(`Setting prop=${prop}, value=${value}`)
        target[prop] = value
    },
    has(target, prop) {
        console.log(`has prop=${prop}`)
        if(['name', 'age', 'job'].includes(prop)) {
            return true
        }
        return false
    },
    defineProperty(target, prop ) {
        console.log(`deleting prop=${prop}`)
        delete target[prop]
        return true
    }
})

console.log(op)
console.log(op.name_age_job)

// Functions
const log = text => `Log: ${text}`

const fp = new Proxy(log, {
    apply(target, thisArg, argArray) {
    }
})

// Classes
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

const PersonProxy = new Proxy(Person, {
    construct(target, argArray, newTarget) {
        console.log('Construct...')
        return new Proxy(new target(...argArray), {
            get(target, p, receiver) {
                console.log(`get ${p}`)
                return target[p]
            }
        })
    }
})

// Wrapper
const withDefaultValue = (target, defaultValue) => new Proxy(target, {
    get: (obj, p, receiver) => p in obj ? obj[p] : defaultValue
})

const position = withDefaultValue({
    x: 24,
    y: 33
}, -1)

console.log(position.z)