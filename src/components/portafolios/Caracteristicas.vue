<template>
  <b-row>
    <b-col v-if="portafolioData != null">
      <b-row align-h="start">
        <b-col>
          <b-button variant="success" v-if="nuevo" size="sm" class="mr-1" @click="crearPortafolio">Crear Portafolio</b-button>
          <b-button variant="danger" v-if="nuevo" size="sm" class="mr-1" @click="cancelarNuevoPortafolio">Cancelar</b-button>
          <b-button variant="primary" v-else size="sm" v-b-modal="'mdlNuevoPortafolio'" class="mr-1">Crear nuevo portafolio</b-button>
          <b-button variant="primary" v-if="!nuevo" size="sm" @click="actualizarPortafolio">Actualizar Información</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="3" class="text-center" align-self="center">
          <b-form-checkbox class="pt-1 font-weight-bold" v-model="portafolioData['activo']">{{ portafolioData["activo"]?"Activo":"Inactivo" }}</b-form-checkbox>
        </b-col>
        <!--         <b-col md="3" v-if="nuevo">-->
        <b-col md="3">
          <label class="font-weight-bold">Codigo Contabilidad:</label>  
          <b-form-input size="sm" v-model="portafolioData['codigoContabilidad']" :value="portafolioData['codigoContabilidad']"/>
        </b-col>
        <b-col md="3">
          <label class="font-weight-bold">Codigo Portafolio:</label>
          <b-form-input size="sm" v-model="portafolioData['codigoPortafolio']" :value="portafolioData['codigoPortafolio']"/>
        </b-col>
        <b-col md="3">
          <label class="font-weight-bold">Nombre Portafolio:</label>
          <b-form-input size="sm" v-model="portafolioData['nombrePortafolio']" :value="portafolioData['codigoPortafolio']"/>
        </b-col>
        <b-col md="3">
          <label class="font-weight-bold">Nombre Alternativa:</label>
          <b-form-input size="sm" v-model="portafolioData['nombreAlternativa']" :value="portafolioData['codigoPortafolio']"/>
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Tipo portafolio:</label>
          <b-form-select size="sm" v-model="portafolioData['tipoPortafolio']" :options="optionTipoPortafolio" :value="portafolioData['tipoPortafolio']" />
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Reporte:</label>
          <b-form-input size="sm" v-model="portafolioData['reporteNombre']" :value="portafolioData['reporteNombre']" />
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Codigo linea de negocio:</label>
          <b-form-input size="sm" v-if="this.nuevo" v-model="portafolioData['codigoLineaNegocio']" :value="portafolioData['codigoLineaNegocio']" />
          <p class="p-0 m-0" v-else>{{portafolioData["codigoLineaNegocio"]}}</p>
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Codigo linea de producto:</label>
          <b-form-input size="sm" v-if="this.nuevo" v-model="portafolioData['codigoLineaProduto']" :value="portafolioData['codigoLineaProduto']" />
          <p class="p-0 m-0" v-else>{{portafolioData["codigoLineaProduto"]}}</p>
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Codigo alternativa:</label>
          <b-form-input size="sm" v-if="this.nuevo" v-model="portafolioData['codigoAlternativa']" :value="portafolioData['codigoAlternativa']" />
          <p class="p-0 m-0" v-else>{{portafolioData["codigoAlternativa"]}}</p>
        </b-col>
        <b-col md="3">
          <label class="pr-1 font-weight-bold">Fecha alta:</label><!--  value-type="format" :formatter="momentFormatter" -->
          <!--          <b-form-input type="date" v-model="portafolioData['fechaAlta']" :value="portafolioData['fechaAlta']" />   -->
<!--
        <date-picker    v-model="portafolioData['fechaAlta']" :value="portafolioData['fechaAlta']" :formatter="momentFormatter" value-type="format" class="full-witdh" :editable="false" :clearable="false"></date-picker>-->
          <!--          <b-form-datepicker  v-model="portafolioData['fechaAlta']" locale="es" :date-format-options="{year:'numeric',month:'numeric',day:'numeric'}" /> -->
          <b-form-datepicker  v-model="portafolioData['fechaAlta']" locale="es" :date-format-options="{year:'numeric',month:'numeric',day:'numeric'}" />
 
