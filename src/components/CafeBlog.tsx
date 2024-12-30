import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { CoffeeRating } from "./CoffeeRating";
import { VibesRating } from "./VibeRating";

interface Props {
  cafeHeader: string;
  coffeeRating: number;
  vibesRating: number;
  date: Date;
  caption: string;
}

export const CoffeeBlog: React.FC<Props> = ({
  cafeHeader,
  coffeeRating,
  vibesRating,
  date,
  caption,
}) => {
  return (
    <Card variant="outlined">
      <CardHeader title={cafeHeader} subheader={date.toString()} />
      <CardContent>
        <Box display="flex" flexDirection="column" sx={{ mt: -1.5 }}>
          <CoffeeRating value={coffeeRating} />
          <VibesRating value={vibesRating} />
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
