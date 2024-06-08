import axiosInstance from "@/config/axiosInstance";

import GeneralInformation from "@/store/helpers/GeneralInformation";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Informacion General Ficha Tecnica", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    GeneralInformation.GetGeneralInfoData({});
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest.fn().mockImplementationOnce(() => Promise.reject(new Error("")));
    GeneralInformation.GetGeneralInfoData({});
  });

  it("extracion informacion nombre portafolio api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    GeneralInformation.GetPortfolioName({});
  });

  it("extracion informacion nombre portafolio api error", async () => {
    axiosInstance.get = jest.fn().mockImplementationOnce(() => Promise.reject(new Error("")));
    GeneralInformation.GetPortfolioName({});
  });

  it("Formato Fecha", async () => {
    expect(GeneralInformation.FormatDate("2021-01-31")).toBe("Enero 31 de 2021");
  });
  it("Formato Fecha Error", async () => {
    expect(GeneralInformation.FormatDate(""));
  });
});

describe("Informacion General Transformacion", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetGeneralInfo([], 0, 0));
  });
});

describe("Condiciones de inversion", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetInvestmentConditions([]));
  });
});

describe("Calificacion Portafolio", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetPortfolioCalification([]));
  });
});

describe("Politica de inversión", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetInvestmentPolicy([]));
  });
});

describe("Observaciones", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetObservations([])).toBe("N/A");
  });
});

describe("Riesgos ", () => {
  it("Transformación informacion", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetRiskData([]).length).toBe(1);
  });
});

describe("FormatDate ", () => {
  it("Transformación informacion", async () => {
    GeneralInformation.formatWhitComma(12);
  });
});

describe("Informacion Adicional ", () => {
  it("Transformación informacion Vacio", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(GeneralInformation.GetAdditionalInfo([]));
  });

  it("Transformación informacion Data", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    expect(
      GeneralInformation.GetAdditionalInfo([
        {
          idCampo: 30,
          valor: "a \n b \n c \n d"
        }
      ])
    );
  });
});
