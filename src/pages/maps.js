import Highcharts from "highcharts";
import React from "react";
import { cloneDeep, find as _find } from "lodash";
import { Statistic, Card, Row, Col, Button } from "antd";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { getWorld } from "../services/maps";
import {
  getBarStatistics,
  getConfirmTimeSeriesStatistics,
  getDeathTimeSeriesStatistics,
} from "../services/maps";
import { Spin } from "antd";
highchartsMap(Highcharts);

function Maps() {
  const [barStats, updateBarStats] = React.useState([]);
  const [confirmTimeSeries, updateConfirmSeries] = React.useState([]);
  const [deathTimeSeries, updateDeathSeries] = React.useState([]);
  const [spining, updateSpinner] = React.useState(true);
  const [selectedCountry, updateSelectedCountry] = React.useState(null);
  const [mapOptions, setMapOptions] = React.useState({
    title: {
      text: "Widget click by location",
      style: {
        color: "#fff",
      },
    },
    chart: {
      backgroundColor: "transparent",
      type: "map",
      map: null,
    },
    mapNavigation: {
      enabled: true,
      enableButtons: false,
    },
    credits: {
      enabled: false,
    },
    colorAxis: {
      dataClasses: [
        {
          from: 1,
          color: "#C40401",
          name: "COVID-19 Effected",
        },
        {
          from: 2,
          color: "#de9dac",
          name: "Less-Effected",
        },
      ],
    },
    tooltip: {
      pointFormatter: function () {
        return this.name;
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      x: -100,
      y: 70,
      floating: true,
      layout: "vertical",
      valueDecimals: 0,
      backgroundColor:
        // theme
        (Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "rgba(255, 255, 255, 0.85)",
    },
    series: [
      {
        name: "world map",
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
          format: "{point.postal-code}",
          style: {
            textTransform: "uppercase",
          },
        },
        tooltip: {
          ySuffix: " %",
        },
        cursor: "pointer",
        joinBy: ["iso-a2", "code"],
        data: [],
        point: {
          events: {
            click: function (r) {
              console.log("click - to open popup as 2nd step");
              console.log(r);
            },
          },
        },
        events: {
          click: function (e) {
            e.point.zoomTo();
          },
        },
      },
    ],
  });

  React.useEffect(() => {
    (async () => {
      updateSpinner(true);
      await Promise.all([
        getBarStatistics(),
        getConfirmTimeSeriesStatistics(),
        getDeathTimeSeriesStatistics(),
        getWorld(),
      ]).then((values) => {
        updateBarStats(values[0].barStats);
        updateConfirmSeries(values[1].TImeSeriesChart);
        updateDeathSeries(values[2].TImeSeriesChart);
        const options = cloneDeep(mapOptions);
        options.series[0].data = [];
        options["chart"]["map"] = values[3].data;
        for (let i in values[3].data["features"]) {
          let mapInfo = values[3].data["features"][i];
          if (mapInfo["id"]) {
            var postalCode = mapInfo["id"];
            var name = mapInfo["properties"]["name"];
            var country = _find(
              values[0].barStats,
              (bc) => name === bc.Country
            );
            if (country) {
              const value = country.ConfirmCases > 10000000 ? 1 : 2;
              var type = value === 1 ? "COVID-19 Effected" : "Less-Effected";
              var row = i;
              options.series[0].data.push({
                value: value,
                name: name,
                code: postalCode,
                row: row,
                type: type,
              });
            }
          }
        }
        updateSpinner(false);
        setMapOptions(options);
      });
    })();
  }, []);

  const handleBarClick = async (value) => {
    updateSpinner(true);
    await Promise.all([
      getConfirmTimeSeriesStatistics({
        location: value,
      }),
      getDeathTimeSeriesStatistics({
        location: value,
      }),
      getWorld(),
    ]).then((values) => {
      updateConfirmSeries(values[0].TImeSeriesChart);
      updateDeathSeries(values[1].TImeSeriesChart);
      updateSelectedCountry(value);
      const options = cloneDeep(mapOptions);
      options.series[0].data = [];
      options["chart"]["map"] = values[2].data;
      for (let i in values[2].data["features"]) {
        let mapInfo = values[2].data["features"][i];
        if (mapInfo["id"]) {
          var postalCode = mapInfo["id"];
          var name = mapInfo["properties"]["name"];
          var country = _find(barStats, (bc) => name === bc.Country);
          if (country) {
            const typeValue = country.Country === value ? 1 : 2;
            var type = typeValue === 1 ? "COVID-19 Effected" : "Less-Effected";
            var row = i;
            options.series[0].data.push({
              value: typeValue,
              name: name,
              code: postalCode,
              row: row,
              type: type,
            });
          }
        }
      }
      updateSpinner(false);
      setMapOptions(options);
    });
  };

  const handleClear = async () => {
    updateSpinner(true);
    await Promise.all([
      getConfirmTimeSeriesStatistics(),
      getDeathTimeSeriesStatistics(),
      getWorld(),
    ]).then((values) => {
      updateConfirmSeries(values[0].TImeSeriesChart);
      updateDeathSeries(values[1].TImeSeriesChart);
      updateSelectedCountry(null);
      const options = cloneDeep(mapOptions);
      options.series[0].data = [];
      options["chart"]["map"] = values[2].data;
      for (let i in values[2].data["features"]) {
        let mapInfo = values[2].data["features"][i];
        if (mapInfo["id"]) {
          var postalCode = mapInfo["id"];
          var name = mapInfo["properties"]["name"];
          var country = _find(barStats, (bc) => name === bc.Country);
          if (country) {
            const typeValue = country.ConfirmCases > 10000000 ? 1 : 2;
            var type = typeValue === 1 ? "COVID-19 Effected" : "Less-Effected";
            var row = i;
            options.series[0].data.push({
              value: typeValue,
              name: name,
              code: postalCode,
              row: row,
              type: type,
            });
          }
        }
      }
      updateSpinner(false);
      setMapOptions(options);
    });
  };

  const confirmNewOPtions = {
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

    // subtitle: {
    //   text:
    //     document.ontouchstart === undefined
    //       ? "Click and drag in the plot area to zoom in"
    //       : "Drag your finger over the plot to zoom in",
    // },

    xAxis: {
      type: "datetime",

      maxZoom: 14 * 24 * 3600000, // fourteen days

      title: {
        text: null,
      } /*,
        
        startOnTick: true*/,
    },

    yAxis: {
      title: {
        text: "Cases on Daily Basis",
      },

      // min: 0.6,

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

        data: confirmTimeSeries,
      },
    ],
  };

  const confirmDeathsOPtions = {
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

    // subtitle: {
    //   text:
    //     document.ontouchstart === undefined
    //       ? "Click and drag in the plot area to zoom in"
    //       : "Drag your finger over the plot to zoom in",
    // },

    xAxis: {
      type: "datetime",

      maxZoom: 14 * 24 * 3600000, // fourteen days

      title: {
        text: null,
      } /*,
        
        startOnTick: true*/,
    },

    yAxis: {
      title: {
        text: "Cases on Daily Basis",
      },

      // min: 0.6,

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

        name: "New Deaths",

        pointInterval: 24 * 3600 * 1000,

        pointStart: Date.UTC(2020, 1, 24),

        data: deathTimeSeries,
      },
    ],
  };
  console.log(deathTimeSeries);
  const barChartCountriies = [];
  const barChartConfirmCases = [];
  const barChartDeaths = [];
  let totalConfirmCases = 0;
  let totalDeathCases = 0;
  let selectedCountryConfirmCases = 0;
  let selectedCountryDeathCases = 0;
  barStats.forEach((item) => {
    if (selectedCountry && item.Country === selectedCountry) {
      selectedCountryConfirmCases += item.ConfirmCases;
      selectedCountryDeathCases += item.ConfirmDeaths;
    } else {
      totalConfirmCases += item.ConfirmCases;
      totalDeathCases += item.ConfirmDeaths;
    }

    barChartCountriies.push(item.Country);
    barChartConfirmCases.push(Math.log10(item.ConfirmCases));
    barChartDeaths.push(Math.log10(item.ConfirmDeaths));
  });
  const barChartoptions = {
    chart: {
      type: "bar",
      height: 4500,
    },
    title: {
      text: "Effected Countries Death/Confirm Cases",
    },
    xAxis: {
      categories: barChartCountriies,
      min: 0,
      scrollbar: {
        enabled: true,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Cases Ratio",
      },
      gridLineWidth: 0,
      pointInterval: 1000,
      scrollbar: {
        enabled: true,
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      // series: {
      //   stacking: "normal",
      // },
      series: {
        // cursor: "pointer",
        stacking: "normal",
        point: {
          events: {
            click: function () {
              handleBarClick(this.category);
            },
          },
        },
      },
      column: {
        stacking: "normal",
      },
      // series: {
      //   // cursor: "pointer",
      //   point: {
      //     events: {
      //       click: function () {
      //         console.log("Worked");
      //       },
      //     },
      //   },
      // },
      // column: {
      //   borderWidth: 0,
      // },
    },
    scrollbar: {
      enabled: true,
    },
    tooltip: {
      formatter: function () {
        return "" + this.series.name + ": " + Math.round(Math.pow(10, this.y));
      },
    },
    series: [
      {
        name: "Confirm Cases",
        data: barChartConfirmCases,
      },
      {
        name: "Death Cases",
        data: barChartDeaths,
      },
    ],
  };

  return (
    <>
      <Spin spinning={spining}>
        <div className="row mt-3">
          <div className="col-md-3 bar-div-height filters-left-div">
            <HighchartsReact
              highcharts={Highcharts}
              options={barChartoptions}
            />
          </div>
          <div className="col-md-6">
            <div className="mt-3">
              <div className="row">
                <div className="col-md-6">
                  <h5>{selectedCountry ? selectedCountry : "World Wide"}</h5>
                </div>
                <div className="col-md-6">
                  {selectedCountry && (
                    <Button
                      className="text-right"
                      type="link"
                      block
                      onClick={() => handleClear()}
                    >
                      Link
                    </Button>
                  )}
                </div>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Confirm Cases"
                      value={
                        selectedCountry
                          ? selectedCountryConfirmCases
                          : totalConfirmCases
                      }
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Confirm Deaths"
                      value={
                        selectedCountry
                          ? selectedCountryDeathCases
                          : totalDeathCases
                      }
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            ,
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"mapChart"}
              options={mapOptions}
            />
          </div>
          <div className="col-md-3 filters-div">
            <HighchartsReact
              highcharts={Highcharts}
              options={confirmNewOPtions}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={confirmDeathsOPtions}
            />
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Maps;
