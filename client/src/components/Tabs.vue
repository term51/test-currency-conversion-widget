<template>
   <div>
      <div ref="tabs" class="tabs">
         <div v-for="(tab,index) in data" :key="index" class="tabs__item">
            <a ref="tabsLinks" href="#" :class="{'tabs__link--active': index === 0}"
               class="tabs__link">{{ tab.base }}</a>
         </div>
      </div>

      <div v-for="(tabText, index) in data" :key="index" class="tabs-text">
         <div ref="tabsContents" class="tabs-text__item">
            <h3>{{ tabText.base }}</h3>
            <p>{{ tabText.rates }}</p>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'Tabs',
   data() {
      return {};
   },
   props: {
      data: Array
   },
   watch: {
      data: function (data) {
         if (data.length > 0) {
            this.buildTabs();
         }

      }
   },
   methods: {
      buildTabs() {
         setTimeout(() => {
            var tabsContainer = this.$refs.tabs,
               tabsLinks = this.$refs.tabsLinks,
               tabsContents = this.$refs.tabsContents;

            tabsContents.forEach(function (tabContent, index) {
               if (index !== 0) tabContent.style.display = 'none';
            });

            for (var i = 0; i < tabsLinks.length; i++) {
               tabsLinks[i].setAttribute('data-tab', i);
               tabsContents[i].setAttribute('data-tab', i);
            }

            tabsContainer.onclick = function (e) {
               if (!e.target.classList.contains('tabs__link')) return;

               tabsLinks.forEach(function (link) {
                  link.classList.remove('tabs__link--active');
               });

               e.target.classList.add('tabs__link--active');

               tabsContents.forEach(function (tabContent) {
                  tabContent.style.display = 'none';
               });

               tabsContents.forEach(function (tabContent) {
                  if (tabContent.dataset.tab === e.target.dataset.tab) {
                     tabContent.style.display = 'block';
                  }
               });
            };
         });

      }
   }
};
</script>

<style scoped lang="scss">
.tabs {
   margin: 0 50px;
   padding: 20px;
   text-align: center;
   background-color: #222;

   &__item {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 5px;
   }

   &__link {
      display: block;
      padding: 10px 20px;
      background-color: #fff;
      text-decoration: none;
      font-size: 22px;
      color: #000;
      text-transform: uppercase;

      &:hover {
         background-color: orange;
      }

      &--active {
         position: relative;
         background-color: orange;

         &:after {
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -10px;
            content: '';
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid transparent;
            border-bottom: 10px solid #222;
         }
      }
   }
}

.tabs-text {
   margin: 0 50px;
   padding-top: 1px;
   background-color: dimgray;
   color: floralwhite;
   font-size: 1.1em;

   &__item {
      padding: 0 10px;
      padding-bottom: 10px;
   }
}

</style>