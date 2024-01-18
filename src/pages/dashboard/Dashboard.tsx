import * as React from "react";
import Box from "@mui/material/Box";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import {
  CurrentUser,
  loggedInUserProfile,
} from "../../redux/features/authReducer";
import { useAppSelector } from "../../redux/hooks";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        React Task
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const paperStyle = {
  padding: "16px",
  backgroundColor: "#f5f5f5",
};

const titleStyle = {
  marginBottom: "8px",
};

const userInfoStyle = {
  marginTop: "16px",
};

const typoStyle = {
  marginTop: "8px",
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const currentUser: CurrentUser = useAppSelector(loggedInUserProfile);

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={3} style={paperStyle}>
                <Typography variant="h6" style={titleStyle}>
                  User Information
                </Typography>
                <div style={userInfoStyle}>
                  <Typography style={typoStyle}>
                    Email: {currentUser?.email}
                  </Typography>
                  <Typography style={typoStyle}>
                    User ID: {currentUser?.id}
                  </Typography>
                  <Typography style={typoStyle}>
                    Joined At: {currentUser?.joined_at}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </>
  );
}
