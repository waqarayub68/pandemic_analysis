import { Select } from "antd";
// import { Tabs } from "antd";
// import Tables from "./statistics-brief/tables";
// import PandemicGraphs from "./statistics-brief/pandemicGraphs";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// const { TabPane } = Tabs;
const { Option } = Select;
function Graphs() {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "My chart",
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6],
      },
    ],
  };
  return (
    <>
      <div className="row row-margin-remove mt-4 h-100">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-5">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="col-md-5">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="col-md-5">
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="col-md-5">
              <HighchartsReact highcharts={Highcharts} options={options} />
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
        </div>
      </div>
    </>
  );
}

export default Graphs;
