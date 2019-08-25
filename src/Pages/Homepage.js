import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Header from '../Frame/Header/Header';
import FreeWeekRotation from '../Components/FreeWeekRotation/FreeWeekRotation';
import SearchField from '../Components/SearchField/SearchField';
import { fetchChampionList } from '../Modules/APIGateway';

class Homepage extends React.Component {
    state = {
        champions: null,
    }

    async componentDidMount() {
        // Get all champions from the server when app starts
        let champion_list = await fetchChampionList();

        this.setState({champions: champion_list});
    }

    render() {
        let free_week_rotation = "";
        if (this.state.champions) {
            free_week_rotation = <FreeWeekRotation champions={this.state.champions} />
        }


        return (
            <div className="App">
                <Container>
                    <Header />
                    <Row>
                        <Col md={6}>
							{free_week_rotation}
                        </Col>
                        <Col md={6}>
                            <SearchField champions={this.state.champions}/>
                        </Col>
                    </Row>


                </Container>
            </div>
        );
    }
}

export default Homepage;