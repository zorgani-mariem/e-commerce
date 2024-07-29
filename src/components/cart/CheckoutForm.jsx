import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";

export const CheckoutForm = ({total , handlePaymentSuccess}) => {
    const dispatch = useDispatch()
    const handleToken = token =>{
        handlePaymentSuccess()
        dispatch(clearCart())
    }
  return (
    <>
        <StripeCheckout
            token={handleToken}
            stripeKey='your-stripe-public-key'
            amount={totalPrice * 100}
            name="Gorkcoder Food Store"                email="gorkcoder@gmail.com"
            description='Payment test using stripe checkout'
        >
            <button className='primary-btn mt-5'>Proceed To Checkout</button>
        </StripeCheckout>
    </>
  )
};