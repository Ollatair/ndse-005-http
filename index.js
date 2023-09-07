require('dotenv').config()
const http = require('http')
const config = require('./config');

const myAPIKey = process.env.myAPIKey || config.myAPIKey;
const city = process.argv[2] || config.defaultCity; 

const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`

http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})