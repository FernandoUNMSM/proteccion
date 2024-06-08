import axiosInstance from "@/config/axiosInstance";
import * as service from '@/services/inversiones/participes';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));

describe("Participes Servicios",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = service.getParticipesPorFechaYPortafolio({});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = service.getParticipesPorFechaYPortafolio({});
    })
})