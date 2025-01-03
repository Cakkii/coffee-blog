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

interface Props {
  cafeHeader: string;
  coffeeRating: number;
  vibesRating: number;
  date: Date;
  caption: string;
  coffeeType: string;
}

export const CafeBlog: React.FC<Props> = ({
  cafeHeader,
  coffeeRating,
  vibesRating,
  date,
  caption,
  coffeeType,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">{cafeHeader}</Typography>
          <Typography variant="caption">{date.toLocaleDateString()}</Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle1">Coffee</Typography>
              <CoffeeRating value={coffeeRating} />
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle1">Order</Typography>
              <Typography variant="body1">{coffeeType}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle1">Vibes</Typography>{" "}
              <VibesRating value={vibesRating} />
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
