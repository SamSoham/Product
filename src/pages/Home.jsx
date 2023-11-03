import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import Lottie from "react-lottie";
import Loading from "../loading.json";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("0");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  function handleChange(event) {
    setCategory(event.target.value);
  }

  function handleChange1(event) {
    setType(event.target.value);
    let param = event.target.value;
    if (param === "1") {
      setProducts(products.sort((a, b) => (a.price > b.price ? 1 : -1)));
    } else if (param === "2") {
      setProducts(products.sort((a, b) => (a.price < b.price ? 1 : -1)));
    } else if (param === "0") {
      fetchProducts();
    }
  }

  async function fetchProducts() {
    setLoading(true);
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setProducts(json);
        if (json.length%10 < 5 && json.length%10 !=0) {
            setCount((Math.round(json.length / 10))+1);
          } else {
            setCount(Math.round(json.length / 10));
          }
      });
  }

  async function fetchByCategory() {
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        if (json.length%10 < 5) {
          setCount((Math.round(json.length / 10))+1);
        } else {
          setCount(Math.round(json.length / 10));
        }
        setLoading(false);
      });
  }

  function handlePage(event, value) {
    setPage(value - 1);
  }

  useEffect(() => {
    if (category === "all") {
      fetchProducts();
    } else {
      fetchByCategory();
    }
  }, [category]);

  return (
    <Stack gap="16px">
      <Stack justifyContent="space-between" alignItems="center" sx={{flexDirection:{xs:"column",sm:"row"}}}>
        <Stack  direction="row" alignItems="center"  sx={{width:{xs:"100%",sm:"fit-content"}}}>
        <img src="/logo.jpg" alt="Logo" width="150px" height="100px" />
        <Typography sx={{fontSize:"24px",fontWeight:"600"}}>Shoping Cart</Typography>
        </Stack>
      <Stack sx={{ padding: "16px",flexDirection:{xs:"column",sm:"row"},gap:"16px",alignItems:"center",justifyContent:"flex-end",width:{xs:"100%",sm:"fit-content"} }}>
        <FormControl sx={{width:{xs:"100%",sm:"fit-content"}}}>
          <InputLabel style={{ backgroundColor: "white" }}>Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChange}
            sx={{ width: {xs:"full-width",sm:"200px"} }}
          >
            <MenuItem value={"all"}>
              <Typography>All Products</Typography>
            </MenuItem>
            <MenuItem value={"electronics"}>
              <Typography>Electronics</Typography>
            </MenuItem>
            <MenuItem value={"jewelery"}>
              <Typography>Jewelery</Typography>
            </MenuItem>
            <MenuItem value={"men's clothing"}>
              <Typography>Men's clothing</Typography>
            </MenuItem>
            <MenuItem value={"women's clothing"}>
              <Typography>Women's clothing</Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{width:{xs:"100%",sm:"fit-content"}}}>
          <InputLabel style={{ backgroundColor: "white" }}>Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={handleChange1}
            sx={{ width:{xs:"full-width",sm:"200px"} }}
          >
            <MenuItem value={"0"}>
              <Typography>Default</Typography>
            </MenuItem>
            <MenuItem value={"1"}>
              <Typography>Price Low to High</Typography>
            </MenuItem>
            <MenuItem value={"2"}>
              <Typography>Price High to Low</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      </Stack>
      {loading && (
        <Stack
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            options={{ animationData: Loading, autoplay: true, loop: true }}
            height={300}
            width={300}
          />
        </Stack>
      )}
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gridGap: "8px",
          justifyItems: "center",
          minHeight: "70vh",
        }}
      >
        {products.length > 0 &&
          products
            .slice(page * 10, (page + 1) * 10)
            .map((x) => <ProductCard products={x} key={x.id} />)}
        {!products.length > 0 && !loading && (
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert severity="warning" onClose={() => setOpen(false)}>
              <Typography sx={{ fontSize: "16px" }}>
                Failed to Fetch Items
              </Typography>
            </Alert>
          </Snackbar>
        )}
      </Stack>
      <Stack sx={{ alignItems: "center", padding: "12px" }}>
        <Pagination page={page + 1} count={count} onChange={handlePage} />
      </Stack>
    </Stack>
  );
}
