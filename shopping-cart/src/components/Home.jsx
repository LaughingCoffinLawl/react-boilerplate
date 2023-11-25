import { useState, useEffect } from "react";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";

function Home() {
  const [clothingData, setClothingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's%20clothing", {
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("404 server not found!");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setClothingData(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="home">
        <Nav />
        <div className="text">
          <p>Check now our catalog!</p>
          <NavLink to="/shop">
            <button className="shopButton">Shop now</button>
          </NavLink>
        </div>
      </div>
      <div className="featuredClothes">
        <p>Test</p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {clothingData && (
          <div className="container">
            {clothingData
              .filter((clothes) => clothes.rating.rate > 4)
              .map((clothes) => (
                <div key={clothes.id} className="clothingItem">
                  <p>{clothes.title}</p>
                  <img
                    className="clothesImg"
                    src={clothes.image}
                    alt={clothes.title}
                  />
                  <p>Price: ${clothes.price}</p>
                  <p>
                    Rating: {clothes.rating.rate} ({clothes.rating.count}{" "}
                    reviews)
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
