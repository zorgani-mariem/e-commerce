
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Blog, CartPage, Home, Layout, Services, Shop } from "./router";
import Login from "./screen/Login/Login";
import Register from "./screen/Login/Register";
 
export const App = () => {
  return (
    <>

     <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home/>
              </Layout>
            }
          />

          <Route
            path="/blog"
            element={
              <Layout>
                <Blog/>
              </Layout>
            }
          />

          <Route
            path="/About"
            element={
              <Layout>
                <About/>
              </Layout>
            }
          />
          
          <Route
            path="/shop"
            element={
              <Layout>
                <Shop/>
              </Layout>
            }
          />

          <Route
            path="/services"
            element={
              <Layout>
                <Services/>
              </Layout>
            }
          />

          <Route
            path="/cart"
            element={
              <Layout>
                <CartPage/>
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
              <Layout>
                <Login/>
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register/>
              </Layout>
            }
          />
          
        </Routes>
      </BrowserRouter> 
    </>
  );
};