<!--- <p class="p-0 m-0">{{portafolioData["fechaAlta"]!=null ? fechaToString(portafolioData["fechaAlta"]):"-"}}</p>
 -->
          <!-- 
          <b-form-datepicker v-if="this.nuevo" :date-format-options="{year:'numeric',month:'2-digit',day:'2-digit'}" value-as-date />
          <p class="p-0 m-0" v-else>{{fechaToString(portafolioData["fechaAlta"])}}</p>
          -->
        </b-col>
        <b-col md="3" class="form-inline">
          <label class="pr-1 font-weight-bold">Fecha baja:</label>
          <p class="p-0 m-0">{{portafolioData["fechaBaja"]!=null ? fechaToString(portafolioData["fechaBaja"]):"-"}}</p>
        </b-col>
      </b-row>
      <component ref="c-dynamic" v-if="componente!=null" :is="componente"  v-bind="props" />

      

    </b-col>
    <b-modal id="mdlNuevoPortafolio" hide-footer title="Nuevo portafolio">
      <div>
        <p>¿Esta seguro de realizar la creación de nuevo portafolio? La información del nuevo portafolio, estara basado en el portafolio seleccionado. Recuerda cambiar la información necesaria para registrar tu nuevo portafolio.</p>
      </div>
      <b-button @click="crearNuevoPortafolio" variant="primary">Crear</b-button>
    </b-modal>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue,Ref } from "vue-property-decorator";
import * as portafolioServices from "@/services/portafolios/index";
import ValoresFijos from "@/components/valoresfijos/valoresfijos.vue";
import * as nfService from "@/utilities/notificaciones";
import moment from "moment";
@Component({
   components:{
    ValoresFijos
  }
}
)
export default class CaracteristicasPortafolio extends Vue {
  @Prop() portafolio : string;

  @Ref("c-dynamic") dynamicComponent: Vue;
  private dateFormatInput = "yyyy-MM-dd'T'HH:mm:ss";
  private dateFormatOutput = "MMMM DD [de] YYYY";

  private componente: any = 'ValoresFijos';
  private momentFormatter: any = {
    stringify: (date: Date) => {
      return moment(date).format(this.dateFormatOutput);
    },
    parse: (value: string) => {
      return moment(value, this.dateFormatInput).toDate();
    }
  };
 


  nuevo = false;
  clone = false;
  portafolioData: any = {};
  optionTipoPortafolio = [
    {text: "NORMAL", value: "normal"},
    {text: "ASG", value: "asg"}
  ];
  grupoCategoria = [
    "cuadro1FondoColorHEX",
    "cuadro1Texto1",
    "cuadro1Texto1ColorHEX",
    "cuadro1Texto1Fuente",
    "cuadro1Texto1FuenteTamanio",
    "cuadro1Texto2",
    "cuadro1Texto2ColorHEX",
    "cuadro1Texto2Fuente",
    "cuadro1Texto2FuenteTamanio",
    "categoria"
  ];
  grupoNombreAlternativa = [
    "flechaColorHEX",
    "cuadroFichaFondoColorHEX",
    "cuadroFichaTexto1",
    "cuadroFichaTexto1ColorHEX",
    "cuadroFichaTexto1Fuente",
    "cuadroFichaTexto1FuenteTamanio",
    "cuadroFichaTexto2",
    "cuadroFichaTexto2ColorHEX",
    "cuadroFichaTexto2Fuente",
    "cuadroFichaTexto2FuenteTamanio"
  ];
  grupoFechaProceso = [
    "cuadro3FondoColorHEX",
    "cuadro3Texto1",
    "cuadro3Texto1ColorHEX",
    "cuadro3Texto1Fuente",
    "cuadro3Texto1FuenteTamanio",
    "cuadro3Texto2",
    "cuadro3Texto2ColorHEX",
    "cuadro3Texto2Fuente",
    "cuadro3Texto2FuenteTamanio"
  ];
  grupoEncabezado = [
    "encabezadoFondoColorHEX",
    "encabezadoTexto",
    "encabezadoTextoColorHEX",
    "encabezadoTextoFuente",
    "encabezadoTextoFuenteTamanio"
  ];
  grupoVertical = [
    "vertical1ColorHEX",
    "vertical2ColorHEX"
  ];
  grupoPieDePagina = [
    "pieDePaginaFondoColor",
    "pieDePaginaFondoColorHEX",
    "pieDePaginaTexto",
    "pieDePaginaTextoColorHEX",
    "pieDePaginaTextoFuente",
    "pieDePaginaTextoFuenteTamanio"
  ]
  get props() {
    return {
      portafolio: this.portafolio,
      nuevo: 0,
    };
  }
  set props(newValue: any){
    this.props = newValue;
  }


