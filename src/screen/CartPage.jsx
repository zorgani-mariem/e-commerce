import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartActions, clearCart, selectTotalPrice, selectTotalQuantity } from '../redux/slice/cartSlice';
import BgImage from "../assets/common/Frame.png";
import { Title } from '../components/common/CustomComponents';
import StripeCheckout from 'react-stripe-checkout';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartItem = ({ id, cover, name, price, quantity, totalPrice }) => {
    const dispatch = useDispatch();

    const inCartitems = () => {
        dispatch(CartActions.addToCart({ id, name, price }));
    };

    const removeCartitem = () => {
        dispatch(CartActions.removeFromCart(id));
    };

    const removeCartitems = () => {
        dispatch(CartActions.removeFromAllCart(id));
    };

    return (
        <tr>
            <td className='px-16 py-5'>
                <img src={cover[0].image} alt={name} className='w-20' />
            </td>
            <td className='px-6 py-5'>{name}</td>
            <td className='px-6 py-5'>${price.toFixed(2)}</td>
            <td className='px-6 py-5'>
                <div className='flex items-center gap-3'>
                    <button onClick={inCartitems} className='w-12 h-12 grid place-content-center bg-gray-100 text-primary border border-gray-300'>
                        <BiPlus />
                    </button>
                    <input type="text" value={quantity} readOnly className='w-16 h-12 text-primary outline-none border border-gray-300 px-6' />
                    <button onClick={removeCartitem} className='w-12 h-12 grid place-content-center bg-gray-100 text-primary border border-gray-300'>
                        <BiMinus />
                    </button>
                </div>
            </td>
            <td className='px-6 py-5'>${totalPrice.toFixed(2)}</td>
            <td className='px-6 py-5'>
                <button onClick={removeCartitems} className='w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white'>
                    <IoCloseOutline size={25} />
                </button>
            </td>
        </tr>
    );
};

export const CartPage = () => {
    const totalQuantity = useSelector(selectTotalQuantity);
    const totalPrice = useSelector(selectTotalPrice);
    const cartItems = useSelector(state => state?.cart?.itemList);
    const isLogged = localStorage.getItem('isLogged') === 'true'; // Check if logged in
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleToken = (token) => {
        // Vous pouvez ajouter ici la logique pour gérer le token reçu
        dispatch(clearCart());
        try {
            
            Swal.fire({
              title: "order passed successfully",
              text: "thank you for your trust.",
              icon: "success",
              customClass: {
                confirmButton: 'primary-btn w-full',
              },
            });
          } catch (error) {
            console.error('Unexpected error:', error);
            Swal.fire({
              title: "Error",
              text: 'An unexpected error occurred. Please try again.',
              icon: "error",
              customClass: {
                confirmButton: 'primary-btn w-full',
              },
            });
          }
     };


 const handleCheckout = () => {
   if (isLogged) {
     if (totalPrice > 0) {
       // Logique pour démarrer le processus de paiement
       console.log('Proceeding to checkout');
     } else {
       // Si le panier est vide, afficher une alerte
       navigate('/shop');
       Swal.fire({
         title: "Cart is Empty",
         text: "Please add items to your cart before proceeding to checkout.",
         icon: "info",
         customClass: {
           confirmButton: 'primary-btn w-full',
         },
       });
     }
   } else {
     // Rediriger vers la page de connexion si non connecté
     navigate('/login');
     Swal.fire({
       title: "Login required",
       text: "Please log in to make payment.",
       icon: "warning",
       customClass: {
         confirmButton: 'primary-btn w-full',
       },
     });
   }
 };
 


    return (
        <>
            <section className='mt-16'>
                <div className='h-[50vh]'>
                    <div className='images absolute top-0 left-0 w-full h-1/2'>
                        <img src={BgImage} alt="Background" className='w-full h-full object-cover' />
                    </div>
                    <div className='text absolute top-48 left-1/2 transform -translate-x-1/2'>
                        <Title level={1}>Cart</Title>
                    </div>
                </div>

                <div className='container flex justify-between'>
                    <div className='w-5/6'>
                        <div className='relative overflow-x-auto sm:rounded-lg'>
                            <table className='w-full text-sm text-left rtl:text-right'>
                                <thead className='text-xs text-primary uppercase bg-gray-200'>
                                    <tr>
                                        <th scope='col' className='px-16 py-5'>Thumbnail</th>
                                        <th scope='col' className='px-6 py-5'>Product</th>
                                        <th scope='col' className='px-6 py-3'>Price</th>
                                        <th scope='col' className='px-16 py-3'>Quantity</th>
                                        <th scope='col' className='px-6 py-3'>Subtotal</th>
                                        <th scope='col' className='px-6 py-3'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((item) => (
                                        <CartItem
                                            key={item?.id}
                                            id={item?.id}
                                            cover={item?.cover}
                                            name={item?.name}
                                            price={item?.price}
                                            quantity={item?.quantity}
                                            totalPrice={item?.totalPrice}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='w-2/6 ml-16'>
                        <div className='bg-gray-100 p-5'>
                            <p className='text-lg font-medium text-primary'>Cart totals</p>
                            <hr className='my-2 h-[2px] bg-gray-200' />
                            <div className='text-lg font-medium text-primary flex items-center gap-5'>
                                <p className='w-32'>Subtotal</p>
                                <p className='text-sm font-normal'>${totalPrice.toFixed(2)}</p>
                            </div>
                            <hr className='my-3 h-[2px] bg-gray-200' />
                            <div className='text-lg font-medium text-primary flex items-center gap-5'>
                                <p className='w-32'>Shipping</p>
                                <p className='text-sm font-normal'>Enter your address to view shipping options</p>
                            </div>
                            <hr className='my-3 h-[2px] bg-gray-200' />
                            <div className='text-lg font-medium text-primary flex items-center gap-5'>
                                <p className='w-32'>Total</p>
                                <p className='text-sm font-normal'>${totalPrice.toFixed(2)}</p>
                            </div>
                            {isLogged ? (
                                totalPrice > 0 ? (
                                    <StripeCheckout
                                        token={handleToken}
                                        stripeKey='pk_test_51PdrsqFhwXifFrfIYsTo5nNZG660f8HmhZmdxQPZmLPYjO6b9tzU3keA4vcg6c7oitJQM2pWmciSE11BBHqHKH0n00l8W2JmM1'
                                        amount={totalPrice * 100} // Le montant doit être en centimes
                                        name="Gorkcoder Ecommerce website"
                                        email="mariem.zorgani@esprit.tn"
                                        description='Payment test using stripe checkout'
                                    >
                                        <button className='primary-btn mt-5'>Proceed To Checkout</button>
                                    </StripeCheckout>
                                ) : (
                                    <button className='primary-btn mt-5' onClick={handleCheckout}>Proceed To Checkout</button>
                                )
                            ) : (
                                <button className='primary-btn mt-5' onClick={handleCheckout}>Proceed To Checkout</button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;

export const CartPageCard = () => {
    return (
        <div>CartPage</div>
    );
};
