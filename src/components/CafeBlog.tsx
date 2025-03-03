import { Typography, Grid2 as Grid } from "@mui/material";
import { VibesRating } from "./VibeRating";
import { CoffeeBlog } from "./CoffeeBlog";

export interface CafeBlogData {
  cafeName: string;
  coffeeRating: number;
  vibesRating: number;
  date: string;
  caption: string;
  order: string;
  takeAway: boolean;
}

export const CafeBlog: React.FC<CafeBlogData> = ({
  cafeName,
  coffeeRating,
  vibesRating,
  date,
  caption,
  order,
  takeAway,
}) => (
  <CoffeeBlog
    coffeeName={cafeName}
    coffeeRating={coffeeRating}
    date={date}
    caption={caption}
    coffeeType={order}
    additionalProperties={
      <>
        <Grid size={6}>
          <Typography variant="body1">
            {takeAway ? "Take away" : "Sit down"}
          </Typography>
        </Grid>
        <Grid size={6}>
          <VibesRating value={vibesRating} />
        </Grid>
      </>
    }
  />
);
