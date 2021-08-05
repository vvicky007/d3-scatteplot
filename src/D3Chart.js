import * as d3 from "d3";

const margin = { top: 10, bottom: 50, left: 80, right: 10 };
const height = 500;
const width = 800;
export default class D3Chart {
  constructor(element) {
    const vis = this;
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    vis.svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom * 0.8)
      .attr("text-anchor", "middle")
      .text("World's tallest persons");
    vis.svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .text("Height in cm");
    this.Xaxis = this.svg
      .append("g")
      .attr("transform", `translate(0,${height})`);
    this.yAxis = this.svg.append("g");
    const getData = async function () {
      Promise.all([
        d3.json("https://udemy-react-d3.firebaseio.com/tallest_men.json"),
        d3.json("https://udemy-react-d3.firebaseio.com/tallest_women.json"),
      ]).then((dataset) => {
        const [men, women] = dataset;
        vis.menData = men;
        vis.womenData = women;
        // let flag = true;
        // vis.data = men;
        // d3.interval(() => {
        //   vis.data = flag ? men : women;
        //   vis.update();
        //   flag = !flag;
        // }, 1000);
      });
    };
    getData();
  }
  update(gender) {
    this.data = gender === "men" ? this.menData : this.womenData;
    const max = d3.max(this.data, (d) => d.height);
    const y = d3
      .scaleLinear()
      .domain([d3.min(this.data, (d) => d.height) * 0.95, max])
      .range([height, 0]);
    const x = d3
      .scaleBand()
      .domain(this.data.map((d) => d.name))
      .range([0, width])
      .padding(0.6);
    this.xAxisCall = d3.axisBottom(x);
    this.yAxisCall = d3.axisLeft(y);

    this.Xaxis.transition().duration(500).call(this.xAxisCall);
    this.yAxis.transition().duration(500).call(this.yAxisCall);
    //DATA JOIN
    const rect = this.svg.selectAll("rect").data(this.data);
    // Remove exit elements
    rect
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", height)
      .remove();

    //update
    rect
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => height - y(d.height));
    // get new elements
    rect
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth)
      .attr("y", height)
      .attr("height", 0)
      .transition()
      .duration(500)
      .attr("y", (d) => y(d.height))
      .attr("height", (d) => height - y(d.height))
      .attr("fill", "grey");
  }
}
