import React from "react";
import FlareIcon from "@mui/icons-material/Flare";
import FlareBorderIcon from "@mui/icons-material/FlareOutlined";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#39e75f",
  },
});

interface Props {
  value: number;
}

export const VibesRating: React.FC<Props> = ({ value }) => {
  return (
    <StyledRating
      name="customized-color"
      defaultValue={value}
      getLabelText={(value: number) =>
        `${value} Vibes${value !== 1 ? "s" : ""}`
      }
      precision={0.5}
      icon={<FlareIcon fontSize="inherit" />}
      emptyIcon={<FlareBorderIcon fontSize="inherit" />}
      readOnly
    />
  );
};
