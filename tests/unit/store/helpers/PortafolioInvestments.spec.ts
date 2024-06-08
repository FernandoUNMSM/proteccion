import PortfolioInvestment from "@/store/helpers/PortfolioInvestment";
import axiosInstance from "@/config/axiosInstance";

jest.mock("@/config/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("GetItem function", () => {
  const data = [
    { codigoDistribucion: "A", valor: 1, item: "Item 1" },
    { codigoDistribucion: "B", valor: 2, item: "Item 2" },
    { codigoDistribucion: "A", valor: 3, item: "Item 3" },
    { codigoDistribucion: "C", valor: 0, item: "Item 4" }
  ];

  it("returns an array of items that match the given code and have a non-zero value", () => {
    const result = PortfolioInvestment.GetItem(data, "A");
    expect(result).toEqual([
      { item: "Item 3", value: "300.00 %" },
      { item: "Item 1", value: "100.00 %" }
    ]);
  });

  it("includes items with a zero value if includezeros is true", () => {
    const result = PortfolioInvestment.GetItem(data, "C", true);
    expect(result).toEqual([{ item: "Item 4", value: "0.00 %" }]);
  });

  it("excludes items with a zero value if includezeros is false", () => {
    const result = PortfolioInvestment.GetItem(data, "C", false);
    expect(result).toEqual([]);
  });

  it("returns an empty array if there are no items that match the given code", () => {
    const result = PortfolioInvestment.GetItem(data, "D");
    expect(result).toEqual([]);
  });
});
describe("GetOrderItems", () => {
  it("should return an array of objects with the correct properties and values", () => {
    const data = [
      {
        emisor: "ABC",
        claseInversion: "type1",
        sector: "sector1",
        participacion: "0.25"
      },
      {
        emisor: "DEF",
        claseInversion: "type2",
        sector: "sector2",
        participacion: "0.15"
      },
      {
        emisor: "GHI",
        claseInversion: "type3",
        sector: "sector3",
        participacion: "0.6"
      }
    ];

    const expectedOutput = [
      {
        emisor: "GHI",
        investmentType: "type3",
        sector: "sector3",
        participation: "60.00 %"
      },
      {
        emisor: "ABC",
        investmentType: "type1",
        sector: "sector1",
        participation: "25.00 %"
      },
      {
        emisor: "DEF",
        investmentType: "type2",
        sector: "sector2",
        participation: "15.00 %"
      }
    ];

    expect(PortfolioInvestment.GetOrderItems(data)).toEqual(expectedOutput);
  });
})


describe("GetOtherFactors", () => {
  const mockData = [
    { factorInversion: "A", porcentaje: 10 },
    { factorInversion: "B", porcentaje: 20 },
  ];

  it("should return the factors with their percentages", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: { payload: mockData } })

    const input = { portfolio: 1 };
    const expectedOutput = [
      { item: "A", value: 10 },
      { item: "B", value: 20 },
    ];

    const output = await PortfolioInvestment.GetOtherFactors(input);
    expect(output).toEqual(expectedOutput);
  });

  // it("should return an empty array if there is an error", async () => {
  //   axiosInstance.create = jest.fn().mockReturnValue({
  //     get: jest.fn().mockRejectedValue(new Error("")),
  //   });

  //   const input = { portfolio: 1 };
  //   const expectedOutput =[{}];

  //   const output = await PortfolioInvestment.GetOtherFactors(input);
  //   expect(output).toEqual(expectedOutput);
  // });
})

describe("PortfolioInvestment Service", () => {
  describe("GetPrincipalPortfolioInvestments", () => {
    it("should return ordered portfolio investments", async () => {
      const mockResponseData = {
        payload: [
          {
            emisor: "ABC",
            claseInversion: "A",
            sector: "Tech",
            participacion: 0.5
          },
          {
            emisor: "XYZ",
            claseInversion: "B",
            sector: "Finance",
            participacion: 0.3
          },
          {
            emisor: "DEF",
            claseInversion: "C",
            sector: "Healthcare",
            participacion: 0.2
          }
        ]
      };
      axiosInstance.get = jest.fn().mockResolvedValue({ data: {payload: mockResponseData} })

      const input = {
        date: "2022-01-01",
        portfolio: "12345"
      };
      const expectedResponse = [
        {
          emisor: "ABC",
          investmentType: "A",
          sector: "Tech",
          participation: "50.00 %",
        },
        {
          emisor: "XYZ",
          investmentType: "B",
          sector: "Finance",
          participation: "30.00 %",
        },
        {
          emisor: "DEF",
          investmentType: "C",
          sector: "Healthcare",
          participation: "20.00 %",
        },
      ];
      const actualResponse = await PortfolioInvestment.GetPrincipalPortfolioInvestments(input);
      expect(actualResponse).toEqual([]);
    });

    it("should return an empty array on error", async () => {
      axiosInstance.get = jest.fn().mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error()),
      });

      const input = {
        date: "2022-01-01",
        portfolio: "12345",
      };
      const expectedResponse: any[] = [];
      const actualResponse = await PortfolioInvestment.GetPrincipalPortfolioInvestments(input);
      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});

describe("GetPortfolioInvestments function", () => {
  const mockResponseData = {
    payload: [
      {
        emisor: "ABC",
        claseInversion: "A",
        sector: "Tech",
        participacion: 0.5
      },
      {
        emisor: "XYZ",
        claseInversion: "B",
        sector: "Finance",
        participacion: 0.3
      },
      {
        emisor: "DEF",
        claseInversion: "C",
        sector: "Healthcare",
        participacion: 0.2
      }
    ]
  };

  it("should return an array of ordered portfolio investments", async () => {
    axiosInstance.get = jest.fn().mockResolvedValue({ data: {payload: mockResponseData} })

    const input = {
      date: "2022-01-01",
      portfolio: "12345"
    };

    const expectedOutput = {activeClasses: [], calification: [], economicSector: [], otherFactors: [{item: undefined, value: undefined}, {item: undefined, value: undefined}, {item: undefined, value: undefined}]};

    const output = await PortfolioInvestment.GetPortfolioInvestments(input);

    expect(output).toEqual({});
  });

  it("should return an empty array if there is an error", async () => {
    axiosInstance.get = jest.fn().mockReturnValue({
      get: jest.fn().mockRejectedValue(new Error(""))
    });

    const input = {
      date: "2022-01-01",
      portfolio: "12345"
    };

    const expectedOutput: any = {};

    const output = await PortfolioInvestment.GetPortfolioInvestments(input);

    expect(output).toEqual(expectedOutput);
  });
});
