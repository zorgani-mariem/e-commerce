// Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoImg from "../../assets/common/logo1.png";
import { menulists } from "../../assets/data/data";
import { IoCartOutline, IoHeartOutline, IoSearchSharp } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CustomNavLink } from './CustomComponents';
import { ModelCart } from '../cart/ModelCart';
import { logout } from '../../redux/slice/loginSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = localStorage.getItem('isLogged') === 'true'; // Check if logged in

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isHomePage = location.pathname === "/";
  const isShopPage = location.pathname === "/shop";
  const isCartPage = location.pathname === "/cart";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isBlogPage = location.pathname === "/blog";
  const isAboutPage = location.pathname === "/about";
  const isServicesPage = location.pathname === "/services";

  return (
    <>
      <header className={`header px-12 py-3 relative z-20 ${isHomePage || isShopPage || isCartPage || isLoginPage || isRegisterPage || isBlogPage || isAboutPage || isServicesPage ? `bg-white-100 ${isScrolled ? "scrolled" : ""}` : ""}`}>
        {(isHomePage) && (
          <div>
          </div>
        )}
        <nav className='p-4 flex justify-between items-center relative'>
          <div className='flex items-center gap-14'>
            <div>
              <NavLink to="/">
                <img src={LogoImg} alt="LogoImg" className='h-16' />
              </NavLink>
            </div>
            <ul className='hidden lg:flex items-center justify-between gap-8'>
              {menulists.map((list) => (
                <li key={list.id} className='uppercase list-none'>
                  <CustomNavLink href={list.path}>{list.link}</CustomNavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex items-center gap-8 icons'>
            {isLogged ? (
              <button
                onClick={handleLogout}
                className="text-black"
              >
                Logout
              </button>
            ) : (
              <>
                <CustomNavLink
                  className={`${isHomePage && !isScrolled ? "text-black" : "text-black"}`}
                  href="/login"
                >
                  Login
                </CustomNavLink>
                <span className={`${isHomePage && !isScrolled ? "text-black" : "text-black"}`}>/</span>
                <CustomNavLink
                  className={`${isHomePage && !isScrolled ? "text-black" : "text-black"}`}
                  href="/register"
                >
                  Register
                </CustomNavLink>
              </>
            )}
          </div>

          <div className='icon flex items-center justify-center gap-6'>
            <IoSearchSharp size={23} />

            <ModelCart />

            <button onClick={toggleMenu} className='lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white'>
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>

          <div ref={menuRef} className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}>
            <ul className='flex flex-col lg:flex-row gap-4'>
              {menulists.map((list) => (
                <li key={list.id} className='uppercase list-none'>
                  <CustomNavLink href={list.path} className="text-white">{list.link}</CustomNavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
