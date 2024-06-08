
<template>
  <div>
    <b-table id="tblprocess" head-variant="light" responsive hover bordered :fields="table.fields" :items="items" :sort-by.sync="table.sortBy" :sort-desc.sync="table.sortDesc">
      <template #thead-top>
        <b-tr>
          <b-th colspan="6" class="text-right">
            <b-button size="sm" @click="obtenerInformacionProcesos" ><b-icon icon="arrow-clockwise"></b-icon></b-button>
          </b-th>
        </b-tr>
      </template>
      <template v-slot:cell(ejecucion)="data">
        <b-button size="sm" variant="success" @click="openAlertEjecutarProcesos(data.item)" v-if="data.item.nameId!='PRO-ALADIN' && data.item.nameId!='PRO-FILE-CALIFICACIONES' && data.item.nameId!='PRO-FILE-EMISORES'&& data.item.nameId!='PRO-FILE-BENCHMARK'"  :disabled="data.item.estado!=null"><b-icon icon="play-fill" /></b-button>
      </template>
      <template v-slot:cell(type)="data">
        <b-form-file v-model="fileAladin" size="sm" v-if="data.item.nameId=='PRO-ALADIN'" v-show="data.item.type=='FILE'" accept=".xls, .xlsx" placeholder="Selecciones el archivo a procesar"/>
        <b-form-file v-model="fileCalification" size="sm" v-if="data.item.nameId=='PRO-FILE-CALIFICACIONES'" v-show="data.item.type=='FILE'" accept=".xls, .xlsx" placeholder="Selecciones el archivo a procesar"/>
        <b-form-file v-model="fileEmisores" size="sm" v-if="data.item.nameId=='PRO-FILE-EMISORES'" v-show="data.item.type=='FILE'" accept=".xls, .xlsx" placeholder="Selecciones el archivo a procesar"/>
        <b-form-file v-model="fileBenchmark" size="sm" v-if="data.item.nameId=='PRO-FILE-BENCHMARK'" v-show="data.item.type=='FILE'" accept=".xls, .xlsx" placeholder="Selecciones el archivo a procesar"/>

      </template>
      
      <template v-slot:cell(estado)="data">
        <p v-if="data.item.estado == undefined" class="m-0 p-0 text-center"><b-badge variant="secondary">No procesado</b-badge></p>
        <p v-else-if="data.item.estado == 'ERROR'" class="m-0 p-0 text-center"><b-badge variant="danger">Error</b-badge></p>
        <p v-else-if="data.item.estado != 'FINALIZADO'" class="m-0 p-0 text-center"><b-badge variant="info"><b-spinner small variant="light" /> Procesando</b-badge></p>
        <p v-else class="m-0 p-0 text-center"><b-badge variant="success">Finalizado</b-badge></p>
      </template>
      <template v-slot:cell(lastDate)="data">
        <p v-if="data.item.lastDate != null" class="m-0 p-0">
          {{ data.item.lastDate }}
        </p>
      </template>
      <template v-slot:cell(actions)="data">
        <b-link @click="openLogs(data.item)"><b-icon icon="list-ul" v-b-tooltip title="Ver logs"/></b-link>
        <b-link v-if="data.item.estado != undefined" @click="openConfirmDeleteAllData(data.item)"><b-icon icon="trash-fill" class="text-danger ml-1" v-b-tooltip title="Restaurar proceso"/></b-link>
      </template>
    </b-table>
    <div class="alert--ctn" v-if="alert.process.show">
      <div class="alert--body bg-warning p-3 rounded-sm shadow-sm text-whitew col-md-4 col-sm-10">
        <b-button-close @click="onCloseAlert" />
        <strong>¡Importante!</strong>
        <p class="p-1 m-0">{{ alert.process.message }}</p>
        <div class="mt-3">
          <b-button variant="success" @click="alert.process.btnFuncion">Procesar</b-button>
          <b-button variant="danger" class="ml-1" @click="onCloseAlert">Cancelar</b-button>
        </div>
      </div>
    </div>
    <b-modal id="logs" hide-footer scrollable title="Logs" size="lg">
      <div v-if="logs.length > 0">
        <p class="pl-1 m-1 rounded"  v-for="data in logs" :key="data.id" >
          <b-icon icon="check-circle-fill" variant="success" v-if="data.exitoso"/>
          <b-icon icon="x-circle-fill" variant="danger" v-else />
          {{data.mensaje}}
        </p>
      </div>
      <div v-if="logs.length == 0">
        <p class="pl-1 m-1"> No existen registros de logs </p>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import {Component, Watch} from "vue-property-decorator";
