import axiosInstance from "@/config/axiosInstance";

import * as service from "@/services/inversiones/rentabilidades";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("Maduracion y duracion Servicios", () => {
  it("extracion informacion api", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {} });
    service.obtenerInformacionRentabilidades({});
  });
  it("extracion informacion api Reject", async () => {
    axiosInstance.get = jest.fn().mockRejectedValue({ data: {} });
    service.obtenerInformacionRentabilidades({});
  });
});
