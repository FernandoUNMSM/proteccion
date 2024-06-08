import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import Charts from '../helpers/Charts';
import axios from 'axios'

@Module({
    namespaced: false
})
class UnitValueChart extends VuexModule {

    uvSeries:Array<any>= [];
    uvOptions:any= {
        chart: {
            height: 100,
            type: 'line',
        },
    };
    irSeries:Array<any>= [];
    irOptions:any= {
        chart: {
            height: 100,
            type: 'line',
        },
    };

    cpSeries:Array<any>= [];
    cpOptions:any= {
        chart: {
            height: 100,
            type: 'line',
        },
    };

    @Mutation
    setUvSeries(data: any) {
        this.uvSeries = data;
    }

    @Mutation
    setUvOptions(data: any) {
        this.uvOptions = data;
    }

    @Mutation
    setIrSeries(data: any) {
        this.irSeries = data;
    }

    @Mutation
    setIrOptions(data: any) {
        this.irOptions = data;
    }

    @Mutation
    setCpSeries(data: any) {
        this.cpSeries = data;
    }

    @Mutation
    setCpOptions(data: any) {
        this.cpOptions = data;
    }

    @Action
    public async getUnitValueChart(input: any) {
      try {
        const chartDataUv = await Charts.GetUnitValueData(input);

        this.context.commit('setUvOptions', Charts.GetUnitValueOptions(chartDataUv));
        this.context.commit('setUvSeries', Charts.GetUnitValueSeries(chartDataUv));

        const chartDataPi = await Charts.GetProfitabilityIndexData(input);
        this.context.commit('setIrOptions', Charts.GetProfitabilityIndexOptions(chartDataPi));
        this.context.commit('setIrSeries', Charts.GetProfitabilityIndexSeries(chartDataPi));

        const chartDataCp = await Charts.GetCommissionsPaidData(input);
        this.context.commit('setCpOptions', Charts.GetCommissionsPaidOptions(chartDataCp));
        this.context.commit('setCpSeries', Charts.GetCommissionsPaidSeries(chartDataCp));
      }catch (error) {
          console.error('Error fetching chart data:', error)
        }
    }
    get UvSeries()
    {
        return this.uvSeries;
    }
    get UvOptions()
    {
        return this.uvOptions;
    }
    get IrSeries()
    {
      console.log(this.irSeries)
        return this.irSeries;
    }
    get IrOptions()
    {
      console.log(this.irOptions)
        return this.irOptions;
    }
    get CpSeries()
    {
        return this.cpSeries;
    }
    get CpOptions()
    {
        return this.cpOptions;
    }
}

export default UnitValueChart;