import * as procesosService from "@/services/procesos";
import Proceso from "@/types/procesos/Proceso";
import * as notify from "@/utilities/notificaciones";
import * as logsServices from "@/services/sistema/procesologs";
import axios from "axios";
import axiosInstance from '@/config/axiosInstance';

@Component
export default class TableProcesos extends Vue{
  async mounted() {
    this.obtenerInformacionProcesos();
  }
  fileAladin: any = null;
  fileCalification: any = null;
  fileEmisores: any=null;
  fileBenchmark: any=null;
  selectedProcess: Array<any> = [];
  items: Array<Proceso> = [];
  table = {
    sortBy: "name",
    sortDesc: false,
    fields: [
      { key: "ejecucion", label:"#", tdClass:"text-center", thClass:"text-center text-info" },
      { key: "name", label: "Nombre", thClass: "text-info" },
      { key: "type", label: "Tipo", thClass: "text-info" },
      { key: "estado", label: "Estado", thClass: "text-info" },
      { key: "lastDate",label: "Ultima ejecución",tdClass: "text-center", thClass: "text-info"},
      { key: "actions", label: "Acciones", thClass: "text-info" }
    ]
  };
  logs: Array<any> = [];
  alert = {
    process: {
      show: false,
      message: "",
      btnFuncion: ()=> {/**/}
    }
  };

  async obtenerInformacionProcesos(){
    try {
      const respuestaListaProcesos = await procesosService.getListProcesos();
      this.completerEstadosAProcesos(respuestaListaProcesos.payload);
    } catch (e) {
      notify.enviarNotificacion(
        "La información de procesos no se encuntra disponible en este momento, intentelo mas tarde",
        "warning"
      );
    }
  }

  async openLogs(data: any){
    const fecha = moment(this.$store.state.fechaProceso.fecha).format("YYYY-MM-DD");
    const nameProcessId = data.nameId;
    this.logs = await logsServices.obtenerListadoLogs(nameProcessId, fecha);
    this.$bvModal.show("logs");
  }

  converterDate(fechatoConvert: number, format: string) {
    return moment(fechatoConvert).format(format);
  }

  completerEstadosAProcesos(procesos: Array<any>) {
    const procesosCompletados : Array<any> = [];
    const fechaProceso = this.$store.state.fechaProceso.fecha;
    procesos.forEach( async (item)=>{
      const respuesta = await procesosService.getUltimaEjecucionProceso(
        item.id,
        moment(fechaProceso).format("YYYY-MM-DD")
      );
      const data = await respuesta.payload;
      if (data != null) {
        item.fecha = this.converterDate(data.fecha, "YYYY-MM-DD");
        item.lastDate = this.converterDate(data.fechaFin, "YYYY-MM-DD hh:mm a");
        item.estado = data.estado;
      }
      procesosCompletados.push(item);
    });
    this.items = procesosCompletados;
  }

  async openAlertEjecutarProcesos(proceso:any) {
    if (proceso.id!=null) {
      const idParent = proceso.configuracion.procesoDependiente;
      if(idParent!=null){
        const fechaProceso = this.$store.state.fechaProceso.fecha;
        const respuesta = await procesosService.getUltimaEjecucionProceso(
          idParent,
          moment(fechaProceso).format("YYYY-MM-DD")
        );
        if(respuesta.payload==null){
          const parentProceso = this.items.filter(p=>p.id==idParent)[0];
          notify.enviarNotificacionTime(
            "El proceso "+proceso.name+" no puede ser a un ejecutado, por que el proceso del cual depende: "+parentProceso.name+" no ha sido ejecutado.",
            "warning",
            15000
          );
        }else{
          if(respuesta.payload.estado=="FINALIZADO"){
            this.alert.process.show = true;
            this.alert.process.message = "¿Deseas ejecutar el(los) proceso(s) seleccionado(s)? \n  Recuerda que procesar proceso(s) ya ejecutado(s), borraran la informacion ya procesada, ¿desear continuar con la ejecución?.";
            this.alert.process.btnFuncion = ()=>this.ejecutarProcesos(proceso);
          }else {
            const parentProceso = this.items.filter(p=>p.id==idParent)[0];
            notify.enviarNotificacionTime(
                "El proceso "+proceso.name+" no puede ser a un ejecutado, por que el proceso del cual depende: "+parentProceso.name+" no ha sido ejecutado.",
                "warning",
                15000
            );
          }
        }
      }else{
        this.alert.process.show = true;
        this.alert.process.message = "¿Deseas ejecutar el(los) proceso(s) seleccionado(s)? \n  Recuerda que procesar proceso(s) ya ejecutado(s), borraran la informacion ya procesada, ¿desear continuar con la ejecución?.";
        this.alert.process.btnFuncion = ()=>this.ejecutarProcesos(proceso);
      }

    }
  }

