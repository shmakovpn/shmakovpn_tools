class Rect {
    constructor(public x: number, public y: number) {
    }
    get diag(): number {
        return Math.sqrt(this.x**2+this.y**2)
    }
    set diag(value: number) {
        const oldDiag: number = this.diag
        const k: number = value/oldDiag
        this.x = this.x*k
        this.y = this.y*k
    }
}

const rect = new Rect(2, 3)
console.log(`rect diag is ${rect.diag}`)
rect.diag = 44
console.log(`rect.x=${rect.x}, rect.y=${rect.y}`)

const rect2 = new Rect(24.4, 36.6)
console.log(`rect2.diag=${rect2.diag}`)

for(let i in rect) {
    // @ts-ignore
    console.log(`i=${i}, rect.i=${rect[i]}`)
}