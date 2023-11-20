import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useD3 } from "../Hooks/useD3.js";

import "../Styles/Barchart.scss";

function SingleBarschart({ dataset = [], title = "" }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploadFile, setIsUploadFile] = useState(false);

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
      .attr("class", "single-bar")
      .attr("y", function (d) {
        return svgHeight - d.value - margin.bottom - xBarTextSpacing;
      })
      .attr("height", function (d) {
        return d.value;
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

  const handleBtnClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  function handleFileUploadInputChange(event) {
    setFile(event.target.files[0]);
  }

  const handleFileUploadBtnClick = () => {
    console.log("file", file);
    if (file) {
      setIsUploadFile(true);
      const timer = setInterval(() => {
        console.log("open set");
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearTimeout(timer);
            setIsUploadFile(false);
            setOpen(false);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    } else {
      setOpen(false);
    }
  };

  const renderTopSection = () => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
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
          {title}
        </Typography>
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#e9effa",
            color: "#27b315",
            "&:hover": { bgcolor: "#e9effa" },
          }}
          onClick={handleBtnClick}
        >
          New Sales Invoice
        </Button>
      </Stack>
    );
  };

  const renderChartSection = () => {
    return (
      <Box
        sx={{
          height: "80%",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
          textAlign: "center",
        }}
      >
        <svg className="barchart" ref={ref}></svg>
      </Box>
    );
  };

  const renderFileUploadDialogue = () => {
    console.log("isUploadFile bool", isUploadFile);

    return (
      <Dialog open={open} onClose={handleDialogClose} fullWidth>
        {!isUploadFile && <DialogTitle>Upload File</DialogTitle>}
        <DialogContent>
          {!isUploadFile ? (
            <form>
              <TextField type="file" onChange={handleFileUploadInputChange} />
              <Box sx={{ textAlign: "end", mt: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFileUploadBtnClick}
                >
                  Upload
                </Button>
              </Box>
            </form>
          ) : (
            <Box>
              <Typography
                sx={{
                  m: "20px",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <b>
                    Please be patient...&#129299; No file is being uploaded.
                  </b>
                  <br />
                  Just Simulating file upload.
                </Box>
                <p></p>
              </Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100%",
        borderRadius: "10px",
        minWidth: "550px",
      }}
    >
      {renderTopSection()}
      <Divider />
      {renderChartSection()}
      {renderFileUploadDialogue()}
    </Box>
  );
}

export default SingleBarschart;
