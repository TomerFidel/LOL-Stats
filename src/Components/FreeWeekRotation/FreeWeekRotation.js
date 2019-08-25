import React from 'react';
import { Spinner } from 'react-bootstrap';
import ChampionInfo from '../ChampionInfo/ChampionInfo';
import { fetchFreeWeekRotation, getSquareImage } from '../../Modules/APIGateway';
import './FreeWeekRotation.css';

class FreeWeekRotation extends React.Component {
    state = {
        free_week_rotation: null,
        displayed_champ: false
    }

    findChampions(champion_list, champion_ids) {
        champion_list = Object.values(champion_list);
        let result = [];
        for (let champion_id of champion_ids) {
            let champion = champion_list.find(champ => {
                return parseInt(champ.key) === champion_id;
            });

            result.push(champion.id);
        }

        return result;
    }


    async componentDidMount() {
        // Get free week champions on application load
        let free_week = await fetchFreeWeekRotation();
        free_week = this.findChampions(this.props.champions.data, free_week);
        this.setState({
            free_week_rotation: free_week,
        })
    }

    displayChampionDetails(champion) {
        this.setState({displayed_champ: champion})
    }


    render() {
        // display free week images.
        let free_week_display = (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );

        if (this.state.free_week_rotation) {
            free_week_display = this.state.free_week_rotation.map(val => {
                let img_source = getSquareImage('champion', val + '.png');
                return <img className="free-week-icons" src={img_source} key={val} alt={val} onClick={this.displayChampionDetails.bind(this, val)} />
            })
        }

        return (
            <div className="free-week-rotation">
                <h1>Free week rotation</h1>
                {free_week_display}
                <ChampionInfo champion={this.state.displayed_champ} />
            </div>
        )
    }

    
}

export default FreeWeekRotation;