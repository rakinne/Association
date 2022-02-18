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
    constructor(teamId, city, nickname, fullname)
    {
        this.id = teamId;
        this.city = city;
        this.name = nickname;
        this.fullName = fullname;

        this.wins = 0;
        this.losses = 0;
        this.schedule = []; // type : game
        this.roster = []; // type : player
    }


}

/**
 * playerId:
 * - first and last name
 * - teamId
 * - jersey number
 * - position
 * - heightFeet
 * - heightInches
 * - weightPounds
 * - date of birth
 * - all teams played for (array)
 * - draft object
 * - 
 */
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
    const LEAGUE = []
    const TEAMS_BY_ID = {}
    

    const linkKV = await retrieveJSONData(MAIN_LINK)
    const links = new Links();
    links.setLinks(linkKV.links);

    let allTeamsJsonData = await jsonFor('teams');
    allTeamsJsonData = allTeamsJsonData.league.standard;
    generateTeamPopulateLeague(allTeamsJsonData);

    // Task : Get all players, group all players by ID, add each group of players to their respective team by ID
    let allPlayersJsonData = await jsonFor('leagueRosterPlayers');
    allPlayersJsonData = allPlayersJsonData.league.standard;
    generatePlayerPopulateTeam(allPlayersJsonData)



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
            
            if (bannedTeams.includes(team.fullName)) {
                continue
            } else {
                LEAGUE.push(team);
            }
        }
    }

    // console.log("Logging Teams: ", LEAGUE)
    console.log("Logging Players: ", TEAMS_BY_ID['1610612748']) // testing


    function interactWithTeam()
    {
        let game = new Game(rd.gameId, rd.hTeam, rd.vTeam
            , rd.arena.name)
        
        console.log(game)
    }
}


console.time('main')
main()
console.timeEnd('main')



