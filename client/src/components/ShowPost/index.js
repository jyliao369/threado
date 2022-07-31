import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const ShowPost = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    Axios.get("https://threado-server.herokuapp.com/", {}).then((response) => {
      // console.log(response.data.reverse());
      setAllPosts(response.data.reverse());
    });
  }, []);

  return (
    <div className="showPost">
      <div className="pageBanner">
        <HomeOutlinedIcon />
        <p>Home</p>
      </div>

      <div>
        {allPosts.map((post) => (
          <div key={post.postID}>
            <Link to={`post/${post.postID}`}>
              <p>{post.postTitle}</p>
              <p>{post.postBody}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPost;
