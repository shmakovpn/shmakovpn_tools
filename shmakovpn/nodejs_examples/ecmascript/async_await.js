const delay = ms => new Promise(r => setTimeout(() => r(), ms))

function delay2(ms) {
    return new Promise(function (r) {
        setTimeout(function () {
            r()
        }, ms)
    })
}

const url = 'https://jsonplaceholder.typicode.com/todos'

function fetchTodos() {
    console.log('fetchTools')
    return delay(2000).then(() => {
        console.log('delayed')
        return fetch(url)
    }).then(response => {
        console.log('fetched')
        return response.json()
    })
}

async function fetchAsyncTodos () {
    await delay(2000)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}

fetchTodos()
    .then(data => console.log(data))
    .catch(e => console.error(e))
// console.log('begin')
//
// delay(2000).then(() => console.log('after 2 seconds'))

fetchAsyncTodos()