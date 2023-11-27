import { useState, useEffect } from "react";
import Nav from "./Nav";

function Shop() {
  const [counter, setCounter] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ClothingManData, setClothingManData] = useState(null);
  const [ClothingWomanData, setClothingWomanData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemQuanitity, setItemQuantity] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menResponse, womenResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products/category/men's%20clothing", {
            mode: "cors",
          }),
          fetch(
            "https://fakestoreapi.com/products/category/women's%20clothing",
            { mode: "cors" }
          ),
        ]);

        if (menResponse.status >= 400) {
          throw new Error("Men's clothing API: Server not found!");
        }

        if (womenResponse.status >= 400) {
          throw new Error("Women's clothing API: Server not found!");
        }

        const menData = await menResponse.json();
        console.log(menData);
        const womenData = await womenResponse.json();

        setClothingManData(menData);
        setClothingWomanData(womenData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  function passItemsQuantity(index) {
    setItemQuantity((prevQuantity) => prevQuantity + counter[index]);

    const selectedCloth = {
      image: ClothingManData[index].image,
      title: ClothingManData[index].title,
      price: ClothingManData[index].price,
    };

    // Check if the item is already in selectedItems
    const itemIndex = selectedItems.findIndex(
      (item) => item.title === selectedCloth.title
    );

    if (itemIndex !== -1) {
      // Item is already in the list, update the quantity
      setSelectedItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += counter[index];
        return updatedItems;
      });
    } else {
      // Item is not in the list, add a new entry
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...selectedCloth, quantity: counter[index] },
      ]);
    }
  }

  return (
    <>
      <Nav
        passedState={itemQuanitity}
        selectedItems={selectedItems}
        counter={counter}
      />
      <div className="shop">
        <div className="shopContainer">
          <p className="shopTitle">Men&apos;s Clothes</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {ClothingManData && (
            <div className="cardsContainer">
              {ClothingManData.map((clothes, index) => (
                <div key={clothes.id} className="cards">
                  <p>{clothes.title}</p>
                  <img
                    className="clothImg"
                    src={clothes.image}
                    alt={clothes.title}
                  />
                  <p>Price: ${clothes.price}</p>
                  <p>
                    Rating: {clothes.rating.rate} ({clothes.rating.count}{" "}
                    reviews)
                  </p>
                  <div className="amount">
                    <button
                      className="plus"
                      onClick={() => increaseCounter(index)}
                    >
                      Plus
                    </button>
                    <input
                      type="text"
                      className="input"
                      value={counter[index]}
                    />
                    <button
                      className="plus"
                      onClick={() => decreaseCounter(index)}
                    >
                      Minus
                    </button>
                  </div>
                  <button
                    className="checkout"
                    onClick={() => passItemsQuantity(index)}
                  >
                    Checkout
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="shopContainer">
          <p className="shopTitle">Women&apos;s Clothes</p>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {ClothingWomanData && (
            <div className="cardsContainer">
              {ClothingWomanData.map((clothes, index) => (
                <div key={clothes.id} className="cards">
                  <p>{clothes.title}</p>
                  <img
                    className="clothImg"
                    src={clothes.image}
                    alt={clothes.title}
                  />
                  <p>Price: ${clothes.price}</p>
                  <p>
                    Rating: {clothes.rating.rate} ({clothes.rating.count}{" "}
                    reviews)
                  </p>
                  <div className="amount">
                    <button
                      className="plus"
                      onClick={() => increaseCounter(index)}
                    >
                      Plus
                    </button>
                    <input
                      type="text"
                      className="input"
                      value={counter[index]}
                    />
                    <button
                      className="plus"
                      onClick={() => decreaseCounter(index)}
                    >
                      Minus
                    </button>
                  </div>
                  <button className="checkout">Checkout</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Shop;
