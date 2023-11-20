import React from "react";

import "../Styles/Barchart.scss";

// Under progress (Just for enhancement)
const hocBarChartComponent = (WrappedComponent) => {
  class HocBarChartComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <HocBarChartComponent {...props} forwardedRef={ref} />;
  });
};

export default hocBarChartComponent;
// export default function HocCustomBarchart({
//   dataset = [],
//   title = "",
//   multiBars = false,
// }) {
//   const ref = useD3((svg) => {
//     const svgHeight = 250;
//     const svgWidth = 540;
//     const usableWidth = 540 - 70; // taking width < svgWidth for accomodating the bars inside the svg element
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const xBarTextSpacing = 10;
//     const barWidth = 15;

//     // Space between each two bars
//     var barSpacing = usableWidth / dataset.length;
//     barSpacing = barSpacing + barSpacing / dataset.length;
//     // xShift is needed so that the bars can be centered to the x axis values text
//     const xShift = barSpacing / dataset.length;

//     svg.attr("height", svgHeight).attr("width", svgWidth);

//     // render bars
//     svg
//       .selectAll("rect")
//       .data(dataset)
//       .enter()
//       .append("rect")
//       .attr("class", "outer-bar")
//       .attr("y", function (d) {
//         return svgHeight - d.value - margin.bottom - xBarTextSpacing;
//       })
//       .attr("height", function (d) {
//         return d.value;
//       })
//       .attr("x", function (d, i) {
//         return barSpacing * i + xShift;
//       })
//       .attr("width", barWidth)
//       .attr("rx", 5)
//       .attr("ry", 5);

//     // render x axis text
//     svg
//       .selectAll("text")
//       .data(dataset)
//       .enter()
//       .append("text")
//       .text(function (d) {
//         return d.key;
//       })
//       .attr("class", "inner-bar")
//       .attr("y", function () {
//         return svgHeight - margin.bottom + 13;
//       })
//       .attr("x", function (d, i) {
//         return barSpacing * i + xShift + barWidth / 2;
//       })
//       .attr("text-anchor", "middle");

//     // if (multiBars) {
//     //   svg
//     //     .selectAll("rect")
//     //     .data(dataset)
//     //     .enter()
//     //     .append("rect")
//     //     .attr("class", "bar")
//     //     .attr("y", function (d) {
//     //       return svgHeight - d.value - margin.bottom - xBarTextSpacing;
//     //     })
//     //     .attr("height", function (d) {
//     //       return d.value;
//     //     })
//     //     .attr("x", function (d, i) {
//     //       return barSpacing * i + xShift;
//     //     })
//     //     .attr("width", barWidth)
//     //     .attr("rx", 5)
//     //     .attr("ry", 5);
//     // }
//   });

//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         height: "100%",
//         borderRadius: "10px",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           py: 2.5,
//           pl: 2,
//           height: "20%",
//         }}
//       >
//         {title}
//       </Typography>
//       <Divider />
//       <Box
//         sx={{
//           height: "80%",
//           borderBottomRightRadius: "10px",
//           borderBottomLeftRadius: "10px",
//           textAlign: "center",
//         }}
//       >
//         <svg className="barchart" ref={ref}></svg>
//       </Box>
//     </Box>
//   );
// }
