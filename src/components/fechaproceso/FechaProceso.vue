<template>
  <div class="position-relative">
    <b-row align-v="center">
      <b-col v-if="label" md="4" class="pr-0">
        <label class="p-0 m-0">Fecha Proceso:</label>
      </b-col>
      <b-col :class="label?'col-md-7 pl-0':'col-md-12'">
        <b-form-select v-model="fecha" :options="options" @input="onChangeFechaProceso">
          <b-form-select-option :value="null">Selecciona una fecha</b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>
    <div v-if="showAlertCustom" class="position-absolute date--ctn-position bg-warning p-2">
      <b-button-close @click="showAlertCustom=false"/>
      <p class="m-0 p-0">¿Desea actualizar la fecha de proceso del sistema?</p>
      <div class="p-1 text-center">
        <b-button class="col-md-4 mr-1" size="sm" variant="light" @click="onUpdateFecha">Si</b-button>
        <b-button class="col-md-4" size="sm" @click="showAlertCustom=false">No</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component , Vue, Prop} from 'vue-property-decorator';
import * as notify from '@/utilities/notificaciones';
import * as fechaService from "@/services/sistema/fechaservicio";
import moment from "moment";

interface Fecha{
  id: number,
  fecha: Date,
  estado: boolean
}

@Component
export default class FechaProceso extends Vue{

  @Prop({required:false})
  label!: boolean;

  fecha : any = null;
  showAlertCustom = false;
  options:Array<object> = []

  async mounted(){
    const fechas: Array<Fecha> = await fechaService.obtenerListadoDeFechas();
    for(const data of fechas){
      const t = new Date(data.fecha)
      t.setDate(t.getDate() + 1)
      this.options.push({value: t, text: moment(data.fecha).format("YYYY-MM-DD")});
    }
    try {
      const response = await this.$store.dispatch('fechaProceso/onGetFecha');
      this.fecha = response;
    }catch (e) {
      notify.enviarNotificacion("La información de fecha de proceso no se encuentra disponible en este momento, intentelo mas tarde.","danger");
    }
  }

  onChangeFechaProceso(){
    if(this.fecha != this.$store.state.fechaProceso.fecha){
      this.showAlertCustom = true;
    }
  }

  async onUpdateFecha(){
    notify.enviarNotificacion("Actualizando fecha de proceso","info");
    try {
      const response = await this.$store.dispatch('fechaProceso/onUpdateFecha', moment(this.fecha).format("YYYY-MM-DD"));
      this.showAlertCustom = false;
      notify.enviarNotificacion("Fecha actualizada","success");
      this.$emit("onChangeFecha")
    }catch (e) {
      notify.enviarNotificacion("Error al actualizar la fecha","danger");
    }
  }
}
</script>
<style lang="stylus">
    .date--ctn-position
        width 100%
        margin-top 1px
        z-index 1000
</style>
