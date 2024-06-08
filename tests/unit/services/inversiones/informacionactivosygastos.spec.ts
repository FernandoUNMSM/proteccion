import axiosInstance from "@/config/axiosInstance";
import * as serviceactivo from '@/services/inversiones/informacionactivo';
import * as servicegastos from '@/services/inversiones/informaciongastos';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));
  

describe("Informacion activos",()=>{
    it("extracion informacion activos",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = serviceactivo.obtenerInformacionActivoByPortafolio({});
    })

    it("extracion informacion gastos",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = servicegastos.obtenerInformacionGastosByPortafolio({});
    })

    it("extracion informacion activos error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = serviceactivo.obtenerInformacionActivoByPortafolio({});
    })

    it("extracion informacion gastos error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = servicegastos.obtenerInformacionGastosByPortafolio({});
    })
})
