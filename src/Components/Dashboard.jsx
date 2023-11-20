import { Grid } from "@mui/material";

import AccountWatchList from "./AccountWatchList";
import SingleBarschart from "./SingleBarschart";
import MultipleBarschart from "./MultipleBarschart";
import CurveChart from "./CurveChart";
import LeftNavbar from "./LeftNavbar";

// Constants
import { invoicesDataset, totalCashFlowDataset } from "../Utils/Constants";

export default function Dashboard() {
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={2}>
          <LeftNavbar />
        </Grid>
        <Grid
          item
          container
          xs={10}
          spacing={2}
          direction="row"
          sx={{
            bgcolor: "#F4F6F7",
            p: 2,
            ml: "-27px",
          }}
        >
          <Grid item xs={6}>
            <CurveChart />
          </Grid>
          <Grid item xs={6}>
            <SingleBarschart
              dataset={invoicesDataset}
              title={"Invoices owed to you"}
            />
          </Grid>
          <Grid item xs={6}>
            <MultipleBarschart
              dataset={totalCashFlowDataset}
              title={"Total cash flow"}
              multiBars={true}
            />
          </Grid>
          <Grid item xs={6}>
            <AccountWatchList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
