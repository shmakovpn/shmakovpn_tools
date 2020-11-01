obj = Object.create({
    father: "George"
}, {
    son: {
        value: 'Igor',
        enumerable: true,
        configurable: true,
        writable: true
    }
})

for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
        console.log(`i=${i}, obj.i=${obj[i]}`)
    }
}