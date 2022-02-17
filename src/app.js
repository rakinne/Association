const fetch = require('node-fetch')

const link = 'http://data.nba.net/10s/prod/v1/today.json'
const startOfLink = 'http://data.nba.net'

async function _fetch(link) {
    const res = await fetch(link)
    const data = await res.json()
    return data
}

function giveToFetch(link) {
    return _fetch(link)
}

async function main() {
    try {
        const response = await giveToFetch(link);
        const link1 = Object.assign({}, response.links)

        console.log(startOfLink + link1.playoffsBracket)

    } catch(err) {
        console.log('Error caught : ', err)
    }
    
}

main()
