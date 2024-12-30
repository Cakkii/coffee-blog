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
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CoffeeIcon from "@mui/icons-material/Coffee";

import CoffeeBorderIcon from "@mui/icons-material/CoffeeOutlined";

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

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#563618",
    },
    "& .MuiRating-iconHover": {
      color: "ff3d47",
    },
  });

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
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value: number) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={0.5}
                    icon={<CoffeeIcon fontSize="inherit" />}
                    emptyIcon={<CoffeeBorderIcon fontSize="inherit" />}
                  />
                  <Rating name="coffee" value={3} precision={0.5} readOnly />
                  <Rating name="vibes" value={3.5} precision={0.5} readOnly />
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
