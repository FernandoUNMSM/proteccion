import axiosInstance from "@/config/axiosInstance";

export async function obtenerListadoDeCampos() {
  try {
    const response = await axiosInstance.get(
      "/ft/api/system/fichatecnica/campos"
    );
    const data = await response.data;
    return data.payload;
  } catch (e) {
    console.log("Error de conexion con el servicio de fechas");
    return [];
  }
}

export async function actualizarCampo(dataToSend: object) {
  try {
    const response = await axiosInstance.put(
      "/ft/api/system/fichatecnica/campo",
      dataToSend
    );
    const data = await response.data;
    return data.payload;
  } catch (e) {
    console.log("Error de conexion con el servicio de fechas");
    return null;
  }
}
