import React from 'react';

const GuessForm = ({ guess, onGuessChange, onGuessSubmit }) => {
    return (
        <form onSubmit={onGuessSubmit}>
            <div className="form-group">
                <label htmlFor="guess">Enter a four-digit number:</label>
                <input
                    type="number"
                    className="form-control"
                    id="guess"
                    placeholder="1234"
                    value={guess}
                    onChange={onGuessChange}
                    required
                    minLength="4"
                    maxLength="4"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Guess
            </button>
        </form>
    );
};

export default GuessForm;
