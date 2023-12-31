import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import DashboardPIDChart from "./dashboard-pid-chart";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
type PIDTabProps = {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  interval: number;
  rotations: number[];
  errors: number[];
  refresh: () => void;
  connected: boolean;
};
const PIDTab: React.FC<PIDTabProps> = (props: PIDTabProps) => {
  const { onFormSubmit, interval, rotations, errors, refresh, connected } =
    props;
  return (
    <form onSubmit={(event) => onFormSubmit(event)}>
      <Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "75%", overflow: "auto" }}>
              <DashboardPIDChart
                interval={interval}
                rotations={rotations}
                errors={errors}
              />
              {/* <IconButton color="primary" onClick={refresh}>
                <RefreshIcon />
              </IconButton> */}
              {connected ? (
                <p>Connected to PID Feed</p>
              ) : (
                <p>Failed to connect to PID Feed</p>
              )}
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl>
            <FormLabel>PID Graph Options</FormLabel>
            <FormGroup row sx={{ justifyContent: "space-around" }}>
              <TextField
                id="seconds"
                label="Time Period (s)"
                variant="outlined"
                type="number"
                helperText="Choose the last n seconds to display on the graph."
                sx={{ mx: 1 }}
              />
            </FormGroup>
          </FormControl>
        </Grid> */}
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>PID Constants</FormLabel>
            <FormGroup row sx={{ justifyContent: "space-around" }}>
              <TextField
                id="kp"
                label="kp"
                variant="outlined"
                type="number"
                sx={{ mx: 1 }}
              />
              <TextField
                id="ki"
                label="ki"
                variant="outlined"
                type="number"
                sx={{ mx: 1 }}
              />
              <TextField
                id="kd"
                label="kd"
                variant="outlined"
                type="number"
                sx={{ mx: 1 }}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default PIDTab;
