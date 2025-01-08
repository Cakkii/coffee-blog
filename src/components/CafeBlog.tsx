import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { CoffeeRating } from "./CoffeeRating";
import { VibesRating } from "./VibeRating";

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
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">{cafeName}</Typography>
          <Typography variant="caption">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle1">Coffee Rating</Typography>
              <CoffeeRating value={coffeeRating} />
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle1">Order</Typography>
              <Typography variant="body1">{order}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle1">Vibes Rating</Typography>
              <VibesRating value={vibesRating} />
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle1">Experience</Typography>
              <Typography variant="body1">
                {takeAway ? "Take away" : "Sit down"}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {caption}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button variant="outlined">View</Button>
      </CardActions>
    </Card>
  );
};
