import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { CoffeeRating } from "./CoffeeRating";
import { ReactNode } from "react";

export interface CoffeeBlogData {
  coffeeName: string;
  coffeeRating: number;
  date: string;
  caption: string;
  coffeeType: string;
  additionalProperties: ReactNode;
}

export const CoffeeBlog: React.FC<CoffeeBlogData> = ({
  coffeeName,
  coffeeRating,
  caption,
  coffeeType,
  additionalProperties,
}) => {
  return (
    <Card variant="outlined" sx={{ m: 1, p: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h4">{coffeeName}</Typography>
          {/*<Typography variant="caption">
            {new Date(date).toLocaleDateString()}
          </Typography>*/}
        </Box>
        <Box display="flex" flexDirection="column">
          <Grid container spacing={1}>
            <Grid size={6}>
              <CoffeeRating value={coffeeRating} />
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">{coffeeType}</Typography>
            </Grid>
            {additionalProperties}
          </Grid>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {caption}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
