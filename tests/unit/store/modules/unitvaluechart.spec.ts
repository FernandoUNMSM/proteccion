import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import UnitValueChart from "@/store/modules/unitvaluechart";
import axios from "axios";
import axiosInstance from "@/config/axiosInstance";
jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));
describe("Store DataSheet testing", () => {
  let localVue;
  let store: Store<any>;
  beforeEach(() => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: { payload: [] } });
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        unitValueChart: UnitValueChart
      }
    });
  });

  it("test on setUvSeries", () => {
    store.commit("setUvSeries", []);
  });

  it("test on setUvOptions", () => {
    store.commit("setUvOptions", {});
  });

  it("test on setCpSeries", () => {
    store.commit("setCpSeries", []);
  });

  it("test on setCpOptions", () => {
    store.commit("setCpOptions", {});
  });

  it("test ongetDataSheetInfo without information", () => {
    axios.get = jest.fn().mockResolvedValue({ data: { payload: [] } });
    expect(store.dispatch("getUnitValueChart", {}));
  });

  it("test ongetDataSheetInfo with information", () => {
    axios.get = jest.fn().mockResolvedValue({ data: { payload: [] } });
    expect(store.dispatch("getUnitValueChart", { portfolio: "VOL-EQCOL", date: "2021-01-31" }));
  });
  it("test ongetDataSheetInfo with information", () => {
    store.getters["CpOptions"];
    store.getters["CpSeries"];
    store.getters["IrOptions"];
    store.getters["IrSeries"];
    store.getters["UvOptions"];
    store.getters["UvSeries"];
  });
});
