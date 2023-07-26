import React from 'react';

function BullsCowsCount({ guess, secretNumber }) {
    const guessDigits = guess.split("").map(Number);
    const secretDigits = secretNumber.split("").map(Number);
    const bulls = getBulls(guessDigits, secretDigits);
    const cows = getCows(guessDigits, secretDigits);

    function getBulls(guessDigits, secretDigits) {
        let bulls = 0;
        for (let i = 0; i < secretDigits.length; i++) {
            if (secretDigits[i] === guessDigits[i]) {
                bulls++;
            }
        }
        return bulls;
    }

    function getCows(guessDigits, secretDigits) {
        let cows = 0;
        for (let i = 0; i < secretDigits.length; i++) {
            if (secretDigits.includes(guessDigits[i]) && secretDigits[i] !== guessDigits[i]) {
                cows++;
            }
        }
        return cows;
    }

    return (
        <div>
            <h2>Bulls and Cows</h2>
            <p>Bulls: {bulls}</p>
            <p>Cows: {cows}</p>
        </div>
    );
}

export default BullsCowsCount;
