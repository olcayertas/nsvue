import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import { TouchManager, CoreTypes } from '@nativescript/core'

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

// To make custom buttons have ripple effect.
TouchManager.enableGlobalTapAnimations = true
TouchManager.animations = {
  down: {
    scale: { x: 0.95, y: 0.95 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut
  }
}

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
