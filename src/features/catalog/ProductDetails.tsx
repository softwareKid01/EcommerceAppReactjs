import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product";

function ProductDetails(){

    const {id} = useParams<{id:string}>(); // use this to get some data from the url, in this case we are looking for a number/id
    const [product,setProduct] = useState<Product | null>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:7188/api/Products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false));
    },[id])

if(loading)return <h1>LOADING...</h1>

if(!product) return <h1>Product not found</h1>

    return(
    <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
        </Grid>

        <Grid item xs={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{mb:2}}/>
            <Typography variant="h4" color="secondary">{(product.price/100).toFixed(2)}</Typography>
        </Grid>
    </Grid>
    );
}
export default ProductDetails;