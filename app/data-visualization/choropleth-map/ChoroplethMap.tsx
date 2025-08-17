import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import * as topojson from "topojson-client";
import { Topology } from "topojson-specification";
import { FeatureCollection } from "geojson";

const StyledDiv = styled.div`
    background-color: #4287f5;
    min-height: 1000px;
    height: 100vh;
    min-width: 1300px;
    width: 100vw;
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

    .choropleth {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        padding: 10px;
    }

    .states {
        fill: none;
        stroke: #fff;
        stroke-linejoin: round;
    }

    .counties {
        fill: none;
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

interface EducationData {
    fips: number;
    state: string;
    area_name: string;
    bachelorsOrHigher: number;
}

const ChoroplethMap = () => {
    const [countyData, setCountyData] = useState<Topology | null>(null);
    const [educationData, setEducationData] = useState<EducationData[]>([]);

    const countyDataURL =
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
    const educationDataURL =
        "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countyResponse = await fetch(countyDataURL);
                const countyJson = await countyResponse.json();
                setCountyData(countyJson);

                const educationResponse = await fetch(educationDataURL);
                const educationJson = await educationResponse.json();
                setEducationData(educationJson);
            } catch (err) {
                console.error("Error fetching data:", err);
                setCountyData(null);
                setEducationData([]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!countyData || educationData.length === 0) return;

        // Choropleth Map Properties
        const margin = { top: 50, right: 50, bottom: 50, left: 100 };
        const fullWidth = 1100;
        const fullHeight = 700;
        const width = fullWidth - margin.right - margin.left;
        const height = fullHeight - margin.top - margin.bottom;

        // Define SVG
        const svg = d3
            .select(".choropleth")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")",
            );

        // Color Scale
        const percentages = educationData.map((data) => data.bachelorsOrHigher);

        const minPercent = d3.min(percentages) as number;
        const maxPercent = d3.max(percentages) as number;

        const calculateThreshold = (
            min: number,
            max: number,
            count: number,
        ): number[] => {
            let arr = [];
            let step = (max - min) / count;
            let base = min;
            for (let i = 1; i < count; i++) {
                arr.push(base + i * step);
            }
            return arr;
        };

        const colorScale = d3
            .scaleThreshold<number, string>()
            .domain(calculateThreshold(minPercent, maxPercent, 9))
            .range(d3.schemeBlues[9]);

        // Legend
        const legendWidth = 300;
        const legendHeight = 30;

        const legend = svg
            .append("g")
            .attr("id", "legend")
            .attr("transform", "translate(0, 0)");

        const legendScale = d3
            .scaleLinear()
            .domain([minPercent, maxPercent])
            .range([0, legendWidth]);

        const legendAxis = d3
            .axisBottom(legendScale)
            .tickSize(13)
            .tickFormat((data: any) => Math.round(data) + "%")
            .tickValues([minPercent, ...colorScale.domain(), maxPercent]);

        legend
            .append("g")
            .attr("transform", "translate(600, 0)")
            .call(legendAxis);

        legend
            .selectAll("rect")
            .data(colorScale.range())
            .enter()
            .append("rect")
            .attr("height", 10)
            .attr("width", (d) => legendWidth / colorScale.range().length)
            .attr("x", (d, i) => (legendWidth / colorScale.range().length) * i)
            .attr("y", 0)
            .attr("transform", "translate(600, 0)")
            .style("fill", (d) => d);

        // Counties and Tooltips
        const tooltip = d3
            .select(".choropleth")
            .append("div")
            .attr("id", "tooltip")
            .style("opacity", 0);

        svg.append("g")
            .selectAll("path")
            .attr("class", "counties")
            .data(
                (
                    topojson.feature(
                        countyData,
                        countyData.objects.counties,
                    ) as FeatureCollection
                ).features,
            )
            .enter()
            .append("path")
            .attr("class", "county")
            .attr("data-fips", (d: any) => d.id)
            .attr("data-education", (d) => {
                let result = educationData.filter((obj) => {
                    return obj.fips === d.id;
                });
                if (result[0]) {
                    return result[0].bachelorsOrHigher;
                }
                console.log("Could not find data for: " + d.id);
                return 0;
            })
            .attr("fill", (d) => {
                let result = educationData.filter((obj) => {
                    return obj.fips === d.id;
                });
                if (result[0]) {
                    return colorScale(result[0].bachelorsOrHigher);
                }
                console.log("Could not color: " + d.id);
                return colorScale(0);
            })
            .attr("d", d3.geoPath())
            .on("mouseover", function (event, d) {
                tooltip
                    .attr("data-education", () => {
                        var result = educationData.filter(function (obj) {
                            return obj.fips === d.id;
                        });
                        if (result[0]) {
                            return result[0].bachelorsOrHigher;
                        }
                        return 0;
                    })
                    .style("opacity", 0.8)
                    .html(() => {
                        let result = educationData.find(
                            (obj) => obj.fips === d.id,
                        );
                        if (result) {
                            return `${result.area_name}, ${result.state}: ${result.bachelorsOrHigher}%`;
                        }
                        return "";
                    })
                    .style("left", event.offsetX + "px")
                    .style("top", event.offsetY + "px");
            })
            .on("mouseout", function () {
                tooltip.style("opacity", 0);
            });

        // States
        svg.append("path")
            .datum(
                topojson.mesh(
                    countyData,
                    countyData.objects.states as any,
                    function (a, b) {
                        return a !== b;
                    },
                ),
            )
            .attr("class", "states")
            .attr("d", d3.geoPath());

        return () => {
            d3.select(".choropleth").selectAll("*").remove();
        };
    }, [countyData, educationData]);

    return (
        <StyledDiv>
            <div id="app">
                <h1 id="title">United States Educational Attainment</h1>
                <h4 id="description">
                    Percentage of adults age 25 and older with a bachelor&apos;s
                    degree or higher (2010-2014)
                </h4>
                <div className="choropleth"></div>
                <p>
                    Source:{" "}
                    <a href="https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx">
                        USDA Economoic Research Service
                    </a>
                </p>
            </div>
        </StyledDiv>
    );
};

export default ChoroplethMap;
