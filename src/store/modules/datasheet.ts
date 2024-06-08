import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import GeneralInformation from "../helpers/GeneralInformation";
import PortfolioValues from "../helpers/PortfolioValues";
import PortfolioInvestment from "../helpers/PortfolioInvestment";
import Balance from "../helpers/Balance";
import Historical from "../helpers/Historical";
@Module({
  namespaced: false,
})
class DataSheet extends VuexModule {
  portfolioName = "";
  cutDate = "mes dd de año";
  baseBalance = {
    saldoInicial: 0,
    rendiminetosBrutos: 0,
    gastosYComisiones: 0,
    saldoFinal: 0,
  };
  generalInfoHeader: Array<any> = [
    { text: "", name: "name", bold: true },
    { text: "", name: "value" }
  ];
  generalInfo: Array<any> = [];
  invesmentConditionsHeader: Array<any> = [
    { text: "", name: "name", bold: true },
    { text: "", name: "value" }
  ];
  invesmentConditions: Array<any> = [];
  risk: Array<any> = [];
  observations = "";
  portfolioCalificationHeader: Array<any> = [
    { text: "", name: "name" },
    { text: "", name: "value", align: "right", bold: true },
  ];
  portfolioCalification: Array<any> = [];
  investmentPolicy: Array<any> = [];
  activeClassesHeader: Array<any> = [
    {
      text: "Clases de activos",
      name: "item",
      align: "center",
      colspan: 2
    },
    { text: "", name: "value", align: "center", colspan: 1 }
  ];
  calificationHeader: Array<any> = [
    {
      text: "Calificación",
      name: "item",
      align: "center",
      colspan: 2
    },
    { text: "", name: "value", align: "center", colspan: 1 }
  ];
  economicSectorHeader: Array<any> = [
    {
      text: "Sector económico",
      name: "item",
      align: "center",
      colspan: 2
    },
    { text: "", name: "value", align: "center", colspan: 1 }
  ];
  otherFactorsHeader: Array<any> = [
    {
      text: "Otros Factores",
      name: "item",
      align: "center",
      colspan: 2
    },
    { text: "", name: "value", align: "center", colspan: 1 }
  ];
  portfolioInvestment: any = {
    activeClasses: [],
    calification: [],
    economicSector: [],
    otherFactors: []
  };
  principalPortfolioInvestmentHeader: Array<any> = [
    { text: "Emisor", name: "emisor" },
    { text: "Tipo de inversiones", name: "investmentType", align: "center" },
    { text: "Sector económico", name: "sector", align: "center" },
    { text: "% del portafolio", name: "participation", align: "center" }
  ];
  principalPortfolioInvestment: Array<any> = [];

  comissionDetailHeader: Array<any> = [
    { text: "Concepto", name: "concepto" },
    { text: "Porcentaje aplicable", name: "porcentaje", align: "right" },
    { text: "Base de comisión", name: "base", align: "center" }
  ];

  comissionDetail: Array<any> = [];

  additionalInfoHeader: Array<any> = [
    { text: "", name: "item1", align: "justify" },
    { text: "", name: "item2", align: "justify" }
  ];

  //additionalInfo: Array<any> = [];
  additionalInfo = "";

  historicalProfitabilityHeader: Array<any> = [
    { text: "", name: "period", align: "center", needed: true },
    { text: "Portafolio", name: "portfolio", align: "center" },
    { text: "Benchmark", name: "benchmark", align: "center" }
  ];
  historicalProfitability: Array<any> = [];

  historicalComissionHeader: Array<any> = [
    { text: "", name: "name" },
    { text: "", name: "value", align: "right" }
  ];
  historicalComission: Array<any> = [];

  historicalVolatilityHeader = [
    { text: "", name: "period", align: "center", needed: true },
    { text: "Portafolio", name: "portfolio", align: "center" },
    { text: "Benchmark", name: "benchmark", align: "center" }
  ];
  historicalVolatility: Array<any> = [];

  @Mutation
  setCutDate(data: any) {
    this.cutDate = data;
  }

  @Mutation
  setPortfolioName(data: any) {
    this.portfolioName = data;
  }
  @Mutation
  setBaseBalance(data: any) {
    this.baseBalance = data;
  }
  @Mutation
  setGeneralInfo(data: any) {
    this.generalInfo = data;
  }
  @Mutation
  setInvesmentConditions(data: any) {
    this.invesmentConditions = data;
  }
  @Mutation
  setRisk(data: any) {
    this.risk = data;
  }
  @Mutation
  setObservations(data: any) {
    this.observations = data;
  }
  @Mutation
  setPortfolioCalification(data: any) {
    this.portfolioCalification = data;
  }
  @Mutation
  setInvestmentPolicy(data: any) {
    this.investmentPolicy = data;
  }
  @Mutation
  setPortfolioInvestment(data: any) {
    this.portfolioInvestment = data;
  }
  @Mutation
  setPrincipalPortfolioInvestment(data: any) {
    this.principalPortfolioInvestment = data;
  }
  @Mutation
  setComissionDetail(data: any) {
    this.comissionDetail = data;
  }
  @Mutation
  setAdditionalInfo(data: any) {
    this.additionalInfo = data;
  }

