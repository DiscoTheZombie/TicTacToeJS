'use strict';

//  Track players
let playerController = (function() {
    let users = [];
    let tiles = {};
    let activePlayer = 0;

    return {

        addPlayers: (playersPrompt) => {
            users = [];
            for (let i = 0; i < 2; i++) {
                var a = playersPrompt(i + 1);
                users.push(a);
            }
        },

        setTileOccupation: (myTile, occupyStatus) => {
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

        fillTileCollection: (aTile) => tiles[aTile] = "None",

        switchPlayer: () => activePlayer == 0 ? activePlayer = 1 : activePlayer = 0,

        checkForWinner: () => {
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

        getCurrPlayer: () => users[activePlayer],

        getTileStyle: () => `Player${(activePlayer + 1)}`,
        // Placeholder function to add players for testing html:
        testPlayer: () => {
            users.push("Player One");
            users.push("Player Two");
        }
    }

})();


//  Handle tags & update/retrieve from DOM:
let UIController = (function() {
    const defaultText = "Tic Tac Toe";
    const gameboardParentElement = "div#GameBoard div";
    const defaultTileClass = "Tile";
    const resetButton = ".glass";
    const textArea = "status";

    return {
        changeSingleSquare: (tag, cssProfile) => {
            let currTile = document.getElementById(tag.id);
            currTile.classList.remove(defaultTileClass);
            currTile.classList.add(cssProfile);
        },

        getTilesDOM: () => [...document.querySelectorAll(gameboardParentElement)],

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
                playerNames(player_nr, "Please enter a valid name");

            return player_name;
        },

        updateStatusText: (textValue) => document.getElementById(textArea).innerHTML = textValue,

        getDefaultText: function() {
            return defaultText;
        },

        getResetBtn: () => resetButton

    };

})();


// Main app controller: 
let controller = (function(playerC, uiC) {
    let myTiles = uiC.getTilesDOM()
    let resetBtn = uiC.getResetBtn();

    let setupEventListeners = function() {
        console.log('Adding event listeners');

        document.addEventListener("DOMContentLoaded", setupPlayers);
        document.querySelector(resetBtn).addEventListener('click', resetGame);

        myTiles.forEach(element => {
            element.addEventListener('click', checkAndChangeTile);
            playerC.fillTileCollection(element.id);
        });
    }

    function disableGame() {
        myTiles.forEach(el => el.removeEventListener('click', checkAndChangeTile))
    }

    function setupPlayers() {
        // Comment 'playerC.testPlayer' out and uncomment for loop for non test players.
        //playerC.testPlayer();

        playerC.addPlayers(uiC.playerNames);
        uiC.updateStatusText(`${playerC.getCurrPlayer()}`)
    }

    function checkAndChangeTile() {
        if (playerC.verifySelection(this.id)) {

            document.getElementById(this.id).removeEventListener('click', this.handleTileSelection);
            uiC.changeSingleSquare(this, playerC.getTileStyle());
            setPlayerSwap();
        }
    }

    function announceWinner() {
        disableGame();
        uiC.updateStatusText(`${playerC.getCurrPlayer()} you won congratulations!`);
    }

    function setPlayerSwap() {
        if (playerC.checkForWinner()) {
            announceWinner();
        } else {
            playerC.switchPlayer();
            uiC.updateStatusText(`${playerC.getCurrPlayer()}`);
        }
    }

    function resetGame() {
        console.log('Reset game.')
        setupEventListeners();
        uiC.updateStatusText(uiC.getDefaultText());
        uiC.resetAllSquares();
        setupPlayers();
        uiC.updateStatusText(`${playerC.getCurrPlayer().bind(this)}`)
    }

    return {
        init: function() {
            console.log('Init TicTacToe.js');
            uiC.updateStatusText(uiC.getDefaultText());
            setupEventListeners();
            // DOM load event triggers initial player setup and text field.
        }
    };

})(playerController, UIController);

controller.init();