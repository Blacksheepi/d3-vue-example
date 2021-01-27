<template>
  <div>
    <div id="chart1"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import tooltip from 'd3-tip';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      test: '',
    };
  },
  mounted() {
    this.draw();
  },

  methods: {
    draw() {
      const width = 500;
      const height = 500;
      const radius = Math.min(width, height) / 2;
      const innerRadius = 0.3 * radius;

      let formatData = [
        {
          color: '#9E0041',
          id: 'FIS',
          label: 'Fisheries',
          score: 59,
          width: 0.5,
        },
        {
          color: '#E1514B',
          id: 'AO',
          label: 'Artisanal Fishing Opportunities',
          score: 98,
          width: 1,
        },
      ];

      let pie = d3
        .pie()
        .sort(null)
        .value(d => d.width);
      var tip = tooltip()
        .attr('class', 'd3-tip')
        .offset([0, 0])
        .html(function(d) {
          return `${d.data.label}: <span style='color:orangered'>${d.data.score}</span>`;
        });
      var arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(function(d) {
          return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
        });
      var svg = d3
        .select('#chart1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      svg.call(tip);

      var path = svg
        .selectAll('.solidArc')
        .data(pie(formatData))
        .enter()
        .append('path')
        .attr('fill', function(d) {
          return d.data.color;
        })
        .attr('class', 'solidArc')
        .attr('stroke', 'gray')
        .attr('d', arc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {
  fill: orange;
}

.solidArc:hover {
  fill: orangered;
}

.solidArc {
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.x.axis path {
  display: none;
}

.aster-score {
  line-height: 1;
  font-weight: bold;
  font-size: 500%;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}

/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  content: '\25BC';
  position: absolute;
  text-align: center;
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}
</style>
