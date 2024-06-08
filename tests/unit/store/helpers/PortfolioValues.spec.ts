import axiosInstance from "@/config/axiosInstance";
import PortfolioValues from '@/store/helpers/PortfolioValues';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));

describe("Valores del portafolio",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = PortfolioValues.GetPortfolioValue({});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = PortfolioValues.GetPortfolioValue({});
    })
})

describe("Participes del portafolio",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = PortfolioValues.GetPortfolioParticipants({});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = PortfolioValues.GetPortfolioParticipants({});
    })
})

