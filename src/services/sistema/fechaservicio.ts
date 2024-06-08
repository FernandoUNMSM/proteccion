import axiosInstance from "@/config/axiosInstance";

export async function obtenerListadoDeFechas() {
  try {
    const response = await axiosInstance.get("/ft/api/system/fechas");
    const data = await response.data;
    return data.payload;
  } catch (e) {
    console.log("Error de conexion con el servicio de fechas");
    return [];
  }
}
export async function obtenerListadoDeFechasByAnio(anio: number) {
  try {
    const response = await axiosInstance.get("/ft/api/system/fechas/" + anio);
    const data = await response.data;
    return data.payload;
  } catch (e) {
    console.log("Error de conexion con el servicio de fechas");
    return [];
  }
}

export async function crearNuevaFecha(data: any) {
  try {
    const response = await axiosInstance.post("/ft/api/system/fecha", data);
    const respuesta = await response.data;
    return respuesta.payload;
  } catch (e) {
    return null;
  }
}

export async function actualizarFecha(data: any) {
  try {
    const response = await axiosInstance.put("/ft/api/system/fecha-sistema", data);
    const respuesta = await response.data;
    return respuesta.payload;
  } catch (e) {
    return null;
  }
}

export async function obtenerAniosInSistema() {
  try {
    const response = await axiosInstance.get("/ft/api/system/fechas/years");

    const respuesta = await response.data;
    return respuesta.payload;
  } catch (e) {
    return [];
  }
}
