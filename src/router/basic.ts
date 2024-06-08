import {RouteConfig} from 'vue-router';
import Login from "@/views/Login.vue";
import Inicio from "@/views/Inicio.vue";
const routerBasic:Array<RouteConfig> = [
    {
        path: "/",
        name: "Inicio",
        component: Inicio
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    }
]

export default routerBasic;