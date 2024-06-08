import { createLocalVue } from "@vue/test-utils";
import Vuex, { Store } from "vuex";
import axiosInstance from "@/config/axiosInstance";
import FechaProceso from "@/store/modules/fechaProceso";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Store fecha proceso testing", () => {
  let localVue;
  let store: Store<any>;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        fechaProceso: FechaProceso
      }
    });
  });

  it("test getFecha", () => {
    // store.getters["fechaProceso/getFecha"];
    const message = store.getters["fechaProceso/getFecha"];
    expect(message).toBe(null);
  });
  it("test onGetDate", () => {
    axiosInstance.get = jest
      .fn()
      .mockResolvedValue({ data: { payload: { valor: "2020-05-31" } } });
    store.dispatch("fechaProceso/onGetFecha");
  });

  it("test onUpdateFecha", () => {
    axiosInstance.put = jest.fn().mockResolvedValue({ data: {} });
    store.dispatch("fechaProceso/onUpdateFecha", new Date("2020-05-31"));
  });

  it("test onUpdateFecha reject", () => {
    axiosInstance.put = jest.fn().mockRejectedValue({ data: {} });
    store.dispatch("fechaProceso/onUpdateFecha", new Date("2020-05-31"));
  });

  it("test onGetDateError", () => {
    axiosInstance.get = jest.fn().mockImplementationOnce(() => new Error(""));
    store.dispatch("fechaProceso/onGetFecha");
  });
  it("test onGetDateError reject", () => {
    store.commit("fechaProceso/updateFecha", null);
    axiosInstance.get = jest.fn().mockRejectedValue(() => new Error(""));
    store.dispatch("fechaProceso/onGetFecha");
  });

  it("test onUpdateAlertError", () => {
    axiosInstance.put = jest.fn().mockImplementationOnce(() => new Error(""));
    store.dispatch("fechaProceso/onUpdateFecha", new Date("2020-05-31"));
  });

  it("test onUpdateFecha 2", () => {
    const message = store.getters['fechaProceso/getFecha'];

    store.dispatch("fechaProceso/onUpdateFecha", message);
  });
  // it("test setFecha", () => {
  //   store.commit("fechaProceso/setFecha", new Date("2020-05-31"));
  // });
});