  async mounted() {
    await this.obtenerInformacion();
  }
  @Watch("portafolio")
  async onChangePortafolio() {
    await this.obtenerInformacion();
    this.nuevo = false;
    this.clone = false;
  }

  private async obtenerInformacion() {
    if (this.portafolio!=null) {
      this.portafolioData = await portafolioServices.obtenerPortafolio(this.portafolio);
    }
  }

  fechaToString(fecha: Date){
    return moment(fecha).format("YYYY-MM-DD");
  }

  async actualizarPortafolio() {
    nfService.enviarNotificacion("Actualizando portafolio, por favor espera", "info")
    const data = await portafolioServices.actualizarPortafolio(this.portafolioData);
    if (data!=null) {
      this.portafolioData = data;
      nfService.enviarNotificacion("Portafolio Actualizado", "success");
    }
  }

  onChangeInputDeleteWhiteSpace(key:string){
    this.portafolioData[key] = this.portafolioData[key].trim();
  }

  crearNuevoPortafolio() {
    if (!this.nuevo && !this.clone) {
      this.$bvModal.hide("mdlNuevoPortafolio");
      this.nuevo = true;
      this.clone = true;
      this.borradoNuevoPortafolio();
    }
  }

  async crearPortafolio() {
    if (this.validarCamposObligatorios()) {
      const data = await portafolioServices.crearPortafolio(this.portafolioData, this.portafolio);
      if (data != null) {
        nfService.enviarNotificacion("Portafolio creado exitosamente","success");
      } else {
        nfService.enviarNotificacion("Ha ocurrido un error el momento de crear el portafolio.","warning")
      }
      this.cancelarNuevoPortafolio();
      this.$emit("updatePortafolios");
    } else {
      nfService.enviarNotificacion("Ingrese la información necesaria para crear un nuevo portafolio","danger");
    }
  }
  validarCamposObligatorios() {
    return this.portafolioData.idPortafolio != null ||
      this.portafolioData.fechaAlta != null ||
      this.portafolioData.codigoPortafolio != "" ||
      this.portafolioData.codigoAlternativa != null ||
      this.portafolioData.codigoLineaNegocio != null ||
      this.portafolioData.codigoLineaProduto != null ||
      this.portafolioData.cuadroFichaTexto1 != "" ||
      this.portafolioData.cuadroFichaTexto2 != "";
  }

  cancelarNuevoPortafolio() {
    this.nuevo = false;
    this.clone = false;
    this.obtenerInformacion();
  }

  borradoNuevoPortafolio() {
    this.portafolioData.idPortafolio = null;
    this.portafolioData.fechaAlta = null;
    this.portafolioData.codigoPortafolio = "";
    this.portafolioData.codigoAlternativa = null;
    this.portafolioData.codigoLineaNegocio = null;
    this.portafolioData.codigoLineaProduto = null;
    this.portafolioData.cuadroFichaTexto1 = "";
    this.portafolioData.cuadroFichaTexto2 = "";
  }
}
</script>

<style scoped lang="stylus"></style>
