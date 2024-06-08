<template>
  <layout>
    <b-container>
      <b-row class="mb-4">
        <b-col md="3">
          <div>
            <label>Grupo</label>
            <b-form-select :options="grupos" v-model="sltGrupo" @change="actualizarListaCampos"/>
          </div>
        </b-col>
        <b-col md="3" v-if="grupoCampos.length>2">
          <div>
            <label>Campos</label>
            <b-form-select :options="grupoCampos" v-model="sltCampo" @change="obtenerRegistros"/>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="data!=null">
        <b-col md="3" v-for=" key of listaCamposOrdenados" :key="key" class="mt-2 mb-2">
          <label class="font-weight-bold">{{key}}:</label>
          <b-form-datepicker v-if="key=='fechaAlta'||key=='fechaBaja'" v-model="data[key]" locale="es" :date-format-options="{year:'numeric',month:'numeric',day:'numeric'}" />
          <b-form-select v-else-if="'tipoCampo' === key" v-model="data[key]" :value="data[key]" :options="tiposCampo"></b-form-select>
          <b-form-checkbox v-else-if="typeof data[key] == 'boolean'" v-model="data[key]" :value="data[key]" />
          <b-form-input :disabled="['idCampo','idCampoPadre'].includes(key)" v-else v-model="data[key]" :value="data[key]" @change="onChangeDeleteWitespaces(key)" />
        </b-col>
      </b-row>
      <b-row class="mt-3 mb-3" v-if="data!=null">
        <b-col>
          <b-button variant="success" @click="actualizarCampo">Actualizar</b-button>
        </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as fichaTecnicaServices from "@/services/sistema/fichatecnica";
import * as nfServices from "@/utilities/notificaciones";
import itemrentabilidades from "@/components/inversiones/itemrentabilidades.vue";
@Component
export default class FichaTecnica extends Vue {
  campos: Array<any> = []
  sltGrupo: any = null;
  sltCampo: any = null;
  tiposCampo = [
    { value: 'TEXTO', text: 'Texto (e.g: AC-EQINT21)' },
    { value: 'FECHA', text: 'Fecha (e.g: Septiembre 05 de 2021)' },
    { value: 'ENTERO', text: 'Entero (e.g: 32)' },
    { value: 'DECIMAL', text: 'Decimal (e.g: 14.23)' },
    { value: 'MONEDA', text: 'Moneda (e.g: $ 1,233,212.34)' },
    { value: 'PORCENTAJE', text: 'Porcentaje (e.g: 23.45%' }
  ]
  grupos = [
    {text: "Selecciona un grupo", value: null},
    {
      text: "Caracteristicas del portafolio",
      value: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 72, 73, 74]
    },
    {text: "Calificación tipo riesgo", value: [24, 25, 26, 27, 28, 29, 75,76,77]},
    {text: "Estrategia inversion", value: [30, 31, 78, 79, 80]},
    {text: "Evolución", value: [32, 33, 34, 35, 36]},
    {text: "Distribución portafolio", value: [37, 38, 39, 40, 41, 42, 43]},
    {text: "Hoja de vida del administrador", value: [44, 45, 46, 47, 48]},
    {text: "Empresas vinculadas", value: [49, 50]},
    {text: "Revisor fiscal", value: [51, 52, 53, 54, 55, 56, 57]},
    {text: "Defensor del consumirdor financiero", value: [58, 59, 60, 61, 62, 63, 64]},
    {text: "Defensor suplente del consumidor financiero", value: [65, 66, 67, 68, 69, 70]},
    {text: "Disclaimer", value: [71]},
    {text: "Gastos y comisiones del portafolio", value: [82]}
  ];
  grupoCampos: any = [
    {text: "Selecciona un campo", value: null}
  ]
  data: any = null;

  get listaCamposOrdenados(){
    return Object.keys(this.data).sort();
  }

  async mounted() {
    this.campos = await this.obtenerCampos();
  }

  async obtenerCampos() {
    return fichaTecnicaServices.obtenerListadoDeCampos();
  }

  actualizarListaCampos() {
    if (this.sltGrupo != null) {
      const campos = this.campos.filter(c => this.sltGrupo.includes(c.idCampo));
      this.grupoCampos = campos.map(c => {
        return {text: c.nombreCampoFT, value: c}
      });
    }
  }

  obtenerRegistros() {
    if (this.sltCampo != null) {
      const camposAValidar = ["numeroTitulo","numeroTituloFondoColorHEX","numeroTituloFuente","numeroTituloFuenteColorHEX","numeroTituloFuenteTamano"];
      const camposAValidarCuandoEsTitulo = ["valorCampoFTFondoColorHEX","valorCampoFTFuente","valorCampoFTFuenteColorHEX","valorCampoFTFuenteTamano"];
      camposAValidar.forEach(p => {
        if (this.sltCampo[p] == null){
          delete this.sltCampo[p];
        }else{
          camposAValidarCuandoEsTitulo.forEach(c => delete this.sltCampo[c]);
        }
      });
      this.data = this.sltCampo;
    }
  }

  async actualizarCampo() {
    nfServices.enviarNotificacion("Actualizando campo de ficha tecnica", "info");
    const data = await fichaTecnicaServices.actualizarCampo(this.data);
    if (data != null) {
      nfServices.enviarNotificacion("Campo de ficha actualizado", "success")
    }
  }

  onChangeDeleteWitespaces(key: string){
    this.data[key] = this.data[key].trim();
  }
}
</script>

<style scoped>

</style>
