import React from "react";
import CoffeeIcon from "@mui/icons-material/Coffee";
import CoffeeBorderIcon from "@mui/icons-material/CoffeeOutlined";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#563618",
  },
});

interface Props {
  value: number;
}

export const CoffeeRating: React.FC<Props> = ({ value }) => {
  return (
    <StyledRating
      name="customized-color"
      defaultValue={value}
      precision={0.5}
      icon={<CoffeeIcon fontSize="inherit" />}
      emptyIcon={<CoffeeBorderIcon fontSize="inherit" />}
      sx={{ pb: 1 }}
      readOnly
    />
  );
};
