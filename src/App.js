import React from "react";
import { Container , Row , Col , Spinner} from "react-bootstrap";
import axios from 'axios';
import HeaderComp from './Frame/HeaderComp/HeaderComp';
import FreeWeekRotationComp from './Components/FreeWeekRotationComp/FreeWeekRotationComp';
import SearchFieldComp from './Components/SearchFieldComp/SearchFieldComp';
import MatchHistoryComp from './Components/MatchHistoryComp/MatchHistoryComp';
import {getFullUrl} from './Modules/Helper';
import "./App.css";

class App extends React.Component {
	state = {
		champions: null,
		username: "",
		search_error: "",
		display_history: false,
		account_id: ""
	}

	componentDidMount() {
		// Get all champions from the server when app starts

		let champions_url = "http://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/champion.json"; // all champions json
		axios.get(champions_url).then(res => {
			console.log("INSIDE CHAMPION LIST AJAX");

			let champions = res.data;
			this.setState({champions: champions});
      	});
	 }
	 
	changedHandler(e) {
        this.setState({username: e.target.value});
	}
	
	searchForUser() {
		if (this.state.username === "") {
			this.setState({
				search_error: "You must enter a username to search",
				account_id: "",
				display_history: false
			});
			return ;
		}
		console.log(`Searching for ${this.state.username}`);
		let search_url = getFullUrl("https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.state.username);
		axios.get(search_url).then(res => {
			console.log(res);
			console.log(res.data.accountId);
			this.setState({
				search_error: "",
				account_id: res.data.accountId,
				display_history: true
			})
		}).catch( err => {
			console.log(err.response);
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
							TEST
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

export default App;
