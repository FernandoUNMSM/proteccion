import {RouteConfig} from 'vue-router';
import Procesos from "@/views/procesos/Proceso.vue";
import ConsultarInformacion from "@/views/procesos/ConsultarInformacion.vue";
import Graficas from '@/views/procesos/Graficas.vue'

const routerBasic:Array<RouteConfig> = [
    {
        path: "/procesos",
        name: "Procesos",
        component: Procesos
    },
    {
        path:"/consultarInformacion",
        name:"ConsultarInformacion",
        component: ConsultarInformacion
    },
    {
        path:"/graficas",
        name:"Graficas",
        component: Graficas
    }
]

export default routerBasic;
