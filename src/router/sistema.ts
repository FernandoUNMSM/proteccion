import {RouteConfig} from 'vue-router';
import Fechas from "@/views/sistema/fechas.vue";
import Portafolios from "@/views/sistema/portafolios.vue";
import FichaTecnica from "@/views/sistema/fichatecnica.vue";
import DataSheet from '@/views/sistema/DataSheet.vue'
const routerConfiguracion:Array<RouteConfig> = [
    {
        path: "/configuracion/fechas",
        name: "Fechas",
        component: Fechas
    },
    {
        path: "/configuracion/portafolios",
        name: "portafolios",
        component: Portafolios
    },
    {
        path: "/configuracion/fichatecnica",
        name: "Ficha Tecnica",
        component: FichaTecnica
    },
    {
        path:"/Ficha",
        name:"DataSheet",
        component: DataSheet
    }
]

export default routerConfiguracion;