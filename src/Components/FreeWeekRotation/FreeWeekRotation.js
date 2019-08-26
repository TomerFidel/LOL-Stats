import React from 'react';
import { Spinner } from 'react-bootstrap';
import ChampionInfo from '../ChampionInfo/ChampionInfo';
import { fetchFreeWeekRotation, getSquareImage, fetchSingleChampionData, getSplashImage} from '../../Modules/APIGateway';
import './FreeWeekRotation.css';

class FreeWeekRotation extends React.Component {
    state = {
        free_week_rotation: null,
        displayed_champ: true,
        isVisibleDisplayedChamp: false
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

    async displayChampionDetails(champion) {
        let champ_data = await fetchSingleChampionData(champion);
        let spell_types = ["Q", "W", "E", "R"];
        let skills = champ_data.spells.map((spell, i) => { // create skills array
            return {
                id: spell.id,
                name: spell.name,
                image: getSquareImage(spell.image.group,spell.image.full),
                description: `[${spell_types[i]}] ${spell.description}`
            }
        });

        let passive = { // create passive skill object
            id: champ_data.name + "P",
            name: champ_data.passive.name,
            image: getSquareImage(champ_data.passive.image.group, champ_data.passive.image.full),
            description: "[Passive] " + champ_data.passive.description
        }

        let full_skillset = [passive, ...skills]; // merge passive skill with the skills array

        let championInfo = {
            name: champion,
            title: champ_data.title,
            stats: champ_data.info,
            skills: full_skillset,
            image: getSplashImage(champion)
        }
        console.log(championInfo);
        this.setState({ isVisibleDisplayedChamp: true, displayed_champ: championInfo});
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


        let detailed_champ = "";

        if (this.state.isVisibleDisplayedChamp) {
            detailed_champ = <ChampionInfo champion={this.state.displayed_champ} />;
        }

        return (
            <div className="free-week-rotation">
                <h1>Free week rotation</h1>
                {free_week_display}
                {detailed_champ}
            </div>
        )
    }

    
}

export default FreeWeekRotation;