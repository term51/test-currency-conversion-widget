import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      openratesData: [],
   },
   mutations: {
      setOpenratesData(state, openratesData) {
         state.openratesData = openratesData;
      },
   },
   actions: {
     async getAPIopenratesData({dispatch}) {
        await fetch('http://localhost:3000/api/openrates')
            .then(response => {
                  if (response.body) return response.json();
               }
            )
            .then(data => {
               dispatch('ratesObjectToArray', data);
            })
            .catch(err => {
               console.log(err);
            });
      },
      ratesObjectToArray({commit}, data) {
         const result = [];
         data.forEach((item, index) => {
            result.push({
               'base': item.base,
               'date': item.date,
               'id': item.id,
               'rates': []
            });
            for (let rate in item.rates) {
               if (item.rates.hasOwnProperty(rate)) {
                  result[index].rates.push({
                     'currency': rate,
                     'rate': item.rates[rate]
                  });
               }
            }
         });
         commit('setOpenratesData', result);
      }
   }
});
