const people = [
    {name: 'Ivan', age: 23, score: 43},
    {name: 'John', age: 21, score: 45},
    {name: 'Bix', age: 34, score: 55},
    {name: 'Eva', age: 32, score: 42},
    {name: 'Lorry', age: 51, score: 18}
]

console.log(people)

const url = 'https://jsonplaceholder.typicode.com/todos'
fetch(url).then(response => response.json()).then(data => {
    console.log(data)
})