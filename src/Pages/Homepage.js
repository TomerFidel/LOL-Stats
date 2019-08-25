import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import HeaderComp from '../Frame/HeaderComp/HeaderComp';
import FreeWeekRotationComp from '../Components/FreeWeekRotationComp/FreeWeekRotationComp';
import SearchFieldComp from '../Components/SearchFieldComp/SearchFieldComp';
import MatchHistoryComp from '../Components/MatchHistoryComp/MatchHistoryComp';
import { fetchChampionList, fetchAccountId } from '../Modules/APIGateway';

class Homepage extends React.Component {
    state = {
        champions: null,
        username: "",
        search_error: "",
        display_history: false,
        account_id: ""
    }

    componentDidMount() {
        // Get all champions from the server when app starts

        fetchChampionList().then(res => {
            this.setState({ champions: res.data }); // store champion list in state
        });
    }

    changedHandler(e) {
        this.setState({ username: e.target.value });
    }

    searchForUser() {
        if (this.state.username === "") { // No username was entered in the search field
            this.setState({
                search_error: "You must enter a username to search",
                account_id: "",
                display_history: false
            });
            return;
        }

        
        fetchAccountId(this.state.username).then(res => {
            this.setState({
                search_error: "",
                account_id: res,
                display_history: true
            })
        }).catch(err => {
            if (err.response.status === 404) {
                this.setState({
                    search_error: "The username you entered does not exist in EUNE server",
                    account_id: "",
                    display_history: false
                })
            }
        })
    }

    render() {
        console.log("Username: (" + this.state.username + ")");
        let free_week_rotation = "";
        if (this.state.champions) {
            free_week_rotation = <FreeWeekRotationComp champions={this.state.champions} />
        }


        return (
            <div className="App">
                <Container>
                    <HeaderComp />
                    <Row>
                        <Col md={6}>
							{free_week_rotation}
                        </Col>
                        <Col md={6}>
                            <SearchFieldComp
                                username={this.state.username}
                                changed_handler={this.changedHandler.bind(this)}
                                submit_handler={this.searchForUser.bind(this)} />

                            <MatchHistoryComp display={this.state.display_history} id={this.state.account_id} name={this.state.username} champ_list={this.state.champions} />
                            {this.state.search_error}

                        </Col>
                    </Row>


                </Container>
            </div>
        );
    }
}

export default Homepage;