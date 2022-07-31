import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const SinglePost = () => {
  const { postID } = useParams();

  const [postInfo, setPostInfo] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/post/${postID}`, {}).then((response) => {
      // console.log(response.data[0]);
      setPostInfo(response.data[0]);
    });
  }, []);

  return (
    <div className="singlePost">
      <div>
        <p>{postInfo.postTitle}</p>
        <p>{postInfo.postBody}</p>
      </div>
      <div className="commentForm">
        <textarea placeholder="Comment" />
        <button>Submit</button>
      </div>
      <div></div>
    </div>
  );
};

export default SinglePost;
