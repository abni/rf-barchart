/* global d3 */
'use strict';

d3.json('sampledata.json', function(d){
    var data = d[0].values;
    data.sort(compare);
    init(data);
});

function compare(b,a) {
  if (a.value < b.value){
        return -1;
  }
  if (a.value > b.value){
        return 1;
  }
  return 0;
}

function init(data){
    var dataValueArray = [];
    data.map(function(d){ dataValueArray.push(d.value); });

    var margin = {top: 30, right: 5, bottom: 0, left: 5},
        w = document.querySelector('.chart').offsetWidth - margin.left - margin.right,
        h = document.querySelector('.chart').offsetHeight - margin.top - margin.bottom,
        barWidth = (h - data.length) / data.length;

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataValueArray)])
        .range([margin.left, w - margin.right]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('top');

    var colorScale = d3.scale.linear()
        .domain([0, d3.max(dataValueArray)/2, d3.max(dataValueArray)])
        .range(['#fee8c8', '#fdbb84', '#e34a33'])
        .nice();

    var svg = d3.select('.chart').append('svg').attr({
        width: w + margin.left + margin.right,
        height: h + margin.top + margin.bottom
    }).append('g').attr({
        transform: 'translate(' + margin.left + ',' + margin.top + ')'
    });

    var bar = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        ;

    bar.append('rect')
        .attr({
            width:  function (d) { return xScale(d.value); },
            height: barWidth,
            y: function (d, i) { return (barWidth + 1) * i; },
            fill: function(d) { return colorScale(d.value); }
        })
        .on('mouseover', function(){
            d3.select(this).attr({
                fill: '#ccc'
            });
        })
        .on('mouseout', function(d){
            d3.select(this).attr({
                fill: function() { return colorScale(d.value); }
            });
        });

    bar.append('text')
        .text( function(d) { return d.label + ' (' + d.value + '%)'; } )
        .attr({
            x: 1,
            y: function (d, i) { return (barWidth + 1) * i; },
            'text-anchor': 'start',
            'transform': 'translate(0, ' + ((barWidth/2)+5) + ')'
        });

    svg.append('g')
        .attr({
            'class' : 'axis',
            transform : 'translate(0, 0)',
        })
        .call(xAxis);
}