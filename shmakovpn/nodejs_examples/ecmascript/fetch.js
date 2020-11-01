console.log(`Hello`)

const sendRequest = (method, url, data = null) => {
    const headers = {
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers
    })
        .then(response => response.json())
        .catch(err => err)
}

const body = {
    name: 'Pavel',
    age: 34,
}

sendRequest('POST', 'https://jsonplaceholder.typicode.com/users', body)
    .then(response => console.log(response))
    .catch(err => console.error(new Error(err)))


