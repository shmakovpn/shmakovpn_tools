class ExtendedArray<T> extends Array<T> {
    assign(newElement: T): ExtendedArray<T> {
        this.push(newElement)
        return this
    }
}

const ea = (new ExtendedArray<string>())
    .assign('hello')
    .assign('world')
    .assign('from')
    .assign('my')
    .assign('first')
    .assign('ExtendedArray')

console.log(ea)