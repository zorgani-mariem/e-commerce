import { Hero, ShippingInfo } from "../../router"
import { Product } from "../product/Product"

export const Home = () => {
  return (
    <>
        <Hero/>
        <Product/>
        <ShippingInfo/>
    </>
  )
}  

export default Home