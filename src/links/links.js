// While developing the 'Links' class, I will be using fetch to interact with
// json NBA API
// Once ready for production, I will inject dependencies into my links class
// Dependencies :  All links serviced by the 'Links' class
// Author : Rakinne Foote
 
const START_OF_LINK = 'http://data.nba.net';


class Links
{
    constructor(links)
    {
        this.links = links
    }

    getAllLinks() {
        return this.links;
    }

}

async function linkWork()
{
    const fetch = require('node-fetch')

    try {
        let data = await giveToFetch('http://data.nba.net/10s/prod/v1/today.json');
        let linksKeyValue = Object.assign({}, data.links)
        
        let links = new Links(linksKeyValue)

        return links

    } catch(err) {
        console.log('Error retrieving data from fetch OR Error Constructing Links Object : ' , err);
    }

    async function _fetch(link) { 
        const res = await fetch(link)
        const data = await res.json()
        return data
    }

    function giveToFetch(link) {
        return _fetch(link)
    }
}

async function main() {
    let links = await linkWork();
    console.log('logging : ', links.getAllLinks())
}


main()