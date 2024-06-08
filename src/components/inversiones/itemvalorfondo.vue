<template>
    <b-col md="3" class="text-center">
        <p class="m-0 p-0">VALOR DEL PORTAFOLIO</p>
        <p v-if="valorFondo.valor!=''" class="font-weight-bold p--fsize">$ {{valorFondo.valor}} millones</p>
        <p v-else>No se encuentra registro</p>
    </b-col>
</template>

<script lang="ts">
    import Vue from 'vue'
    import moment from 'moment';
    import {Component} from 'vue-property-decorator'
    import * as service from '@/services/inversiones/valorfondo'
    import ValorFondo from '@/types/inversiones/valorfondo'

    @Component
    export default class ItemValorFondo extends Vue{

        valorFondo : ValorFondo = {
            fecha: new Date(0),
            valor: "",
            codigoPortafolio: ""
        };

        async getDataToTable(dataTosend: any){
            const data = await service.obtenerValorFondoByPortafolio(dataTosend);
            if(data == null){
                this.valorFondo = {
                    fecha: new Date(0),
                    valor: "",
                    codigoPortafolio: ""
                }
            }else{
                this.valorFondo = data;
            }
        }

    }
</script>

<style scoped lang="stylus">
    .p--fsize
        font-size 1.5rem
</style>
