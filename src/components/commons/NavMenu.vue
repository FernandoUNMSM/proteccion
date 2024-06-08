<template>
  <div class="container top-container">
    <b-navbar>
      <b-navbar-brand>
        <b-img fluid-grow :src="require('../../assets/logop.png')" class="logo--style-size logo--style-ml"></b-img>
      </b-navbar-brand>
      <b-collapse id="nav-collapse" class="navCollapseContainer" is-nav>
        <b-navbar-nav class="optionsContainer">
          <div class="navbar-nav navBarContainer">
            <b-nav-item to="/"><b-icon icon="house-door" aria-hidden="true"></b-icon> Inicio</b-nav-item>
            <b-nav-item to="/procesos"><b-icon icon="gear-wide-connected" aria-hidden="true"></b-icon>
              Procesos</b-nav-item>
            <b-nav-item to="/consultarInformacion"><b-icon icon="search" aria-hidden="true"></b-icon> Consultar
              Información</b-nav-item>
            <b-nav-item to="/graficas"><b-icon icon="pie-chart" aria-hidden="true"></b-icon> Gr&aacute;ficos</b-nav-item>
            <b-nav-item-dropdown text="Configuración">
              <b-nav-item to="/configuracion/fechas"><b-icon icon="calendar2-month" aria-hidden="true"></b-icon>
                Fechas
              </b-nav-item>
              <b-nav-item to="/configuracion/portafolios"><b-icon icon="list-check" aria-hidden="true"></b-icon>
                Portafolios
              </b-nav-item>
              <b-nav-item to="/configuracion/fichatecnica">
                <b-icon icon="file-earmark-spreadsheet" aria-hidden="true">
                </b-icon>
                Ficha Tecnica
              </b-nav-item>
            </b-nav-item-dropdown>
          </div>
          <div class="nombre">
            <span class="iniciales">
              {{
                nombre
                  .split(" ")
                  .slice(0, 2)
                  .map(pal => pal.charAt(0))
                  .join("")
              }}
            </span>
            <b-nav-item-dropdown :text="nombre">
              <b-nav-item @click="logout">
                Cerrar Sesion
              </b-nav-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script lang="ts">
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      nombre: (state: any) => state.login.nombre
    })
  },
  methods: {
    ...mapMutations("login", ["updateLogout", "updateLogged"]),
    logout() {
      this.$msal.logout();
      this.updateLogout(true);
      this.updateLogged(false);
      sessionStorage.removeItem("logged");

      sessionStorage.removeItem("user");
      this.$store.commit("login/updateUser", null);
    }
  }
};
</script>
<style scoped lang="stylus">
.logo
  &--style-size
    width 200px !important
  &--style-ml
    margin-left -10px
.top-container
  margin-top 20px
  border 1px solid #D0D0D0
  border-radius 5px
  background-color #E8E8E8

.nombre
  display flex
  align-items center
.iniciales
  background-color rgb(30 64 175)
  color #fff
  border-radius 100%
  width 2rem
  height 2rem
  text-align center
  line-height 1.9
.optionsContainer
  width 100%
  display flex
  justify-content space-between
.navBarContainer
  align-items center
  width min-content
.navBarContainer a
  width auto
  display flex
  align-items center
.navBarContainer a svg
  margin-right 5px
.navCollapseContainer
  width -webkit-fill-available
</style>
