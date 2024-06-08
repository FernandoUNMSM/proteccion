<template>
  <layout>
    <div class="container">
      <b-row class="row">
        <b-col md="3">
          <h1>Fechas</h1>
        </b-col>
        <b-col md="3">
          <b-form-select v-model="sltfilter" :options="fieldsFilter"/>
        </b-col>
      </b-row>
      <div class="row">
        <div class="col-md-6">
          <p v-if="listaFechas.length==0">No hay registros por el momento ....</p>
          <b-table v-else :fields="fields" :items="listaFechas" :sort-by="sortBy" small bordered >
            <template v-slot:cell(index)="data">
              {{data.index+1}}
            </template>
            <template v-slot:cell(fecha)="data">
              {{formateoFecha(data.item.fecha)}}
            </template>
            <template v-slot:cell(estado)="data">
              {{ data.item.estado ? "activo" : "Inactivo" }}
            </template>
            <template v-slot:cell(accion)="data">
              <button class="btn btn-warning btn-sm" @click="obtenerRegistroEditar(data.item)">Editar</button>
            </template>
          </b-table>
        </div>
        <b-col md="4" v-if="edit">
          <b-button-close @click="cerrarEditar">x</b-button-close>
          <h3>Editar Fecha</h3>
          <div>
            <label>Fecha:</label>
            <b-form-input disabled :value="formateoFecha(dataToSend.fecha)"/>
            <label>Cambiar estado:</label>
            <b-form-checkbox v-model="dataToSend.estado">{{this.dataToSend.estado?"activo":"desactivado"}}</b-form-checkbox>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary" @click="actulizarRegistro" >Guardar cambios</button>
          </div>
        </b-col>
        <div class="col-md-4" v-if="!edit">
          <div>
            <h3>Nueva Fecha</h3>
          </div>
          <div>
            <label>Mes:</label>
            <b-form-select v-model="sltmes" :options="meses">
              <b-form-select-option :value="null">Selecciona un mes</b-form-select-option>
            </b-form-select>
          </div>
          <div>
            <label>Año:</label>
            <b-form-input v-model="sltanio" :value="sltanio" disabled />
          </div>
          <div class="mt-2" v-show="this.msgFecha!=''">
            <p>Fecha a crear:
              <b-badge class="p-2" variant="info">{{ this.msgFecha }}</b-badge>
            </p>
          </div>
          <div class="mt-2">
            <b-button variant="primary" @click="crearNuevaFecha">Guardar</b-button>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import moment from "moment";
import * as fechaServicio from "@/services/sistema/fechaservicio";
import Buton from "@/components/reportingservices/buton.vue";
import * as nfservice from "@/utilities/notificaciones";

@Component({
  components: {Buton}
})
export default class Fechas extends Vue {
  private sortBy = "fecha";
  private sltmes: any= null;
  private sltanio: any= null;
  private sltdia: any = null;
  private msgFecha = '';
  private edit = false;
  private sltfilter: any = null;
  private fieldsFilter : any = [
    {text:"Selecciona un año a filtra" , value: null}
  ];
  private dataToSend: any = {
    id:null,
    fecha:"",
    estado:null
  };
  private fields = [
    {key:"index", label: "#"},
    {key:"fecha", label:"Fecha", sortable: true,thClass:"text-center", tdClass:"text-center"},
    {key:"estado", label:"Estado", thClass:"text-center", tdClass:"text-center"},
    {key:"accion", label:"Accion", thClass:"text-center", tdClass:"text-center"}
  ]
  private meses: Array<object> = [];
  private anios: Array<number> = [];
  private listaFechas: Array<any> = [];
  mounted(){
    this.obtenerInformacionFiltro();
    this.obtenerInformacionInicio();
    this.obtenerFechas();

  }
  @Watch('sltmes')
  @Watch('sltanio')
  mostrarFecha(){
    if(this.sltmes != null && this.sltanio != null){
      let fecha = `${this.sltanio}/${this.sltmes+1}/01`;
      this.sltdia = moment(fecha,"YYYY/MM/DD").daysInMonth();
      fecha = moment(`${this.sltanio}-${this.sltmes+1}-${this.sltdia}`).format('YYYY-MM-DD');
      this.msgFecha = fecha;
      this.dataToSend.fecha = fecha;
    }
  }

  @Watch("sltfilter")
  actualizarFechasByFiltro(){
    this.sltanio = this.sltfilter;
    this.obtenerFechas();
  }

  obtenerInformacionFiltro(){
    let anio = moment().year()-5;
    for(let i=0; i<=10;i++){
      if(i==0){
        this.fieldsFilter.push({text:anio.toString(), value:anio});
      }else{
        anio = anio +1;
        this.fieldsFilter.push({text:anio.toString(), value:anio});
      }
    }
    this.sltfilter = moment().year();
  }

  obtenerInformacionInicio(){
    moment.locale("es");
    const meses = moment.months();
    for(const i in meses){
      this.meses.push({
        value: parseInt(i),
        text: meses[i]
      });
    }
  }

  formateoFecha(fecha:Date){
    return moment(fecha).format("YYYY-MM-DD");
  }
  obtenerRegistroEditar(data:any){
    this.edit = true;
    this.dataToSend = data;
  }
  async obtenerFechas(){
    this.listaFechas = await fechaServicio.obtenerListadoDeFechasByAnio(this.sltfilter);
  }

  async crearNuevaFecha(){
    if(this.edit){
      this.edit = false;
    }
    const fechas = this.listaFechas.map(f=>moment(f.fecha).format("YYYY-MM-DD"));
    if(this.dataToSend.fecha!=""){
      if(!fechas.includes(this.dataToSend.fecha)){
        const response = await fechaServicio.crearNuevaFecha(this.dataToSend);
        if(response!=null){
          nfservice.enviarNotificacion("Fecha creada correctamente", "success")
        }
      }else{
        nfservice.enviarNotificacion("La fecha ya se encuentra registrada.","warning")
      }
    }else{
      nfservice.enviarNotificacion("Selecciona una fecha correcta", "warning")
    }
    this.limpiarCampos();
    this.cerrarEditar();
    this.obtenerFechas();
  }
  actulizarRegistro(){
    nfservice.enviarNotificacion("Actualizando fecha", "info");
    const respuesta = fechaServicio.actualizarFecha(this.dataToSend);
    if(respuesta!=null){
      nfservice.enviarNotificacion("Fecha actualizada correctamente", "success");
    }else{
      nfservice.enviarNotificacion("Ocurrio un error al actualizar la fecha, intente nuevamente.", "error");
    }
    this.cerrarEditar();
  }
  cerrarEditar(){
    this.edit = false;
    this.dataToSend = {
      id: null,
      fecha: "",
      estado: null
    };
  }
  limpiarCampos(){
    this.sltmes = null;
    this.msgFecha = '';
  }
}
</script>

<style scoped>

</style>