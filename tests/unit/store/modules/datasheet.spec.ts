import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import DataSheet from "@/store/modules/datasheet";
import axiosInstance from "@/config/axiosInstance";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

const localVue = createLocalVue();
localVue.use(Vuex);
describe("Store DataSheet testing", () => {
  let store: Store<any>;
  beforeEach(() => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: { payload: { valor: "0.0" } } });
    store = new Vuex.Store({
      modules: {
        datasheet: DataSheet
      }
    });
  });
  it("test on setCutDate", () => {
    store.commit("setCutDate", {});
  });
  it("test on setBaseBalance", () => {
    store.commit("setBaseBalance", {});
  });

  it("test on setGeneralInfo", () => {
    store.commit("setGeneralInfo", {});
  });

  it("test on setPortfolioName", () => {
    store.commit("setPortfolioName", {});
  });

  it("test on setInvesmentConditions", () => {
    store.commit("setInvesmentConditions", {});
  });

  it("test on setRisk", () => {
    store.commit("setRisk", {});
  });

  it("test on setObservations", () => {
    store.commit("setObservations", {});
  });

  it("test on setPortfolioCalification", () => {
    store.commit("setPortfolioCalification", {});
  });

  it("test on setInvestmentPolicy", () => {
    store.commit("setInvestmentPolicy", {});
  });

  it("test on setObservations", () => {
    store.commit("setObservations", {});
  });

  it("test on setPortfolioInvestment", () => {
    store.commit("setPortfolioInvestment", {});
  });

  it("test on setPrincipalPortfolioInvestment", () => {
    store.commit("setPrincipalPortfolioInvestment", {});
  });

  it("test on setComissionDetail", () => {
    store.commit("ComissionDetail", {});
  });

  it("test on setAdditionalInfo", () => {
    store.commit("setAdditionalInfo", {});
  });

  it("test on setHistoricalProfitability", () => {
    store.commit("setHistoricalProfitability", {});
  });

  it("test on setHistoricalComission", () => {
    store.commit("setHistoricalComission", {});
  });
  it("test on setHistoricalVolatility", () => {
    store.commit("setHistoricalVolatility", {});
  });

  it("test ongetDataSheetInfo without information", () => {
    expect(store.dispatch("getDataSheetInfo", {}));
  });

  it("test ongetDataSheetInfo with information", () => {
    expect(store.dispatch("getDataSheetInfo", { portfolio: "VOL-EQCOL", date: "2021-01-31" }));
  });
  it("test ongetDataSheetInfo with information", () => {
    store.getters["HistoricalVolatilityHeader"];
    store.getters["HistoricalVolatility"];
    store.getters["HistoricalComission"];
    store.getters["HistoricalComissionHeader"];
    store.getters["HistoricalProfitability"];
    store.getters["HistoricalProfitabilityHeader"];
    store.getters["AdditionalInfo"];
    store.getters["AdditionalInfoHeader"];
    store.getters["ComissionDetail"];
    store.getters["ComissionDetailHeader"];
    store.getters["PrincipalPortfolioInvestmentHeader"];
    store.getters["PrincipalPortfolioInvestment"];
    store.getters["PortfolioInvestment"];
    store.getters["OtherFactorsHeader"];
    store.getters["EconomicSectorHeader"];
    store.getters["ActiveClassesHeader"];
    store.getters["InvestmentPolicy"];
    store.getters["PortfolioCalification"];
    store.getters["Observations"];
    store.getters["Risk"];
    store.getters["InvesmentConditions"];
    store.getters["InvesmentConditionsHeader"];
    store.getters["GeneralInfo"];
    store.getters["GeneralInfoHeader"];
    store.getters["BaseBalance"];
    store.getters["PortfolioName"];
    store.getters["CutDate"];
    store.getters["PortfolioCalificationHeader"];
    store.getters["CalificationHeader"];
  });
});
