import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "attendance",
          data: [5, 9, 7, 8, 5, 3, 5, 4],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        // xaxis: {
        //   type: "datetime",
        //   categories: [
        //     "2018-09-19T00:00:00.000Z",
        //     "2018-09-19T01:30:00.000Z",
        //     "2018-09-19T02:30:00.000Z",
        //     "2018-09-19T03:30:00.000Z",
        //     "2018-09-19T04:30:00.000Z",
        //     "2018-09-19T05:30:00.000Z",
        //     "2018-09-19T06:30:00.000Z",
        //   ],
        // },
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          style={{width: "500px", height: "300px"}}
        />
      </div>
    );
  }
}

export default ApexChart;