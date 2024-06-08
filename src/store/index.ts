import Vue from "vue";
import Vuex from "vuex";
import FechaProceso from './modules/fechaProceso'
import Alertas from './modules/alertas'
import Datasheet from './modules/datasheet'
import UnitValueChart from './modules/unitvaluechart'
import LoginModule from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    fechaProceso: FechaProceso,
    alerts: Alertas,
    datasheet: Datasheet,
    unitValueChart: UnitValueChart,
    login: LoginModule
  }
});
