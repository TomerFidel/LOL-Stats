import React from 'react';
import axios from 'axios';
import { getFullUrl, findChampions } from '../../Modules/Helper';
import { Spinner } from 'react-bootstrap';
import ChampionInfoComp from './../ChampionInfoComp/ChampionInfoComp';
import './FreeWeekRotationComp.css';

class FreeWeekRotationComp extends React.Component {
    state = {
        free_week_rotation: null,
        displayed_champ: false
    }

    componentDidMount() {
        // Get free week champions on application load
        let free_champions_url = getFullUrl("https://eun1.api.riotgames.com/lol/platform/v3/champion-rotations"); // free champions rotations
        axios.get(free_champions_url).then(res => {
            console.log("INSIDE FREE WEEK ROTATION AJAX");

            let free_week = res.data.freeChampionIds;
            free_week = findChampions(this.props.champions.data, free_week);
            this.setState({
                free_week_rotation: free_week,
            })
        });
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
                let img_source = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${val}.png`;
                return <img className="free-week-icons" src={img_source} key={val} alt={val} onClick={this.displayChampionDetails.bind(this, val)} />
            })
        }

        return (
            <div className="free-week-rotation">
                <h1>Free week rotation</h1>
                {free_week_display}
                <ChampionInfoComp champion={this.state.displayed_champ} />
            </div>
        )
    }

    
}

export default FreeWeekRotationComp;