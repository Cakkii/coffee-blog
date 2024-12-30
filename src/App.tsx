import Button from "@mui/material/Button";
import { getBlog } from "./utils/decryption-helper.ts";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CoffeeRating } from "./components/CoffeeRating.tsx";
import { VibesRating } from "./components/VibeRating.tsx";
function App() {
  const [password, setPassword] = useState("");

  const fetchData = async (url: string) => {
    try {
      console.log("Fetching from", url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();
        console.log(data);

        console.log(getBlog(data.trim(), password));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12} display="flex" justifyContent="center">
          <Typography variant="h2">Cakkii Coffee Blog</Typography>
        </Grid>
        <Grid size={1}></Grid>
        <Grid container size={10}>
          <Grid size={6}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                fetchData(window.location.origin + "/base64-enc");
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid size={6}>
            <Card variant="outlined">
              <CardHeader title="Example Cafe" />
              <CardContent>
                <Box display="flex" flexDirection="column">
                  <Box display="fex" justifyContent="end">
                    <Typography variant="caption">26/12/24</Typography>
                  </Box>
                  <CoffeeRating value={2} />
                  <VibesRating value={2} />
                </Box>
              </CardContent>

              <CardActions>
                <Button>View</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid size={1}></Grid>
        <Grid size={12}>
          <Typography variant="body1">This is the footer</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
