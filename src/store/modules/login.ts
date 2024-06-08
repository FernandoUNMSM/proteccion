import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
class LoginModule extends VuexModule {
  user: any = sessionStorage.getItem("user") || null;
  logged = sessionStorage.getItem("logged") || false;
  logout = sessionStorage.getItem("logout") || false;
  nombre = "";

  @Mutation
  updateUser(user: any): void {
    this.user = user;
    this.nombre = user.name;
  }

  @Mutation
  updateLogged(logged: boolean): void {
    this.logged = logged;
  }

  @Mutation
  updateLogout(logout: boolean): void {
    this.logout = logout;
  }
}

export default LoginModule;
