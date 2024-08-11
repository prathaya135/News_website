import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Loaddata from "./components/loaddata";
import Placeholder from "./components/placeholder";

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState("general");
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_NEWS_API);

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(value);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=1&pagesize=5`;
        setLoading(true);
        // await sleep(3000);
        const response = await fetch(url);
        const parsedData = await response.json();
        setTotal(parsedData.totalResults);
        setArticles(parsedData.articles || []); // Default to empty array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [value, apiKey]); // Depend on apiKey too, if you plan to change it dynamically

  async function prevClick() {
    if (page > 1) {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=${page - 1}&pagesize=5`;
        setLoading(true);
        const response = await fetch(url);
        const parsedData = await response.json();
        setPage(page - 1);
        setArticles(parsedData.articles || []); // Default to empty array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function nextClick() {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=${apiKey}&page=${page + 1}&pagesize=5`;
      setLoading(true);
      const response = await fetch(url);
      const parsedData = await response.json();
      setArticles(parsedData.articles || []); // Default to empty array
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function func_value(category) {
    setValue(category);
  }

  return (
    <Router>
      <div>
        <div className="sticky-top">
          <nav className="bg-dark border-bottom border-body" data-bs-theme="dark">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  News Analysis
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink
                        to="/business"
                        onClick={() => func_value("business")}
                        className="nav-link"
                      >
                        Business
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/sports"
                        onClick={() => func_value("sports")}
                        className="nav-link"
                      >
                        Sports
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/health"
                        onClick={() => func_value("health")}
                        className="nav-link"
                      >
                        Health
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </nav>
        </div>
        {loading ? (
          <Placeholder />
        ) : (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Loaddata
                  category="General Category"
                  articles={articles}
                  prevClick={prevClick}
                  nextClick={nextClick}
                  page={page}
                  total={total}
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <Loaddata
                  category="Business"
                  articles={articles}
                  prevClick={prevClick}
                  nextClick={nextClick}
                  page={page}
                  total={total}
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <Loaddata
                  category="Sports"
                  articles={articles}
                  prevClick={prevClick}
                  nextClick={nextClick}
                  page={page}
                  total={total}
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <Loaddata
                  category="Health"
                  articles={articles}
                  prevClick={prevClick}
                  nextClick={nextClick}
                  page={page}
                  total={total}
                />
              }
            ></Route>
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
