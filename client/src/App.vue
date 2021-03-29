<template>
   <div id="app">
      <div class="widget-title">Курс {{ currentCurrency }} на {{ currentDate }}</div>
      <tabs @clicked="tabClicked" ref="tabs">
         <tab v-for="(currencies) in openratesData" :key="currencies.base" :name="currencies.base">
            <div class="user-input">
               <input @input="checkCurrencyQuantity" v-model="currencyQuantity"> {{ currentCurrency }}
            </div>
            <CurrencyPagination
               :array="currencies.rates"
               :currencyQuantity="parseFloat(currencyQuantity)"
               :currentCurrency="currentCurrency"
               :countCurrencies="countCurrencies"
            />
         </tab>
      </tabs>
   </div>
</template>
<script>
import CurrencyPagination from './components/ArrayPagination';
import {Tabs, Tab} from 'vue-tabs-component';


export default {
   components: {
      Tabs, Tab, CurrencyPagination
   },
   data() {
      return {
         openratesData: [],
         isFirstTabsLoad: false,
         currentCurrency: '',
         currentDate: '',
         currencyQuantity: 1,
         countCurrencies: 4
      };
   },
   mounted() {
      if (window.innerWidth >= 720) {
         this.countCurrencies = 4;
      } else {
         this.countCurrencies = 2;
      }
      this.getData();
   },
   updated() {
      if (this.isFirstTabsLoad) {
         this.$refs.tabs.$el.children[0].children[0].children[0].click();
         this.isFirstTabsLoad = false;
      }
   },
   methods: {
      changePage(pagination) {
         this.currentPage = pagination.page;
      },
      getData() {
         fetch('http://localhost:3000/api/openrates')
            .then(response => {
                  if (response.body) return response.json();
               }
            )
            .then(data => {
               this.isFirstTabsLoad = true;
               this.currentCurrency = data[0].base;
               this.currentDate = this.getDateNormalize(data[0].date);
               this.openratesData = this.ratesObjectToArray(data);
               console.log(this.openratesData);
            });
      },
      ratesObjectToArray(data) {
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
         return result;
      },
      getDateNormalize(date) {
         const localDate = new Date(date);
         let month = (localDate.getMonth() + 1);
         month = month > 9 ? month : '0' + month;
         return localDate.getFullYear() + '.' + month + '.' + localDate.getDate();
      },
      tabClicked(selectedTab) {
         this.currentCurrency = this.findTab('base', selectedTab.tab.name);
         this.currentDate = this.getDateNormalize(this.findTab('date', selectedTab.tab.name));
      },
      findTab(key, tabName) {
         return this.openratesData.find(tab => {
            if (tabName === tab.base) return true;
         })[key];
      },
      checkCurrencyQuantity(input) {
         if (!isFinite(input.data)) {
            this.currencyQuantity = 1;
         }
      }
   }
};

</script>

<style lang="scss">
* {
   box-sizing: border-box;
}

body {
   min-width: 320px;
   margin: 0;
   padding: 0;
}

#app {
   font-family: Roboto, 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   max-width: 720px;
   background-color: #FFE782;
}

.widget-title {
   font-size: 21px;
   line-height: 25px;
   color: #2B2D33;
   padding-top: 30px;
   padding-left: 24px;
}

.user-input {
   input {
      outline: none;
      border: none;
      font-size: 18px;
      line-height: 21px;
      color: #2B2D33;
      max-width: 120px;
      text-align: right;
      position: relative;
      border-bottom: 1px solid #D9D9D9;
   }

   text-align: right;
   padding-top: 25px;
   margin-bottom: 25px;
   padding-right: 25px;
   font-size: 18px;
   line-height: 21px;
   color: #B9B9B9;
}

.tabs-component-panels {
   background-color: #fff;
}

.tabs-component-tabs {
   border-radius: 6px;
   margin-bottom: 5px;
}

.tabs-component-tabs {
   border: 0;
   align-items: stretch;
   display: flex;
   justify-content: flex-start;
   margin-bottom: -1px;
   color: #999;
   font-size: 14px;
   font-weight: 600;
   margin-right: 0;
   list-style: none;
}


.tabs-component-tab:hover {
   color: #666;
}

.tabs-component-tab.is-active {
   color: #000;
   background-color: #fff;
}

.tabs-component-tab.is-disabled * {
   color: #cdcdcd;
   cursor: not-allowed !important;
}


.tabs-component-tab {
   border-radius: 3px 3px 0 0;
   margin-right: .5em;
   transform: translateY(2px);
   transition: transform .3s ease;
}

.tabs-component-tab.is-active {
   border-bottom: solid 1px #fff;
   z-index: 2;
   transform: translateY(0);

   .tabs-component-tab-a {
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #2B2D33;
   }
}


.tabs-component-tab-a {
   align-items: center;
   display: flex;
   padding: 14px 32px 18px;
   text-decoration: none;
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   text-align: center;
   color: #CCAE68;
}

@media (max-width: 720px) {
   .user-input {
      font-size: 14px;
      line-height: 16px;
   }
}
</style>
