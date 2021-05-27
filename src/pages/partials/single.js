import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function SinglePartial(props) {
  //   const { confirmSeries = [], deathSeries = [] } = props;
  const seriesData = [];
  if (props.type === 1) {
    seriesData.push({
      name: "Confirm Cases",
      data: props.preparedData.confirmCases,
    });
  } else {
    seriesData.push({
      name: "Confirm Deaths",
      data: props.preparedData.deaths,
    });
  }
  const confirmOPtions = {
    chart: {
      type: "area",
    },
    title: {
      text: props.type === 1 ? "Confirm Cases" : "Death Cases",
    },
    xAxis: {
      allowDecimals: false,
      categories: props.preparedData.x_categories,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        },
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return this.value / 1000 + "k";
        },
      },
    },
    plotOptions: {
      area: {
        // pointStart: 1940,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: seriesData,
  };
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={confirmOPtions} />
      </div>
    </>
  );
}
export default SinglePartial;
