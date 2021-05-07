// import Highcharts from "highcharts";
// import React from "react";
// import { Select } from "antd";
// import { Statistic, Card, Row, Col } from "antd";
// // import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import HighchartsReact from "highcharts-react-official";
// import highchartsMap from "highcharts/modules/map";
// import { getWorld } from "../services/maps";
// import { getBarStatistics } from "../services/maps";
// const { Option } = Select;
// // import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";

// highchartsMap(Highcharts);
// // var year = 2014;
// const mapOptions = {
//   title: {
//     text: "Widget click by location",
//     style: {
//       color: "#fff",
//     },
//   },
//   chart: {
//     backgroundColor: "transparent",
//     type: "map",
//     map: null,
//   },
//   mapNavigation: {
//     enabled: true,
//     enableButtons: false,
//   },
//   credits: {
//     enabled: false,
//   },
//   colorAxis: {
//     dataClasses: [
//       {
//         from: 1,
//         color: "#C40401",
//         name: "widget name one",
//       },
//       {
//         from: 2,
//         color: "#0200D0",
//         name: "widget name two",
//       },
//     ],
//   },
//   tooltip: {
//     pointFormatter: function () {
//       return this.name;
//     },
//   },
//   legend: {
//     align: "right",
//     verticalAlign: "top",
//     x: -100,
//     y: 70,
//     floating: true,
//     layout: "vertical",
//     valueDecimals: 0,
//     backgroundColor:
//       // theme
//       (Highcharts.defaultOptions &&
//         Highcharts.defaultOptions.legend &&
//         Highcharts.defaultOptions.legend.backgroundColor) ||
//       "rgba(255, 255, 255, 0.85)",
//   },
//   series: [
//     {
//       name: "world map",
//       dataLabels: {
//         enabled: true,
//         color: "#FFFFFF",
//         format: "{point.postal-code}",
//         style: {
//           textTransform: "uppercase",
//         },
//       },
//       tooltip: {
//         ySuffix: " %",
//       },
//       cursor: "pointer",
//       joinBy: ["iso-a2", "code"],
//       data: [],
//       point: {
//         events: {
//           click: function (r) {
//             console.log("click - to open popup as 2nd step");
//             console.log(r);
//           },
//         },
//       },
//     },
//   ],
// };

// function Maps() {
//   const [barStats, updateBarStats] = React.useState([]);

//   const confirmCasesAreaChart = {
//     chart: {
//       zoomType: "x",
//     },
//     title: {
//       text: "Confirm Cases",
//     },

