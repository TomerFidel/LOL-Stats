import React from 'react';
import axios from 'axios';
import { getFullUrl , findChampions } from '../../Modules/Helper';
import { Spinner } from 'react-bootstrap';

class MatchHistoryComp extends React.Component {

    state = {
        match_history: null
    }

    componentDidUpdate() {
        if (this.props.display) {
            console.log("Updated");
            if (!this.state.match_history) {
                console.log("Going to ajax");
                let account_id = this.props.id;
                let history_url = getFullUrl("https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + account_id);
                history_url += "&endIndex=10";
                axios.get(history_url).then(res => {
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