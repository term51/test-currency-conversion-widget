'use strict';

module.exports = function (app) {

   const baseCurrencies = ['USD', 'EUR', 'CAD', 'AUD'];
   const APIopenratesData = app.dataSources.APIopenratesio;
   const OpenratesModel = app.models.openrates;

   for (let i = 0; i < baseCurrencies.length; i++) {
      const currentCurrency = baseCurrencies[i];
      APIopenratesData.getCurrency(currentCurrency, function (err, response) {
         if (err) throw err;
         OpenratesModel.upsertWithWhere(
            {base: currentCurrency},
            response,
            function (err, Openrates) {
               if (err) throw err;
               console.log('Models created: \n', Openrates);
            }
         );
      });
   }
};