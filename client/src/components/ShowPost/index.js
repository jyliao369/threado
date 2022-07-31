import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

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
      <p>Home</p>
      <div>
        {allPosts.map((post) => (
          <div key={post.postID}>
            <p>{post.postTitle}</p>
            <p>{post.postBody}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPost;
