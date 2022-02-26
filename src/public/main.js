// While developing the 'Links' class, I will be using fetch to interact with
// json NBA API
// Once ready for production, I will inject dependencies into my links class
// Dependencies :  All links serviced by the 'Links' class
// Author : Rakinne Foote
 
const START_OF_LINK = 'http://data.nba.net';
const MAIN_LINK = 'http://data.nba.net/10s/prod/v1/today.json';
const bannedTeams = [
    'Utah White',
    'Utah Blue',
    'Team LeBron',
    'Team Team Durant'
]

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
        this.links = links;
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
        return this.home
    }
}

class Team
{
    constructor(teamId, city, nickname, fullname)
    {
        this.id = teamId;
        this.city = city;
        this.name = nickname;
        this.fullName = fullname;

        this.wins = 0;
        this.losses = 0;
        this.schedule = []; // type : game
        this.roster; // type : player
    }

    setRoster(roster)
    {
        this.roster = roster
    }

    getId()
    {
        return this.id;
    }
}

class Player 
{
    constructor(id, currTeam, first, last, jersey, pos, heightFt, heightIn, DOB, teams, draftDetails)
    {
        this.id = id
        this.currentTeam = currTeam
        this.fullName = first + ' ' + last;
        this.jerseyNumber = jersey;
        this.position = pos;
        this.height = heightFt + "'" + heightIn;
        this.DOB = DOB;
        this.playedFor = teams;
        this.draftDetails = draftDetails;
    }


}

async function main() 
{
    const LEAGUE = [];
    const TEAMS_BY_ID = {};
    

    const linkKV = await retrieveJSONData(MAIN_LINK);
    const links = new Links();
    links.setLinks(linkKV.links);

    // Task : Get all players, group all players by ID, add each group of players to their respective team by ID
    let allPlayersJsonData = await jsonFor('leagueRosterPlayers');
    allPlayersJsonData = allPlayersJsonData.league.standard;
    generatePlayerPopulateTeam(allPlayersJsonData);

    let allTeamsJsonData = await jsonFor('teams');
    allTeamsJsonData = allTeamsJsonData.league.standard;
    generateTeamPopulateLeague(allTeamsJsonData);

    // document work
    // let tableBody = document.getElementById("tableBody");;
    // LEAGUE[17].forEach(player => {
    //     let row = tableBody.insertRow();
    //     const td = row.insertCell()
    //     td.appendChild(document.createTextNode(`${player.fullName}`))
    //     td.appendChild(document.createTextNode(`${player.height}`))
    //     td.appendChild(document.createTextNode(`${player.jerseyNumber}`))
    //     td.appendChild(document.createTextNode(`${player.position}`))
    //     td.appendChild(document.createTextNode(`${player.curentTeam}`))
    // });

    return LEAGUE;

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

        function giveToFetch(link) 
        {
            return _fetch(link)
        }

        async function _fetch(link) 
        { 
            const res = await fetch(link)
            const data = await res.json()
            return data
        }
    }

    async function jsonFor(leagueLink)
    {
        let link = links.getLinkFor(leagueLink);
        let retrievedData = await retrieveJSONData(link)
        return retrievedData
    }

    function generatePlayerPopulateTeam(playerData)
    {
        for (let player of playerData) {
            let teamId = player.teamId;
            let newPlayer = new Player(player.personId, player.teamId, player.firstName, player.lastName,
                player.jersey, player.pos, player.heightFeet, player.heightInches, player.dateOfBirthUTC, player.teams,
                player.draft)

            if (TEAMS_BY_ID[teamId]) { 
                let teamArray = TEAMS_BY_ID[teamId];
                teamArray.push(newPlayer)
                TEAMS_BY_ID[teamId] = teamArray
            } else { TEAMS_BY_ID[teamId] = [newPlayer] }
        }
    }
    
    function generateTeamPopulateLeague(teamData)
    {
        for (let i = 0; i < teamData.length; i++) 
        {
            let currTeam = teamData[i];
            let team = new Team(currTeam.teamId, currTeam.city, currTeam.nickname, currTeam.fullName);

            // a little aside
            team.setRoster(getRoster(currTeam.teamId))
            
            
            if (bannedTeams.includes(team.fullName)) {
                continue
            } else {
                LEAGUE.push(team);
            }
        }
    }

    function getRoster(teamId)
    {
        let roster = TEAMS_BY_ID[teamId];
        return roster;
    }

    function interactWithTeam()
    {
        let game = new Game(rd.gameId, rd.hTeam, rd.vTeam
            , rd.arena.name)
        
        console.log(game)
    }
}

function clickedSearchTeamBtn() {
    let query = document.getElementById('searchBubble').value
    searchTeams(query);
    console.log(query)
}

async function searchTeams(query) {
    let league = await window['LEAGUE'];
    league.forEach(team => {
        if (team.fullName === query) {
            populateTabularData(team);
        }
    });
}

function populateTabularData(team) {
    let tableBody = document.getElementById("tableBody");;
    team.roster.forEach(player => {
        let row = tableBody.insertRow();
        const td = row.insertCell()
        const td1 = row.insertCell()
        const td2 = row.insertCell()
        const td3 = row.insertCell()
        const td4 = row.insertCell()


        td.appendChild(document.createTextNode(`${player.fullName}`))
        td1.appendChild(document.createTextNode(`${player.height}`))
        td2.appendChild(document.createTextNode(`${player.jerseyNumber}`))
        td3.appendChild(document.createTextNode(`${player.position}`))
        td4.appendChild(document.createTextNode(`${team.fullName}`))
    });
}


window.onload = function() {
    window["LEAGUE"] = main();
}


document.getElementById('searchBtn').addEventListener("click", function() {
    clickedSearchTeamBtn()
})





// can call main from outside this module
// console.time('main')
// main()
// console.timeEnd('main')

module.exports = main, clickedSearchTeamBtn;



