import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const SinglePost = () => {
  const { postID } = useParams();

  const [postOP, setPostOP] = useState(" ");
  const [postTitle, setPostTitle] = useState(" ");
  const [postBody, setPostBody] = useState(" ");

  const openCommentForm = () => {
    if (document.getElementById("commentForm").style.display !== "flex") {
      document.getElementById("commentForm").style.display = "flex";
    } else {
      document.getElementById("commentForm").style.display = "none";
    }
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/post/${postID}`, {}).then((response) => {
      // console.log(response.data[0]);

      setPostOP(response.data[0].username);
      setPostTitle(response.data[0].postTitle);
      setPostBody(response.data[0].postBody);
    });
  }, []);

  return (
    <div className="singlePost">
      <div className="singlePostCont">
        <div className="postCont">
          <div className="postProfileIconCont">
            <div className="postProfileIconBorder">
              <div className="postProfileIconBody"></div>
            </div>
            <div className="postUsername">
              <p>{postOP}</p>
            </div>
          </div>

          <div className="generalPostCont">
            <div className="generalPostTitleCont">
              <div className="generalPostTitleBorder">
                <div className="generalPostTitleBody">
                  <h4>{postTitle.slice(0, 60)}</h4>
                </div>
              </div>
            </div>

            <div className="commentFormBtnCont">
              <div className="commentFormBtn">
                <button onClick={() => openCommentForm()}>Add Comment</button>
              </div>
            </div>

            <div className="generalPostBorder">
              <div className="generalPostBody">
                <p>{postBody}</p>
              </div>
            </div>

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
      </div>

      <div className="commentForm" id="commentForm">
        <textarea placeholder="Comment" />
        <button>Submit</button>
      </div>
      <div></div>
    </div>
  );
};

export default SinglePost;
