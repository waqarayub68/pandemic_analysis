// import covid from "../assets/images/covid.jpg";
import { keys as _keys, countBy as _countBy, filter as _filter } from "lodash";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more.src";
import { getBubbleStatistics } from "./../services/home";
HC_more(Highcharts);
function Home() {
  const [bubbleStats, setBubbleOptions] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const results = await getBubbleStatistics();
      setBubbleOptions(results.bubbleStats);
    })();
  }, []);
  const bubbleSeries = [];
  const Continents = _keys(
    _countBy(bubbleStats, function (bubbleStats) {
      return bubbleStats.Continents;
    })
  );
  Continents.forEach((con) => {
    const countries = _filter(bubbleStats, (bs) => {
      return con === bs.Continents;
    });
    bubbleSeries.push({
      name: con,
      data: countries,
    });
  });

  const bubbleOption = {
    chart: {
      type: "packedbubble",
      // height: "100%",
      height: 700,
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 0 },
        stops: [
          [0, "#F5F5EF"],
          [1, "#F5F5EF"],
        ],
      },
    },
    title: {
      text: "COVID-19 Effected Countries",
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
    },
    plotOptions: {
      packedbubble: {
        minSize: "45%",
        maxSize: "70%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: true,
          parentNodeLimit: true,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 250,
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: bubbleSeries,
  };

  return (
    <>
      <div className="bg">
        <div className="row">
          <div className="h-100 d-block col-md-6">
            <h1 className="covid-class">COVID-19</h1>
            <p className="covid-p-class">
              The COVID-19 pandemic, also known as the coronavirus pandemic, is
              an ongoing global pandemic of coronavirus disease 2019 (COVID-19)
              caused by severe acute respiratory syndrome coronavirus 2
              (SARS-CoV-2). The virus was first identified in December 2019 in
              Wuhan, China.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4 mb-4 pl-5 pr-5">
        <div className="col-md-4">
          <div class="card pl-3">
            <div class="card-body">
              <p class="card-text">
                COVID is taken from the github repository click the link below
                to view repository.
              </p>
              <a href="#" target="_blank">
                View Repository
              </a>
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

      <div className="d-block text-center w-100 background-color pt-3">
        <HighchartsReact highcharts={Highcharts} options={bubbleOption} />
      </div>
    </>
  );
}

export default Home;
