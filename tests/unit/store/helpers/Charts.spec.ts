import axiosInstance from "@/config/axiosInstance";
import Charts from "@/store/helpers/Charts";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("General Chart", () => {
  it("extracion informacion", async () => {
    expect(Charts.GetOptionsBase(""));
  });

  it("conversion numerica", async () => {
    expect(Charts.numericValue("22222"));
  });

  it("conversion numerica vacio", async () => {
    expect(Charts.numericValue(null));
  });

  it("conversion numerica error", async () => {
    expect(Charts.numericValue("aaaa"));
  });
});

describe("Comisiones Pagadas", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    Charts.GetCommissionsPaidData({
      portfolio: "VOL-EQCOL",
      date: "2021-01-31"
    });
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("")));
    Charts.GetCommissionsPaidData({});
  });

  const comissionData = [
    {
      saldo: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      saldo: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      saldo: Math.random() * 100000,
      fecha: "01/01/1000"
    }
  ];

  it("Obtener Series", async () => {
    expect(Charts.GetCommissionsPaidSeries(comissionData));
  });

  it("Obtener Opciones", async () => {
    expect(Charts.GetCommissionsPaidOptions(comissionData));
  });
});

describe("Indice de Referencia", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    Charts.GetProfitabilityIndexData({
      portfolio: "VOL-EQCOL",
      date: "2021-01-31"
    });
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("")));
    Charts.GetProfitabilityIndexData({});
  });

  const ProfitabilityData = [
    {
      portafolio: Math.random() * 100000,
      benchmark: Math.random() * 100000,
      comision: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      portafolio: Math.random() * 100000,
      benchmark: Math.random() * 100000,
      comision: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      portafolio: Math.random() * 100000,
      benchmark: Math.random() * 100000,
      comision: Math.random() * 100000,
      fecha: "01/01/1000"
    }
  ];

  it("Obtener Series", async () => {
    expect(Charts.GetProfitabilityIndexSeries(ProfitabilityData));
  });

  it("Obtener Opciones", async () => {
    expect(Charts.GetProfitabilityIndexOptions(ProfitabilityData));
  });

});

describe("Valor Unidad", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    Charts.GetUnitValueData({ portfolio: "VOL-EQCOL", date: "2021-01-31" });
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("")));
    Charts.GetUnitValueData({});
  });

  const UnitValueData = [
    {
      inversion: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      inversion: Math.random() * 100000,
      fecha: "01/01/1000"
    },
    {
      inversion: Math.random() * 100000,
      fecha: "01/01/1000"
    }
  ];

  it("Obtener Series", async () => {
    expect(Charts.GetUnitValueSeries(UnitValueData));
  });

  it("Obtener Opciones", async () => {
    expect(Charts.GetUnitValueOptions(UnitValueData));
  });
});
