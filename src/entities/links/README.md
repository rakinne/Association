Incase this turns out to be an API later, here I will jot down how I've been interacting with the system I'm building.

Currently my API abstracts several key building blocks of the real-world NBA. 
With that abstraction I've married a sample "main" client where I can test the functionality of the API.
In main I create an array that I utilize to house all NBA Team's that I construct, and a Key-Value store where I hold all constructed NBA teams by key (the teams' ID).

After constructing a Links instance, I give my main client the ability to request from the API any link available to it, thus any link exposed by the NBA for sharing JSON data.
The code tells the rest of the story Ayeee lol. 