  @Mutation
  setHistoricalProfitability(data: any) {
    this.historicalProfitability = data;
  }
  @Mutation
  setHistoricalComission(data: any) {
    this.historicalComission = data;
  }
  @Mutation
  setHistoricalVolatility(data: any) {
    this.historicalVolatility = data;
  }

  @Action({ rawError: true })
  public async getDataSheetInfo(input: any) {
    console.log({input})
    this.context.commit("setCutDate", GeneralInformation.FormatDate(input.date));
    this.context.commit("setPortfolioName", await GeneralInformation.GetPortfolioName(input));
    const portfolioValue = await PortfolioValues.GetPortfolioValue(input);
    const participants = await PortfolioValues.GetPortfolioParticipants(input);
    const genData = await GeneralInformation.GetGeneralInfoData(input);

    if(portfolioValue) {
      console.log("Portafolio Value " + parseFloat(portfolioValue.replace(/,/g, "")));
      this.context.commit("setGeneralInfo", GeneralInformation.GetGeneralInfo(genData, parseFloat(portfolioValue.replace(/,/g, "")), participants));
    }
    this.context.commit("setInvesmentConditions", GeneralInformation.GetInvestmentConditions(genData));
    this.context.commit("setPortfolioCalification", GeneralInformation.GetPortfolioCalification(genData));
    this.context.commit("setInvestmentPolicy", GeneralInformation.GetInvestmentPolicy(genData));
    this.context.commit("setObservations", GeneralInformation.GetObservations(genData));
    this.context.commit("setRisk", GeneralInformation.GetRiskData(genData));
    this.context.commit("setBaseBalance", await Balance.GetBalanceBaseData(input));
    this.context.commit("setPortfolioInvestment", await PortfolioInvestment.GetPortfolioInvestments(input));
    this.context.commit("setPrincipalPortfolioInvestment", await PortfolioInvestment.GetPrincipalPortfolioInvestments(input));
    this.context.commit("setComissionDetail", await Balance.GetComissionDetail(input));
    this.context.commit("setAdditionalInfo", GeneralInformation.GetAdditionalInfo(genData));
    this.context.commit("setHistoricalProfitability", await Historical.GetHistoricalProfitability(input));
    this.context.commit("setHistoricalComission", await Balance.GetHistoricalComission(input));
    this.context.commit("setHistoricalVolatility", await Historical.GetHistoricalVolatility(input));
  }

  get CutDate() {
    return this.cutDate;
  }
  get PortfolioName() {
    return this.portfolioName;
  }
  get BaseBalance() {
    return this.baseBalance;
  }
  get GeneralInfoHeader() {
    return this.generalInfoHeader;
  }
  get GeneralInfo() {
    return this.generalInfo;
  }
  get InvesmentConditionsHeader() {
    return this.invesmentConditionsHeader;
  }
  get InvesmentConditions() {
    return this.invesmentConditions;
  }
  get Risk() {
    return this.risk;
  }
  get Observations() {
    return this.observations;
  }
  get PortfolioCalificationHeader() {
    return this.portfolioCalificationHeader;
  }
  get PortfolioCalification() {
    return this.portfolioCalification;
  }
  get InvestmentPolicy() {
    return this.investmentPolicy;
  }
  get ActiveClassesHeader() {
    return this.activeClassesHeader;
  }
  get CalificationHeader() {
    return this.calificationHeader;
  }
  get EconomicSectorHeader() {
    return this.economicSectorHeader;
  }
  get OtherFactorsHeader() {
    return this.otherFactorsHeader;
  }
  get PortfolioInvestment() {
    return this.portfolioInvestment;
  }
  get PrincipalPortfolioInvestment() {
    return this.principalPortfolioInvestment;
  }
  get PrincipalPortfolioInvestmentHeader() {
    return this.principalPortfolioInvestmentHeader;
  }
  get ComissionDetailHeader() {
    return this.comissionDetailHeader;
  }
  get ComissionDetail() {
    return this.comissionDetail;
  }
  get AdditionalInfoHeader() {
    return this.additionalInfoHeader;
  }
  get AdditionalInfo() {
    return this.additionalInfo;
  }
  get HistoricalProfitabilityHeader() {
    return this.historicalProfitabilityHeader;
  }
  get HistoricalProfitability() {
    return this.historicalProfitability;
  }

  get HistoricalComissionHeader() {
    return this.historicalComissionHeader;
  }

  get HistoricalComission() {
    return this.historicalComission;
  }
  get HistoricalVolatility() {
    return this.historicalVolatility;
  }
  get HistoricalVolatilityHeader() {
    return this.historicalVolatilityHeader;
  }
}

export default DataSheet;
