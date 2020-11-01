function* firstGen() {
    yield 'hello'
    yield 'first'
    yield 'generator'
}

const gen = firstGen()
console.log(gen)

console.log(gen.next())
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())

const iterator = {
    [Symbol.iterator](n=10) {
        let i = 0
        return {
            next() {
                if (i < n) {
                    return {
                        value: ++i,
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}

for(let i of iterator) {
    console.log(`i=${i}`)
    // if (i>110 || i<0 || i === undefined){
    //     break
    // }
}