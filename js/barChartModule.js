var barChartModule = {
  getJSONfromHTML: function (tableDomElement) {
    var dataArray = [];
    $(tableDomElement).map(function () {
      var $cells = $(this).children();
      dataArray.push({
        country: $cells.eq(0).text(),
        completeness: parseInt($cells.eq(1).text()),
        quality: parseInt($cells.eq(2).text()),
        overall: parseInt($cells.eq(3).text())
      });
    });
    return dataArray;
  },
  data: [],
  gettransformedData: function () {
    var vm = this,
      avgVal = 0,
      count = 0,
      trans = {
        country: [],
        data: []
      };
    vm.data.forEach(function (d) {
      trans.country.push(d.country);
      trans.data.push({y: Number(d.overall), color: d.overall < 66 ? '#D0584F' : '#9DC850'});
      avgVal += Number(d.overall);
      count += 1;
    });
    trans.averageVal = (avgVal / count).toFixed(0);
    return trans;
  },
  init: function () {
    var tableDomElement = '#data-tables table tbody tr';
    var vm = this;
    vm.data = vm.getJSONfromHTML(tableDomElement);
  },
  createBarChart: function () {
    var transformedData = this.gettransformedData();
    $('#bar-chart-container').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: transformedData.country,
        crosshair: true,
        minorGridLineWidth: 0,
        gridLineWidth: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        gridLineColor: '#197F07',
        lineWidth: 1,
        breaks: [{
          breakSize: 1,
          from: 0,
          repeat: 100,
          to: 100
        }],
        gridLineWidth: 0,
        plotLines: [{
          color: '#FFA800', // Color value
          dashStyle: 'solid', // Style of the plot line. Default to solid
          value: transformedData.averageVal, // Value of where the line will appear
          width: 0.5, // Width of the line
          zIndex: 4,
          label: {
            align: 'right',
            text: '<div class="average-label"><span class="average-val">' + transformedData.averageVal + '</span></div>',
            useHTML: true
          }
        }]
      },
      credits: {
        enabled: false
      },
      exporting: {enabled: false},
      tooltip: {
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        data: transformedData.data
      }]
    });
  }
};