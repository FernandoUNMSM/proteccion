<template>
  <b-row>
    <b-col>
      <b-form-select v-if="anios.length>0" v-model="sltanio" :options="anios" id="select-annios">
      </b-form-select>
    </b-col>
    <b-col>
      <b-form-select v-if="meses.length>0" v-model="sltmes" :options="meses" id="select-meses">
      </b-form-select>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import * as fechaServices from '@/services/sistema/fechaservicio'
import moment from "moment";

@Component
export default class FechaGeneral extends Vue{
  meses: Array<any> = [];
  anios: Array<any> = [];
  sltmes:any = null;
  sltanio:any = null;
  fecha = "";
  mounted(){
    this.obtenerMeses();
    this.obtenerAnios();
  }
  obtenerMeses(){
    moment.locale("es");
    const meses = moment.months();
    for(const i in meses){
      this.meses.push({
        value: parseInt(i),
        text: meses[i].toUpperCase()
      });
    }
  }
  async obtenerAnios(){
    const anios = await fechaServices.obtenerAniosInSistema();
    if(anios.length>0){
      for(const anio of anios){
        this.anios.push({
          value: anio,
          text: anio
        });
      }
    }
    return anios;
  }
  @Watch('sltmes')
  @Watch('sltanio')
  updateFecha(){
    if(this.sltmes != null && this.sltanio != null){
      const fecha = `${this.sltanio}/${this.sltmes+1}/01`;
      const day = moment(fecha,"YYYY/MM/DD").daysInMonth();
      this.fecha = moment(`${this.sltanio}-${this.sltmes+1}-${day}`).format('YYYY-MM-DD');
    }
  }
  @Watch('fecha')
  changeDate(){
    this.$emit("onChangeDate", this.fecha);
  }
}
</script>

<style scoped>

</style>
