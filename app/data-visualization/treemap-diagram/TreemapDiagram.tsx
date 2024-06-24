import React, { useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledDiv = styled.div`
  min-height: 1500px;
  height: 100vh;
  min-width: 2300px;
  width: 100vw;
  background-color: #32a852;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  #app {
    position: relative;
    background-color: white;
    margin: 100px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 5px 5px 15px;
  }

  .chart {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .text-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 3px;
    pointer-events: none;
  }

  #title {
    padding-top: 10px;
  }

  #tooltip {
    position: absolute;
    background-color: black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px;
    pointer-events: none;
    white-space: nowrap;
    color: white;
  }
`;

const TreemapDiagram = () => {

  const datasets = useMemo(() => [
    {
      name: "videogames",
      title: "Video Game Sales",
      description: "Top 100 Most Sold Video Games Grouped by Platform",
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
    }, 
    {
      name: "kickstarter",
      title: "Kickstarter Pledges",
      description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
    },
    {
      name: "movies",
      title: "Movie Sales",
      description: "Top 100 Highest Grossing Movies Grouped By Genre",
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
    }
  ], []);

  const [currentDataset, setCurrentDataset] = useState<number>(0);
  const [dataset, setDataset] = useState<any>(null);

  // Fetch the new dataset when the current dataset is switched
  useEffect(() => {
    const fetchData = async (datasetIndex: number) => {
      try {
        const response = await fetch(datasets[datasetIndex].url);
        const json = await response.json();
        setDataset(json);
      } catch (err) {
        console.error("Error fetching data:", err);
        setDataset(null);
      }
    };
    fetchData(currentDataset);
  }, [currentDataset, datasets]);

  // Render the new dataset when the current dataset is switched
  useEffect(() => {
    if (!dataset) return;

    // Colors
    const colors = [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a',
      '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94',
      '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d',
      '#17becf', '#9edae5'
    ];

    const colorScale = d3
      .scaleOrdinal<string>()
      .range(colors);

    // Title
    const title = d3
      .select(".chart")
      .append("h1")
      .attr("id", "title")
      .text(datasets[currentDataset].title);

    // Description
    const description = d3
      .select(".chart")
      .append("h4")
      .attr("id", "description")
      .text(datasets[currentDataset].description);

    // Define SVG
    const margin = { top: 30, right: 50, bottom: 50, left: 50 };
    const fullWidth = 2000;
    const fullHeight = 1000;
    const width = fullWidth - margin.right - margin.left;
    const height = fullHeight - margin.top - margin.bottom;

    // Define SVG
    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", fullWidth)
      .attr("height", fullHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Hierarchy
    function sumBySize(d: any) {
      return d.value;
    }

    const root = d3
      .hierarchy<any>(dataset)
      .sum(sumBySize)
      .sort((a: any, b: any) => b.height - a.height || b.value - a.value);

    // Treemap
    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingInner(1);

    treemap(root);

    // Cells
    const cell = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d: any) => "translate(" + d.x0 + ", " + d.y0 + ")");

    // Cell Data, Color, and Tooltip
    const tooltip = d3
      .select(".chart")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    cell
      .append("rect")
      .attr("class", "tile")
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("data-name", d => d.data.name)
      .attr("data-category", d => d.data.category)
      .attr("data-value", d => d.data.value)
      .attr("fill", d => colorScale(d.data.category))
      .on("mousemove", function (event, d) {
          const container = document.querySelector('.chart');
          if (!container) return;
          const containerRect = container.getBoundingClientRect();
          const tooltipX = event.clientX - containerRect.left;
          const tooltipY = event.clientY - containerRect.top;
          tooltip
            .style('opacity', 0.9)
            .attr('data-value', d.data.value)
            .html(
              'Name: ' +
              d.data.name +
              '<br>Category: ' +
              d.data.category +
              '<br>Value: ' +
              d.data.value
            )
            .style('left', tooltipX + 40 + 'px')
            .style('top', tooltipY + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    cell
      .append("foreignObject")
      .style("pointer-events", "none")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .append("xhtml:div")
      .attr("class", "text-box")
      .text(d => d.data.name);
      

    // Legend
    const categories = root.leaves()
      .map(nodes => nodes.data.category)
      .filter((category, index, self) => self.indexOf(category) === index);

    const legendWidth = 1200;
    const legendOffset = 10;
    const legendRectSize = 30;
    const legendSpacingX = 150;
    const legendSpacingY = 10;
    const legendTextOffsetX = 5;
    const legendTextOffsetY = -8;

    const legendElementsPerRow = Math.floor(legendWidth / legendSpacingX);

    const legend = d3
      .select(".chart")
      .append("svg")
      .attr("width", legendWidth)
      .attr("id", "legend");

    const legendElement = legend
      .append("g")
      .attr("transform", "translate(60, " + legendOffset + ")")
      .selectAll("g")
      .data(categories)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return (
          "translate(" + (i % legendElementsPerRow) * legendSpacingX + ", " +
          (Math.floor(i / legendElementsPerRow) * legendRectSize + legendSpacingY * Math.floor(i / legendElementsPerRow)) + ")"
        );
      })

    legendElement
      .append("rect")
      .attr("class", "legend-item")
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .attr("fill", d => colorScale(d));

    legendElement
      .append("text")
      .attr("x", legendRectSize + legendTextOffsetX)
      .attr("y", legendRectSize + legendTextOffsetY)
      .text(d => d);

    return () => {
      d3.select(".chart").selectAll("*").remove();
    };
  }, [dataset, currentDataset, datasets]);

  // Handle the switching datasets
  const handleChange = (event: any) => {
    setCurrentDataset(event.target.value);
  }

  return (
    <StyledDiv>
      <div id="app">
        <select value={currentDataset} onChange={handleChange}>
          {datasets.map((dataset, index) => {
            return (
              <option key={index} value={index}>{dataset.title}</option>
            );
          })}
        </select>
        <div className="chart"></div>
      </div>
    </StyledDiv>
  );
}

export default TreemapDiagram