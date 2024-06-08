import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import axios, { AxiosResponse } from "axios";
import Respuesta from "@/types/commons/Respuesta";
import axiosInstance from "@/config/axiosInstance";

axiosInstance.defaults.headers.common[process.env.VUE_APP_ALLOW_ORGIN] = process.env.VUE_APP_CORS_URL;

@Module({
  namespaced: true
})
class FechaProceso extends VuexModule {
  public fecha: any = null;

  @Mutation
  public updateFecha(nuevaFecha: Date): void {
    this.fecha = nuevaFecha;
  }

  @Action({ commit: "updateFecha" })
  public async onUpdateFecha(nuevaFecha: Date) {
    if (nuevaFecha != this.fecha) {
      try {
        const respuesta: AxiosResponse<Respuesta<any>> = await axiosInstance.put("/ft/api/system/fecha", null, {
            params: {
              date: nuevaFecha
            }
          }
        );
        return nuevaFecha;
      } catch (e) {
        console.log("Error de conexion al servicio de fechas");
        return "";
      }
    } else {
      return this.fecha;
    }
  }

  @Action({ commit: "updateFecha" })
  public async onGetFecha() {
    if (this.fecha != null) {
      return this.fecha;
    }
    try {
      const response: AxiosResponse<Respuesta<any>> = await axiosInstance.get("/ft/api/system/fecha");
      const data: Respuesta<any> = response.data;
      return new Date(data.payload.valor + " 00:00:00");
    } catch (e) {
      console.log("Error de conexion del servicio de fecha");
      return null;
    }
  }

  get getFecha() {
    return this.fecha;
  }

  // set setFecha(nuevaFecha: Date) {
  //   this.fecha = nuevaFecha;
  // }
}
export default FechaProceso;
