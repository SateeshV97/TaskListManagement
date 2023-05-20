import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthorized, setSnackbarStatus } from "../redux/slices/TaskSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credentials = { username: "admin", password: "admin@123" };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("email") === credentials.username &&
      data.get("password") === credentials.password
    ) {
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "success",
          message: "Login Successfully",
        })
      );
      setTimeout(() => {
        navigate("/viewTasks");
      }, 1000);
      localStorage.setItem("isAuthorized", true);
    } else {
      dispatch(
        setSnackbarStatus({
          open: true,
          severity: "error",
          message: "Login Failed!",
        })
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        id="error-page"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                style={{ cursor: "pointer" }}
                variant="body2"
                onClick={() => {
                  dispatch(
                    setSnackbarStatus({
                      open: true,
                      severity: "info",
                      message: "Page not found!",
                    })
                  );
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                style={{ cursor: "pointer" }}
                variant="body2"
                onClick={() => {
                  dispatch(
                    setSnackbarStatus({
                      open: true,
                      severity: "info",
                      message: "Page not found!",
                    })
                  );
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
