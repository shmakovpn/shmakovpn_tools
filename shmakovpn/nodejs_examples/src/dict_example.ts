interface DictObject<T> {
    [key: string]: T
}

class Dict<T> {
    protected _dict: DictObject<T> = {}

    constructor(obj?: DictObject<T>) {
        if(obj) {
            this._dict = obj
        }
    }

    push(key: string, value: T): void {
        this._dict[key] = value
    }

    item(key: string, defaultValue?: T): T {
        if(this._dict.hasOwnProperty(key)) {
            return this._dict[key]
        } else if(defaultValue) {
            return defaultValue
        }
        throw new Error(`Error, the key='${key}' doesn't exist in the object`)
    }

    assign(key: string, value: T): Dict<T> {
        this.push(key, value)
        return this
    }
}

const dict = new Dict<string>({a: 'hello', b: 'from', c: 'Dict'})
console.log(dict)
console.log(dict.item('v', 'something'))
console.log(dict.item('a'))

console.log(dict.assign('go', 'GO').assign('to', 'TO'))