import { useState } from "react";
import Nav from "./Nav";
import Pillow from "../assets/download.jpg";

function Shop() {
  const [counter, setCounter] = useState([0, 0]);
  var products = [
    ["Pillow", Pillow],
    ["Bed", Pillow],
  ];

  function increaseCounter(index) {
    setCounter((prevCounter) => {
      const newCounters = [...prevCounter];
      newCounters[index] += 1;
      return newCounters;
    });
  }

  function decreaseCounter(index) {
    setCounter((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] = Math.max(0, newCounters[index] - 1);
      return newCounters;
    });
  }

  return (
    <>
      <Nav />
      <div className="shop">
        {products.map(([title, photo], index) => (
          <div className="product" key={index}>
            <p className="title">{title}</p>
            <img src={photo} alt={title} />
            <div className="amount">
              <button className="minus" onClick={() => decreaseCounter(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19,13H5V11H19V13Z" />
                </svg>
              </button>
              <input
                type="text"
                className="amountInput"
                defaultValue={counter[index]}
              />

              <button className="plus" onClick={() => increaseCounter(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
              </button>
              <button className="addToCart">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Shop;
