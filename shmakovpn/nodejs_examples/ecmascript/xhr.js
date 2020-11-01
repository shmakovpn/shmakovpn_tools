const url = 'data23.json';
const url2 = 'https://jsonplaceholder.typicode.com/usersSom';
const url3 = 'https://google.ru'

const url4 = 'https://jsonplaceholder.typicode.com/users';
// const xhr = new XMLHttpRequest();
// xhr.open('GET', url2);
// xhr.responseType = 'json';
// xhr.onload = () => {
//     console.log('xhr onload');
//     if(xhr.status > 400) {
//         console.error(`An ${xhr.status} error has ocurred`);
//     } else {
//         console.log(xhr.response);
//     }
// }
// xhr.onerror = () => {
//     // console.log(xhr.response);
//     console.error(new Error('An error has ocurred on the network level. '));
// }
// xhr.send();
// console.log('xhr sended');

const sendRequest = (method, url, data = null) => new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
        console.log('xhr promise onload')
        if(xhr.status > 400) {
            reject(xhr.status)
        } else {
            resolve(xhr.response)
        }
    }
    xhr.onerror = () => reject(xhr.status)
    xhr.send(JSON.stringify(data))
    console.log('xhr promise sent')
})
// const requestPromise = sendRequest(url4)
// requestPromise
//     .then(response => console.log(response))
//     .catch(status => console.error(new Error(`An error with status=${status} has occurred`)))

// const sendRequestAsync = async url => {
//     console.log(`async url=${url}`)
// }

async function sendRequestAsync(method, url, data = null){
    console.log(`async url=${url}`)
    try {
        const response = await sendRequest(method, url, data)
        console.log(response)
    } catch (e) {
        console.error(new Error(`An error with status ${e}`))
    }
}

const body = {
    name: 'Pavel',
    age: 35,
}

sendRequestAsync('POST', url4, body)

