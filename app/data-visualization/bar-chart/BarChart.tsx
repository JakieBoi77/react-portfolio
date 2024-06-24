import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledDiv = styled.div`
  min-height: 700px;
  height: 100vh;
  min-width: 1200px;
  width: 100vw;
  background-color: #f07d18;
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  justify-content: center;
  align-items: center;

  #app {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    padding: 0 20px 20px 20px;
    box-shadow: 5px 5px 15px;
  }

  #title {
    font-size: 40px;
    padding-top: 20px;
  }

  #tooltip {
    background-color: lightsteelblue;
    box-shadow: 5px 5px 15px;
    position: absolute;
    width: 150px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const BarChart = () => {

  const [dataset, setDataset] = useState<Array<[string, number]>>([]);

  const dataURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataURL);
        const json = await response.json();
        setDataset(json.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setDataset([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataset.length === 0) return;

    // Chart Properties
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const barWidth = width / dataset.length;

    // Get Date Objects
    const dates = dataset.map((data) => new Date(data[0]));

    // Process Date Strings into Nicer Strings
    const years = dataset.map((data) => {
      let quarter = data[0].substring(5, 7);
      if (quarter === "01") {
        quarter = "Q1";
      } else if (quarter === "04") {
        quarter = "Q2";
      } else if (quarter === "07") {
        quarter = "Q3";
      } else if (quarter === "10") {
        quarter = "Q4";
      }
      return data[0].substring(0, 4) + " " + quarter;
    });

    // Define x-scale
    const minDate = d3.min(dates) as Date;
    const maxDate = d3.max(dates) as Date;
    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    // Define x-axis
    const xAxis = d3.axisBottom(xScale);

    // Get GDP
    const GDP = dataset.map((data) => data[1]);

    // Define GDP Scale
    const maxGDP = d3.max(GDP) as Number;
    const gdpScale = d3.scaleLinear().domain([0, maxGDP]).range([height, 0]);

    // Define y-axis
    const yAxis = d3.axisLeft(gdpScale);

    // Define Tooltip
    const tooltip = d3.select(".chart").append("div").attr("id", "tooltip").style("opacity", 0);

    // Define the SVG
    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the x-axis
    svg.append("g").attr("id", "x-axis").attr("transform", "translate(0, " + height + ")").call(xAxis);

    // Add the y-axis
    svg.append("g").attr("id", "y-axis").call(yAxis);

    // Add the bars
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d, i) => dataset[i][0])
      .attr("data-gdp", (d, i) => dataset[i][1])
      .attr("x", (d, i) => xScale(dates[i]))
      .attr("y", (d) => gdpScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d) => height - gdpScale(d[1]))
      .attr("fill", "blue")
      .attr("index", (d, i) => i)
      .on("mouseover", function () {
        // Get the Index
        let i = Number(this.getAttribute("index"));

        // Make Rectangle White
        d3.select(this).attr("fill", "white");

        // Make Tooltip Visbile
        tooltip
          .attr("data-date", dataset[i][0])
          .style("opacity", 0.9)
          .style("left", i * barWidth + margin.left + "px")
          .style("top", height + margin.bottom + "px")
          .style("transform", "translateX(60px)")
          .html(years[i] + "<br /> $" + GDP[i] + " Billion");
      })
      .on("mouseout", function () {
        // Make Rectangle Blue
        d3.select(this).attr("fill", "blue");

        // Make Tooltip Invisbile
        tooltip.style("opacity", 0);
      });

    // Clean-up function to remove SVG and other D3 elements
    return () => {
      d3.select(".chart").selectAll("*").remove();
    };
  }, [dataset]); // Depend on 'dataset' to re-render the chart when it changes

  return (
    <StyledDiv>
      <div id="app">
        <p id="title">United States GDP</p>
        <div className="chart"></div>
        <p>More Information: <a href="http://www.bea.gov/national/pdf/nipaguid.pdf">http://www.bea.gov/national/pdf/nipaguid.pdf</a></p>
      </div>
    </StyledDiv>
  );
};

export default BarChart;