//     xAxis: {
//       type: "datetime",
//     },
//     yAxis: {
//       title: {
//         text: "Confirm Cases",
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       area: {
//         fillColor: {
//           linearGradient: {
//             x1: 0,
//             y1: 0,
//             x2: 0,
//             y2: 1,
//           },
//           stops: [
//             [0, Highcharts.getOptions().colors[0]],
//             [
//               1,
//               Highcharts.color(Highcharts.getOptions().colors[0])
//                 .setOpacity(0)
//                 .get("rgba"),
//             ],
//           ],
//         },
//         marker: {
//           radius: 2,
//         },
//         lineWidth: 1,
//         states: {
//           hover: {
//             lineWidth: 1,
//           },
//         },
//         threshold: null,
//       },
//     },

//     series: [
//       {
//         type: "area",
//         name: "USD to EUR",
//         data: [
//           [1167609600000, 0.7537],
//           [1167696000000, 0.7537],
//           [1167782400000, 0.7559],
//           [1167868800000, 0.7631],
//           [1167955200000, 0.7644],
//           [1168214400000, 0.769],
//           [1168300800000, 0.7683],
//           [1168387200000, 0.77],
//           [1168473600000, 0.7703],
//           [1168560000000, 0.7757],
//           [1168819200000, 0.7728],
//           [1168905600000, 0.7721],
//           [1168992000000, 0.7748],
//         ],
//       },
//     ],
//   };

//   const confirmDeathssAreaChart = {
//     chart: {
//       zoomType: "x",
//     },
//     title: {
//       text: "Confirm Deaths",
//     },

//     xAxis: {
//       type: "datetime",
//     },
//     yAxis: {
//       title: {
//         text: "Confirm Deaths",
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       area: {
//         fillColor: {
//           linearGradient: {
//             x1: 0,
//             y1: 0,
//             x2: 0,
//             y2: 1,
//           },
//           stops: [
//             [0, Highcharts.getOptions().colors[0]],
//             [
//               1,
//               Highcharts.color(Highcharts.getOptions().colors[0])
//                 .setOpacity(0)
//                 .get("rgba"),
//             ],
//           ],
//         },
//         marker: {
//           radius: 2,
//         },
//         lineWidth: 1,
//         states: {
//           hover: {
//             lineWidth: 1,
//           },
//         },
//         threshold: null,
//       },
//     },

//     series: [
//       {
//         type: "area",
//         name: "USD to EUR",
//         data: [
//           [1167609600000, 0.7537],
//           [1167696000000, 0.7537],
//           [1167782400000, 0.7559],
//           [1167868800000, 0.7631],
//           [1167955200000, 0.7644],
//           [1168214400000, 0.769],
//           [1168300800000, 0.7683],
//           [1168387200000, 0.77],
//           [1168473600000, 0.7703],
//           [1168560000000, 0.7757],
//           [1168819200000, 0.7728],
//           [1168905600000, 0.7721],
//           [1168992000000, 0.7748],
//         ],
//       },
//     ],
//   };

//   React.useEffect(() => {
//     async function fetchCountries() {
//       const results = await getBarStatistics();
//       updateBarStats(results.barStats);
//     }
//     fetchCountries();

//     getWorld().then((r) => {
//       mapOptions.series[0].data = []; //make sure data is empty before  fill
//       mapOptions["chart"]["map"] = r.data; // set the map data of the graph (using the world graph)
//       for (let i in r.data["features"]) {
//         let mapInfo = r.data["features"][i];
//         if (mapInfo["id"]) {
//           var postalCode = mapInfo["id"];

//           var name = mapInfo["properties"]["name"];
//           var value = (i % 2) + 1;
//           var type = value === 1 ? "widget name one" : "widget name two";
//           var row = i;
//           mapOptions.series[0].data.push({
//             value: value,
//             name: name,
//             code: postalCode,
//             row: row,
//             type: type,
//           });
//         }
//       }
//       // updating the map options
//     });
//   }, []);
//   const barChartCountriies = [];
//   const barChartConfirmCases = [];
//   const barChartDeaths = [];
//   barStats.forEach((item) => {
//     barChartCountriies.push(item.Country);
//     barChartConfirmCases.push(Math.log10(item.ConfirmCases));
//     barChartDeaths.push(Math.log10(item.ConfirmDeaths));
//   });
//   const barChartoptions = {
//     chart: {
//       type: "bar",
//       height: 4500,
//       // width: 5000,
//     },
//     title: {
//       text: "Effected Countries Death/Confirm Cases",
//     },
//     xAxis: {
//       categories: barChartCountriies,
//       // min: 0,
//       // scrollbar: {
//       //   enabled: true,
//       // },
//       min: 0,
//       // max: 4,
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: "Total Cases Ratio",
//       },
//       gridLineWidth: 0,
//       pointInterval: 1000,
//     },
//     legend: {
//       reversed: true,
//       // y: 100,
//       // x: 100,
//     },
//     plotOptions: {
//       series: {
//         stacking: "normal",
//       },
//       column: { borderWidth: 0 },
//     },
//     // scrollbar: {
//     //   enabled: true,
//     // },
//     series: [
//       {
//         name: "Confirm Cases",
//         data: barChartConfirmCases,
//       },
//       {
//         name: "Death Cases",
//         data: barChartDeaths,
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="row mt-3">
//         <div className="col-md-3 filters-left-div">
//           <HighchartsReact highcharts={Highcharts} options={barChartoptions} />
//         </div>
//         <div className="col-md-6">
//           <div className="row">
//             <div className="col-md-12">
//               <label className="mt-3">Pandemic:</label>
//               <Select
//                 placeholder="Pandemic"
//                 style={{ width: 120 }}
//                 className="w-100"
//                 // onChange={handleChange}
//               >
//                 <Option value="jack">COVID-19</Option>
//                 <Option value="lucy">Swine Flu</Option>
//               </Select>
//             </div>
//             {/* <div className="col-md-6">
//               <label className="mt-3">Effected Countries:</label>
//               <Select
//                 placeholder="Country"
//                 style={{ width: 120 }}
//                 className="w-100"
//                 // onChange={handleChange}
//               >
//                 {countries &&
//                   countries.map((c) => (
//                     <Option key={c} value={c}>
//                       {c}
//                     </Option>
//                   ))}
//               </Select>
//             </div> */}
//           </div>
//           <div className="mt-3">
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Card>
//                   <Statistic
//                     title="Confirm Cases"
//                     value={11.28}
//                     precision={2}
//                     valueStyle={{ color: "#3f8600" }}
//                   />
//                 </Card>
//               </Col>
//               <Col span={12}>
//                 <Card>
//                   <Statistic
//                     title="Confirm Deaths"
//                     value={9.3}
//                     precision={2}
//                     valueStyle={{ color: "#cf1322" }}
//                   />
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//           ,
//           <HighchartsReact
//             highcharts={Highcharts}
//             constructorType={"mapChart"}
//             options={mapOptions}
//           />
//         </div>
//         <div className="col-md-3 filters-div">
//           <HighchartsReact
//             highcharts={Highcharts}
//             options={confirmCasesAreaChart}
//           />
//           <HighchartsReact
//             highcharts={Highcharts}
//             options={confirmDeathssAreaChart}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Maps;

import Highcharts from "highcharts";
import React from "react";
// import { Select } from "antd";
import { cloneDeep, find as _find } from "lodash";
import { Statistic, Card, Row, Col } from "antd";
// import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { getWorld } from "../services/maps";
import {
  getBarStatistics,
  getConfirmTimeSeriesStatistics,
  getDeathTimeSeriesStatistics,
} from "../services/maps";

// const { Option } = Select;
// import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";

highchartsMap(Highcharts);
// var year = 2014;
// const mapOptions1 = {
//   title: {
//     text: "Widget click by location",
//     style: {
//       color: "#fff",
//     },
//   },
//   chart: {
//     backgroundColor: "transparent",
//     type: "map",
//     map: null,
//   },
//   mapNavigation: {
//     enabled: true,
//     enableButtons: false,
//   },
//   credits: {
//     enabled: false,
//   },
//   colorAxis: {
//     dataClasses: [
//       {
//         from: 1,
//         color: "#C40401",
//         name: "widget name one",
//       },
//       {
//         from: 2,
//         color: "#0200D0",
//         name: "widget name two",
//       },
//     ],
//   },
//   tooltip: {
//     pointFormatter: function () {
//       return this.name;
//     },
//   },
//   legend: {
//     align: "right",
//     verticalAlign: "top",
//     x: -100,
//     y: 70,
//     floating: true,
//     layout: "vertical",
//     valueDecimals: 0,
//     backgroundColor:
//       // theme
//       (Highcharts.defaultOptions &&
//         Highcharts.defaultOptions.legend &&
//         Highcharts.defaultOptions.legend.backgroundColor) ||
//       "rgba(255, 255, 255, 0.85)",
//   },
//   series: [
//     {
//       name: "world map",
//       dataLabels: {
//         enabled: true,
//         color: "#FFFFFF",
//         format: "{point.postal-code}",
//         style: {
//           textTransform: "uppercase",
//         },
//       },
//       tooltip: {
//         ySuffix: " %",
//       },
//       cursor: "pointer",
//       joinBy: ["iso-a2", "code"],
//       data: [],
//       point: {
//         events: {
//           click: function (r) {
//             console.log("click - to open popup as 2nd step");
//             console.log(r);
//           },
//         },
//       },
//     },
//   ],
// };

function Maps() {
  const [barStats, updateBarStats] = React.useState([]);
  const [confirmTimeSeries, updateConfirmSeries] = React.useState([]);
  const [deathTimeSeries, updateDeathSeries] = React.useState([]);
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
          color: "#0200D0",
          name: "Non-Effected",
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
      },
    ],
  });

  React.useEffect(() => {
    (async () => {
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
              const value = country.ConfirmCases > 0 ? 1 : 0;
              var type = value === 1 ? "COVID-19 Effected" : "Non-Effected";
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
        setMapOptions(options);
      });
    })();
    // getWorld().then((r) => {
    //   const options = cloneDeep(mapOptions);
    //   options.series[0].data = [];
    //   options["chart"]["map"] = r.data;
    //   for (let i in r.data["features"]) {
    //     let mapInfo = r.data["features"][i];
    //     if (mapInfo["id"]) {
    //       var postalCode = mapInfo["id"];
    //       var name = mapInfo["properties"]["name"];
    //       var value = (i % 2) + 1;
    //       var type = value === 1 ? "COVID-19 Effected" : "Non-Effected";
    //       var row = i;
    //       options.series[0].data.push({
    //         value: value,
    //         name: name,
    //         code: postalCode,
    //         row: row,
    //         type: type,
    //       });
    //     }
    //   }
    //   setMapOptions(options);
    // });
  }, []);

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

  const barChartCountriies = [];
  const barChartConfirmCases = [];
  const barChartDeaths = [];
  let totalConfirmCases = 0;
  let totalDeathCases = 0;
  barStats.forEach((item) => {
    totalConfirmCases += item.ConfirmCases;
    totalDeathCases += item.ConfirmDeaths;
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
      series: {
        stacking: "normal",
      },
      column: { borderWidth: 0 },
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
      <div className="row mt-3">
        <div className="col-md-3 bar-div-height filters-left-div">
          <HighchartsReact highcharts={Highcharts} options={barChartoptions} />
        </div>
        <div className="col-md-6">
          <div className="mt-3">
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Confirm Cases"
                    value={totalConfirmCases}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Confirm Deaths"
                    value={totalDeathCases}
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
    </>
  );
}

export default Maps;
