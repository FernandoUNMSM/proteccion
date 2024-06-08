import axiosInstance from "@/config/axiosInstance";

const GetItem = function(data: Array<any>, code: string, includezeros = true) {
  try {
    return data
      .filter((d) => d.codigoDistribucion === code && (includezeros || d.valor > 0.0))
      .sort(function(a, b) {
        return b.valor - a.valor;
      })
      .map(function(e) {
        return { item: e.item, value: (parseFloat(e.valor) * 100).toFixed(2).toString() + " %" };
      })
      .slice(0, 10);
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const GetOtherFactors = async function(input: any) {
  const data = await axiosInstance.get("ft/api/system/valoresfijos/inversiones?portafolio=" + input.portfolio).then(function(response) {
      return response.data.payload;
    });
  return data.map(function(e: any) {
    return { item: e.factorInversion, value: e.porcentaje };
  });
};

const GetPortfolioInvestments = async function(input: any) {
  try {
    const data: Array<any> = await axiosInstance
      .get("ft/api/inversiones/distribuciones?fecha=" + input.date + "&codigoPortafolio=" + input.portfolio)
      .then(function(response) {
        return response.data.payload;
      });
    const activeClasses = GetItem(data, "TIPOINVERSION", true);
    const calification = GetItem(data, "CALIFICACION", true);
    const economicSector = GetItem(data, "SECTOR", true);
    const otherFactors = await GetOtherFactors(input);
    return {
      activeClasses,
      calification,
      economicSector,
      otherFactors,
    };
  } catch (e) {
    console.info(e);
    return {};
  }
};

const GetOrderItems = function(data: Array<any>) {
  return data
    .sort(function(a, b) {
      return b.participacion - a.participacion;
    })
    .map(function(e) {
      return {
        emisor: e.emisor,
        investmentType: e.claseInversion,
        sector: e.sector,
        participation: (parseFloat(e.participacion) * 100).toFixed(2) + " %",
      };
    })
    .slice(0, 10);
};
const GetPrincipalPortfolioInvestments = async function(input: any) {
  try {
    const data: Array<any> = await axiosInstance
      .get("ft/api/system/emisores?date=" + input.date + "&portafolio=" + input.portfolio)
      .then(function(response) {
        return response.data.payload;
      });
    return GetOrderItems(data);
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export default {
  GetItem,
  GetOtherFactors,
  GetPortfolioInvestments,
  GetOrderItems,
  GetPrincipalPortfolioInvestments
};
