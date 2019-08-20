import React from "react";
import { Container , Row , Col , Spinner} from "react-bootstrap";
import axios from 'axios';
import HeaderComp from './Frame/HeaderComp/HeaderComp';
import FreeWeekRotationComp from './Components/FreeWeekRotationComp/FreeWeekRotationComp';
import SearchFieldComp from './Components/SearchFieldComp/SearchFieldComp';
import "./App.css";

class App extends React.Component {
	state = {
		champions: null,
		username: ""
	}

	componentDidMount() {
		// Get all champions from the server when app starts

		let champions_url = "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json"; // all champions json
		axios.get(champions_url).then(res => {
			console.log("INSIDE CHAMPION LIST AJAX");

			let champions = res.data;
			this.setState({champions: champions});
      	});
	 }
	 
	changedHandler(e) {
        this.setState({username: e.target.value});
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
							TEST
							{free_week_rotation}
						</Col>
						<Col md={6}>
							<SearchFieldComp username={this.state.username} changed_handler={this.changedHandler.bind(this)} />
						</Col>
					</Row>
					
					
				</Container>
			</div>
		);
	}
}

export default App;
