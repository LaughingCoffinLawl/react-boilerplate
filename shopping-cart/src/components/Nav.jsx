import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Nav = (props) => {
  Nav.propTypes = {
    passedState: PropTypes.number, // assuming passedState is a number
    selectedItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
      })
    ),
    counter: PropTypes.arrayOf(PropTypes.number),
  };

  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalPrice, setTotalePrice] = useState(0);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const totalPriceCalc = () => {
    let total = 0;

    // Check if selectedItems is defined and not null
    if (props.selectedItems) {
      props.selectedItems.forEach((item, index) => {
        total += item.price * props.counter[index];
      });
    }

    // Limiting the total to 2 digits after the decimal point
    const formattedTotal = total.toFixed(2);

    setTotalePrice(formattedTotal);
  };

  useEffect(() => {
    totalPriceCalc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedItems, props.counter]);

  return (
    <>
      <nav className="nav">
        <div className="titleContainer">
          <p className="siteTitle">Veglia&apos;s Shopping</p>
        </div>
        <div className="links">
          <NavLink to="/">
            <p className="homeText">Home</p>
          </NavLink>
          <NavLink to="/shop" exact="true">
            <p className="shopText">Shop</p>
          </NavLink>
          {location.pathname === "/shop" && (
            <div className="cartContainer">
              <p className="cartCounter">{props.passedState}</p>
              <button className="cartButton" onClick={openDialog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>

      {isDialogOpen && (
        <div className="dialog">
          <button className="closeDialog" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              viewBox="0 0 24 24"
            >
              <path d="M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
            </svg>
          </button>
          <p>Selected Items:</p>
          <ul>
            {props.selectedItems.map((item, index) => (
              <li key={index}>
                <p>
                  {item.title} x {props.counter[index]}{" "}
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="checkoutImage"
                />
                <p>{item.price * props.counter[index]}</p>
              </li>
            ))}
          </ul>
          <p>Total price: ${totalPrice} </p>
          <button className="checkout">Checkout</button>
        </div>
      )}
    </>
  );
};

export default Nav;
