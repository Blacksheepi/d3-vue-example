<template>
  <div>
    <div id="chart1"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import tooltip from 'd3-tip';
import data from '../data/tidy-tree-data.json';
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
      console.log('start draw', data);
      const width = 800;
      const tree = function(data) {
        const root = d3.hierarchy(data);
        root.dx = 10;
        root.dy = width / (root.height + 1);
        return d3.tree().nodeSize([root.dx, root.dy])(root);
      };
      const root = tree(data);
      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3.create('svg').attr('viewBox', [0, 0, width, x1 - x0 + root.dx * 2]);

      const g = svg
        .append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`);

      const link = g
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr(
          'd',
          d3
            .linkHorizontal()
            .x(d => d.y)
            .y(d => d.x),
        );

      const node = g
        .append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node
        .append('circle')
        .attr('fill', d => (d.children ? '#555' : '#999'))
        .attr('r', 2.5);

      node
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', d => (d.children ? -6 : 6))
        .attr('text-anchor', d => (d.children ? 'end' : 'start'))
        .text(d => d.data.name)
        .clone(true)
        .lower()
        .attr('stroke', 'white');
      console.log(svg, svg.node());
      document.querySelector('#chart1').appendChild(svg.node());
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
