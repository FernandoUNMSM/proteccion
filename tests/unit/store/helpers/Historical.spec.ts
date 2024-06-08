import axiosInstance from "@/config/axiosInstance";
import Historical from '@/store/helpers/Historical';

jest.mock("@/config/axiosInstance", () => ({
    __esModule: true,
    default: {
      get: jest.fn()
    }
  }));

describe("Rentabilidad Historica",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = Historical.GetHistoricalProfitability({portfolio: "VOL-EQCOL", date: "2021-01-31"});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = Historical.GetHistoricalProfitability({});
    })

    it("transformacion rentabilidad historica vacia",async ()=>{

        const expect = Historical.TransformProfitability({});
    })

    it("transformacion rentabilidad historica data",async ()=>{

        const expect = Historical.GetHistoricalProfitability({
            portafolioMes: "0.82%",
            portafolioTrimestre: null,
            portafolioAnual: "-1.78%",
            portafolio5Anos: null,
            benchmarkMes: "",
            benchmarkTrimestre: "",
            benchmarkAnual: "",
            benchmark5Anos: ""
        });
    })
})


describe("Volatilidad Historica",()=>{
    it("extracion informacion api",async ()=>{
        axiosInstance.get = jest.fn().mockResolvedValue({data:{}});
        const expect = Historical.GetHistoricalVolatility({portfolio: "VOL-EQCOL", date: "2021-01-31"});
    })

    it("extracion informacion api error",async ()=>{
        axiosInstance.get = jest.fn().mockImplementationOnce(()=>Promise.reject(new Error("")));
        const expect = Historical.GetHistoricalVolatility({});
    })

    it("transformacion volatilidad historica vacia",async ()=>{

        expect(Historical.TransformVolatility({}))
    })

    it("transformacion volatilidad historica data",async ()=>{

        expect(Historical.TransformVolatility({
            ultimomes: "",
            ultimos3meses: "",
            ultimoanio: "",
            ultimos5anios: ""
        }));
    })
})