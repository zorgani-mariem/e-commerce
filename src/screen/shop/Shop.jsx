import { productlists } from "../../assets/data/data";
import Header from "../../components/common/Header";
import {  Hero, ProductCard } from "../../router";

 
export const Shop = () => {
   return (
    <>
        <section className="container mt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {productlists.map((product) => (
                <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                color={product.color}
                price={product.price}
                images={product.images}
                discount={product.discount}
                rating={product.rating}
                featured={product.featured}
                category={product.category}
                />
            ))}
        </section> 
    </>
   )
};