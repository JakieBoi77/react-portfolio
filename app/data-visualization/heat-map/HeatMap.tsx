import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const StyledDiv = styled.div`
    height: 100vh;
    min-height: 1000px;
    min-width: 2000px;
    width: 100vw;
    background-color: #fc2e1c;
    overflow: auto;
    scroll-behavior: smooth;
    display: flex;
    justify-content: center;
    align-items: center;

    .heatmap {
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

    .chart-heading {
        text-align: center;
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

    .text {
        line-height: 0.5;
    }
`;

interface TempData {
    year: number;
    month: number;
    variance: number;
}

interface TempDataSet {
    baseTemperature: number;
    monthlyVariance: TempData[];
}

const HeatMap = () => {
    const [dataset, setDataset] = useState<TempDataSet | null>(null);
    const dataURL =
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(dataURL);
                const json = await response.json();
                setDataset(json);
            } catch (err) {
                console.error("Error fetching data:", err);
                setDataset(null);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!dataset) return;

        // Colors from https://colorbrewer2.org
        const colors = [
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
        ];

        // Heading
        const heading = d3
            .select(".heatmap")
            .append("div")
            .attr("class", "chart-heading");

        // Title
        const title = heading
            .append("h1")
            .attr("id", "title")
            .text("Monthly Global Land-Surface Temperature");

        // Description
        const description = heading
            .append("h3")
            .attr("id", "description")
            .html(
                dataset.monthlyVariance[0].year +
                    " - " +
                    dataset.monthlyVariance[dataset.monthlyVariance.length - 1]
                        .year +
                    ": Base Temperature = " +
                    dataset.baseTemperature +
                    " &#8451;",
            );

        // Heatmap Properties
        const margin = { top: 50, right: 50, bottom: 150, left: 80 };
        const fullWidth = 1600;
        const fullHeight = 600;
        const width = fullWidth - margin.right - margin.left;
        const height = fullHeight - margin.top - margin.bottom;

        // Define SVG
        const svg = d3
            .select(".heatmap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")",
            );

        // X-Axis
        const minYear = dataset.monthlyVariance[0].year;
        const maxYear =
            dataset.monthlyVariance[dataset.monthlyVariance.length - 1].year;

        const xScale = d3
            .scaleBand<number>()
            .domain(dataset.monthlyVariance.map((data) => data.year))
            .range([0, width])
            .padding(0);

        const xAxis = d3
            .axisBottom<number>(xScale)
            .tickValues(
                xScale.domain().filter((year) => {
                    if (year === minYear || year === maxYear) {
                        return true;
                    } else {
                        return year % 10 === 0;
                    }
                }),
            )
            .tickFormat(d3.format("d"))
            .tickSizeOuter(0);

        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top)
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("Years");

        // Y-Axis
        const yScale = d3
            .scaleBand<number>()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
            .range([0, height]);

        const yAxis = d3
            .axisLeft<number>(yScale)
            .tickValues(yScale.domain())
            .tickFormat((month) => {
                let date = new Date(0);
                date.setUTCMonth(month);
                let format = d3.utcFormat("%B");
                return format(date);
            })
            .tickSizeOuter(0);

        svg.append("g").attr("id", "y-axis").call(yAxis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .text("Months");

        // Temp Threshold
        const variances = dataset.monthlyVariance.map((data) => data.variance);
        const minTemp = dataset.baseTemperature + d3.min(variances)!;
        const maxTemp = dataset.baseTemperature + d3.max(variances)!;

        const calculateThreshold = (
            min: number,
            max: number,
            count: number,
        ) => {
            const arr: number[] = [];
            const step = (max - min) / count;
            const base = min;
            for (let i = 1; i < count; i++) {
                arr.push(base + i * step);
            }
            return arr;
        };

        const tempThreshold = d3
            .scaleThreshold<number, string>()
            .domain(calculateThreshold(minTemp, maxTemp, colors.length))
            .range(colors);

        // Tooltip and Heatmap
        const tooltip = d3
            .select(".heatmap")
            .append("div")
            .attr("id", "tooltip")
            .style("opacity", 0);

        svg.append("g")
            .selectAll("rect")
            .data(dataset.monthlyVariance)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("data-month", (d) => d.month - 1)
            .attr("data-year", (d) => d.year)
            .attr("data-temp", (d) => dataset.baseTemperature + d.variance)
            .attr("x", (d) => xScale(d.year)!)
            .attr("y", (d) => yScale(d.month - 1)!)
            .attr("width", (d) => xScale.bandwidth())
            .attr("height", (d) => yScale.bandwidth())
            .attr("fill", (d) =>
                tempThreshold(dataset.baseTemperature + d.variance),
            )
            .on("mouseover", function (event, d) {
                d3.select(this).attr("stroke", "black");
                let date = new Date(d.year, d.month - 1);

                let tooltipString =
                    "<span class='text'>" +
                    d3.utcFormat("%Y - %B")(date) +
                    "</span>" +
                    "<br />" +
                    "<span class='text'>Temp: " +
                    d3.format(".1f")(dataset.baseTemperature + d.variance) +
                    "&#8451;" +
                    "</span>" +
                    "<br />" +
                    "<span class='text'>Variance: " +
                    d3.format("+.1f")(d.variance) +
                    "&#8451;" +
                    "</span>";

                tooltip
                    .attr("data-year", d.year)
                    .style("opacity", 0.7)
                    .style("left", xScale(d.year)! + 30 + "px")
                    .style("top", yScale(d.month - 1) + "px")
                    .html(tooltipString);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("stroke", "none");
                tooltip.style("opacity", 0);
            });

        // Legend
        const legendWidth = 400;
        const squareWidth = legendWidth / colors.length;
        const legendHeight = 30;

        const legendXScale = d3
            .scaleLinear()
            .domain([minTemp, maxTemp])
            .range([0, legendWidth]);

        const legendXAxis = d3
            .axisBottom(legendXScale)
            .tickValues([minTemp, ...tempThreshold.domain(), maxTemp])
            .tickFormat(d3.format(".1f"));

        const legend = svg
            .append("g")
            .attr("id", "legend")
            .attr(
                "transform",
                "translate(" +
                    (width / 2 - legendWidth / 2) +
                    ", " +
                    (margin.top + height + 50) +
                    ")",
            );

        legend
            .append("g")
            .attr("transform", "translate(0, " + legendHeight + ")")
            .call(legendXAxis);

        legend
            .append("g")
            .selectAll("rect")
            .data(tempThreshold.range())
            .enter()
            .append("rect")
            .attr("x", (d, i) => squareWidth * i)
            .attr("y", 0)
            .attr("width", squareWidth)
            .attr("height", legendHeight)
            .style("fill", (d, i) => colors[i]);

        // Clean-up function to remove SVG and other D3 elements
        return () => {
            d3.select(".heatmap").selectAll("*").remove();
        };
    }, [dataset]);

    return (
        <StyledDiv>
            <div className="heatmap"></div>
        </StyledDiv>
    );
};

export default HeatMap;
