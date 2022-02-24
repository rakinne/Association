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