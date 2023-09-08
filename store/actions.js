import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export const getCalendar = ({ commit }) => {
    return new Promise((resolve, reject) => {
        axios({ url: 'https://farsicalendar.com/api', method: 'GET' })
            .then(resp => {
                resolve(resp.data)
            })
            .catch(err => {
                reject(err)
            })
    })
};