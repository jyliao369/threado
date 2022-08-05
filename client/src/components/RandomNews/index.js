import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const RandomNews = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentNews, setCurrentNews] = useState([]);

  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const newsLimit = 10;

  const nextBack = (nextBack) => {
    if (nextBack === "next") {
      setCurrentPage(currentPage + 1);
      // console.log(
      //   allPosts.slice(0 + 10 * (currentPage + 1), 10 + 10 * (currentPage + 1))
      // );
      setCurrentNews(
        allPosts.slice(
          0 + newsLimit * (currentPage + 1),
          newsLimit + newsLimit * (currentPage + 1)
        )
      );
    } else {
      setCurrentPage(currentPage - 1);
      // console.log(
      //   allPosts.slice(0 + 10 * (currentPage - 1), 10 + 10 * (currentPage - 1))
      // );
      setCurrentNews(
        allPosts.slice(
          0 + newsLimit * (currentPage - 1),
          newsLimit + newsLimit * (currentPage - 1)
        )
      );
    }
  };

  useEffect(() => {
    Axios.get("https://threado-server.herokuapp.com/", {}).then((response) => {
      // console.log(Math.ceil(response.data.length / 10));
      console.log(response.data.reverse());

      setMaxPage(Math.ceil(response.data.length / newsLimit));
      setAllPosts(response.data.reverse());
      setCurrentNews(response.data.reverse().slice(0, newsLimit));
    });
  }, []);

  return (
    <div className="randomNewsPage">
      <div>
        <h2>What's Happening</h2>
      </div>
      <div className="nextBackBtn">
        {currentPage + 1 === 1 ? (
          <div className="backBtnBorder">
            <div className="backBtnBody">
              <button disabled={true}>Back</button>
            </div>
          </div>
        ) : (
          <div className="backBtnBorder">
            <div className="backBtnBody">
              <button onClick={() => nextBack("back")}>Back</button>
            </div>
          </div>
        )}

        <p>
          {"<"} {currentPage + 1} {">"}
        </p>

        {currentPage + 1 === maxPage ? (
          <div className="forwardBtnBorder">
            <div className="forwardBtnBody">
              <button disabled={true}>Next</button>
            </div>
          </div>
        ) : (
          <div className="forwardBtnBorder">
            <div className="forwardBtnBody">
              <button onClick={() => nextBack("next")}>Next</button>
            </div>
          </div>
        )}
      </div>
      <div className="randNewsAll">
        {currentNews.map((post) => (
          <div key={post.postID} className="randNewsCont">
            <div className="randTitleCont">
              <div className="randTitleBorder">
                <div className="randTitleBody">
                  <h4>{post.postTitle.slice(0, 30)}</h4>
                </div>
              </div>
            </div>

            <Link to={`/post/${post.postID}`}>
              <div className="randNewBorder">
                <div className="randNewBody">
                  <p>{post.postBody}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomNews;
