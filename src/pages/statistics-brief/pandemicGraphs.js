import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { sum as _sum } from "lodash";
import { Card } from "antd";
const PandemicGraphs = (props) => {
  console.log(props.start100Days);
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Number of Confirm Cases",
    },
    yAxis: {
      type: "logarithmic",
      gridLineColor: "transparent",
      // minorTickInterval: 0.1,
      // accessibility: {
      //   rangeDescription: 'Range: 0.1 to 1000'
      // }
    },
    series: [
      {
        name: "Covid-19",
        data: props.start100Days.covid_response,
      },
      {
        name: "H1N1-Swine-2009",
        data: props.start100Days.swine_response,
      },
      {
        name: "Ebola 2014",
        data: props.start100Days.ebola_response,
      },
      {
        name: "SARS 2003",
        data: props.start100Days.sars_response,
      },
    ],
  };

  const optionsDeathGraph = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Number of Deaths",
    },
    yAxis: {
      type: "logarithmic",
      gridLineColor: "transparent",
    },
    series: [
      {
        name: "Covid-19",
        data: props.start100DaysDeaths.covid_response,
      },
      {
        name: "H1N1-Swine-2009",
        data: props.start100DaysDeaths.swine_response,
      },
      {
        name: "Ebola 2014",
        data: props.start100DaysDeaths.ebola_response,
      },
      {
        name: "SARS 2003",
        data: props.start100DaysDeaths.sars_response,
      },
    ],
  };

  const countries_number_options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Number of Effected Countries",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Number of Effected Countries",
      },
      gridLineColor: "transparent",
    },
    legend: {
      enabled: false,
    },

    series: [
      {
        name: "Number of effected Countries",
        colorByPoint: true,
        data: props.donut_data,
      },
    ],
  };

  const donut_options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Number of Effected Countries",
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          connectorColor: "silver",
        },
      },
    },
    series: [
      {
        name: "Number of Effected Countries",
        data: props.donut_data,
      },
    ],
  };

  const stackOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Total Confirm Cases and Deaths",
    },
    xAxis: {
      categories: ["Covid-19", "H1N1-Swine-2009", "Ebola 2014", "SARS 2003"],
    },
    yAxis: {
      type: "logarithmic",
      gridLineColor: "transparent",
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Confirm Cases",
        data: [
          _sum(props.start100Days.covid_response),
          _sum(props.start100Days.swine_response),
          _sum(props.start100Days.ebola_response),
          _sum(props.start100Days.sars_response),
        ],
      },
      {
        name: "Deaths",
        data: [
          _sum(props.start100DaysDeaths.covid_response),
          _sum(props.start100DaysDeaths.swine_response),
          _sum(props.start100DaysDeaths.ebola_response),
          _sum(props.start100DaysDeaths.ebola_response),
        ],
      },
    ],
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <HighchartsReact
              highcharts={Highcharts}
              options={countries_number_options}
            />
          </Card>
        </div>

        <div className="col-md-6">
          <Card>
            <HighchartsReact highcharts={Highcharts} options={donut_options} />
          </Card>
        </div>
        <div className="col-md-4 mt-5">
          <Card>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Card>
        </div>
        <div className="col-md-4 mt-5">
          <Card>
            <HighchartsReact
              highcharts={Highcharts}
              options={optionsDeathGraph}
            />
          </Card>
        </div>
        <div className="col-md-4 mt-5">
          <Card>
            <HighchartsReact highcharts={Highcharts} options={stackOptions} />
          </Card>
        </div>
        {/* <div className="col-md-4">
          <HighchartsReact
            highcharts={Highcharts}
            options={countries_number_options}
          />
        </div> */}
      </div>
    </>
  );
};

export default PandemicGraphs;
