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