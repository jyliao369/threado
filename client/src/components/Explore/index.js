import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    Axios.get("https://threado-server.herokuapp.com/", {}).then((response) => {
      // console.log(response.data.reverse());
      setAllPosts(response.data.reverse());
    });
  }, []);
  return (
    <div className="explorePage">
      <div className="pageBanner">
        <ExploreOutlinedIcon />
        <p>Explore</p>
      </div>

      <div className="searchInput">
        <input placeholder="Search..." />
        <button>Search</button>
      </div>

      <div>
        {allPosts.map((post) => (
          <Link key={post.postID} to={`/post/${post.postID}`}>
            <div>
              <p>{post.postTitle}</p>
              <p>{post.postBody}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
