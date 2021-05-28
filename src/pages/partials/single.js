import React from "react";
import Highcharts from "highcharts";
import { Card } from "antd";
import HighchartsReact from "highcharts-react-official";
function SinglePartial(props) {
  const { options = {} } = props;
  const seriesData = [];
  let totalSum = 0;
  if (props.type === 1) {
    totalSum +=
      props.preparedData.confirmCases[
        props.preparedData.confirmCases.length - 1
      ];
    seriesData.push({
      name: "Confirm Cases",
      data: props.preparedData.confirmCases,
    });
  } else {
    totalSum += props.preparedData.deaths[props.preparedData.deaths.length - 1];

    seriesData.push({
      name: "Confirm Deaths",
      data: props.preparedData.deaths,
    });
  }
  const confirmOPtions = {
    chart: {
      type: "area",
    },
    title: {
      text: props.type === 1 ? "Confirm Cases" : "Death Cases",
    },
    xAxis: {
      allowDecimals: false,
      categories: props.preparedData.x_categories,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        },
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return this.value / 1000 + "k";
        },
      },
    },
    plotOptions: {
      area: {
        // pointStart: 1940,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: seriesData,
  };
  return (
    <>
      <div>
        <Card>
          <div className="row">
            <div className="col-md-3">
              <div className="vacc-div">
                <h5>{options.country}</h5>
                {props.type === 1 ? (
                  <p>
                    Total Number of Confirmed Cases are{" "}
                    <b className="vacc-color">{totalSum}</b>
                  </p>
                ) : (
                  <p>
                    Total Number of Confirmed Deaths are{" "}
                    <b className="vacc-color">{totalSum}</b>
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-9">
              <HighchartsReact
                highcharts={Highcharts}
                options={confirmOPtions}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
export default SinglePartial;
