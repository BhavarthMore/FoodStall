import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

// Import Bootstrap CSS and JS



export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json(); // Use a new variable name

      setFoodItem(data[0]);
      setFoodCat(data[1]);
      //console.log(data[0], data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="2000"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "50" }}>
              <form className="d-flex justify-content-centre">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search} onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src="https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg"
                width="900"
                height="700"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://b.zmtcdn.com/data/pictures/8/21239908/fdc91a0f8cff3ce36121112a656f842a.jpg"
                width="900"
                height="700"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2023/07/23/20/44/pastry-shop-8145805_640.jpg"
                width="900"
                height="700"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            // Filter items based on the current category
            const filteredItems = foodItem.filter(
              (item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
            );

            return (
              <div key={data._id} className="mb-4 row">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {filteredItems.length > 0 ? (
                  filteredItems.map((filterItem) => (
                    <div
                      key={filterItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filterItem}
                        options={filterItem.options[0]}
                        
                      >
                        {" "}
                      </Card>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
        {/* Optionally, you might want to conditionally render <Card /> if needed */}
        {/* <Card /> */}
      </div>
      <Footer />
    </div>
  );
}
