import { useEffect, useRef, useState } from "react";
import { Box, Divider, MenuItem, Select, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import * as d3 from "d3";

import { MONTHS_LIST } from "../Utils/Constants";

import "../Styles/CurveChart.scss";

const CURVE_CHART_ACTIONS = [
  {
    label: "Manage",
    key: "manage",
  },
  {
    label: "Add",
    key: "add",
  },
  {
    label: "Delete",
    key: "delete",
  },
];

const deaultSelectItem = {
  label: "",
  key: "",
};
export default function CurveChart() {
  const ref = useRef();
  const [dataset, setDataset] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(deaultSelectItem);
  const [selectedAction, setSelectedAction] = useState(deaultSelectItem);

  let isDataUpdated = false;

  useEffect(() => {
    if (dataset.length === 0 && !isDataUpdated) {
      setData();
      isDataUpdated = true;
    }
  }, [dataset, selectedAction]);

  const createData = async () => {
    var arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        date: new Date(2023, 2, 9 + i).getDate(),
        value: Math.floor(Math.random() * 100) + 1,
      });
    }

    setDataset(arr);

    return arr;
  };

  const setData = async () => {
    const data = await createData();
    drawChart(data);
  };

  const drawChart = (data) => {
    const svgHeight = 250;
    const svgWidth = 540;
    const margin = { top: 20, right: 20, bottom: 30, left: 20 };

    const width = svgWidth - (margin.left + margin.right);
    const height = svgHeight - (margin.top + margin.bottom);

    const svg = d3.select(ref.current);
    // Removing the existing <g> element as for every change in data, there should be only one curve.
    const isCurveExist = svg.select("g") ? true : false;

    if (isCurveExist) {
      svg.select("g").remove();
    }

    svg.attr("width", svgWidth).attr("height", svgHeight);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .rangeRound([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).rangeRound([height, 0]);

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain")
      .remove();

    g.selectAll("g text").attr("class", "x-label");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#27b315")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  const handleSelectionChange = (e, SelectMenuList, category) => {
    const selectedValue = SelectMenuList.find(
      (item) => item.key === e.target.value
    );

    // To reset the data updating criteria so that the useEffect will proceed with creating new dataset to update curve on the UI.
    isDataUpdated = false;
    setDataset([]);

    if (category === "months") {
      setSelectedMonth(selectedValue);
    } else {
      setSelectedAction(selectedValue);
    }
  };

  const renderSelectionDropdown = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Select
          id="actions"
          value={selectedAction.key || CURVE_CHART_ACTIONS[0].key}
          sx={{
            width: "120px",
            height: "30px",
          }}
          IconComponent={(props) => (
            <i {...props} className={`material-icons ${props.className}`}>
              <ExpandMore fontSize="small" />
            </i>
          )}
          onChange={(e) =>
            handleSelectionChange(e, CURVE_CHART_ACTIONS, "actions")
          }
        >
          {CURVE_CHART_ACTIONS.map((action) => (
            <MenuItem key={action.key} value={action.key}>
              {action.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          id="months"
          size="small"
          value={selectedMonth.key || MONTHS_LIST[0].key}
          sx={{
            width: "120px",
            height: "30px",
          }}
          IconComponent={(props) => (
            <i {...props} className={`material-icons ${props.className}`}>
              <ExpandMore fontSize="small" />
            </i>
          )}
          onChange={(e) => handleSelectionChange(e, MONTHS_LIST, "months")}
        >
          {MONTHS_LIST.map((month) => (
            <MenuItem key={month.key} value={month.key}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  };

  const renderTopSection = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            py: 2.5,
            height: "20%",
          }}
        >
          Checking account
        </Typography>
        {renderSelectionDropdown()}
      </Box>
    );
  };

  const renderChartArea = () => {
    return (
      <Box
        sx={{
          height: "80%",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          textAlign: "center",
        }}
      >
        <svg ref={ref}></svg>
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
      {renderChartArea()}
    </Box>
  );
}
