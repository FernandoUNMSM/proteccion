import LoginModule from "@/store/modules/login";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Store DataSheet testing", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        login: LoginModule
      }
    });
  });
  it("test on updateLogged", () => {
    store.commit("login/updateLogged", {});
  });
  it("test on updateUser", () => {
    store.commit("login/updateUser", {});
  });
  it("test on updateLogout", () => {
    store.commit("login/updateLogout", {});
  });
});
