$(document).ready(function () {
  barChartModule.init();
  barChartModule.createBarChart();

  var barController = {
    createScoreWidget: function () {
      //var childTemplate = ''
      var status = {};
      barChartModule.data.map(function (countryData) {
        status.completeness = countryData.completeness < 66 ? "red-back" : "green-back";
        status.quality = countryData.quality < 66 ? "red-back" : "green-back";
        $('#score-table').append('<tr class="score-row"><td>' + countryData.country + '</td>\
      <td class="text-center">\
        <span class="' + status.completeness + ' text-circle">' + countryData.completeness + '</span></td>\
      <td class="text-center">\
        <span class="' + status.quality + ' text-circle">' + countryData.quality + '</span></td>\
      </tr>');
      });
    }
  };
  barController.createScoreWidget();
});