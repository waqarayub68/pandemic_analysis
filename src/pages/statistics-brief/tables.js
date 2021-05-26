import { Table } from "antd";
import { sum as _sum } from "lodash";
function Tables(props) {
  const columns = [
    {
      title: "Pandemic",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Number of Effected Countries",
      dataIndex: "effected",
      key: "effected",
    },
    {
      title: "Confirm Cases (100 Days)",
      dataIndex: "confirm",
      key: "confirm",
    },
    {
      title: "Deaths (100 Days)",
      dataIndex: "deaths",
      key: "deaths",
    },
  ];

  const data = [
    {
      name: "Covid-19",
      year: 2019,
      effected: props.donut_data[0].y,
      confirm: _sum(props.start100Days.covid_response),
      deaths: _sum(props.start100DaysDeaths.covid_response),
    },
    {
      name: "H1N1-Swine 2009",
      year: 2009,
      effected: props.donut_data[1].y,
      confirm: _sum(props.start100Days.swine_response),
      deaths: _sum(props.start100DaysDeaths.swine_response),
    },
    {
      name: "Ebola 2014",
      year: 2014,
      effected: props.donut_data[2].y,
      confirm: _sum(props.start100Days.ebola_response),
      deaths: _sum(props.start100DaysDeaths.ebola_response),
    },
    {
      name: "SARS 2003",
      year: 2003,
      effected: props.donut_data[3].y,
      confirm: _sum(props.start100Days.sars_response),
      deaths: _sum(props.start100DaysDeaths.sars_response),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
export default Tables;
