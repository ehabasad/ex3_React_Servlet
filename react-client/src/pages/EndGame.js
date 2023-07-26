import React from 'react';
import HighScore from "./HighScore";

// EndGame component
class EndGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            showHighScore: false
        };
    }

    handleNameChange = event => {
        this.setState({ playerName: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { playerName } = this.state;
        const { score } = this.props;

        this.setState({ showHighScore: true });


        // TODO: submit player name and score to server
        console.log(`Player: ${playerName}, Score: ${score}`);

    };


    render() {
        const { playerName, showHighScore } = this.state;
        const { score } = this.props;
        return (
            <div>
                <h2>Game Over</h2>
                <h3>Your Score: {score}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your name:
                        <input type="text" value={playerName} onChange={this.handleNameChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {showHighScore && <HighScore playerName={playerName} score={score} />}
            </div>
        );
    }

}

export default EndGame;
