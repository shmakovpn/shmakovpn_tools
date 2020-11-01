new Promise( resolve => {
    setTimeout(()=>{
        resolve('one')
    }, 1000)
}).then(data => {
    console.log(`data=${data}`)
    return new Promise( resolve => {
        setTimeout(() => {
            resolve('two')
        }, 1000)
    })
}).then(data => {
    console.log(`data=${data}`)
    return new Promise( resolve => {
        setTimeout( () => {
            resolve('three')
        }, 1000)
    })
}).then(data => {
    console.log(`data=${data}`)
}).finally(() => {
    console.log('Finished')
})

obj1 = {}