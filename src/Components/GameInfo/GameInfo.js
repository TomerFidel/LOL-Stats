import React from 'react';
import {Row, Spinner} from 'react-bootstrap';
import './GameInfo.css';
import { getSplashImage } from '../../Modules/APIGateway';

class GameInfo extends React.Component {
    state = {
        champion: "",
        image: "",
        show_game_info: false,
        full_game_info: "",

    }

    componentDidMount() {
        let champion_list = Object.values(this.props.champions.data);

        let champion = champion_list.find(champ => {
            return parseInt(champ.key) === this.props.info.champion;
        });

        console.log("Champion: ", champion)

        this.setState({
            champion: champion,
            image: getSplashImage(champion.id)
        })
    }

    showMoreInfo() {
        this.setState({
            show_game_info: true
        })
    }

    render() {

        let time = new Date(this.props.info.timestamp)
        let date = time.toLocaleDateString() + ' ' + time.toLocaleTimeString(); 

        let style={
            backgroundImage: 'url('+ this.state.image +')'
        }

        let game_info = '';

        if (this.state.show_game_info) {
            game_info = (
                <Row className='full-info'>
                    <Spinner animation="border" className="full-info-spinner" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>
            )
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
                {game_info}
            </div>
        )
    }


}

export default GameInfo;