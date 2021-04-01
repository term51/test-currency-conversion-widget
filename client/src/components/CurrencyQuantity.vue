<template>
   <div class="user-input">
      <input
         @input="checkCurrencyQuantity($event.target)"
         v-model="currencyQuantity">
      {{ currentCurrency }}
   </div>
</template>

<script>
export default {
   name: 'CurrentCurrency',
   props: {
      currentCurrency: String
   },
   data() {
      return {
         currencyQuantity: 1
      };
   },
   methods: {
      checkCurrencyQuantity(target) {
         if (!isFinite(target.value)) {
            this.currencyQuantity = 1;
         }
         this.$emit('user-input', target.value);
      }
   }
};
</script>

<style scoped lang="scss">
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
</style>