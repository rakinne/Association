// While developing the 'Links' class, I will be using fetch to interact with
// json NBA API
// Once ready for production, I will inject dependencies into my links class
// Dependencies :  All links serviced by the 'Links' class
// Author : Rakinne Foote
 
const START_OF_LINK = 'http://data.nba.net';


class Links
{
    constructor()
    {
        this.links;
        this.LINK = 'http://data.nba.net';
    }

    getAllLinks() 
    {
        return this.links;
    }

    getLinkFor(key)
    {
        return this.LINK + this.links[key];
    }

    setLinks(links)
    {
        this.links = links
    }

}

class Game
{
/**
     * Game:
     * 
     * - home team name and or roster
     * - away team name and or roster
     * - arena
     * - home team stats
     * - away team stats
     * - 
*/
    constructor(gameId, home, away, arena=None)
    {
        this.arena = arena;
        this.gameId = gameId;
        this.homeTeam = home;
        this.awayTeam = away;
        this.quarter = 0; // increment quarters?
    }

    homeTeam()
    {
        return this.homeTeam.triCode;
    }
}

class Team{
    /** Team 
     * - teamId
     * - city
     * - team name
     * - team full name
     * - arena (get arena name from team ID and game instance)
     * - wins
     * - losses
     * - roster
     * 
     * 
    */
    constructor(team)
    {
        this.id = team.teamId;
        this.city = team.city;
        this.name = team.nickname;
        this.fullName = team.fullname;
    }
}

// Any time I need to use FETCH just come here
// and use the await keywork on giveToFetch for whatever 
// data extracted from the link
async function retrieveJSONData(link)
{
    const fetch = require('node-fetch')

    try 
    {
        let data = await giveToFetch(link);
        let linkData = Object.assign({}, data)

        return linkData

    } catch(err) 
    {
        console.log('Error retrieving data from fetch OR Error Constructing Links Object : ' , err);
    }

    async function _fetch(link) 
    { 
        const res = await fetch(link)
        const data = await res.json()
        return data
    }

    function giveToFetch(link) 
    {
        return _fetch(link)
    }
}


async function main() 
{
    const links = new Links()

    // Setting Links
    let linkKV = await retrieveJSONData('http://data.nba.net/10s/prod/v1/today.json')
    links.setLinks(linkKV.links)


    let scoreboardLink = links.getLinkFor('todayScoreboard')
    let retrievedData = await retrieveJSONData(scoreboardLink);
    let rd = retrievedData.games[0]; // work with the first game for testing

    function interactWithTeam()
    {
        let game = new Game(rd.gameId, rd.hTeam, rd.vTeam
            , rd.arena.name)
        
        console.log(game)
    }
    
    // interactWithTeam()

    // TODO: getting undefined, see old project for how i dealt with it
    let teamsLink = links.getLinkFor('teams');
    let retrievedData1 = await retrieveJSONData(teamsLink);
    let rd1 = retrievedData1.standard
    console.log(rd1)
}


console.time('main')
main()
console.timeEnd('main')