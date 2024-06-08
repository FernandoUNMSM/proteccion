import * as notify from "@/utilities/notificaciones";
import axiosInstance from "@/config/axiosInstance";

export async function getListProcesos() {
  try {
    const response = await axiosInstance.get("/ft/api/system/proceso");
    const data = await response.data;
    return data;
  } catch (e) {
    console.log("Error de conexion con el servicio de fechas");
    return [];
  }
}

export async function getUltimaEjecucionProceso(id: number, fecha: any) {
  try {
    const response = await axiosInstance.get(`/ft/api/system/proceso/estado/ultimo/${id}`,
      {
        params: {
          fechaProceso: fecha
        }
      }
    );
    const data = await response.data;
    return data;
  } catch (e) {
    return null;
  }
}

export async function uploadFileS3(file: File, processName: string) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axiosInstance.post(`/ft/api/system/file/` + processName, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    if (response.status == 200) {
      notify.enviarNotificacion("Archivo enviado a procesamiento", "success");
    }
  } catch (e) {
    notify.enviarNotificacion("Error al subir el archivo", "danger");
  }
}
