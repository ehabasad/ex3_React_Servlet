import React, { useState, useEffect } from "react";
import GuessForm from "./GuessForm";
import History from "./History";
import EndGame from "./EndGame";
import Alert from "./Alert";

const GameControl = () => {
    const [secretNumber, setSecretNumber] = useState("");
    const [guess, setGuess] = useState("");
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    // const [highScores, setHighScores] = useState([]);
    const MAX_GUESSES = 10;

    useEffect(() => {
        setSecretNumber(generateSecretNumber());
    }, []);

    const makeGuess = (event) => {
        event.preventDefault();
        const guessDigits = guess.split("").map(Number);
        const secretDigits = secretNumber.split("").map(Number);
        const bulls = getBulls(guessDigits, secretDigits);
        const cows = getCows(guessDigits, secretDigits);

        const guessObj = {
            guess1: guess,
            bulls1: bulls,
            cows1: cows,
        };
        setHistory(prevHistory => [...prevHistory, guessObj]);
        setGuess("");
        setScore(score + 1);
        if (bulls === 4) {
            setGameOver(true);
            setShowAlert(false);
            // const highScore = {
            //     score: score + 1,
            //     date: new Date(),
            // };
            // updateHighScores(highScore);
        } else if (history.length === MAX_GUESSES - 1) {
            setGameOver(true);
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    };

    const resetGame = () => {
        setSecretNumber(generateSecretNumber());
        setGuess("");
        setHistory([]);
        setGameOver(false);
        setScore(0);
        setShowAlert(false);
    };
    // Generate a secret number to guess
    function generateSecretNumber() {
        let secretNumber = "";
        while (secretNumber.length < 4) {
            const digit = Math.floor(Math.random() * 10);
            if (!secretNumber.includes(digit.toString())) {
                secretNumber += digit.toString();
            }
        }
        console.log(secretNumber); // for debugging purposes only
        return secretNumber;

    }

// Calculate the number of bulls (correct digit in the correct position) and cows (correct digit in the wrong position)
    function getBulls(secretNumber, guess) {
        let bulls = 0;
        for (let i = 0; i < secretNumber.length; i++) {
            if (secretNumber[i] === guess[i]) {
                bulls++;
            }
        }
        return bulls;
    }

    function getCows(secretNumber, guess) {
        let cows = 0;
        for (let i = 0; i < secretNumber.length; i++) {
            if (secretNumber.includes(guess[i]) && secretNumber[i] !== guess[i]) {
                cows++;
            }
        }
        return cows;
    }

    // const updateHighScores = (newHighScore) => {
    //     setHighScores((prevHighScores) => {
    //         const updatedHighScores = [...prevHighScores, newHighScore].sort(
    //             (a, b) => b.score - a.score
    //         );
    //         return updatedHighScores.slice(0, 5);
    //     });
    // };

    return (
        <div className="container mt-5  game-container">
            <h1>Bulls and Cows</h1>
            <hr />
            {gameOver ? (
                <EndGame score={score} onReset={resetGame} />
            ) : (
                <div>
                    <GuessForm
                        guess={guess}
                        onGuessChange={(event) => setGuess(event.target.value)}
                        onGuessSubmit={makeGuess}
                    />
                    {showAlert ? (
                        <Alert message="Incorrect guess! Try again." />
                    ) : null}
                    <History history={history} />
                </div>
            )}
        </div>
    );
};

export default GameControl;