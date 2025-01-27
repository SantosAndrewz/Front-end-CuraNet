import React, { useEffect, useState } from "react";
import apiClient from "../api/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        apiClient
            .get("/products/")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch products. Please try again.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> - {product.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
