import { Select, Tabs } from "antd";
import React from "react";
import Highcharts, { map } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getCovidCountries } from "../services/lookup";
import { getCombineGraphData } from "../services/graphs";
import { getDailyTimeSeriesConfirmedChartValues } from "../services/daily-time-series";
import CountryDaily from "./country-daily";
import SinglePartial from "./partials/single";
import { Spin } from "antd";
import { DatePicker } from "antd";
const { Option } = Select;
const { TabPane } = Tabs;

const getGraphOptions = (combinedGraph, type) => {
  const x_categories = [];
  const confirmCases = [];
  const deaths = [];
  combinedGraph.forEach((item) => {
    x_categories.push(`0${item.month} - ${item.Year}`);
    confirmCases.push(item.Cases);
    deaths.push(item.Deaths);
  });
  let graphOptions = {};

  graphOptions = {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "Confirm Cases Vs Death Cases",
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

  return graphOptions;
};
const prepareData = (combinedGraph) => {
  const x_categories = [];
  const confirmCases = [];
  const deaths = [];
  combinedGraph.forEach((item) => {
    x_categories.push(`0${item.month} - ${item.Year}`);
    confirmCases.push(item.Cases);
    deaths.push(item.Deaths);
  });
  return { deaths: deaths, confirmCases: confirmCases, x_categories };
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
  const [options, updateOptions] = React.useState({ country: "Afghanistan" });
  const [confirmSeries, updateConfirmSeries] = React.useState([]);
  const [deathSeries, updateDeathSeries] = React.useState([]);
  const [type, updateType] = React.useState(1);
  const handleChange = async (value) => {
    updateSpinner(true);
    options.country = value;
    const response = await getCombineGraphData(options);
    const timeSeries = await getDailyTimeSeriesConfirmedChartValues({
      location: options.country,
    });
    updateCombineGraphs(response.combineGraph);
    updateConfirmSeries(timeSeries.TImeSeriesChart);
    updateDeathSeries(timeSeries.TimeSeriesDeaths);
    updateOptions(options);
    updateSpinner(false);
  };

  const handleType = (value) => {
    updateType(value);
  };

  const handleStartDate = async (value) => {
    updateSpinner(true);
    options.start_date = value.toISOString().slice(0, 10);
    const response = await getCombineGraphData(options);
    updateCombineGraphs(response.combineGraph);
    updateOptions(options);
    updateSpinner(false);
  };

  const handleEndDate = async (value) => {
    updateSpinner(true);
    options.end_date = value.toISOString().slice(0, 10);
    const response = await getCombineGraphData(options);
    updateCombineGraphs(response.combineGraph);
    updateOptions(options);
    updateSpinner(false);
  };

  React.useEffect(() => {
    (async () => {
      await getCovidCountries().then(async (response) => {
        updateEffectedCountries(response.countries);
        await getCombineGraphData({ country: response.countries[0] }).then(
          (combinedGraphResponse) => {
            updateCombineGraphs(combinedGraphResponse.combineGraph);
            // updateSpinner(false);
          }
        );
        await getDailyTimeSeriesConfirmedChartValues({
          location: response.countries[0],
        }).then((timeSeries) => {
          updateConfirmSeries(timeSeries.TImeSeriesChart);
          updateDeathSeries(timeSeries.TimeSeriesDeaths);
          updateSpinner(false);
        });
      });
    })();
  }, []);

  const combineGraph = getGraphOptions(combinedGraph);
  const preparedData = prepareData(combinedGraph);
  const ConfirmCasesOptions = getConfirmCasesOptions(combinedGraph, 1);
  const DeathCasesOptions = getConfirmCasesOptions(combinedGraph, 2);
  return (
    <>
      <Spin spinning={spining}>
        <div className="row row-margin-remove mt-4 h-100">
          <div className="col-md-12 mt-3 pl-5">
            <h4>{options.country} COVID Statistics</h4>
          </div>
          <div className="col-md-9">
            <Tabs defaultActiveKey="1" /* onChange={callback} */>
              <TabPane tab="Commulative" key="1">
                <div className="row">
                  <div className="col-md-12 mt-5">
                    {type === 1 || type === 2 ? (
                      <SinglePartial preparedData={preparedData} type={type} />
                    ) : (
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={combineGraph}
                      />
                    )}
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
                </div>
              </TabPane>
              <TabPane tab="Daily" key="2">
                <CountryDaily
                  options={options}
                  confirmSeries={confirmSeries}
                  deathSeries={deathSeries}
                />
              </TabPane>
            </Tabs>
          </div>
          <div className="col-md-3 filters-div">
            <h4>Filters:</h4>
            {/* <label className="mt-3">Effected Countries:</label> */}
            <Select
              placeholder="Select Type"
              style={{ width: 120 }}
              className="w-100"
              onChange={handleType}
              showSearch
              value={type}
            >
              <Option key={"1"} value={1}>
                Confirm Cases
              </Option>
              <Option key={"2"} value={2}>
                Confirm Deaths
              </Option>
              <Option key={"3"} value={3}>
                Confirm Cases and Deaths
              </Option>
            </Select>
            <label className="mt-3">Effected Countries:</label>
            <Select
              placeholder="Select Country"
              style={{ width: 120 }}
              className="w-100"
              onChange={handleChange}
              showSearch
              value={options.country}
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
                <DatePicker onChange={handleStartDate} />
              </div>

              <div className="col-md-6 pl-1 pr-1">
                <label>To Date:</label>
                <DatePicker onChange={handleEndDate} />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Graphs;
