import React from 'react';

function History({ history }) {
    return (
        <div className="history">
            <h2>Guess History</h2>
            <table>
                <thead>
                <tr>
                    <th>Guess #</th>
                    <th>Guess</th>
                    <th>Bulls</th>
                    <th>Cows</th>
                </tr>
                </thead>
                <tbody>
                {history.map((guessObj, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{guessObj.guess1}</td>
                        <td>{guessObj.bulls1}</td>
                        <td>{guessObj.cows1}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;
