import React from 'react';
import { findChampions } from '../../Modules/Helper';
import { Spinner } from 'react-bootstrap';
import { fetchMatchHistory } from '../../Modules/APIGateway';

class MatchHistoryComp extends React.Component {

    state = {
        match_history: null
    }

    componentDidUpdate() {
        if (this.props.display) {
            console.log("Updated");
            if (!this.state.match_history) {
                fetchMatchHistory(this.props.id).then(res => {
                    console.log(res);
                    this.setState({
                        match_history: res.data.matches
                    });
                })
            }
        }
    }


    render () { 
        if (!this.props.display) {
            return null;
        }

        let displayed_match_history = (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );

        if (this.state.match_history) {
            displayed_match_history = this.state.match_history.map(val => {
                let champion = findChampions(this.props.champ_list.data, [val.champion]);
                console.log(champion);
                return <span>{val.champion}</span>
            })
        }


        return (
            <div>
                {displayed_match_history}
            </div>
        )
    }
}

export default MatchHistoryComp;