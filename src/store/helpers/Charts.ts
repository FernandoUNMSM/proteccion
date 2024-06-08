import axiosInstance from '@/config/axiosInstance';
import axios from 'axios';

const GetOptionsBase = function(title: string, min: any = undefined, max: any = undefined, ticks: any = undefined) {
  console.log({title, max, min});
  return {
    chart: {
      toolbar: {
        show: false,
      },
      height: 250,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#1d3d8f', '#e3e829', '#00afcc'],
    tooltip: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '8pt',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 1,
    },
    title: {
      text: undefined, //title,
      align: 'center',
      margin: 3,
      floating: true,
      style: {
        fontSize: '10pt',
        color: '#1d3d8f',
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [new Date()],
      tickAmount: 5,
      tickPlacement: 'on',
      labels: {
        rotate: 0,
        style: {
          fontSize: '6pt',
        },
        formatter: function(value: string) {
          const ndate = new Date(value);
          return parseInt(ndate.toLocaleDateString('es-ES', { year: 'numeric' }));
        },
      },
    },
    yaxis: {
      min: min,
      max: max,
      tickAmount: ticks,
      labels: {
        style: {
          fontSize: '6pt',
        },
        formatter: function(value: any) {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          });
          return formatter.format(parseFloat(value.toFixed(0)));
        },
      },
    },
  };
};

const GetUnitValueSeries = function(data: Array<any>) {
  return [
    {
      name: 'Valor Unidad',
      data: data.map(function(e) {
        return parseFloat(e.inversion).toFixed(2);
      }),
    },
  ];
};

const GetUnitValueOptions = function(data: Array<any>) {
  const base = GetOptionsBase('Valor Unidad', 500000, 2000000);
  base.xaxis.categories = data.map(function(e) {
    return e.fecha.toString();
  });
  return base;
};

const GetUnitValueData = async function(input: any) {
  try {
    const data: Array<any> = await axiosInstance.get('ft/api/system/grafico/evolucioninversion/' + input.portfolio).then(function(response) {
      return response.data.payload;
    });
    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const numericValue = function(val: any) {
  try {
    if (val === '' || val === null || val === undefined) {
      return 0.0;
    } else {
      return parseFloat(val);
    }
  } catch (error) {
    console.warn(error);
    return 0.0;
  }
};

const GetProfitabilityIndexSeries = function(data: Array<any>) {
  try {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
    const portfolio = data.map(function(e) {
      return numericValue(e.portafolio).toFixed(0);
    });
    const benchmark = data.map(function(e) {
      return numericValue(e.benchmark).toFixed(0);
    });
    const commision = data.map(function(e) {
      return numericValue(e.comision).toFixed(0);
    });
    let lbBenchmark = 'N/A';
    if (parseFloat(benchmark.reduce((previousValue, currentValue) => previousValue + currentValue)) > 0) {
      lbBenchmark = formatter.format(parseFloat(benchmark[benchmark.length - 1]));
    }
    return [
      {
        name: 'Evolución Neta <p><b>' + formatter.format(parseFloat(portfolio[portfolio.length - 1])) + '</b></p>',
        data: portfolio,
      },
      {
        name: 'Evolución BenchMark <p><b>' + lbBenchmark + '</b></p>',
        data: benchmark,
      },
      {
        name: 'Evolución Bruta <p><b>' + formatter.format(parseFloat(commision[commision.length - 1])) + '</b></p>',
        data: commision,
      },
    ];
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const GetProfitabilityIndexOptions = function(data: Array<any>) {
  let maxV =
    Math.ceil(
      Math.max(
        ...data.map(function(e) {
          const p = numericValue(e.comision);
          const b = numericValue(e.benchmark);
          return p > b ? p : b;
        })
      ) / 1000000
    ) * 1000000;

  if (maxV < 2000000) maxV = 2000000;
  let minV =
    Math.floor(
      Math.min(
        ...data.map(function(e) {
          const p = numericValue(e.portafolio);
          const b = numericValue(e.benchmark);

          return p > b || b === 0 ? p : b;
        })
      ) / 100000
    ) * 100000;
  if (minV > 500000) minV = 500000;

  const ticks = maxV / 10;

  const base = GetOptionsBase("Indice de Referencia", minV, maxV, Math.floor((maxV - minV) / ticks));
  base.xaxis.categories = data.map(function(e) {
    const day = Number(e.fecha.substring(0, 2));
    const month = Number(e.fecha.substring(3, 5));
    const year = Number(e.fecha.substring(6, 10));
    return new Date(year, month, day);
  });
  return base;
};

const GetProfitabilityIndexData = async function(input: any) {
  try {
    const data: any = await axiosInstance.get('ft/api/system/grafico/evolucionbenchmark/' + input.portfolio);
    return data.data.payload;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

const GetCommissionsPaidSeries = function(data: Array<any>) {
  return [
    {
      name: 'Comisiones Pagadas',
      data: data.map(function(e) {
        return parseFloat(e.saldo).toFixed(2);
      }),
    },
  ];
};

const GetCommissionsPaidOptions = function(data: Array<any>) {
  const base = GetOptionsBase('Comisiones Pagadas');
  base.xaxis.categories = data.map(function(e) {
    return e.fecha.toString();
  });
  return base;
};

const GetCommissionsPaidData = async function(input: any) {
  try {
    const data: Array<any> = await axiosInstance
      .get('ft/api/system/grafico/saldodiario/?portafolio=' + input.portfolio + '&cuentas=250195,250110')
      .then(function(response) {
        return response.data.payload;
      });
    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export default {
  numericValue,
  GetOptionsBase,
  GetUnitValueData,
  GetUnitValueOptions,
  GetUnitValueSeries,
  GetProfitabilityIndexData,
  GetProfitabilityIndexOptions,
  GetProfitabilityIndexSeries,
  GetCommissionsPaidData,
  GetCommissionsPaidOptions,
  GetCommissionsPaidSeries,
};
