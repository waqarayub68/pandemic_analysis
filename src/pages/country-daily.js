import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function CountryDaily(props) {
  const { confirmSeries = [], deathSeries = [] } = props;

  const confirmOPtions = {
    chart: {
      renderTo: "container",

      zoomType: "x",

      spacingRight: 20,

      borderWidth: 1,

      plotBorderWidth: 1,
    },

    title: {
      text: "Confirm Cases",
    },

    xAxis: {
      type: "datetime",

      maxZoom: 14 * 24 * 3600000,

      title: {
        text: null,
      },
    },

    yAxis: {
      title: {
        text: "Cases on Daily Basis",
      },

      startOnTick: false,

      showFirstLabel: false,
    },

    tooltip: {
      shared: true,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },

          stops: [
            [0, Highcharts.getOptions().colors[0]],

            [1, "rgba(2,0,0,0)"],
          ],
        },

        lineWidth: 1,

        marker: {
          enabled: false,

          states: {
            hover: {
              enabled: true,

              radius: 5,
            },
          },
        },

        shadow: false,

        states: {
          hover: {
            lineWidth: 1,
          },
        },
      },
    },

    series: [
      {
        type: "area",

        name: "New Cases",

        pointInterval: 24 * 3600 * 1000,

        pointStart: Date.UTC(2020, 1, 24),

        data: confirmSeries,
      },
    ],
  };
  const confirmDeathOPtions = {
    chart: {
      renderTo: "container",

      zoomType: "x",

      spacingRight: 20,

      borderWidth: 1,

      plotBorderWidth: 1,
    },

    title: {
      text: "Confirm Deaths",
    },

    xAxis: {
      type: "datetime",

      maxZoom: 14 * 24 * 3600000,

      title: {
        text: null,
      },
    },

    yAxis: {
      title: {
        text: "Deaths on Daily Basis",
      },

      startOnTick: false,

      showFirstLabel: false,
    },

    tooltip: {
      shared: true,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },

          stops: [
            [0, Highcharts.getOptions().colors[0]],

            [1, "rgba(2,0,0,0)"],
          ],
        },

        lineWidth: 1,

        marker: {
          enabled: false,

          states: {
            hover: {
              enabled: true,

              radius: 5,
            },
          },
        },

        shadow: false,

        states: {
          hover: {
            lineWidth: 1,
          },
        },
      },
    },

    series: [
      {
        type: "area",

        name: "New Death",

        pointInterval: 24 * 3600 * 1000,

        pointStart: Date.UTC(2020, 1, 24),

        data: deathSeries,
      },
    ],
  };
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={confirmOPtions} />
        <HighchartsReact
          highcharts={Highcharts}
          options={confirmDeathOPtions}
        />
      </div>
    </>
  );
}
export default CountryDaily;
