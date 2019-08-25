import React from 'react';
import { findChampions } from '../../Modules/Helper';
import { Spinner } from 'react-bootstrap';
import ChampionInfoComp from './../ChampionInfoComp/ChampionInfoComp';
import { fetchFreeWeekRotation, getSquareImage } from './../../Modules/APIGateway';
import './FreeWeekRotationComp.css';

class FreeWeekRotationComp extends React.Component {
    state = {
        free_week_rotation: null,
        displayed_champ: false
    }

    componentDidMount() {
        // Get free week champions on application load
        fetchFreeWeekRotation().then(res => {
            let free_week = findChampions(this.props.champions.data, res);
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
                let img_source = getSquareImage('champion', val + '.png');
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