  openConfirmDeleteAllData(data:any){
    this.alert.process.show = true;
    this.alert.process.message = "¿Deseas borrar la información procesada en la ultima ejecución realizada?";
    this.alert.process.btnFuncion = ()=>this.ejecutarBorradoDeProceso(data);
  }

  async ejecutarBorradoDeProceso(data: any){
    this.onCloseAlert();
    try {
      const result = await axiosInstance.post("/ft/api/system/proceso/restore/"+data.nameId);
      if(result.status==200){
        notify.enviarNotificacion("Procesando restauración de proceso para la fecha actual.","info");
      }else{
        notify.enviarNotificacion("Ha ocurrido un error, por favor contacta al administrador.","danger");
      }
    }catch (e){
      notify.enviarNotificacion("Ha ocurrido un error, por favor contacta al administrador.","danger");
    }
  }

  onCloseAlert() {
    this.alert.process.show = false;
    this.alert.process.message = "";
    this.alert.process.btnFuncion = () => {/**/};
  }

  async ejecutarProcesos(proceso:any) {
    this.onCloseAlert();
    if(proceso.configuracion.urlServicio!=null){
      notify.enviarNotificacion(
        "Iniciamos la ejecución de los procesos seleccionados.",
        "info"
      );
      let urlRequest = proceso.configuracion.urlServicio
      if(proceso.nameId == 'PRO-BATCH-GASTOS-ADMISIBLES' || proceso.nameId == 'PRO-BATCH-SALDOS-DIARIOS'){
          const fecha = moment(this.$store.state.fechaProceso.fecha).format("YYYY-MM-DD");    
          urlRequest= urlRequest+'/'+fecha;
      }
      const resultado = await this.ejecutarProcesosHttp(urlRequest)
      if(resultado.status == 200){
        notify.enviarNotificacion(
            "Se inicio el proceso.",
            "success"
        );
      }
    }
    this.obtenerInformacionProcesos();
    return undefined;
  }

  ejecutarProcesosHttp(url: string){
    return axiosInstance.post(url);
  }

  @Watch("fileAladin")
  fileEvents(newFile: File){
    if(newFile!=null){
      const respuesta = procesosService.uploadFileS3(newFile,'PRO-ALADIN');
      respuesta.then(respuesta => {
        this.fileAladin = null;
        console.log(respuesta);
      });
    }
  }
  @Watch("fileCalification")
  fileEventsCalifaction(newFile: File){
    if(newFile!=null){
      const respuesta = procesosService.uploadFileS3(newFile,'PRO-FILE-CALIFICACIONES');
      respuesta.then(respuesta => {
        this.fileCalification = null;
        console.log(respuesta);
      });
    }
  }
  @Watch("fileEmisores")
  fileEventsEmisores(newFile: File){
    if(newFile!=null){
      const respuesta = procesosService.uploadFileS3(newFile,'PRO-FILE-EMISORES');
      respuesta.then(respuesta => {
        this.fileEmisores = null;
        console.log(respuesta);
      });
    }
  }
  @Watch("fileBenchmark")
  fileEventsBenchmark(newFile: File){
    if(newFile!=null){
      const respuesta = procesosService.uploadFileS3(newFile,'PRO-FILE-BENCHMARK');
      respuesta.then(respuesta => {
        this.fileBenchmark = null;
        console.log(respuesta);
      });
    }
  }


}
</script>

<style lang="stylus" scoped>
.alert
  &--ctn
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0,0.5)
    z-index: 999
  &--body
    margin: 0 auto
    top: 30%
    z-index: 1000
</style>
