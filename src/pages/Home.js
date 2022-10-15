import axios from "axios";
import { useState } from "react";
import { PaginatedBooks } from "../components";
import Constants from "../Constants";
import "../assets/styles/BookListing.css";
import { Link } from "react-router-dom";

const { INIT, LOADING, ERROR, SUCCESS } = Constants.REQ_STATUS;

function Home() {
  const [term, setTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState(INIT);
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onClickSearch = () => {
    if (!term) {
      setShowError(true);
      setErrorMessage("Please enter a title or author name to search.");
    } else {
      setSearchStatus(LOADING);
      setShowError(false);
      setErrorMessage("");
      axios
        .get(`https://goodreads-server-express--dotdash.repl.co/search/${term}`)
        .then((res) => {
          setData(res.data);
          setShowError(false);
          setSearchStatus(SUCCESS);
        })
        .catch((error) => {
          console.log(error);
          setSearchStatus(ERROR);
        });
    }
  };

  const updateCurrentPage = (value) => {
    setCurrentPage(value);
    if (value * 20 - 19 > data.list?.length) {
      fetchPage(value);
    }
  };
  const fetchPage = (page) => {
    setSearchStatus(LOADING);
    axios
      .get(
        `https://goodreads-server-express--dotdash.repl.co/search/${term}?page=${page}`
      )
      .then((res) => {
        setData((prev) => {
          return {
            list: [...prev.list, ...res.data.list],
            total: res.data.total || prev.total,
          };
        });
        setSearchStatus(SUCCESS);
      })
      .catch((error) => {
        console.log(error);
        setSearchStatus(ERROR);
      });
  };

  const renderContent = () => {
    switch (searchStatus) {
      case LOADING:
        return (
          <>
            <>
              <h1>Please wait while we find results.</h1>
              <div className="loader"></div>
            </>
          </>
        );

      case ERROR:
        return <h1>Oops! something went wrong</h1>;

      case SUCCESS:
        return (
          <>
            {data.list?.length > 0 ? (
              <PaginatedBooks
                data={data}
                currentPage={currentPage}
                updateCurrentPage={updateCurrentPage}
              />
            ) : (
              <h1>No results found.</h1>
            )}
          </>
        );

      default:
        return <h1>Search to find your favourite books </h1>;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div style={{ float: "right" }}>
          <Link to="/news-letter" style={{ marginRight: "20px" }}>
            News Letter
          </Link>
          <Link to="/buttons-popups">Buttons & Popups</Link>
        </div>
        <h1 className="heading">Book listing</h1>
      </header>
      <main>
        <div className="row">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              autoFocus={true}
              placeholder="Enter your text here"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              value={term}
            />
            <div
              className={`cross-icon ${!term ? "hide" : ""}`}
              onClick={() => setTerm("")}
            >
              x
            </div>
          </div>
          <button className="search-btn" onClick={onClickSearch}>
            Search
          </button>
        </div>
        {showError && <p className="error-msg">{errorMessage}</p>}
        {renderContent()}
      </main>
    </div>
  );
}

export default Home;
