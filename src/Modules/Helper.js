
// Gets url and adds to it the cors cheat + apikey
const getFullUrl = function(url) {
    let cors = "https://cors-anywhere.herokuapp.com/";
    let apikey = "?api_key=RGAPI-99668f19-a31c-41c4-858f-f54f23db7b63";
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