import React from 'react';
import {Row, Spinner} from 'react-bootstrap';
import './GameInfo.css';
import { getSplashImage, fetchGameInfo } from '../../Modules/APIGateway';

class GameInfo extends React.Component {
    state = {
        champion: "",
        image: "",
        show_game_info: false,
        isLoading_info: false,
        full_game_info: ""

    }

    componentDidMount() {
        let champion_list = Object.values(this.props.champions.data);

        let champion = champion_list.find(champ => {
            return parseInt(champ.key) === this.props.info.champion;
        });

        this.setState({
            champion: champion,
            image: getSplashImage(champion.id)
        })
    }

    async showMoreInfo() {
        this.setState({
            isLoading_info: true,
            show_game_info: true
        })
        let info = await fetchGameInfo(this.props.info.gameId, this.props.name);
        this.setState({
            isLoading_info: false,
            full_game_info: info
        })

    }

    renderFullInfo() {
        if (this.state.show_game_info) {
            if (this.state.isLoading_info) {
                return (
                    <div className='full-info'>
                        <Spinner animation="border" className="full-info-spinner" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )
            } else {
                let game_result = "DEFEAT";
                if (this.state.full_game_info.win) {
                    game_result = "VICTORY"
                }
                return (
                    <div className='full-info'>
                        <h1 className="summoner-name-full">{this.state.full_game_info.name}</h1>
                        <div classame="full-info-row">Kills-Deaths-Assists: {this.state.full_game_info.score}</div>
                        <div classame="full-info-row">Minions killed: {this.state.full_game_info.farm}</div>
                        <div classame="full-info-row">Damage dealt to champions: {this.state.full_game_info.damageDealt}</div>
                        <div classame="full-info-row">Damage taken: {this.state.full_game_info.damageTaken}</div>
                        <div classame="full-info-row">Vision score: {this.state.full_game_info.visionScore}</div>
                        <div classame="full-info-row">{game_result}</div>
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    render() {

        let time = new Date(this.props.info.timestamp)
        let date = time.toLocaleDateString() + ' ' + time.toLocaleTimeString(); 

        let style={
            backgroundImage: 'url('+ this.state.image +')'
        }

        return(
            <div>
                <Row className="game-box" style={style}>
                    <div className="icon-container">
                        <span className="show-more-arrow" onClick={this.showMoreInfo.bind(this)}><i className="fa fa-arrow-down"></i></span>
                    </div>
                    <div className="timestamp">
                        {date}
                    </div>
                </Row>
                {this.renderFullInfo()}
            </div>
        )
    }


}

export default GameInfo;