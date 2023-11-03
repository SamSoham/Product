import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ products }) {
  const { title, image, price, category, id } = products;
  let navigate = useNavigate();

  return (
    <Stack
      sx={{
        width: "250px",
        padding: "12px",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale3d(1.1, 1.1, 1)" },
      }}
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={image}
        width="180px"
        height="180px"
        style={{ objectFit: "contain" }}
        alt="Product"
      />
      <Stack sx={{ alignItems: "flex-start" }}>
        <Typography
          sx={{ fontSize: "14px", color: "#3E424B", fontWeight: "600" }}
        >
          {category}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#000000",
            width: "20ch",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#3E424B" }}>
          Rs.{price}
        </Typography>
      </Stack>
    </Stack>
  );
}
