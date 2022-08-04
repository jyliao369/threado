import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const RandomNews = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentNews, setCurrentNews] = useState([]);

  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const newsLimit = 5;

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
        <h3>What's Happening</h3>
      </div>
      <div className="nextBackBtn">
        {currentPage + 1 === 1 ? (
          <button disabled={true}>Back</button>
        ) : (
          <button onClick={() => nextBack("back")}>Back</button>
        )}

        <p>
          {"<"} {currentPage + 1} {">"}
        </p>

        {currentPage + 1 === maxPage ? (
          <button disabled={true}>Next</button>
        ) : (
          <button onClick={() => nextBack("next")}>Next</button>
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
