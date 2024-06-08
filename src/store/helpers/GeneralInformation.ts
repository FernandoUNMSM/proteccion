import axiosInstance from "@/config/axiosInstance";
import moment from "moment";

function getValue(data: Array<any>, id: number, defaultValue?: any) {
  try {
    const val = data.filter(d => d.idCampo === id)[0].valor;
    if (val === undefined || val === "") {
      return defaultValue;
    }
    return val;
  } catch (e) {
    console.warn(id, e);
    return defaultValue;
  }
}
function formatWhitComma(n: number) {
  return (n / 100).toFixed(2).replace(".", ",");
}

const GetPortfolioName = async function(input: any) {
  try {
    const data = await axiosInstance.get("ft/api/system/portafolio?portafolio=" + input.portfolio).then(function(response) {
      return response.data.payload;
    });
    return data.nombrePortafolio;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const GetGeneralInfoData = async function(input: any) {
  try {
    const data = await axiosInstance.get("ft/api/system/valoresfijos/portafolio?portafolio=" + input.portfolio)
      .then(function(response) {
        return response.data.payload;
      });
    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const GetGeneralInfo = function(data: Array<any>, portfolioValue: number, participants: number) {
  const genInfo = [];
  portfolioValue = portfolioValue / 1000000;
  portfolioValue = Math.trunc(portfolioValue);
  genInfo.push({
    name: "Inicio de operaciones",
    value: getValue(data, 5, "N/A")
  });
  genInfo.push({
    name: "Fecha de vencimiento",
    value: getValue(data, 72, "N/A")
  });
  genInfo.push({
    name: "Valor del portafolio",
    value: "$" + new Intl.NumberFormat("es-MX").format(portfolioValue) + " Millones"
  });
  genInfo.push({
    name: "Número de partícipes",
    value: participants
  });
  genInfo.push({
    name: "Custodio de valores",
    value: getValue(data, 73, "N/A")
  });
  return genInfo;
};

const GetInvestmentConditions = function(data: Array<any>) {
  const invesmentCon = [];
  const formatter = new Intl.NumberFormat("en-US");
  invesmentCon.push({
    name: "Aporte mínimo",
    value: isNaN(getValue(data, 10, "N/A")) ? getValue(data, 10, "N/A") : "$" + formatter.format(getValue(data, 10))
  });
  invesmentCon.push({
    name: "Adición mínima",
    value: isNaN(getValue(data, 11, "N/A")) ? getValue(data, 11, "N/A") : "$" + formatter.format(getValue(data, 11))
  });
  invesmentCon.push({
    name: "Saldo mínimo",
    value: isNaN(getValue(data, 14, "N/A")) ? getValue(data, 14, "N/A") : "$" + formatter.format(getValue(data, 14)),
  });
  invesmentCon.push({
    name: "Plazo permanencia",
    value: isNaN(getValue(data, 74, "N/A")) ? getValue(data, 74, "N/A") : formatter.format(getValue(data, 74)) + " días",
  });
  invesmentCon.push({
    name: "Sanción o comisión por retiro anticipado",
    value: getValue(data, 15, "N/A"),
  });
  invesmentCon.push({
    name: "Retiro mínimo",
    value: isNaN(getValue(data, 12, "N/A")) ? getValue(data, 12, "N/A") : "$" + formatter.format(getValue(data, 12)),
  });
  invesmentCon.push({
    name: "Retiro máximo parcial",
    value: isNaN(getValue(data, 13, "N/A")) ? getValue(data, 13, "N/A") : "$" + formatter.format(getValue(data, 13)),
  });
  return invesmentCon;
};

const GetPortfolioCalification = function(data: Array<any>) {
  const portCal = [];
  portCal.push({
    name: "Tipo de calificación",
    value: getValue(data, 75, "N/A"),
  });
  portCal.push({
    name: "Calificación",
    value: getValue(data, 76, "N/A"),
  });
  portCal.push({
    name: "Fecha de la ultima calificación",
    value: getValue(data, 28, "N/A"),
  });
  portCal.push({
    name: "Entidad calificadora",
    value: getValue(data, 29, "N/A"),
  });
  return portCal;
};

const GetInvestmentPolicy = function(data: Array<any>) {
  const investmentPol = [];
  investmentPol.push(getValue(data, 78, "N/A")); //objetivo del portafolio
  investmentPol.push(getValue(data, 31, "N/A")); // Estrategia de inversion
  investmentPol.push(getValue(data, 79, "N/A")); //Indice de referencia
  investmentPol.push(getValue(data, 80, "N/A")); // Horizonte de inversion
  return investmentPol;
};

const GetObservations = function(data: Array<any>) {
  return getValue(data, 89, "N/A");
};

const GetRiskData = function(data: Array<any>) {
  const risk = getValue(data, 84, "");
  return risk.split("\n");
};

const GetAdditionalInfo = function(data: Array<any>) {
  return getValue(data, 30, "N/A");
  // const addinfo = getValue(data, 30, "").split("\n")
  // if(addinfo.length === 4){
  //     return [
  //         {
  //             item1: addinfo[0],
  //             item2: addinfo[1]
  //         },
  //         {
  //             item1: addinfo[2],
  //             item2: addinfo[3]
  //         },
  //     ]
  // }
  // else{
  //     return [
  //         {
  //             item1: "",
  //             item2: ""
  //         },
  //         {
  //             item1: "",
  //             item2: ""
  //         },
  //     ]
  // }
};

const FormatDate = function(date: string) {
  try {
    moment.locale("es");
    let monthday = moment(date).format("MMMM DD");
    monthday = monthday.charAt(0).toUpperCase() + monthday.slice(1);
    return monthday + " de " + moment(date).format("YYYY");
  } catch (error) {
    console.warn(error);
    return "";
  }
};

export default {
  GetPortfolioName,
  GetGeneralInfoData,
  GetGeneralInfo,
  GetInvestmentConditions,
  GetPortfolioCalification,
  GetInvestmentPolicy,
  GetObservations,
  GetRiskData,
  GetAdditionalInfo,
  FormatDate,
  formatWhitComma
};
