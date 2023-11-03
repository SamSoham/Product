import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Rating, Snackbar, Stack, Typography } from "@mui/material";
import Loading from "../loading.json";
import Lottie from "react-lottie";

export default function Product() {
  const productId = useParams();
  const navigate = useNavigate()
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  async function getItem() {
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/${productId.id}`)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setItem(json);
      });
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
    <Stack  direction="row" alignItems="center"  sx={{width:{xs:"100%",sm:"fit-content"},marginBottom:"16px",cursor:"pointer"}} onClick={()=>navigate('/')}>
    <img src="/logo.jpg" alt="Logo" width="150px" height="100px" />
    <Typography sx={{fontSize:"24px",fontWeight:"600"}}>Shoping Cart</Typography>
    </Stack>
    <Stack sx={{
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {loading && (
        <Stack
          
        >
          <Lottie
            options={{ animationData: Loading, autoplay: true, loop: true }}
            height={300}
            width={300}
          />
        </Stack>
      )}
      {!Object.keys(item).length > 0 && !loading && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="warning" onClose={() => setOpen(false)}>
            <Typography sx={{ fontSize: "16px" }}>Item Not Found</Typography>
          </Alert>
        </Snackbar>
      )}
      {Object.keys(item).length > 0 && (
        <Stack sx={{ flexDirection: {xs:"column",sm:"row"},alignItems:"center",padding:"12px",width:{xs:"95vw",sm:"95vw",md:"75vw"},gap:"16px" }}>
          <img src={item.image} alt="Product" style={{maxWidth:"250px",height:"270px"}} />
          <Stack direction="column" gap="8px">
            <Typography sx={{fontSize:"14px",color:"#3E424B",fontWeight:"600"}}>{item.category}</Typography>
            <Typography sx={{fontSize:"24px",fontWeight:"600"}}>{item.title}</Typography>
           <Stack direction="row" alignItems="center" gap="16px"> 
           <Rating precision={0.5} value={item.rating.rate} readOnly />
           <Typography sx={{fontSize:"16px",color:"#3E424B",fontWeight:"500",height:"100%"}}>{item.rating.count} reviews  </Typography>
           </Stack>
            <Typography sx={{fontSize:"14px",color:"#3E424B"}}>{item.description}</Typography>
            <Typography sx={{fontSize:"20px",fontWeight:"600"}}>Rs.{item.price}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
    </>
  );
}
