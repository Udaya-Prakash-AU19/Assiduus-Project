import { Box, Divider, Typography, styled } from "@mui/material";
import { useD3 } from "../Hooks/useD3.js";

import "../Styles/Barchart.scss";

export default function MultipleBarschart({ dataset = [], title = "" }) {
  const ref = useD3((svg) => {
    const svgHeight = 250;
    const svgWidth = 540;
    const usableWidth = 540 - 70; // taking width < svgWidth for accomodating the bars inside the svg element
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const xBarTextSpacing = 10;
    const barWidth = 15;

    // Space between each two bars
    var barSpacing = usableWidth / dataset.length;
    barSpacing = barSpacing + barSpacing / dataset.length;
    // xShift is needed so that the bars can be centered to the x axis values text
    const xShift = barSpacing / dataset.length;

    svg.attr("height", svgHeight).attr("width", svgWidth);

    // render bars
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "outer-bar")
      .attr("y", function (d) {
        return svgHeight - d.valueOut - margin.bottom - xBarTextSpacing;
      })
      .attr("height", function (d) {
        return d.valueOut;
      })
      .attr("x", function (d, i) {
        return barSpacing * i + xShift;
      })
      .attr("width", barWidth)
      .attr("rx", 5)
      .attr("ry", 5);

    svg
      .selectAll("rect rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "inner-bar")
      .attr("y", function (d) {
        return svgHeight - d.valueIn - margin.bottom - xBarTextSpacing;
      })
      .attr("height", function (d) {
        return d.valueIn;
      })
      .attr("x", function (d, i) {
        return barSpacing * i + xShift;
      })
      .attr("width", barWidth)
      .attr("rx", 5)
      .attr("ry", 5);

    // render x axis text
    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return d.key;
      })
      .attr("class", "x-text")
      .attr("y", function () {
        return svgHeight - margin.bottom + 13;
      })
      .attr("x", function (d, i) {
        return barSpacing * i + xShift + barWidth / 2;
      })
      .attr("text-anchor", "middle");
  });

  const StyledBox = styled(Box)({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  });

  const renderTopSection = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            py: 2.5,
          }}
        >
          {title}
        </Typography>
        <StyledBox>
          <StyledBox>
            <div className={"outer-bar-legend"}></div>
            <Typography variant="h6">In</Typography>
          </StyledBox>
          <StyledBox>
            <div className={"inner-bar-legend"}></div>
            <Typography variant="h6">Out</Typography>
          </StyledBox>
        </StyledBox>
      </Box>
    );
  };

  const renderChartSection = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <svg className="barchart" ref={ref}></svg>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100%",
        borderRadius: "10px",
        minWidth: "540px",
      }}
    >
      {renderTopSection()}
      <Divider />
      {renderChartSection()}
    </Box>
  );
}
