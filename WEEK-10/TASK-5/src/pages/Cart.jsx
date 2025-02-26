import React, { useEffect, useState } from "react";
import {
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaMinus,
  FaPaypal,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoLockClosedOutline, IoLogoVenmo } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { SiAmericanexpress, SiShopify, SiTicktick } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { closeNav } from "../components/Navbar";
import { fixingPrice } from "../components/RemovingDuplicate";
import { useCart } from "../components/CartProvider";
import { toast } from "react-toastify";


const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const { cart, total, updateCartItem, removeFromCart } = useCart()
  const [loadingIndex, SetLoadingIndex] = useState(null)
  const checkout = () => {
    if (localStorage.getItem('userId')) {
      navigate('/checkout')
    }
    else {
      toast.warning('Login to checkout', {
        position: 'top-right'
      })
      closeNav()
      navigate('/login')
    }
  }
  useEffect(() => {
    setCartData(cart)
  }, [cart])

  return (
    <div className="cartContent">
      {cartData.length === 0 ? (
        <div className="EmptyCart">
          <h1>Your Cart is empty</h1>
          <button
            onClick={() => {
              navigate("/products");
              closeNav();
            }}
          >
            CONTINUE SHOPPING
          </button>
          <h1>Have an Account ? </h1>
          <p>
            <span
              onClick={() => {
                navigate("/login");
                closeNav();
              }}
            >
              Log in{" "}
            </span>
            to check faster
          </p>
        </div>
      ) : (
        <>
          <div className="cartDetails">
            <div
              style={{ width: "100%", height: "2px", backgroundColor: "black" }}
            ></div>
            <div className="carting">
              {cartData.map((item, index) => (
                <div className="content" key={index}>
                  <div className="image">
                    <img src={item.image} alt="" width={60} height={60} />
                  </div>
                  <div className="details">
                    <h4>{String(item.title).slice(0, 15).padEnd(18, ".")}</h4>
                    <p>
                      Color : {item.color}
                      <br /> $ {fixingPrice(item.price)}
                    </p>
                    <div className="quantityOpt">
                      <p>
                        <button
                          onClick={async () => {
                            SetLoadingIndex(index)
                            if (item.quantity > 1) {
                              await updateCartItem(item._id, item.quantity - 1);
                              SetLoadingIndex(null)
                            } else {
                              await removeFromCart(item._id);
                              SetLoadingIndex(null)
                            }
                          }}
                        >
                          <FaMinus />
                        </button>
                      </p>
                      <p>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly />
                      </p>
                      <p>
                        <button
                          onClick={async () => {
                            SetLoadingIndex(index)
                            await updateCartItem(item._id, item.quantity + 1)
                            SetLoadingIndex(null)
                          }}
                        >
                          <IoMdAdd />
                        </button>
                      </p>
                    </div>
                    {
                      index === loadingIndex ? <div className="loader" style={{
                        background: 'rgb(1,1,78)'
                      }}></div> : ''
                    }
                  </div>
                  <div className="actions">
                    <button
                      onClick={async () => {
                        SetLoadingIndex(index)
                        await removeFromCart(item._id)
                        SetLoadingIndex(null)
                      }}
                    >
                      <MdDeleteOutline />
                    </button>
                    <p className="finalPrice">
                      $ {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="subTotal">
              <div className="bottomHeading">
                <span>
                  <TbTruckDelivery />
                  &nbsp;Free Shipping
                </span>
                <span>
                  <SiTicktick />
                  &nbsp;Limited LifeTime Warranty
                </span>
              </div>
              <div className="bottomMiddle">
                <div className="subtext">
                  <p style={{ textAlign: "left" }}>
                    Subtotal
                    <span style={{ display: "block", color: "gray", fontWeight: "500" }}>
                      Taxes and shipping calculated at checkout
                    </span>
                  </p>
                </div>
                <div className="subPrice">${total.toFixed(2)}</div>
              </div>
              <div className="bottomBtns">
                <button
                  onClick={() => {
                    checkout()
                  }}
                >
                  CHECK OUT
                </button>
                <button
                  onClick={() => {
                    navigate("/cart");
                    closeNav();
                  }}
                >
                  VIEW CART
                </button>
              </div>
              <div className="bottom">
                <br />
                <span>
                  <IoLockClosedOutline />
                  &nbsp;Guaranteed Safe Checkout
                </span>
                <div
                  className="paying"
                  style={{
                    display: "grid",
                    placeContent: "center",
                  }}
                >
                  <ul>
                    <li>
                      <SiAmericanexpress />
                    </li>
                    <li>
                      <FaCcDiscover />
                    </li>
                    <li>
                      <FaCcMastercard />
                    </li>
                    <li>
                      <FaPaypal />
                    </li>
                    <li>
                      <SiShopify />
                    </li>
                    <li>
                      <IoLogoVenmo />
                    </li>
                    <li>
                      <FaCcVisa />
                    </li>
                  </ul>
                </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
