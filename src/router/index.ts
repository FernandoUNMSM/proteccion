import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store/index";
import Basic from './basic';
import Procesos from './procesos';
import Configuracion from './sistema';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = []

routes.push(...Basic);
routes.push(...Procesos);
routes.push(...Configuracion);

const router = new VueRouter({
  mode:"history",
  routes
});

router.beforeEach(async (to,from,next)=>{
  if(store.state.fechaProceso.fecha==null){
    await store.dispatch("fechaProceso/onGetFecha");
    next();
  }
  next();
})

export default router;