import { Select, Card, Divider, Statistic } from "antd";
import React from "react";
import Highcharts, { map } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getCountriesComparisonResults } from "../services/comparison-countries";
import { getCovidCountries } from "../services/lookup";
import { Spin } from "antd";
import { groupBy as _groupBy, uniqBy as _uniqBy } from "lodash";
import { DatePicker } from "antd";
const { Option } = Select;
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const getLineCompareGraph = (data, type) => {
  const groupedData = _groupBy(data, "Country");
  const x_categories = [];
  const seriesData = [];
  let title = "";
  if (type === 1) {
    for (var key of Object.keys(groupedData)) {
      const keyyArray = [];
      groupedData[key].forEach((item) => {
        keyyArray.push(item.Cases);
        x_categories.push(`0${item.month} - ${item.Year}`);
      });
      seriesData.push({
        name: key,
        data: keyyArray,
      });
    }
    title = "Confirm Cases";
  } else {
    for (var key of Object.keys(groupedData)) {
      const keyyArray = [];
      groupedData[key].forEach((item) => {
        keyyArray.push(item.Deaths);
        x_categories.push(`0${item.month} - ${item.Year}`);
      });
      seriesData.push({
        name: key,
        data: keyyArray,
      });
    }
    title = "Deaths";
  }

  return {
    title: {
      text: title,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    xAxis: {
      categories: x_categories,
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
    },
    tooltip: {
      split: true,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },

    series: seriesData,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
};
function CountriesComparison() {
  const [effectedCountries, updateEffectedCountries] = React.useState([]);
  const [comparedCountriesData, updateComparedCountriesData] = React.useState(
    []
  );
  const [options, updateOptions] = React.useState({
    country1: "Afghanistan",
    country2: "Albania",
  });
  const [optionsSelected, setOptionsSelected] = React.useState([]);
  const handleMultiSelectChange = async (value) => {
    setOptionsSelected(value);
    if (value.length === 2) {
      options.country1 = value[0];
      options.country2 = value[1];
      await getCountriesComparisonResults({
        country1: value[0],
        country2: value[1],
      }).then((compareGraphResponse) => {
        updateComparedCountriesData(compareGraphResponse["comparison-result"]);
        //   updateSpinner(false);
      });
    }
  };

  const handleStartDate = async (value) => {
    // updateSpinner(true);
    if (value) {
      options.start_date = value.toISOString().slice(0, 10);
    } else {
      delete options["start_date"];
    }

    const response = await getCountriesComparisonResults(options);
    updateComparedCountriesData(response["comparison-result"]);
    updateOptions(options);
    // updateSpinner(false);
  };

  const handleEndDate = async (value) => {
    // updateSpinner(true);
    if (value) {
      options.end_date = value.toISOString().slice(0, 10);
    } else {
      delete options["end_date"];
    }

    const response = await getCountriesComparisonResults(options);
    updateComparedCountriesData(response["comparison-result"]);
    updateOptions(options);
    // updateSpinner(false);
  };
  React.useEffect(() => {
    (async () => {
      await getCovidCountries().then(async (response) => {
        updateEffectedCountries(response.countries);
        await getCountriesComparisonResults({
          country1: response.countries[0],
          country2: response.countries[1],
        }).then((compareGraphResponse) => {
          updateComparedCountriesData(
            compareGraphResponse["comparison-result"]
          );
          //   updateSpinner(false);
        });
      });
    })();
  }, []);
  const comparisonConfirmGraph = getLineCompareGraph(comparedCountriesData, 1);
  const comparisonDeathsGraph = getLineCompareGraph(comparedCountriesData, 2);
  let firstCountry = "";
  let deathSum1 = 0;
  let confirmSum1 = 0;
  let secondCountry = "";
  let deathSum2 = 0;
  let confirmSum2 = 0;
  if (comparisonDeathsGraph.series.length > 0) {
    firstCountry = comparisonDeathsGraph.series[0].name;
    deathSum1 =
      comparisonDeathsGraph.series[0].data[
        comparisonDeathsGraph.series[0].data.length - 1
      ];
    confirmSum1 =
      comparisonConfirmGraph.series[0].data[
        comparisonConfirmGraph.series[0].data.length - 1
      ];
    //   comparisonDeathsGraph.series[0].data.forEach((item) => (deathSum1 += item));
    //   comparisonConfirmGraph.series[0].data.forEach((item) => (deathSum1 += item));
    secondCountry = comparisonDeathsGraph.series[1].name;
    deathSum2 =
      comparisonDeathsGraph.series[1].data[
        comparisonDeathsGraph.series[1].data.length - 1
      ];
    confirmSum2 =
      comparisonConfirmGraph.series[1].data[
        comparisonConfirmGraph.series[1].data.length - 1
      ];
    //   comparisonDeathsGraph.series[1].data.forEach((item) => (deathSum2 += item));
  }
  return (
    <>
      <Spin spinning={false}>
        <div className="row row-margin-remove mt-4 h-100">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-12 mt-5">
                <Card title="Total Confirm Cases">
                  <div className="row">
                    <div className="col-md-8">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={comparisonConfirmGraph}
                      />
                    </div>
                    <Divider type="vertical" />
                    <div className="col-md-3">
                      <Card>
                        <Statistic
                          title={firstCountry}
                          value={confirmSum1}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                        />
                      </Card>
                      <Card className="mt-5">
                        <Statistic
                          title={secondCountry}
                          value={confirmSum2}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                        />
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-md-12 mt-5">
                <Card title="Total Deaths Cases">
                  <div className="row">
                    <div className="col-md-8">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={comparisonDeathsGraph}
                      />
                    </div>
                    <Divider type="vertical" style={{ height: "100%" }} />
                    <div className="col-md-3">
                      <Card>
                        <Statistic
                          title={firstCountry}
                          value={deathSum1}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                        />
                      </Card>
                      <Card className="mt-5">
                        <Statistic
                          title={secondCountry}
                          value={deathSum2}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                        />
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-md-3 filters-div">
            <h4>Filters:</h4>
            <label className="mt-3">Effected Countries:</label>
            <Select
              placeholder="Select Country"
              style={{ width: 120 }}
              className="w-100"
              mode="multiple"
              onChange={handleMultiSelectChange}
              showSearch
            >
              {effectedCountries.map((country) => (
                <Option
                  key={country}
                  value={country}
                  disabled={
                    optionsSelected.length > 1
                      ? optionsSelected.includes(country)
                        ? false
                        : true
                      : false
                  }
                >
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

export default CountriesComparison;
