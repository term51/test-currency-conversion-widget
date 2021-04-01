<template>
   <div id="app">
      <div class="widget-title">Курс {{ currentCurrency }} на {{ currentDate | dateNormalize }}</div>
      <tabs @clicked="tabClicked" ref="tabs">
         <tab v-for="(currencies) in openratesData"
              :key="currencies.base"
              :name="currencies.base">
            <currency-quantity
               @user-input="userInput"
               :current-currency="currentCurrency"/>
            <currency-exchange-rates
               :rates="currencies.rates"
               :currency-quantity="parseFloat(currencyQuantity)"
               :current-currency="currentCurrency"
               :count-currencies="countCurrencies"
            />
         </tab>
      </tabs>
   </div>
</template>
<script>
import CurrencyExchangeRates from './components/CurrencyExchangeRates';
import CurrencyQuantity from './components/CurrencyQuantity';
import {Tabs, Tab} from 'vue-tabs-component';

export default {
   components: {
      Tabs, Tab, CurrencyExchangeRates, CurrencyQuantity
   },
   data() {
      return {
         currencyQuantity: 1,
         currentCurrency: '',
         openratesData: [],
         isFirstTabsLoad: false,
         currentDate: '',
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
      async getData() {
         this.isFirstTabsLoad = true;
         await this.$store.dispatch('getAPIopenratesData');
         this.openratesData = this.$store.state.openratesData;
         this.currentCurrency = this.openratesData[0].base;
         this.currentDate = this.openratesData[0].date;
      },
      tabClicked(selectedTab) {
         this.currentCurrency = this.findTab('base', selectedTab.tab.name);
         this.currentDate = this.findTab('date', selectedTab.tab.name);
      },
      findTab(key, tabName) {
         return this.openratesData.find(tab => {
            if (tabName === tab.base) return true;
         })[key];
      },
      userInput(value) {
         this.currencyQuantity = value;
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
