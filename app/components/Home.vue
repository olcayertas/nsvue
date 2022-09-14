<template>
  <Page actionBarHidden="true">
    <StackLayout class="root">
      <FlexboxLayout class="top" flexDirection="column" alignItems="center">
        <Label class="title" :text="title"/>
        <Label textWrap="true" textAlignment="center" class="description" :text="description"/>
      </FlexboxLayout>
      <FlexboxLayout class="bottom" flexDirection="column">
        <FlexboxLayout flexDirection="column">
          <FlexboxLayout>
            <button @tap="onExchangeButtonTap" class="exchangeButton">
              <FormattedString>
                <Span :text="selectedExchange" class="exchange"/>
                <Span text=" ▼" class="exchange"/>
              </FormattedString>
            </button>
            <FlexboxLayout class="currencyButton" @tap="onCurrencyButtonTap">
              <Label text=" ▼" class="exchange"/>
              <Image class="icon" src="~/images/euro.png" stretch="aspectFit"/>
              <Image class="icon" src="~/images/euro.png" stretch="aspectFit"/>
            </FlexboxLayout>
          </FlexboxLayout>
          <ListPicker
            :hidden="!showExchangePicker"
            :items="exchanges"
            :selectedIndex="selectedExchangeIndex"
            @selectedIndexChange="selectedIndexChanged"/>
          <Label class="price" :text="price"/>
          <Label class="change" :text="change"/>
        </FlexboxLayout>
        <RadCartesianChart class="chart" ref="chart">
          <LinearAxis ref="haxis" v-tkCartesianHorizontalAxis hidden="true"/>
          <LinearAxis v-tkCartesianVerticalAxis hidden="true"/>
          <AreaSeries
            :items="items"
            valueProperty="value"
            categoryProperty="date"
            v-tkCartesianSeries
          />
        </RadCartesianChart>
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>


<script lang="ts">
import Vue from "nativescript-vue";
import RadChart from 'nativescript-ui-chart/vue';
import { finHubApiClient } from "~/api";
import { ObservableArray } from "@nativescript-community/observable/observablearray";
import { View } from "@nativescript/core";
import { title } from "process";

let index = 0;
const now = (new Date()).getMilliseconds();
const items = new ObservableArray(Array.from({ length: 100 }, () => {
  const tmp = Math.random();
  return {
    value: Math.floor( (tmp > 0.5 ? tmp : tmp + 0.5)* 100) % 100,
    date: index++
  }
}));

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
      items: items
    }
  },
  mounted() {
    finHubApiClient
    .exchange()
    .then(response => {
      this.exchanges = response
    })
    .catch(console.log)

    const chart = this.$refs.haxis as Vue<View>
    const axis = chart.nativeView as any
    axis.hidden = false
    axis.hidden = true
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
    }
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
  padding-top: 20;
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
  padding-top: 10;
  background-color: rgba($color: #FFFFFF, $alpha: 0.5);
  border-radius: 16;
  margin-top: -70;
  margin-bottom: 20;
}
.exchangeButton {
  text-align: left;
  width: 60%;
  background-color: transparent;
  border-width: 1;
  border-color: transparent;
  z-index: 0;
}
.currencyButton {
  padding-right: 20;
}
.icon {
  width: 50;
  height: 50;
}
.root {
  background-color: white;
  height: 100%;
}
.grid {
  width: 100%;
}

.chart {
  width: 100%;
  height: 300;
  background-color: darkkhaki;
}
.area {
  background-color: chartreuse;
}
</style>
