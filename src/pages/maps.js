import Highcharts from "highcharts";
import React from "react";
import { Select } from "antd";
import { Statistic, Card, Row, Col } from "antd";
// import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { getWorld } from "../services/maps";
// import { getCovidCountries } from "../services/lookup";
const { Option } = Select;
// import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";

highchartsMap(Highcharts);
// var year = 2014;
const mapOptions = {
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
        name: "widget name one",
      },
      {
        from: 2,
        color: "#0200D0",
        name: "widget name two",
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
};

function Maps() {
  // const [countries, updateCountries] = React.useState([]);
  const barChartoptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Effected Countries Death/Confirm Cases",
    },
    xAxis: {
      categories: ["Pakistan", "India", "UK", "China", "USA"],
      // gridLineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Cases Ratio",
      },
      gridLineWidth: 0,
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Confirm Cases",
        data: [5, 3, 4, 7, 2],
      },
      {
        name: "Death Cases",
        data: [2, 2, 3, 2, 1],
      },
    ],
  };
  const confirmCasesAreaChart = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "Confirm Cases",
    },

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Confirm Cases",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "USD to EUR",
        data: [
          [1167609600000, 0.7537],
          [1167696000000, 0.7537],
          [1167782400000, 0.7559],
          [1167868800000, 0.7631],
          [1167955200000, 0.7644],
          [1168214400000, 0.769],
          [1168300800000, 0.7683],
          [1168387200000, 0.77],
          [1168473600000, 0.7703],
          [1168560000000, 0.7757],
          [1168819200000, 0.7728],
          [1168905600000, 0.7721],
          [1168992000000, 0.7748],
        ],
      },
    ],
  };

  const confirmDeathssAreaChart = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "Confirm Deaths",
    },

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Confirm Deaths",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: "USD to EUR",
        data: [
          [1167609600000, 0.7537],
          [1167696000000, 0.7537],
          [1167782400000, 0.7559],
          [1167868800000, 0.7631],
          [1167955200000, 0.7644],
          [1168214400000, 0.769],
          [1168300800000, 0.7683],
          [1168387200000, 0.77],
          [1168473600000, 0.7703],
          [1168560000000, 0.7757],
          [1168819200000, 0.7728],
          [1168905600000, 0.7721],
          [1168992000000, 0.7748],
        ],
      },
    ],
  };

  React.useEffect(() => {
    // async function fetchCountries() {
    //   const results = await getCovidCountries();
    //   updateCountries(results.countries);
    // }
    // fetchCountries();

    getWorld().then((r) => {
      mapOptions.series[0].data = []; //make sure data is empty before  fill
      mapOptions["chart"]["map"] = r.data; // set the map data of the graph (using the world graph)
      for (let i in r.data["features"]) {
        let mapInfo = r.data["features"][i];
        if (mapInfo["id"]) {
          var postalCode = mapInfo["id"];

          var name = mapInfo["properties"]["name"];
          var value = (i % 2) + 1;
          var type = value === 1 ? "widget name one" : "widget name two";
          var row = i;
          mapOptions.series[0].data.push({
            value: value,
            name: name,
            code: postalCode,
            row: row,
            type: type,
          });
        }
      }
      // updating the map options
    });
  }, []);

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-3 filters-left-div">
          <HighchartsReact highcharts={Highcharts} options={barChartoptions} />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <label className="mt-3">Pandemic:</label>
              <Select
                placeholder="Pandemic"
                style={{ width: 120 }}
                className="w-100"
                // onChange={handleChange}
              >
                <Option value="jack">COVID-19</Option>
                <Option value="lucy">Swine Flu</Option>
              </Select>
            </div>
            {/* <div className="col-md-6">
              <label className="mt-3">Effected Countries:</label>
              <Select
                placeholder="Country"
                style={{ width: 120 }}
                className="w-100"
                // onChange={handleChange}
              >
                {countries &&
                  countries.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
              </Select>
            </div> */}
          </div>
          <div className="mt-3">
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Confirm Cases"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Confirm Deaths"
                    value={9.3}
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
            options={confirmCasesAreaChart}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={confirmDeathssAreaChart}
          />
        </div>
      </div>
    </>
  );
}

export default Maps;
