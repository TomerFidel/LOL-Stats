import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import './ChampionInfoComp.css';

class ChampionInfoComp extends React.Component {
    state = {
        loadedPost: null,
        displayed_description: "Click/Drag mouse over one of the skills to display the description."
    }

    componentDidUpdate() {
        if (this.props.champion) {  // champion was chosen
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.title !== this.props.champion)) { // prevent infinite loops
                let spell_types = ["Q", "W", "E", "R"];
                let url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/${this.props.champion}.json`;
                axios.get(url).then( res => { // get one champion info
                    console.log("INSIDE CHAMPION INFO AJAX");
                    let champ_data = res.data.data[this.props.champion];

                    let skills = champ_data.spells.map((spell, i) => { // create skills array
                        return {
                            id: spell.id,
                            name: spell.name,
                            image: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/${spell.image.group}/${spell.image.full}`,
                            description: `[${spell_types[i]}] ${spell.description}`
                        }
                    });

                    let passive = { // create passive skill object
                        id: champ_data.name + "P",
                        name: champ_data.passive.name,
                        image: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/${champ_data.passive.image.group}/${champ_data.passive.image.full}`,
                        description: "[Passive] " + champ_data.passive.description
                    }

                    let full_skillset = [passive, ...skills]; // merge passive skill with the skills array

                    let loadedInfo = {
                        title: this.props.champion,
                        sub_title: champ_data.title,
                        stats: champ_data.info,
                        skills: full_skillset
                    }
                    this.setState({loadedPost: loadedInfo})
                })
            }
        }
    }

    showDescription(text) {
        this.setState({displayed_description: text})
    }
    

    render() {
        if (!this.props.champion || !this.state.loadedPost) {
            return null; // if no champ is selected dont render anything
        }

        let img_url = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.state.loadedPost.title}_0.jpg`;

        let skills_display = this.state.loadedPost.skills.map(skill => { // display skills
            return <Col className="skill-box" key={skill.id}><img src={skill.image} alt={skill.id} onMouseOver={this.showDescription.bind(this,skill.description)}/></Col>
        })

        return(
            <div className="champion-info">
                <img src={img_url} alt="" className="splash" />
                <h1>{this.state.loadedPost.title}</h1>
                <h3>{this.state.loadedPost.sub_title}</h3>
                <Row className="mb-5">
                    <Col className="score-box"><div><img src="https://icon-library.net/images/sword-png-icon/sword-png-icon-28.jpg" alt="Sword icon"/></div> <span>{this.state.loadedPost.stats.attack}</span></Col>
                    <Col className="score-box"><div><img src="https://i.ibb.co/fnydcnY/shield.png" alt="Shield icon" /></div> <span>{this.state.loadedPost.stats.defense}</span></Col>
                    <Col className="score-box"><div><img src="http://cdn.onlinewebfonts.com/svg/img_18892.png" alt="Magic icon" /></div> <span>{this.state.loadedPost.stats.magic}</span></Col>
                    <Col className="score-box"><div><img src="https://cdn4.iconfinder.com/data/icons/human-activity-1/512/Human_Activity-23-512.png" alt="Difficulty icon" /></div> <span>{this.state.loadedPost.stats.difficulty}</span></Col>
                </Row>
                <Row>
                    {skills_display}
                </Row>
                <Row className="skill-description">
                    <p dangerouslySetInnerHTML={{ __html: this.state.displayed_description }}></p>
                </Row>
            </div>
        )
    }
}

export default ChampionInfoComp;