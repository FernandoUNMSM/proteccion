import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DatePicker from "vue2-datepicker";
import VueApexCharts from "vue-apexcharts";

import * as Msal from "msal";
import { msalConfig } from "./config/msalConfig";

import "./plugins/bootstrap-vue";
import "./global/VueGlobalComponents";

Vue.use(VueApexCharts);

Vue.component("datepicker", DatePicker);
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;

export const msalInstance = new Msal.UserAgentApplication(
  msalConfig.clientID,
  msalConfig.authority,
  function(errorDesc, token, error, tokenType) {
    if (error) {
      console.error("Error during login redirect callback:", error);
      sessionStorage.removeItem("logged");
      sessionStorage.removeItem("logout");
    } else {
      console.log("Redirect callback successful:", token);
    }
  },
  {
    cacheLocation: msalConfig.cacheLocation,
    redirectUri: process.env.VUE_APP_REDIRECT_URL,
    postLogoutRedirectUri: process.env.VUE_APP_REDIRECT_URL
  }
);

Vue.prototype.$msal = msalInstance;

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App />",
  render: h => h(App)
});
