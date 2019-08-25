
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

export {findChampions}