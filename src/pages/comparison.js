import React from "react";
import { Select } from "antd";
import { Tabs, Spin } from "antd";
import Tables from "./statistics-brief/tables";
import PandemicGraphs from "./statistics-brief/pandemicGraphs";
import {
  getSwineCountries,
  getEbolaCountries,
  getSARSCountries,
  get100DaysData,
  get100DeathsDaysData,
} from "../services/comparison-pandemics";
import { getCovidCountries } from "../services/lookup";
const { TabPane } = Tabs;
const { Option } = Select;
const get_donut_chart = (
  covid_length,
  swine_length,
  ebola_length,
  sars_length
) => {
  return [
    { name: "COVID-19", y: covid_length },
    { name: "H1N1-Swine 2009", y: swine_length },
    { name: "Ebola 2014", y: ebola_length },
    { name: "SARS 2003", y: sars_length },
  ];
};
function Comparison() {
  const [spining, updateSpinner] = React.useState(true);
  const [covidCountries, updateCovidCountries] = React.useState([]);
  const [swineCountries, updateSwineCountries] = React.useState([]);
  const [ebolaCountries, updateEbolaCountries] = React.useState([]);
  const [sarsCountries, updateSARSCountries] = React.useState([]);
  const [start100Days, update100DaysResult] = React.useState([]);
  const [start100DaysDeaths, update100DaysDeathsResult] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      // updateSpinner(true);
      await Promise.all([
        getCovidCountries(),
        getSwineCountries(),
        getEbolaCountries(),
        getSARSCountries(),
        get100DaysData(),
        get100DeathsDaysData(),
      ]).then((values) => {
        updateCovidCountries(values[0].countries);
        updateSwineCountries(values[1].swine_countries);
        updateEbolaCountries(values[2].ebolaentry_countries);
        updateSARSCountries(values[3].sars_countries);
        update100DaysResult(values[4]["100_days_Result"]);
        update100DaysDeathsResult(values[5]["100_days_deaths_Result"]);
        updateSpinner(false);
      });
    })();
  }, []);
  const donut_data = get_donut_chart(
    covidCountries.length,
    swineCountries.length,
    ebolaCountries.length,
    sarsCountries.length
  );
  return (
    <>
      <Spin spinning={spining}>
        <div className="row row-margin-remove mt-4 h-100">
          <div className="col-md-12">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Tables" key="1">
                <Tables
                  donut_data={donut_data}
                  start100Days={start100Days}
                  start100DaysDeaths={start100DaysDeaths}
                />
              </TabPane>
              <TabPane tab="Graphs" key="2">
                <PandemicGraphs
                  donut_data={donut_data}
                  start100Days={start100Days}
                  start100DaysDeaths={start100DaysDeaths}
                />
              </TabPane>
            </Tabs>
          </div>
          {/* <div className="col-md-3 filters-div">
          <h4>Filters:</h4>
          <label>Pandemic:</label>
          <Select
            placeholder="Select......"
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

          <label className="mt-3">Effected Countries:</label>
          <Select
            placeholder="Select Country"
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
        </div> */}
        </div>
      </Spin>
    </>
  );
}

export default Comparison;
