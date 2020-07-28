'use strict';

//  Track players
let playerController = (function (){
    let users = [];
    let tiles = new Map()

    return {
        addUser: function(user){
            users.push(user);
        },

        setTileOccupation: function(myTile, occupyStatus)
        {
            tiles.set(myTile, occupyStatus);    
        }
    }

})();


//  Handle tags & update/retrieve from DOM:
let UIController = (function(){



    return {
        changeSingleSquare: function() {

        },

        getTilesDOM: function (){
            return [...document.querySelectorAll("div#GameBoard div")];
        },
       
        //  Initial player setup, recursive to account for bad input:
        playerNames: function(player_nr, msg = "Enter your name")
        {
           let player_name = window.prompt(`${msg} Player${player_nr}`);

            if(player_name === null || player_name === "")
                this.playerNames(player_name, player_nr, "Please enter a valid name");

            return player_name;
        }

            
        };

})();


let controller = (function(playerC, UIC){
// Main app controller: 
let users = [];

let setupEventListeners = function() {
    console.log('Add listener');
    //  Attach div id's to click event:
    let myTiles = UIC.getTilesDOM()
    myTiles.forEach(element => {
        element.addEventListener('click', handleTileSelection);
        console.log(element);
    });
}
//  Check status of tile and change if available:
let handleTileSelection = function() {
    console.log('Not using this right now ffs!!');
}

//  Loop twice for player names:
function setupPlayers() {
    for (let i = 0; i < 2; i++) {
     playerController.addUser(UIC.playerNames(i + 1));      
    }
}

return {
    init: function(){
    console.log('Game started.');
    setupPlayers();
    setupEventListeners();
    }
};

})(playerController, UIController);

controller.init();