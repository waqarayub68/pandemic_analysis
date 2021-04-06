import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

const PandemicGraphs = () => (
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
);

export default PandemicGraphs;
