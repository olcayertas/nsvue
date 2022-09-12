<template>
  <Page>
    <StackLayout class="root">
      <FlexboxLayout
        class="top"
        flexDirection="column"
        alignItems="center"
      >
        <Label class="title" :text="title" />
        <Label
            textWrap="true"
            textAlignment="center"
            class="description"
            :text="description"
        />
      </FlexboxLayout>
      <FlexboxLayout class="bottom" flexDirection="column">
        <FlexboxLayout flexDirection="column">
          <FlexboxLayout class="buttonGroup">
            <button @tap="onExchangeButtonTap" class="exchangeButton">
              <FormattedString>
                <Span :text="selectedExchange" class="exchange"/>
                <Span text=" ▼" class="exchange"/>
              </FormattedString>
            </button>
            <FlexboxLayout class="currencyButton" @tap="onCurrencyButtonTap">
              <Label text=" ▼" class="exchange"/>
              <Image class="icon" src="~/images/euro.png" stretch="aspectFit" />
              <Image class="icon" src="~/images/euro.png" stretch="aspectFit" />
            </FlexboxLayout>
          </FlexboxLayout>
          <Label class="price" :text="price" />
          <Label class="change" :text="change" />
        </FlexboxLayout>
        <ListPicker
          :hidden="!showExchangePicker"
          :items="exchanges"
          :selectedIndex="selectedExchangeIndex"
          @selectedIndexChange="selectedIndexChanged"
        />
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>



<script lang="ts">
import Vue from "nativescript-vue";
import { finHubApiClient } from "~/api";
//import config from "@/chart/config.json";
//import data from "@/chart/data.json"

/*
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:uc="@nativescript/ui-charts">
<GridLayout>
  <uc:UIChartsView id="chartView" loaded="chartViewLoaded" />
</GridLayout>
*/

export default Vue.extend({
  data() {
    return {
      change: "▴ +4.63 (+3.42%)",
      price: "$100.66",
      title: "Forex Exchange",
      description: "Checkout the current price on different exchange for a currency pair",
      exchanges: [] as string[],
      selectedExchangeIndex: 3,
      selectedExchange: "",
      showExchangePicker: false,
      exchangeButtonArrow: " › ",
      //chartView: undefined as any
    }
  },
  mounted() {
    finHubApiClient
    .exchange()
    .then(response => {
      this.exchanges = response
    })
    .catch(console.log)
  },
  methods: {
    onExchangeButtonTap() {
      //console.info("onExchangeButtonTap")
      this.showExchangePicker = !this.showExchangePicker
      this.exchangeButtonArrow = this.showExchangePicker ? " ⌄ " : " › "
    },
    onCurrencyButtonTap() {
      console.info("onCurrencyButtonTap")
    },
    selectedIndexChanged(event: { value: number }) {
      console.info("selectedIndexChanged", event.value)
      this.selectedExchangeIndex = event.value
      if (this.exchanges.length > event.value) {
        this.selectedExchange = this.exchanges[event.value]
      }
    },
    /*chartViewLoaded(args: any) {
      this.chartView = args.object;
      this.chartView.setOptions({
        ...config,
        data
      });
    }*/
  }
});
</script>

<style scoped lang="scss">
@import '@nativescript/theme/scss/variables/blue';

// Custom styles

.fas {
  @include colorize($color: accent);
}
.info {
  font-size: 20;
}
.title {
  font-size: 20;
  font-weight: 600;
  text-align: center;
}
.exchange {
  font-size: 18;
  font-weight: 600;
  margin-right: 3;
}
.price {
  font-size: 32;
  font-weight: 600;
  text-align: center;
  margin-top: 16;
}
.change {
  font-size: 20;
  color: green;
  text-align: center;
  margin-bottom: 16;
}
.description {
  font-size: 16;
  font-weight: 400;
}
.exchanceName {
  font-size: 16;
  font-weight: 400;
}
.top {
  background-color: rgb(188, 234, 255);
  overflow: visible;
  padding-left: 60;
  padding-right: 60;
  padding-bottom: 100;
  z-index: 0;
}
.bottom {
  margin-left: 20;
  margin-right: 20;
  padding-right: 20;
  padding-top: 10;
  background-color: rgba($color: #FFFFFF, $alpha: 0.5);
  border-radius: 16;
  margin-top: -70;
  margin-bottom: 20;
}
.buttonGroup {
  
}
.exchangeButton {
  text-align: left;
  width: 60%;
  background-color: transparent;
}
.currencyButton {
}
.icon {
  width: 50;
  height: 50;
}
.root {
  background-color: bisque;
  height: 100%;
}

</style>
