const myName: string = 'Me';
console.log(`Hello ${myName}`);

const btn: Element|null = document.querySelector('#btn')

if(btn) {
    btn.addEventListener('click', () => {
        console.log('pressed')
    })
}

// generic types
const cars: string[] = ['volvo', 'lada']
const cars2: Array<string> = ['zaz', 'vaz', ]

const promise = new Promise<string>(resolve => {
    setTimeout(() => {
        resolve('Promise resolved')
    }, 2000)
})

promise.then(data => {
    console.log(data)
})

function mergeObjects<T extends object, R extends object>(a: T, b: R): T & R {
    return Object.assign({}, a, b)
}

const merged = mergeObjects({name: 'shmakovpn'}, {age: 35})
console.log(merged.age)

//

interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T): {value: T, count: string} {
    return {
        value,  // es6 shortcut, this the same as value: value
        count: `There are ${value.length} characters in the object`
    }
}

console.log(withCount('hello typescript'))

//

function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R): any {
    return obj[key]
}

//
class Collection<T extends string|number|boolean> {
    constructor(private _items: T[] = []) {
    }

    add(item: T) {
        this._items.push(item)
    }

    remove(item: T) {
        this._items = this._items.filter(i => i !== item)
    }

    get items(): T[] {
        return this._items
    }
}

const strings = new Collection<string>(['I', 'am', 'Strings'])
strings.add('!')
strings.remove('am')
console.log(strings.items)

const numbers = new Collection<number>([1, 2, 3])

// const objs = new Collection<object>([{a: 1}, {b: 2}])
// objs.remove({b: 2})
// console.log(objs.items)

interface ICar {
    model: string
    year: number
}

function crateAndValidateCar(model: string, year: number): ICar {
    const car: Partial<ICar> = {}
    if(model.length>3){
        car.model=model
    }
    if(year>2000){
        car.year=year
    }
    return car as ICar
}

const ford: Readonly<ICar> = {
    model: 'Ford',
    year: 2016
}

// ford.model = 'Ferrary'

//
const my_cars: Readonly<Array<string>> = ['Mersedes', 'Lada']
// my_cars.shift()
console.log(`my_cars=${my_cars}`)

