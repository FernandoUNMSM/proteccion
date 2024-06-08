<template>
  <layout>
    <div class="container">
      <b-row class="mb-4">
        <b-col>
          <b-nav justified>
            <b-nav-item><lista-portafolios ref="c-portafolios"/></b-nav-item>
            <b-nav-item class="btn btn-light" @click="onClickNuevoPortafolio"><b-icon icon="list"></b-icon> Caracteristicas</b-nav-item>
            <b-nav-item class="btn btn-light" @click="componente='ValoresFijos'"><b-icon icon="list"></b-icon> Valores Fijos</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <component ref="c-dynamic" v-if="componente!=null" :is="componente" @updatePortafolios="forceUpdatePortafolios" v-bind="props" />
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import ListaPortafolios from "@/components/portafolios/ListaPortafolios.vue";
import CaracteristicasPortafolio from "@/components/portafolios/Caracteristicas.vue";
import ValoresFijos from "@/components/valoresfijos/valoresfijos.vue";

@Component({
  components:{
    ValoresFijos,
    ListaPortafolios,
    CaracteristicasPortafolio
  }
})
export default class Portafolios extends Vue{

  @Ref("c-portafolios") portafolio: ListaPortafolios;
  @Ref("c-dynamic") dynamicComponent: Vue;

  private componente: any = null;
  get props() {
    return {
      portafolio: this.portafolio.selected,
      nuevo: 0,
    };
  }
  set props(newValue: any){
    this.props = newValue;
  }
  onClickNuevoPortafolio(nuevo:number){
    this.componente = "CaracteristicasPortafolio";
  }

  forceUpdatePortafolios(){
    console.log("Llego a la actualizacion de portafolios");
    this.portafolio.obtenerListaPortafolios();
  }
}
</script>

<style scoped></style>
