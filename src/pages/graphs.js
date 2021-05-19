import { Select } from "antd";
import React from "react";
// import { Tabs } from "antd";
// import Tables from "./statistics-brief/tables";
// import PandemicGraphs from "./statistics-brief/pandemicGraphs";
import Highcharts, { map } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getCovidCountries } from "../services/lookup";
import { getCombineGraphData } from "../services/graphs";
import { Spin } from "antd";
// const { TabPane } = Tabs;
const { Option } = Select;
const getGraphOptions = (combinedGraph) => {
  const x_categories = [];
  const confirmCases = [];
  const deaths = [];
  combinedGraph.forEach((item) => {
    x_categories.push(`0${item.month} - ${item.Year}`);
    confirmCases.push(item.Cases);
    deaths.push(item.Deaths);
  });
  return {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "Average Monthly Temperature and Rainfall in Tokyo",
    },
    subtitle: {
      text: "Source: WorldClimate.com",
    },
    xAxis: [
      {
        categories: x_categories,
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        title: {
          text: "Deaths",
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
      },
      {
        // Secondary yAxis
        title: {
          text: "Confirm Cases",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: "{value}",
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "Confirm Cases",
        type: "column",
        yAxis: 1,
        data: confirmCases,
        // tooltip: {
        //   valueSuffix: " mm",
        // },
      },
      {
        name: "Deaths",
        type: "spline",
        data: deaths,
        // tooltip: {
        //   valueSuffix: "°C",
        // },
      },
    ],
  };
};
const getConfirmCasesOptions = (combinedGraph, type) => {
  const seriesValues = [];
  if (type === 1) {
    combinedGraph.forEach((item) => {
      seriesValues.push(item.Cases);
    });
    return {
      chart: {
        type: "spline",
      },
      title: {
        text: "Confirm Cases",
      },
      series: [
        {
          data: seriesValues,
        },
      ],
    };
  } else if (type === 2) {
    combinedGraph.forEach((item) => {
      seriesValues.push(item.Deaths);
    });
    return {
      chart: {
        type: "spline",
      },
      title: {
        text: "Death Cases",
      },
      series: [
        {
          data: seriesValues,
        },
      ],
    };
  }
};
function Graphs() {
  let combineGraphOptions = {};
  const [effectedCountries, updateEffectedCountries] = React.useState([]);
  const [combinedGraph, updateCombineGraphs] = React.useState([]);
  const [spining, updateSpinner] = React.useState(true);
  const handleChange = async (value) => {
    updateSpinner(true);
    const options = {
      country: value,
    };
    const response = await getCombineGraphData(options);
    updateCombineGraphs(response.combineGraph);
    updateSpinner(false);
  };

  React.useEffect(() => {
    (async () => {
      await getCovidCountries().then(async (response) => {
        updateEffectedCountries(response.countries);
        await getCombineGraphData({ country: response.countries[0] }).then(
          (combinedGraphResponse) => {
            updateCombineGraphs(combinedGraphResponse.combineGraph);
            updateSpinner(false);
          }
        );
      });
    })();
  }, []);
  // console.log(combinedGraph);

  const combineGraph = getGraphOptions(combinedGraph);
  const ConfirmCasesOptions = getConfirmCasesOptions(combinedGraph, 1);
  const DeathCasesOptions = getConfirmCasesOptions(combinedGraph, 2);
  return (
    <>
      <Spin spinning={spining}>
        <div className="row row-margin-remove mt-4 h-100">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={combineGraph}
                />
              </div>
              <div className="col-md-5">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={ConfirmCasesOptions}
                />
              </div>
              <div className="col-md-5">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={DeathCasesOptions}
                />
              </div>
              {/* <div className="col-md-5">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
              <div className="col-md-5">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div> */}
            </div>
          </div>
          <div className="col-md-3 filters-div">
            <h4>Filters:</h4>
            <label className="mt-3">Effected Countries:</label>
            <Select
              placeholder="Select Country"
              style={{ width: 120 }}
              className="w-100"
              onChange={handleChange}
              showSearch
              value={effectedCountries[0]}
            >
              {effectedCountries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
            <div className="row row-margin-remove mt-3">
              <div className="col-md-6 pl-1 pr-1">
                <label>From Date:</label>
                <Select
                  placeholder="Start Date"
                  style={{ width: 120 }}
                  className="w-100"
                  // onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>

              <div className="col-md-6 pl-1 pr-1">
                <label>To Date:</label>
                <Select
                  placeholder="Start Date"
                  style={{ width: 120 }}
                  className="w-100"
                  // onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Graphs;
