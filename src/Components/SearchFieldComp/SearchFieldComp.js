import React from 'react';
import {InputGroup , FormControl} from 'react-bootstrap';
import './SearchFieldComp.css';

class SearchFieldComp extends React.Component {
    render() {
        return (
            <InputGroup size="lg">
                <FormControl aria-label="Large" onChange={this.props.changed_handler}  aria-describedby="inputGroup-sizing-sm" name="username" value={this.props.username} placeholder="Enter username here" />
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg" className="search-button">View Match History</InputGroup.Text>
                </InputGroup.Prepend>
            </InputGroup>
        )
    }
}

export default SearchFieldComp;