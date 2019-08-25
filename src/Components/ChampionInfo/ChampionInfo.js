import React, {useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import './ChampionInfo.css';

function ChampionInfo(props) {
    
    const [description, setDescription] = useState("Click/Drag mouse over one of the skills to display the description.");

    let skills_display = props.champion.skills.map(skill => { // display skills
        return <Col className="skill-box" key={skill.id}><img src={skill.image} alt={skill.id} onMouseOver={() => setDescription(skill.description)}/></Col>
    })
    

    return(
        <div className="champion-info">
            <img src={props.champion.image} alt="" className="splash" />
            <h1>{props.champion.name}</h1>
            <h3>{props.champion.title}</h3>
            <Row className="mb-5">
                <Col className="score-box"><div><img src="https://icon-library.net/images/sword-png-icon/sword-png-icon-28.jpg" alt="Sword icon" /></div> <span>{props.champion.stats.attack}</span></Col>
                <Col className="score-box"><div><img src="https://i.ibb.co/fnydcnY/shield.png" alt="Shield icon" /></div> <span>{props.champion.stats.defense}</span></Col>
                <Col className="score-box"><div><img src="http://cdn.onlinewebfonts.com/svg/img_18892.png" alt="Magic icon" /></div> <span>{props.champion.stats.magic}</span></Col>
                <Col className="score-box"><div><img src="https://cdn4.iconfinder.com/data/icons/human-activity-1/512/Human_Activity-23-512.png" alt="Difficulty icon" /></div> <span>{props.champion.stats.difficulty}</span></Col>
            </Row>
            <Row>
                {skills_display}
            </Row>
            <Row className="skill-description">
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </Row>
        </div>
    )
    // }
}

export default ChampionInfo;