<template>
   <div class="card-wrap">
      <div class="card-content">
         <div class="card-box"
              v-for="currencyRate in result"
              :key="currencyRate.currency"
              :title="calculateCurrency(currencyRate.rate) +' '+currencyRate.currency">
            <div class="card-title">{{ currencyQuantity }} <span>{{ currentCurrency }} =</span></div>
            <div class="card-currency">{{ calculateCurrency(currencyRate.rate) }}
               <span>{{ currencyRate.currency }}</span>
            </div>
         </div>
      </div>
      <div class="card-footer">
         <button :class="{'btn-disabled': currentPage === 1}"
                 @click="prev">НАЗАД
         </button>
         <button :class="{'btn-disabled': currentPage === lastPage }"
                 @click="next">ДАЛЕЕ
         </button>
      </div>
   </div>
</template>

<script>
import {useArrayPagination} from 'vue-composable';

export default {
   props: {
      rates: Array,
      currencyQuantity: Number,
      currentCurrency: String,
      countCurrencies: Number
   },
   setup(props) {
      const {next, prev, currentPage, lastPage, result} = useArrayPagination(props.rates, {
         'pageSize': props.countCurrencies
      });

      return {
         result, next, prev, currentPage, lastPage
      };
   },
   methods: {
      calculateCurrency(currencyRate) {
         let amount = this.currencyQuantity * currencyRate;
         return Math.round((amount) * 100) / 100;
      }
   }
};
</script>
<style scoped lang="scss">
.card {
   &-wrap {
      display: flex;
      flex-direction: column;

   }

   &-content {
      display: flex;
      flex-flow: wrap;
      margin-left: 25px;
   }

   &-box {
      width: 327px;
      background: #FFFFFF;
      box-shadow: 0px 3px 6px rgba(157, 157, 157, 0.16);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 18px;
      min-height: 138px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 18px 30px;

      &:nth-child(odd) {
         margin-right: 18px;
      }
   }

   &-title {
      font-weight: 300;
      font-size: 24px;
      line-height: 28px;
      color: #2B2D33;

      span {
         color: #B9B9B9;
      }
   }

   &-currency {
      font-style: normal;
      font-weight: 300;
      font-size: 48px;
      line-height: 56px;
      color: #2B2D33;
      overflow: hidden;
      white-space: nowrap;

      span {
         font-size: 22px;
      }
   }

   &-footer {
      text-align: center;

      button {
         font-weight: 300;
         font-size: 14px;
         line-height: 16px;
         letter-spacing: 1px;
         text-transform: uppercase;
         color: #2B2D33;
         background: #FFFFFF;
         box-shadow: 0px 5px 6px rgba(157, 157, 157, 0.16);
         border-radius: 8px;
         outline: none;
         border: none;
         padding: 10px 20px;
         cursor: pointer;
         transition: all .2s ease;

         &:hover {
            box-shadow: 0px 5px 16px rgba(157, 157, 157, 0.16);
         }

         &:first-child {
            margin-right: 20px;
         }

         &.btn-disabled {
            background: #EFEFEF;
            color: #787878;
            cursor: default;
         }
      }
   }
}

@media (max-width: 720px) {
   .card {
      &-box {
         width: 100%;
         margin-right: 0;
      }

      &-title {
         font-size: 18px;
         line-height: 21px;
      }

      &-currency {
         font-size: 36px;
         line-height: 42px;
      }
   }
}
</style>