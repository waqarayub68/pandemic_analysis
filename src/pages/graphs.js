import { Select } from "antd";
import { Tabs } from "antd";
import Tables from "./statistics-brief/tables";
import PandemicGraphs from "./statistics-brief/pandemicGraphs";
const { TabPane } = Tabs;
const { Option } = Select;
function Graphs() {
  return (
    <>
      <div className="row row-margin-remove mt-4 h-100">
        <div className="col-md-9">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tables" key="1">
              <Tables />
            </TabPane>
            <TabPane tab="Graphs" key="2">
              <PandemicGraphs />
            </TabPane>
          </Tabs>
        </div>
        <div className="col-md-3 filters-div">
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
        </div>
      </div>
    </>
  );
}

export default Graphs;
