import { useState, useEffect } from 'react';
import { IoCartOutline, IoCloseOutline, IoHeartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { CartActions, selectTotalPrice, selectTotalQuantity } from '../../redux/slice/cartSlice';
import { BodyOne, Title } from '../common/CustomComponents';
import { NavLink } from 'react-router-dom';
import { favoriteActions, selectTotalFavorites } from '../../redux/slice/favouriteSlice';

export const ModelCart = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const totalFavorite = useSelector(selectTotalFavorites);

  const cartItems = useSelector(state => state?.cart?.itemList);
  const favoriteItems = useSelector(state => state?.favorites?.favoritesItemList);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowX = 'hidden';
  };

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflowX = 'auto';
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const styles = `
      .cart-content {
        max-height: calc(100vh - 120px); /* ajustez en fonction de votre mise en page */
        overflow-y: auto;
      }
    `;
    document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

    return () => {
      document.head.querySelector('style:last-of-type').remove(); // Nettoyer le style lors du démontage du composant
    };
  }, []);

  const clearFavorites = () => {
    dispatch(favoriteActions.clearFavorites());
  };

  return (
    <>
      <button className="relative z-20" onClick={() => {
        setActiveTab('wishlist');
        openModal();
      }}>
        <IoHeartOutline size={23} />
        <div className="absolute -top-2 -right-1.5">
          <span className="bg-primary-green rounded-full px-1 text-white">{totalFavorite}</span>
        </div>
      </button>

      <button className="relative z-20" onClick={() => {
        setActiveTab('cart');
        openModal();
      }}>
        <IoCartOutline size={23} />
        <div className="absolute -top-2 -right-1.5">
          <span className="bg-primary-green rounded-full px-1 text-white">{totalQuantity}</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div className="cartoverlay" onClick={closeModal}></div>
          <div className={`cartmodel p-6 text-primary ${isClosing ? 'closing' : ''}`}>
            <div className="flex justify-between gap-5">
              <button
                className={`flex items-center gap-2 font-medium ${activeTab === 'cart' ? 'text-primary' : ''}`}
                onClick={() => handleTabChange('cart')}
              >
                Shopping Cart
                <span className="w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-primary">{totalQuantity}</span>
              </button>
              <button
                className={`flex items-center gap-2 font-medium ${activeTab === 'wishlist' ? 'text-primary' : ''}`}
                onClick={() => handleTabChange('wishlist')}
              >
                Wishlist
                <span className="w-7 h-7 text-[11px] font-normal rounded-full text-white grid place-content-center bg-primary">{totalFavorite}</span>
              </button>
            </div>

            <div className="line-container">
              <div className={`line ${activeTab === 'cart' ? 'active' : ''}`}></div>
              <div className={`line ${activeTab === 'wishlist' ? 'active' : ''}`}></div>
            </div>
            <div className="cart-content">
              {activeTab === 'cart' ? (
                <>
                  {cartItems?.map((item) => (
                    <CartProduct
                      key={item.id}
                      id={item.id}
                      cover={item.cover}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))}
                  <div className='total flex items-center justify-between mt-10'>
                    <Title level={6}>SubTotal</Title>
                    <Title level={6}>${totalPrice.toFixed(2)}</Title>
                  </div>

                  <NavLink to="/cart">
                    <button className='primary-btn w-full' onClick={closeModal}>View Cart</button>
                  </NavLink>
                </>
              ) : (
                <>
                  {favoriteItems?.map((item) => (
                    <FavoriteProduct
                      key={item.id}
                      id={item.id}
                      cover={item.cover}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))}
                 <br />
                  {favoriteItems.length > 0 ? (
                    <button className='primary-btn w-full' onClick={clearFavorites}>Clear Favorites</button>
                  ) : (
                    <p>Your favorites list is empty.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const CartProduct = ({
  id,
  cover,
  name,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();

  const removeCartItems = () => {
    dispatch(CartActions.removeFromAllCart(id));
  };

  return (
    <div className='mt-5 border-b-2 border-gray-200 pb-5'>
      <div className='flex items-center gap-5'>
        <div className='images w-20 h-20'>
          {cover?.slice(0, 1).map((image, i) => (
            <img src={image?.image} alt="" key={i} className='w-full object-cover' />
          ))}
        </div>
        <div className='details w-1/2'>
          <BodyOne>{name}</BodyOne>
          <p className='text-primary-green'>
            {quantity} x ${price?.toFixed(2)}
          </p>
        </div>
        <button className='w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-primary' onClick={removeCartItems}>
          <IoCloseOutline size={25} />
        </button>
      </div>
    </div>
  );
};

export const FavoriteProduct = ({
  id,
  cover,
  name,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();

  const removeFavoriteItems = () => {
    dispatch(favoriteActions.removeFromFavorites(id));
  };

  const addToCartAndRemoveFromFavorites = () => {
    dispatch(CartActions.addToCart({ id, title: name, price, images: cover, quantity }));
    dispatch(favoriteActions.removeFromFavorites(id));
  };

  return (
    <div className='mt-5 border-b-2 border-gray-200 pb-5'>
      <div className='flex items-center gap-5'>
        <div className='images w-20 h-20'>
          {cover?.slice(0, 1).map((image, i) => (
            <img src={image?.image} alt="" key={i} className='w-full object-cover' />
          ))}
        </div>
        <div className='details w-1/2'>
          <BodyOne>{name}</BodyOne>
          <p className='text-primary-green'>
            {quantity} x ${price?.toFixed(2)}
          </p>
        </div>
        <div className='flex gap-2'>
          <button className='w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-primary' onClick={removeFavoriteItems}>
            <IoCloseOutline size={25} />
          </button>
          <button className='w-10 h-10 bg-primary-green flex items-center justify-center rounded-full text-white' onClick={addToCartAndRemoveFromFavorites}>
            <IoCartOutline size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
