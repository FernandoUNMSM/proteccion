import axiosInstance from '@/config/axiosInstance';

export async function obtenerListadoLogs(nombreProcesoId: string, fechaProceso: any){
    try{
        const response = await axiosInstance.get(`/ft/api/system/proceso/logs/${nombreProcesoId}`,{
            params:{
                fechaProceso: fechaProceso
            }
        });
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return [];
    }
}