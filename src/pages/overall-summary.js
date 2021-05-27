import React from "react";
import Highcharts from "highcharts";
import {
  keys as _keys,
  countBy as _countBy /* , filter as _filter */,
} from "lodash";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more.src";
import { getSummaryResults } from "../services/overallSummary";
HC_more(Highcharts);
const getBubbleOptions = (values) => {
  return {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },

    legend: {
      enabled: false,
    },

    title: {
      text: "Active and Deaths Cases",
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, Active: {point.x}, Deaths: {point.y}, Population: {point.z}.",
      },
    },

    xAxis: {
      gridLineWidth: 1,
      // type: "logarithmic",
      title: {
        text: "Active",
      },
      labels: {
        format: "{value}",
      },
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      // type: "logarithmic",
      title: {
        text: "Deaths",
      },
      labels: {
        format: "{value}",
      },
      maxPadding: 0.2,
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        "<tr><th>Active:</th><td>{point.x}</td></tr>" +
        "<tr><th>Deaths:</th><td>{point.y}</td></tr>" +
        "<tr><th>Population:</th><td>{point.z}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },

    series: [
      {
        data: values,
      },
    ],
  };
};

function OverallSummary() {
  const [effectedCountriesSummary, updateEffectedCountriesSummary] =
    React.useState([]);

  React.useEffect(() => {
    (async () => {
      await getSummaryResults().then(async (response) => {
        updateEffectedCountriesSummary(response.summary);
      });
    })();
  }, []);
  const temp = [];
  effectedCountriesSummary.forEach((item) => {
    temp.push({
      x: item.ConfirmCases,
      y: item.ConfirmDeaths,
      z: item.Population,
      country: item.Country,
      name: item.Country,
      color: item.ConfirmCases > 10000000 ? "#d9534f" : "#5bc0de",
    });
  });
  console.log(temp);
  const Continents = _keys(
    _countBy(effectedCountriesSummary, function (effectedCountriesSummary) {
      return effectedCountriesSummary.Continent;
    })
  );
  //   console.log(Continents);
  const bubbleSeries = [];
  Continents.forEach((con) => {
    const countries = [];
    effectedCountriesSummary.forEach((item) => {
      if (con === item.Continent) {
        countries.push({
          name: item.Country,
          value: item.ConfirmCases,
        });
      }
    });
    // console.log(countries);
    bubbleSeries.push({
      name: con,
      data: countries,
    });
  });
  const bubbleChartOptions = getBubbleOptions(temp);
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={bubbleChartOptions} />
      </div>
    </>
  );
}

export default OverallSummary;
