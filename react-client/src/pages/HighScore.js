// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const HighScore = ({ playerName, score }) => {
//     const [highScores, setHighScores] = useState([]);
//
//     useEffect(() => {
//         axios.get('/api/highscores')
//             .then(response => {
//                 setHighScores(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);
//
//     const renderHighScores = () => {
//         return highScores.map((highScore, index) => {
//             return (
//                 <tr key={index}>
//                     <td>{playerName}</td>
//                     <td>{score}</td>
//                 </tr>
//             );
//         });
//     };
//
//
//     return (
//         <div>
//             <h2>High Scores</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Score</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {renderHighScores()}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default HighScore;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighScore = ({ playerName, score }) => {
    const [highScores, setHighScores] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('/api/highscores')
            .then(response => {
                setHighScores(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const renderHighScores = () => {
        return highScores.map((highScore, index) => {
            return (
                <tr key={index}>
                    <td>{highScore.name}</td>
                    <td>{highScore.score}</td>
                </tr>
            );
        });
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newHighScore = { name: playerName, score };

        axios.post('/api/highscores', newHighScore)
            .then(response => {
                console.log(response);
                setHighScores([...highScores, newHighScore]);
            })
            .catch(error => {
                console.log(error);
            });

        setName('');
    };

    return (
        <div>
            <h2>High Scores</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {renderHighScores()}
                </tbody>
            </table>
            <h3>Add New High Score</h3>
            <form onSubmit={handleFormSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HighScore;
