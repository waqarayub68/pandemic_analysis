// import covid from "../assets/images/covid.jpg";
import { keys as _keys, countBy as _countBy, filter as _filter } from "lodash";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more.src";
import { getSummaryResults } from "../services/overallSummary";
import Footer from "../pages/footer";
HC_more(Highcharts);
const getBubbleOptions = (values) => {
  return {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },

    legend: {
      enabled: false,
    },

    title: {
      text: "Confirm and Deaths Cases",
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, Confirm: {point.x}, Deaths: {point.y}, Population: {point.z}.",
      },
    },

    xAxis: {
      gridLineWidth: 1,
      gridLineColor: "transparent",
      // type: "logarithmic",
      title: {
        text: "Confirm",
      },
      labels: {
        format: "{value}",
      },
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      gridLineColor: "transparent",
      // type: "logarithmic",
      title: {
        text: "Deaths",
      },
      labels: {
        format: "{value}",
      },
      maxPadding: 0.2,
    },

    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        "<tr><th>Confirm:</th><td>{point.x}</td></tr>" +
        "<tr><th>Deaths:</th><td>{point.y}</td></tr>" +
        "<tr><th>Population:</th><td>{point.z}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },

    series: [
      {
        data: values,
      },
    ],
  };
};
function Home() {
  const [bubbleStats, setBubbleOptions] = React.useState([]);
  const [effectedCountriesSummary, updateEffectedCountriesSummary] =
    React.useState([]);
  React.useEffect(() => {
    (async () => {
      await getSummaryResults().then(async (response) => {
        updateEffectedCountriesSummary(response.summary);
      });
    })();
  }, []);
  const temp = [];
  effectedCountriesSummary.forEach((item) => {
    temp.push({
      x: item.ConfirmCases,
      y: item.ConfirmDeaths,
      z: item.Population,
      country: item.Country,
      name: item.Country,
      color: item.ConfirmCases > 10000000 ? "#d9534f" : "#5bc0de",
    });
  });
  const bubbleChartOptions = getBubbleOptions(temp);

  return (
    <>
      <div className="bg">
        <div className="row">
          <div className="h-100 d-block col-md-4">
            <h1 className="covid-class">COVID-19</h1>
            <p className="covid-p-class">
              The COVID-19 pandemic, also known as the coronavirus pandemic, is
              an ongoing global pandemic of coronavirus disease 2019 (COVID-19)
              caused by severe acute respiratory syndrome coronavirus 2
              (SARS-CoV-2). The virus was first identified in December 2019 in
              Wuhan, China and spread over the world. Data used in this project
              was from 24-02-2020 and contains the statistics of all countries.
              The graph also illustrates how much different countries suffers
              from the COVID Pandemic.
            </p>
          </div>
          <div className="h-100 d-block col-md-8">
            <HighchartsReact
              highcharts={Highcharts}
              options={bubbleChartOptions}
            />
          </div>
        </div>
      </div>
      {/* <div className="d-block text-center w-100 background-color pt-3">
        <HighchartsReact highcharts={Highcharts} options={bubbleChartOptions} />
      </div> */}
      <div className="row mt-4 mb-4 pl-5 pr-5">
        <div className="col-md-4">
          <div class="card pl-3">
            <div class="card-body">
              <p class="card-text">
                <a href="https://github.com/owid/covid-19-data" target="_blank">
                  COVID-19
                </a>{" "}
                data is taken from the github repository. This data is from
                24-02-2020 and contains the world wide statistics of COVID and
                vaccinations
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card pl-3">
            <div class="card-body">
              <p class="card-text">
                <a
                  href="https://www.kaggle.com/imdevskp/comparing-pandemics-epidemics-outbreaks/#data"
                  target="_blank"
                >
                  Data
                </a>{" "}
                to compare the impact of COVID with other Pandemics is also
                used. That data contains the 100 days of deaths and confirms for
                each pandemic
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card pl-3">
            <div class="card-body">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" target="_blank">
                View Repository
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
