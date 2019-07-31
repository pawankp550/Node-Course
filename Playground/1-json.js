const fs = require('fs')

// const book = {
//     title: 'The Secret',
//     author: 'Rhodes'
// }

// const bookJson = JSON.stringify(book);

// fs.writeFileSync('1-books.json', bookJson)

// const bookObj = JSON.parse(fs.readFileSync('1-books.json').toString())
// console.log(bookObj.title)

const dataJson = JSON.parse(fs.readFileSync('1-books.json').toString());
// console.log(dataJson)

dataJson.name = 'Andrew'
dataJson.planet = 'Mars'

fs.writeFileSync('1-books.json', JSON.stringify(dataJson))