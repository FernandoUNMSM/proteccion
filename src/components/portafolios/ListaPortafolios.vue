<template>
  <b-row align-v="center">
    <b-col md="4" class="ml-0 text-center">
      <label class="m-0 p-0">Portafolios</label>
    </b-col>
    <b-col class="mr-0">
      <b-form-select v-model="selected" :options="portafolios" id="select-portafolios"/>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import * as service from "@/services/portafolios";
import * as notify from "@/utilities/notificaciones";

@Component
export default class ListaPortafolios extends Vue{

  selected = "";
  portafolios: Array<any> = [];

  async mounted() {
    await this.obtenerListaPortafolios();
  }

  async obtenerListaPortafolios(){
    try {
      const data = await service.getListaPortafolios();
      this.portafolios = this.obtenerPortafoliosFormateados(data);
    } catch (e) {
      notify.enviarNotificacion(
        "Error al traer el listado de portafolios, por favor intente mas tarde",
        "warning"
      );
    }
  }

  @Watch("selected")
  onChangeValue(nuevo: string) {
    this.$emit("onChangeValue", null);
  }

  obtenerPortafoliosFormateados(data: Array<any>){
    return data.map(p=>{return {text:p.portafolio.toUpperCase()+"-("+p.nombrePortafolio+")", value:p.portafolio}});
  }
}
</script>
<style scoped></style>
