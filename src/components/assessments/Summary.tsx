/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import GlobalVariables from "../../context/GlobalVariables";

import Button from "../generic/Button";

interface Props {
  selectedPosition: string;
  setSelectedPosition: (position: string) => void;
}

const Summary = (props: Props) => {
  const { userPositions, positionAssessments } = useContext(GlobalVariables);
  const [grades, setGrades] = useState<(number | undefined)[]>([]);
  const lineChart: any = useRef();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelectedPosition(event.target.value);
  };

  useEffect(() => {
    if (positionAssessments) {
      const gradeArray = [];

      for (const assessment of positionAssessments) {
        gradeArray.push(assessment.grade);
      }

      setGrades(gradeArray);
    }
  }, []);

  useEffect(() => {
    // set up svg
    const width = 700;
    const height = 400;
    const svg = d3
      .select(lineChart.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible");

    // set up scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, positionAssessments!.length - 1])
      .range([0, width]);
    const yScale: any = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale);

    // set up axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(grades.length)
      .tickFormat((i: any) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
    svg.append("g").call(yAxis);

    // set up data
    svg
      .selectAll(".line")
      .data([grades])
      .join("path")
      .attr("d", (d: any) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [positionAssessments]);

  return (
    <>
      <p className="fs-24 mb-2">
        Select a position to view past assessments, or add a new position
      </p>
      <select
        className="fs-24 py-1 mb-2"
        style={{
          width: "500px",
          textAlign: "center",
          appearance: "none",
        }}
        defaultValue="default"
        onChange={handleSelectChange}
      >
        <option value="default" disabled>
          - Select Position -
        </option>
        {userPositions?.map((element, index) => {
          return (
            <option value={element.id} key={index}>
              {element.position}
            </option>
          );
        })}
      </select>
      <div className="row">
        <Button mode="outline" type="button" className="fs-24">
          New Position
        </Button>
      </div>
      {props.selectedPosition && (
        <div
          className="row mt-2"
          style={{
            width: "700px",
            height: "400px",
            border: "1px solid rgb(var(--black))",
            marginInline: "auto",
          }}
        >
          <svg ref={lineChart}></svg>
        </div>
      )}
    </>
  );
};

export default Summary;
