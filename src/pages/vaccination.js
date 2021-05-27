import { Tabs, Select, Card, Statistic } from "antd";
import React from "react";
import Highcharts, { map } from "highcharts";
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import { find as _find } from "lodash";
import moment from "moment";
import {
  getVaccineCountries,
  getVaccineCountryData,
  getVaccineCountryValues,
} from "../services/vaccine";
import mapData from "../assets/mapData";
highchartsMap(Highcharts);
const { TabPane } = Tabs;
const { Option } = Select;

const getOptions = (chartArray) => {
  return {
    chart: {
      renderTo: "container",

      zoomType: "x",
    },

    title: {
      text: "Total Vaccinations",
    },

    xAxis: {
      type: "datetime",

      maxZoom: 14 * 24 * 3600000, // fourteen days

      title: {
        text: null,
      },
    },

    yAxis: {
      title: {
        text: "Daily Vaccinations",
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
        name: "Vaccinations",
        pointInterval: 24 * 3600 * 1000,
        pointStart: Date.UTC(2021, 1, 22),
        data: chartArray,
      },
    ],
  };
};

const getMapOptions = (mapDataDB) => {
  // console.log(mapDataDB);
  return {
    title: {
      text: "",
    },
    colors: ["rgba(19,64,117,0.5)", "rgba(19,64,117,0.6)"],
    colorAxis: {
      dataClasses: [
        {
          from: 0,
          name: "Low Vaccines",
          color: "#FF0000",
          to: 100000,
        },
        {
          from: 100000,
          name: "Average Vaccines",
          color: "#ffd700",
          to: 9999999,
        },

        {
          from: 10000000,
          name: "High Vaccines",
          color: "#008000",
          // to: 1000000,
        },
      ],
    },

    series: [
      {
        mapData: mapData,
        name: "World Map",
        data: mapDataDB,
      },
    ],
  };
};
function Vaccination() {
  const [vaccineCountries, updateVaccineCountries] = React.useState([]);
  const [vaccineData, updateVaccineData] = React.useState([]);
  const [chartData, updateVaccineChartData] = React.useState([]);
  const [options, updateOptions] = React.useState({ country: "Afghanistan" });
  const [totalVaccinations, updateTotalVaccinations] = React.useState({
    country: "Afghanistan",
  });
  const [allCountriesData, updateAllCountries] = React.useState([]);
  // const [mapDataDB, updateMapData] = React.useState([]);
  const [mapsOptions, updateMapOptions] = React.useState({});
  React.useEffect(() => {
    (async () => {
      await getVaccineCountries().then(async (response) => {
        const all_countries = await getVaccineCountryValues();

        updateAllCountries(all_countries["countries-vaccines"]);
        const first_country_data = await getVaccineCountryData({
          location: response.countries[0],
        });
        const foundCountries = [];
        mapData.features.forEach((item) => {
          all_countries["countries-vaccines"].forEach((vc) => {
            if (vc.iso_code === item.properties["iso-a3"]) {
              vc.countryId = item.id;
              const temp = [];
              temp.push(item.id.toLowerCase());
              temp.push(vc.vaccines);
              console.log(temp);
              foundCountries.push(temp);
            }
          });
        });
        // console.log(foundCountries);
        const mapOptions = getMapOptions(foundCountries);

        updateMapOptions(mapOptions);
        // updateMapData(foundCountries);
        const chartArray = [];
        let totalVaccinationsTemp = 0;
        first_country_data.TImeSeriesVacc.forEach((item) => {
          item.timeStamp = Number(moment(item.date).format("X"));
          chartArray.push(item.vaccines);
          totalVaccinationsTemp += item.vaccines;
        });
        updateVaccineCountries(response.countries);
        updateVaccineData(first_country_data.TImeSeriesVacc);
        updateTotalVaccinations(totalVaccinationsTemp);
        updateVaccineChartData(chartArray);
      });
    })();
  }, []);

  // console.log(mapsOptions);

  const handleChange = async (value) => {
    options.country = value;
    const country_data = await getVaccineCountryData({
      location: value,
    });
    const chartArray = [];
    let totalVaccinationsTemp = 0;
    country_data.TImeSeriesVacc.forEach((item) => {
      item.timeStamp = Number(moment(item.date).format("X"));
      chartArray.push(item.vaccines);
      totalVaccinationsTemp += item.vaccines;
    });
    updateVaccineData(country_data.TImeSeriesVacc);
    updateTotalVaccinations(totalVaccinationsTemp);
    updateVaccineChartData(chartArray);
  };
  const timeOptions = getOptions(chartData);
  return (
    <>
      <div className="row row-margin-remove mt-4 h-100">
        <div className="col-md-12">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Global" key="1">
              <div>
                <HighchartsReact
                  options={mapsOptions}
                  constructorType={"mapChart"}
                  highcharts={Highcharts}
                />
              </div>
            </TabPane>
            <TabPane tab="Country" key="2">
              <div className="row pb-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <Select
                    placeholder="Select Country"
                    style={{ width: 120 }}
                    className="w-100"
                    onChange={handleChange}
                    showSearch
                    value={options.country}
                  >
                    {vaccineCountries.map((country) => (
                      <Option key={country} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-12 mt-1">
                  <Card>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="vacc-div">
                          <h5>{options.country}</h5>
                          <p>
                            Total Number of Vaccinations from 22-02-2021 to
                            26-04-2021 is{" "}
                            <b className="vacc-color">{totalVaccinations}</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={timeOptions}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Vaccination;
