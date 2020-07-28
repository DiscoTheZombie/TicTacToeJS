'use strict';

//  Track players
let playerController = (function () {
    let users = [];
    let tiles = {};
    let activePlayer = 0;

    let switchPlayer = function () {
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    }

    return {
        addUser: function (user) {
            users.push(user);
        },

        setTileOccupation: function (myTile, occupyStatus) {
            tiles.set(myTile, occupyStatus);
        },
        // Check if key/tile has been selected before:
        verifySelection: function (selection) {
            if (tiles[selection] === "None") {
                tiles[selection] = users[activePlayer];
                switchPlayer();
                return true;
            }
        },

        fillTileMap: function (aTile) {
            tiles[aTile] = "None";
        },

        switchPlayer: function () {
            activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
        },

        checkForWinner: function() {
            console.log("Checking for a winner.")
            let tileValues = Object.values(tiles);

            if(tileValues[0] === users[activePlayer])
            {
                if((tileValues[1] && tileValues[2] === users[activePlayer]) || (tileValues[3] && tileValues[6] === users[activePlayer]))
                    return true;
             //   statustext = `${users[activePlayer]} has won, Congratulations!`;
            }
            else if(tileValues[8] === users[activePlayer])
            {
                if((tileValues[7] && tileValues[6] === users[activePlayer]) || (tileValues[5] && tileValues[2] === users[activePlayer]))
                    return true;
             //       statustext = `${users[activePlayer]} has won, Congratulations!`;
            }
            else if(tileValues[4] == users[activePlayer])
            {
                for (let upper = 0, last = 8; upper < 4; upper++, last--) {
                    if(tileValues[upper] && tileValues[last]){
                        return true;
                      //  statustext = `${users[activePlayer]} has won, Congratulations!`;
                    }
                }
            }   
        },

        getCurrPlayer: function () {
            return users[activePlayer];
        }

    }

})();


//  Handle tags & update/retrieve from DOM:
let UIController = (function () {
    let statustext = "tic Tac Toe";
    return {
        changeSingleSquare: function (tagID) {
            let currTile = document.getElementById(tagID);
            currTile.classList.remove("Tile");
            currTile.classList.add("Player1");
            
        },

        getTilesDOM: function () {
            return [...document.querySelectorAll("div#GameBoard div")];
        },

        //  Initial player setup, recursive to account for bad input:
        playerNames: function (player_nr, msg = "Enter your name") {
            let player_name = window.prompt(`${msg} Player${player_nr}`);

            if (player_name === null || player_name === "")
                this.playerNames(player_name, player_nr, "Please enter a valid name");

            return player_name;
        },

        updateStatusText: function(textValue)
        {
            document.getElementById('status').innerHTML = textValue; 
        },

        getStatusText: function () {
            return statustext;
        }
    };

})();


let controller = (function (playerC, UIC) {
    // Main app controller: 

    let setupEventListeners = function () {
        console.log('Add listener');
        //  Attach div id's to click event:
        let myTiles = UIC.getTilesDOM()
        myTiles.forEach(element => {
            element.addEventListener('click', handleTileSelection);
            playerC.fillTileMap(element.id);
        });
    }
    //  Loop twice for player names:
    function setupPlayers() {
        for (let i = 0; i < 2; i++) {
            playerController.addUser(UIC.playerNames(i + 1));
        }
    }
    //  Check status of tile and change if available:
    function handleTileSelection() {
        console.log('Selected a tile!');
        playerC.verifySelection(this.id);
        setText();
    }
    
    function setText(){
        if(playerC.checkForWinner() == true)
        {
            UIC.updateStatusText(`${playerC.getCurrPlayer()} you won congratulations!`);
        }
        else{
            console.log("here");
            UIC.updateStatusText(`${playerC.getCurrPlayer()}`);
        }
    }

    return {
        init: function () {
            console.log('Game started.');
            setupPlayers();
            setupEventListeners();
            setText();
        }
    };

})(playerController, UIController);

controller.init();