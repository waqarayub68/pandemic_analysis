import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { getWorld } from "../services/maps";

// import mapDataIE from "@highcharts/map-collection/countries/ie/ie-all.geo.json";
highchartsMap(Highcharts);
// var year = 2014;
const mapOptions = {
  title: {
    text: "Widget click by location",
    style: {
      color: "#fff"
    }
  },
  chart: {
    backgroundColor: "transparent",
    type: "map",
    map: null
  },
  mapNavigation: {
    enabled: true,
    enableButtons: false
  },
  credits: {
    enabled: false
  },
  colorAxis: {
    dataClasses: [
      {
        from: 1,
        color: "#C40401",
        name: "widget name one"
      },
      {
        from: 2,
        color: "#0200D0",
        name: "widget name two"
      }
    ]
  },
  tooltip: {
    pointFormatter: function() {
      return this.name;
    }
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    x: -100,
    y: 70,
    floating: true,
    layout: "vertical",
    valueDecimals: 0,
    backgroundColor:
      // theme
      (Highcharts.defaultOptions &&
        Highcharts.defaultOptions.legend &&
        Highcharts.defaultOptions.legend.backgroundColor) ||
      "rgba(255, 255, 255, 0.85)"
  },
  series: [
    {
      name: "world map",
      dataLabels: {
        enabled: true,
        color: "#FFFFFF",
        format: "{point.postal-code}",
        style: {
          textTransform: "uppercase"
        }
      },
      tooltip: {
        ySuffix: " %"
      },
      cursor: "pointer",
      joinBy: ["iso-a2", "code"],
      data: [],
      point: {
        events: {
          click: function(r) {
            console.log("click - to open popup as 2nd step");
            console.log(r);
          }
        }
      }
    }
  ]
};


function Maps() {


  getWorld().then(r => {
    
    mapOptions.series[0].data = []; //make sure data is empty before  fill
    mapOptions["chart"]["map"] = r.data; // set the map data of the graph (using the world graph)
      for (let i in r.data["features"]) {
        let mapInfo = r.data["features"][i];
        if (mapInfo["id"]) {
          var postalCode = mapInfo["id"];

          var name = mapInfo["properties"]["name"];
          var value = (i % 2) + 1;
          var type = value === 1 ? "widget name one" : "widget name two";
          var row = i;
          mapOptions.series[0].data.push({
            value: value,
            name: name,
            code: postalCode,
            row: row,
            type: type
          });
        }
      }
      // updating the map options
    
  });


  console.log('Before');
  console.log(mapOptions);





  return (
    <>
          {console.log('After')}
          <h3>COVID Data Maps</h3>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"mapChart"}
            options={mapOptions}
          />

    </>
  );
}

export default Maps;
