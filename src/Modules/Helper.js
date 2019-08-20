
// Gets url and adds to it the cors cheat + apikey
const getFullUrl = function(url) {
    let cors = "https://cors-anywhere.herokuapp.com/";
    let apikey = "?api_key=RGAPI-bd3ada0c-a5c0-4249-8814-7576fbef065d";
    return cors + url + apikey;
}


// get a champion list and champion id's and returns only the relevant champions
const findChampions = function(champion_list, champion_ids) {
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

export { getFullUrl , findChampions}