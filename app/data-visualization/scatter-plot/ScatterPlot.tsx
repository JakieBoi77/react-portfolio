import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const StyledDiv = styled.div`
    min-height: 800px;
    height: 100vh;
    min-width: 1500px;
    width: 100vw;
    background-color: #f2ff00;
    overflow: auto;
    scroll-behavior: smooth;
    display: flex;
    justify-content: center;
    align-items: center;

    #app {
        position: relative;
        margin: 50px;
        background-color: white;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 5px 5px 15px;
    }

    h1 {
        margin-top: 10px;
    }

    .label {
        font-size: 18px;
    }

    #tooltip {
        position: absolute;
        background-color: lightsteelblue;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        pointer-events: none;
        white-space: nowrap;
        overflow: visible;
        opacity: 0;
    }
`;

interface BikerData {
    Time: string;
    Place: number;
    Seconds: number;
    Name: string;
    Year: number;
    Nationality: string;
    Doping: string;
    URL: string;
}

const ScatterPlot = () => {
    const [dataset, setDataset] = useState<BikerData[]>([]);
    const dataURL =
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(dataURL);
                const json = await response.json();
                setDataset(json);
            } catch (err) {
                console.error("Error fetching data:", err);
                setDataset([]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (dataset.length === 0) return;

        console.log(dataset);

        // Chart Properties
        const margin = { top: 50, right: 50, bottom: 80, left: 80 };
        const fullWidth = 1000;
        const fullHeight = 500;
        const width = fullWidth - margin.right - margin.left;
        const height = fullHeight - margin.top - margin.bottom;

        // Process Years
        const years = dataset.map((data) => {
            return data.Year;
        });

        // Find the min and max year
        const minYear = d3.min(years) ?? 0;
        const maxYear = d3.max(years) ?? 0;

        // Define x-scale
        const xScale = d3
            .scaleLinear()
            .domain([minYear - 1, maxYear + 1])
            .range([0, width]);

        // Define x-axis
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

        // Process Times
        const times = dataset.map((data) => {
            let time = data.Time.split(":");
            return new Date(1970, 0, 1, 0, +time[0], +time[1]);
        });

        // Find the min and max time
        const minTime = d3.min(times) ?? new Date();
        const maxTime = d3.max(times) ?? new Date();

        // Define time format
        const timeFormat = d3.timeFormat("%M:%S");

        // Define y-scale
        const yScale = d3
            .scaleTime()
            .domain([
                d3.timeSecond.offset(minTime, -30),
                d3.timeSecond.offset(maxTime, 30),
            ])
            .range([0, height]);

        // Define y-axis
        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat((domainValue, index) =>
                timeFormat(domainValue as Date),
            );

        // Define Tooltip
        const tooltip = d3
            .select(".chart")
            .append("div")
            .attr("id", "tooltip")
            .style("display", "hidden");

        // Define SVG
        const svg = d3
            .select(".chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")",
            );

        // Add the x-axis
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);

        // x-axis Label
        svg.append("text")
            .attr("class", "label")
            .text("Year")
            .attr("x", 450)
            .attr("y", 425);

        // Add the y-axis
        svg.append("g").attr("id", "y-axis").call(yAxis);

        // y-axis Label
        svg.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .text("Time in Minutes")
            .attr("x", -220)
            .attr("y", -50);

        // Add the dots
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("data-xvalue", (d, i) => years[i])
            .attr("data-yvalue", (d, i) => times[i].getTime())
            .attr("cx", (d, i) => xScale(years[i]))
            .attr("cy", (d, i) => yScale(times[i]))
            .attr("r", 7)
            .attr("index", (d, i) => i)
            .attr("stroke", "black")
            .attr("fill", (d) => {
                if (d.Doping === "") {
                    return "orange";
                } else {
                    return "blue";
                }
            })
            .attr("opacity", 0.8)
            .on("mouseover", function (event, d) {
                let i = Number(this.getAttribute("index"));
                tooltip
                    .attr("data-year", d.Year)
                    .style("opacity", 0.9)
                    .style("left", xScale(years[i]) + 110 + "px")
                    .style("top", yScale(times[i]) + 100 + "px")
                    .html(
                        d.Name +
                            ": " +
                            d.Nationality +
                            "<br/>Year: " +
                            d.Year +
                            ", Time: " +
                            d.Time +
                            (d.Doping ? "<br/><br/>" + d.Doping : ""),
                    );
            })
            .on("mouseout", function (event, d) {
                tooltip.style("opacity", 0);
            });

        // Define Legend Data
        const legendData = [
            { label: "No Doping Allegations", color: "orange" },
            { label: "Doping Allegations", color: "blue" },
        ];

        // Add Legend
        const legend = svg
            .append("g")
            .attr("id", "legend")
            .attr("transform", "translate(" + (width - 200) + "," + 100 + ")");

        legend
            .selectAll("rect")
            .data(legendData)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 25)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", (d) => d.color);

        legend
            .selectAll("text")
            .data(legendData)
            .enter()
            .append("text")
            .attr("x", 24)
            .attr("y", (d, i) => i * 25 + 9)
            .attr("dy", ".35em")
            .text((d) => d.label);

        // Clean-up function to remove SVG and other D3 elements
        return () => {
            d3.select(".chart").selectAll("*").remove();
        };
    }, [dataset]);

    return (
        <StyledDiv>
            <div id="app">
                <h1 id="title">Doping in Professional Bicycle Racing</h1>
                <h3>35 Fastest times up Alpe d&apos;Huez</h3>
                <div className="chart"></div>
            </div>
        </StyledDiv>
    );
};

export default ScatterPlot;
