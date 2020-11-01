const obj = {
    name: 'Pavel',
    age: 35,
    job: 'Fullstack'
}

const objEtries = Object.entries(obj)

console.log(Object.entries(obj))

console.log(Object.fromEntries(objEtries))

const map = new Map(objEtries)
console.log(map)
console.log(map.get('job'))

console.log(map.get('hx'))
