import axiosInstance from "@/config/axiosInstance";

import Balance from "@/store/helpers/Balance";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Informacion cifras de balance", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    Balance.GetBalanceBaseData({});
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("")));
    Balance.GetBalanceBaseData({});
  });
});

describe("Detalle Comisiones", () => {
  it("extracion informacion api", async () => {
    const comissionReturnValue = [
      {
        base: "Test",
        concepto: "Test",
        porcentaje: "0.3"
      },
      {
        base: "Test",
        concepto: "Test",
        porcentaje: "0.3"
      }
    ];
    axiosInstance.get = jest
      .fn()
      .mockResolvedValue({ data: { payload: comissionReturnValue } });
    Balance.GetComissionDetail({});
  });
  it("extracion informacion api", async () => {
    const comissionReturnValue = [
      {
        base: "Test",
        concepto: "Test",
        porcentaje: "0.3"
      },
      {
        base: "Test",
        concepto: "Test",
        porcentaje: "0.3"
      }
    ];
    axiosInstance.get = jest
      .fn()
      .mockResolvedValue({ data: { comissionReturnValue } });
    Balance.GetComissionDetail({});
  });
  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockRejectedValue(() => Promise.reject(new Error("")));
    Balance.GetComissionDetail({});
  });
});

describe("Gastos y Comisiones Historicos", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    Balance.GetHistoricalComission({});
  });

  it("extracion informacion api error", async () => {
    axiosInstance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error("")));
    Balance.GetHistoricalComission({});
  });

  it("Transformacion informacion", async () => {
    expect(
      Balance.TransformHistorical({
        remuneracionEfectivaCobrada: null,
        gastosComisiones: null,
        saldoFinal: null,
        rendimientos: null
      })
    );
  });

  it("Transformacion informacion error", async () => {
    expect(
      Balance.TransformHistorical({
        remuneracionEfectivaCobrada: "test",
        gastosComisiones: "test",
        saldoFinal: "test",
        rendimientos: "test"
      })
    );
  });
});
