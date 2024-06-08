import axiosInstance from '@/config/axiosInstance';


export async function getListaPortafolios(){
    try{
        const response = await axiosInstance.get("/ft/api/system/portafolios");
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return [];
    }
}

export async function obtenerPortafolio(portafolio: string){
    try{
        const response = await axiosInstance.get("/ft/api/system/portafolio",{
            params:{
                portafolio: portafolio
            }
        });
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return null;
    }
}

export async function actualizarPortafolio(portafolio: object){
    try{
        const response = await axiosInstance.put("/ft/api/system/portafolio",portafolio);
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return null;
    }
}

export async function crearPortafolio(portafolio: object, nombrePortafolio: string){
    try{
        const response = await axiosInstance.post(`/ft/api/system/portafolio/clone/${nombrePortafolio}`,portafolio);
        const data = await response.data;
        return data.payload;
    }catch (e) {
        console.log("Error de conexion con el servicio de fechas")
        return null;
    }
}