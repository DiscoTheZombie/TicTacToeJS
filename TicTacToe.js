'use strict';

//  Track players
let playerController = (function() {
    let users = [];
    let tiles = {};
    let activePlayer = 0;

    return {
<<<<<<< HEAD
        addUser: function(user) {
            users.push(user);
        },

        setTileOccupation: function(myTile, occupyStatus) {
=======
        addUser: (user) => users.push(user),

        setTileOccupation: (myTile, occupyStatus) => {
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
            tiles.set(myTile, occupyStatus);
        },
        // Check if key/tile has been selected before:
        verifySelection: function(selection) {
            if (tiles[selection] === "None") {
                tiles[selection] = users[activePlayer];
                return true;
            }
            return false;
        },

<<<<<<< HEAD
        fillTileCollection: function(aTile) {
            tiles[aTile] = "None";
        },

        switchPlayer: function() {
            activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
        },

        checkForWinner: function() {
=======
        fillTileCollection: (aTile) => tiles[aTile] = "None",

        switchPlayer: () => activePlayer == 0 ? activePlayer = 1 : activePlayer = 0,

        checkForWinner: () => {
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
            console.log("Checking for a winner.")
            let tileValues = Object.values(tiles);

            if (tileValues[0] === users[activePlayer]) {
                if ((tileValues[1] === users[activePlayer] && tileValues[2] === users[activePlayer]) || (tileValues[3] === users[activePlayer] && tileValues[6] === users[activePlayer]))
                    return true;
            }
            if (tileValues[8] === users[activePlayer]) {
                if ((tileValues[7] === users[activePlayer] && tileValues[6] === users[activePlayer]) || (tileValues[5] === users[activePlayer] && tileValues[2] === users[activePlayer]))
                    return true;
            }
            if (tileValues[4] === users[activePlayer]) {
                for (let upper = 0, last = 8; upper < 4; upper++, last--) {
                    if (tileValues[upper] === users[activePlayer] && tileValues[last] === users[activePlayer])
                        return true;
                }
            }
            return false;
        },

<<<<<<< HEAD
        getCurrPlayer: function() {
            return users[activePlayer];
        },

        getTileStyle: function() {
            let cssPlayerNr = activePlayer + 1;
            return `Player${cssPlayerNr}`;
        },
        // Test function to add players for web building testing html:
        testPlayer: function() {
=======
        getCurrPlayer: () => users[activePlayer],

        getTileStyle: () => `Player${(activePlayer + 1)}`,
        // Placeholder function to add players for testing html:
        testPlayer: () => {
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
            users.push("Player One");
            users.push("Player Two");
        }
    }

})();


//  Handle tags & update/retrieve from DOM:
let UIController = (function() {
    const statustext = "Tic Tac Toe";
    const gameboardParentElement = "div#GameBoard div";
    const defaultTileClass = "Tile";
    const resetButton = ".glass";
    const textArea = "status";

    return {
<<<<<<< HEAD
        changeSingleSquare: function(tag, cssProfile) {
=======
        changeSingleSquare: (tag, cssProfile) => {
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
            let currTile = document.getElementById(tag.id);
            currTile.classList.remove(defaultTileClass);
            currTile.classList.add(cssProfile);
        },

<<<<<<< HEAD
        getTilesDOM: function() {
            return [...document.querySelectorAll(gameboardParentElement)];
        },
=======
        getTilesDOM: () => [...document.querySelectorAll(gameboardParentElement)],
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063

        resetAllSquares: function() {
            let allTiles = this.getTilesDOM()
            allTiles.forEach(element => {
                element.className = defaultTileClass;
            });
        },

        //  Initial player setup, recursive to account for bad input:
        playerNames: function(player_nr, msg = "Enter your name") {
            let player_name = window.prompt(`${msg} Player${player_nr}`);

            if (player_name === null || player_name === "")
                this.playerNames(player_nr, "Please enter a valid name");

            return player_name;
        },

<<<<<<< HEAD
        updateStatusText: function(textValue) {
            document.getElementById('status').innerHTML = textValue;
        },

        getStatusText: function() {
            return statustext;
        }
=======
        
        updateStatusText: (textValue) => document.getElementById(textArea).innerHTML = textValue,
        
        getStatusText: () => statustext,
        
        getResetBtn: () => resetButton
        
>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
    };
    
})();


<<<<<<< HEAD
let controller = (function(playerC, UIC) {
    // Main app controller: 
    let resetBtn = ".glass";
    let setupEventListeners = function() {
            console.log('Add listeners');
            //  TODO : Add reset listener.
            document.querySelector(resetBtn).addEventListener('click', resetGame);
            //  Attach div id's to click event:
            let myTiles = UIC.getTilesDOM()
            myTiles.forEach(element => {
                element.addEventListener('click', handleTileSelection);
                playerC.fillTileCollection(element.id);
            });
        }
        //  Loop twice for player names:
=======
// Main app controller: 
let controller = (function (playerC, uiC) {
    let myTiles = uiC.getTilesDOM()
    let resetBtn = uiC.getResetBtn();

    let setupEventListeners = function () {
        console.log('Adding event listeners');
        
        document.addEventListener("DOMContentLoaded", setupPlayers);
        document.querySelector(resetBtn).addEventListener('click', resetGame);
        
        myTiles.forEach(element => {
            element.addEventListener('click', checkAndChangeTile);
            playerC.fillTileCollection(element.id);
        });
    }

    function disableGame () { 
        myTiles.forEach( el => el.removeEventListener('click', checkAndChangeTile))
    }

>>>>>>> 71ee3f4a7de57e006c0bef982bba57f5f5ce6063
    function setupPlayers() {
        // Comment 'playerC.testPlayer' out and uncomment for loop for non test players.
        //playerC.testPlayer();

         for (let i = 0; i < 2; i++) {
             playerController.addUser(uiC.playerNames(i + 1));
         }
    }

    function checkAndChangeTile() {
        if (playerC.verifySelection(this.id)) {

            document.getElementById(this.id).removeEventListener('click', this.handleTileSelection);
            uiC.changeSingleSquare(this, playerC.getTileStyle());
            setPlayerSwap();
        }
    }

    function setPlayerSwap() {
        if (playerC.checkForWinner()) {
            disableGame();
            uiC.updateStatusText(`${playerC.getCurrPlayer()} you won congratulations!`);
        } else {
            playerC.switchPlayer();
            uiC.updateStatusText(`${playerC.getCurrPlayer()}`);
        }
    }

    function resetGame() {
        console.log('Reset game.')
        uiC.resetAllSquares();
        setupEventListeners();
        setupPlayers();
        uiC.updateStatusText(`${playerC.getCurrPlayer()}`)
    }

    return {
        init: function() {
            console.log('Init TicTacToe.js');
            setupEventListeners();
            setupPlayers();
            uiC.updateStatusText(`${playerC.getCurrPlayer()}`)
        }
    };

})(playerController, UIController);

controller.init();