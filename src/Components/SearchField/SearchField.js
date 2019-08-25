import React, { useState } from 'react';
import {InputGroup , FormControl} from 'react-bootstrap';
import { fetchAccountId, fetchMatchHistory } from '../../Modules/APIGateway';
import GameInfo from '../../Components/GameInfo/GameInfo';
import './SearchField.css';

function SearchField() {

    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [history,setHistory] = useState([]);

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        try {
            let account_id = await fetchAccountId(name);
            let match_history = await fetchMatchHistory(account_id);

            setHistory(match_history);
        }catch(err) {
            setError("The username you entered does not exist in EUNE server");
        }
    }

    let render_history = history.map(val => {
        return <GameInfo info={val} key={val.gameId}/>
    })

    return (
        <div>
            <InputGroup size="lg">
                <FormControl aria-label="Large" onChange={e => setName(e.target.value)}  aria-describedby="inputGroup-sizing-sm" name="username" value={name} placeholder="Enter username here" />
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg" onClick={handleSubmit} className="search-button">View Match History</InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
            {error}
            {render_history}
        </div>
    )
}

export default SearchField;