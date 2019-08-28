import axios from 'axios';
var recent_patch = '9.14.1';
var server_name = 'eun1'; // Eune
var cors = 'https://cors-anywhere.herokuapp.com/';
var apikey = 'RGAPI-11cee3b6-a6e2-4237-a225-dcb3ef39933d';


const fetchChampionList = () => {
    return new Promise((resolve, reject) => {
        let url = `http://ddragon.leagueoflegends.com/cdn/${recent_patch}/data/en_US/champion.json`;
        axios.get(url).then(result => {
            resolve(result.data);
        }).catch(err => {
            reject(err);
        });
    })
};

const fetchSingleChampionData = champion_name => {
    return new Promise((resolve, reject) => {
        let url = `http://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/champion/${champion_name}.json`;
        axios.get(url).then(result => {
            resolve(result.data.data[champion_name]); // return only champion info
        }).catch(err => {
            reject(err);
        })
    })
};

const fetchAccountId = username => {
    return new Promise((resolve, reject) => {
        let url =`${cors}https://${server_name}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${apikey}`;
        axios.get(url).then(result => {
            resolve(result.data.accountId);
        }).catch(err => {
            reject(err);
        })
    })
};

const fetchFreeWeekRotation = () => {
    return new Promise((resolve, reject) => {
        let url = `${cors}https://${server_name}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apikey}`;
        axios.get(url).then(result => {
            resolve(result.data.freeChampionIds);
        }).catch(err => {
            resolve(err);
        })
    })
}

const fetchMatchHistory = account_id => {
    return new Promise((resolve, reject) => {
        let num_of_games = 10;
        let url = `${cors}https://${server_name}.api.riotgames.com/lol/match/v4/matchlists/by-account/${account_id}?api_key=${apikey}&endIndex=${num_of_games}`
        axios.get(url).then(result => {
            resolve(result.data.matches);
        }).catch(err => {
            reject(err);
        })
    
    })
}

const fetchGameInfo = (game_id, player_name) => {
    return new Promise((resolve, reject) => {
        try{
            let url = `${cors}https://${server_name}.api.riotgames.com//lol/match/v4/matches/${game_id}?api_key=${apikey}`;
            axios.get(url).then(result => {
                console.log("Result: ", result);
                let ids = result.data.participantIdentities;
                let single_id = ids.find(champ => {
                    return champ.player.summonerName.toLowerCase() === player_name.toLowerCase();
                })

                single_id = single_id.participantId;
                let participant = result.data.participants.find(val => {
                    return val.participantId === single_id;
                })

                let result_obj = {
                    name: player_name,
                    summoner_spells: [participant.spell1Id, participant.spell2Id],
                    score: `${participant.stats.kills}-${participant.stats.deaths}-${participant.stats.assists}`,
                    farm: participant.stats.totalMinionsKilled,
                    damageDealt: participant.stats.totalDamageDealtToChampions,
                    damageTaken: participant.stats.totalDamageTaken,
                    visionScore: participant.stats.visionScore,
                    win: participant.stats.win
                }

                console.log(participant);
                resolve(result_obj);
            })
        }catch(err){
            reject(err);
        }
    })
}

const getSplashImage = champion_name => {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion_name}_0.jpg`;
}

const getSquareImage = (type,name) => {
    return `http://ddragon.leagueoflegends.com/cdn/${recent_patch}/img/${type}/${name}`;
}

export { getSquareImage, fetchSingleChampionData, fetchChampionList, fetchAccountId, fetchFreeWeekRotation, fetchMatchHistory, getSplashImage, fetchGameInfo };