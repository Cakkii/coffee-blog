import Button from "@mui/material/Button";
import { getBlog } from "./utils/decryption-helper.ts";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CoffeeRating } from "./components/CoffeeRating.tsx";
import { VibesRating } from "./components/VibeRating.tsx";
import { CafeBlog } from "./components/CafeBlog.tsx";
import { CoffeeBlog } from "./components/CoffeeBlog.tsx";

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
            <CoffeeBlog
              cafeHeader="Example coffee"
              coffeeRating={3.5}
              date={new Date("2024-01-04")}
              coffeeType="Iced batch brew"
              caption="Had nice fruity taste to it, but it just wasn't there. I find that water based ice coffees' are impacted by the flavour of ice"
            />
          </Grid>
          <Grid size={6}>
            <CafeBlog
              cafeHeader="Example cafe"
              coffeeRating={2}
              vibesRating={4}
              date={new Date("2024-12-26")}
              caption="This cafe had good vibes but its coffee was less than alright. I'd
            pick a maccas coffee over this"
              coffeeType="Small flate white"
              takeAway={false}
            />
          </Grid>
        </Grid>
        <Grid size={1}></Grid>
        <Grid size={12}>
          <Typography variant="body1">
            This is the footer and a test commit!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
