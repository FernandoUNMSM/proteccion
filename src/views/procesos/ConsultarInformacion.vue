<template>
  <layout>
    <slot>
      <div class="container pb-3">
        <l-title title="consulta de información" />
        <b-row>
          <b-col md="4">
            <fg @onChangeDate="activarInformacionTablas"></fg>
          </b-col>
          <b-col md="4">
            <portafolios @onChangeValue="activarInformacionTablas" ref="plist"/>
          </b-col>
          <b-col md="4">
            <botonrss :data="data" />
          </b-col>
        </b-row>
      </div>
      <div class="container-fluid pt-2 bg--custom h-100" v-show="validarDatosParaRendirizar()">
        <b-row class="mt-2">
          <itemvalorfondo ref="itmvalfon" />
          <itemparticipes ref="itmpart" />
          <itemvalorunidad ref="itmvaluni" />
          <itemnumerounidades ref="itnmuni" />
        </b-row>
        <b-row class="mt-1">
          <b-col md="3">
            <rendgcom ref="rendgcom" />
          </b-col>
          <b-col md="3">
            <tbltinv ref="tblinv" />
          </b-col>
          <b-col md="3">
            <tblti ref="tblti"></tblti>
          </b-col>
          <b-col md="3">
            <tblmyd ref="tblmd"></tblmyd>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-2">
          <b-col md="3">
            <tblsec ref="tblsec" />
          </b-col>
          <b-col md="2">
            <tblmon ref="tblmon" />
          </b-col>
          <b-col md="4">
            <tblinformacionactivo ref="tblinfoactivo" />
          </b-col>
          <b-col md="3">
            <tblinformaciongastos ref="tblinfogastos" />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <itemrentabilidades ref="itmrent" :title="'Rentabilidad'" :iditem="1" />
          </b-col>
          <b-col md="4">
            <itemrentabilidades ref="itmvol" :title="'Volatilidad'" :iditem="2" />
          </b-col>
          <b-col md="4">
            <itemrentabilidades ref="itmrentpro" :title="'Rentabilidad Promedio'" :iditem="3" />
          </b-col>
        </b-row>
      </div>
    </slot>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FechaProceso from "@/components/fechaproceso/FechaProceso.vue";
import ListaPortafolios from "@/components/portafolios/ListaPortafolios.vue";
import TblMaduracionYDuracion from "@/components/inversiones/tblmaduracionyduracion.vue";
import TblTopInversiones from "@/components/inversiones/topinversiones.vue";
import TbTipoInversiones from "@/components/inversiones/tipoInversiones.vue";
import TblSectores from "@/components/inversiones/sectores.vue";
import TblMonedas from "@/components/inversiones/monedas.vue";
import ItemValorFondo from "@/components/inversiones/itemvalorfondo.vue";
import ItemValorUnidad from "@/components/inversiones/itemvalorunidad.vue";
import ItemParticipes from "@/components/inversiones/itemparticipes.vue";
import ItemNumeroUnidades from "@/components/inversiones/itemnumerounidades.vue";
import TblInformacionActivo from "@/components/inversiones/tblinformacionactivo.vue";
import TblInformacionGastos from "@/components/inversiones/tblinformaciongastos.vue";
import ItemRentabilidades from "@/components/inversiones/itemrentabilidades.vue";
import ButtonRSS from "@/components/reportingservices/buton.vue";
import * as distribucionService from "@/services/inversiones/distribucion";
import * as nfservice from "@/utilities/notificaciones";
import FechaGeneral from "@/components/fechaproceso/FechaGeneral.vue";
import ItemRendimientosGastosComisiones from "@/components/inversiones/itemrendimientosgastoscomisiones.vue";

@Component({
  components: {
    fechaProceso: FechaProceso,
    portafolios: ListaPortafolios,
    tblmyd: TblMaduracionYDuracion,
    tblti: TblTopInversiones,
    tbltinv: TbTipoInversiones,
    tblsec: TblSectores,
    tblmon: TblMonedas,
    itemvalorfondo: ItemValorFondo,
    itemvalorunidad: ItemValorUnidad,
    itemparticipes: ItemParticipes,
    itemnumerounidades: ItemNumeroUnidades,
    tblinformacionactivo: TblInformacionActivo,
    tblinformaciongastos: TblInformacionGastos,
    botonrss: ButtonRSS,
    itemrentabilidades: ItemRentabilidades,
    fg: FechaGeneral,
    rendgcom: ItemRendimientosGastosComisiones
  }
})
export default class ConsultarInformacion extends Vue {
  $refs!: {
    tblmd: TblMaduracionYDuracion;
    tblti: TblTopInversiones;
    tblinv: TbTipoInversiones;
    tblsec: TblSectores;
    tblmon: TblMonedas;
    itmvalfon: ItemValorFondo;
    itmvaluni: ItemValorUnidad;
    itmpart: ItemParticipes;
    itnmuni: ItemNumeroUnidades;
    tblinfoactivo: TblInformacionActivo;
    tblinfogastos: TblInformacionGastos;
    itmrent: ItemRentabilidades;
    itmvol: ItemRentabilidades;
    itmrentpro: ItemRentabilidades;
    plist: ListaPortafolios;
    rendgcom: ItemRendimientosGastosComisiones;
  };

  data = {
    fecha: "",
    codigoPortafolio: ""
  };
  showInfo = false;

  async activarInformacionTablas(fecha:string) {
    if(fecha!=null){
      this.data.fecha = fecha;
    }
    this.data.codigoPortafolio = this.$refs.plist.selected;

    if(this.validarDatosParaRendirizar()){
      nfservice.enviarNotificacion("Actualizando información", "info")
      this.$refs.tblmd.getDataToTable(this.data);
      this.$refs.tblti.getDataToTable(this.data);
      this.$refs.itmvalfon.getDataToTable(this.data);
      this.$refs.itmvaluni.getDataToTable(this.data);
      this.$refs.itnmuni.getDataToTable(this.data);
      this.$refs.itmpart.getDataToTable(this.data);
      this.$refs.tblinfoactivo.getDataToTable(this.data);
      this.$refs.tblinfogastos.getDataToTable(this.data);
      this.$refs.itmrent.getData(this.data);
      this.$refs.itmvol.getData(this.data);
      this.$refs.itmrentpro.getData(this.data);
      const data = await distribucionService.getListaDistribucionByFechaCodPor(
        this.data
      );
      this.$refs.tblinv.getDataToTable(data.payload);
      this.$refs.tblsec.getDataToTable(data.payload);
      this.$refs.tblmon.getDataToTable(data.payload);
    }else {
      nfservice.enviarNotificacion("No se ha seleccionado un portafolio a un","warning")
    }
  }
  validarDatosParaRendirizar(){
    return this.data.fecha!="" && this.data.codigoPortafolio!="";
  }
}
</script>

<style lang="stylus" scoped>

.subtitle--font-size
  font-size 50%
  color #989898
.bg--custom
  background-color #f9f9f9
</style>
