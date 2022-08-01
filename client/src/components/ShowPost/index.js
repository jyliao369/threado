import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

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
          <div key={post.postID} className="postCont">
            <div className="postProfileIconCont">
              <div className="postProfileIconBorder">
                <div className="postProfileIconBody"></div>
              </div>
              <div className="postUsername">
                <p>{post.username}</p>
              </div>
            </div>

            <div className="generalPostCont">
              <div className="generalPostTitleCont">
                <div className="generalPostTitleBorder">
                  <div className="generalPostTitleBody">
                    <h4>{post.postTitle.slice(0, 60)}</h4>
                  </div>
                </div>
              </div>
              <Link to={`post/${post.postID}`}>
                <div className="generalPostBorder">
                  <div className="generalPostBody">
                    <p>{post.postBody}</p>
                  </div>
                </div>
              </Link>
              <div className="generalPostDateTimeCont">
                <div className="generalPostDateTimeBorder">
                  <div className="generalPostDateTimeBody">
                    <p>Posted On: *Time goes here</p>
                  </div>
                </div>
              </div>
              <div className="likeCom">
                <div>
                  <FavoriteBorderOutlinedIcon />
                  <p>likes</p>
                </div>
                <div>
                  <ChatBubbleOutlineOutlinedIcon />
                  <p>comments</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPost;
