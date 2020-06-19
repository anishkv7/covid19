import axios from 'axios';

export default {
    getList(){
        return axios({ method: "GET", "url": '/api/map', "data": null, "headers": { "content-type": "application/json"} })
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);

        })
    },
    getData(){
        return axios({ method: "GET", "url": '/api/data', "data": null, "headers": { "content-type": "application/json"} })
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            console.log(error);

        })
    }
}