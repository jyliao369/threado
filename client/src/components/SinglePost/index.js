import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const SinglePost = ({ isLoggedIn, currentUser }) => {
  const { postID } = useParams();

  const [postOP, setPostOP] = useState(" ");
  const [postTitle, setPostTitle] = useState(" ");
  const [postBody, setPostBody] = useState(" ");

  const [commentBody, setCommentBody] = useState("");

  const [allPostComment, setAllPostComment] = useState([]);

  const openCommentForm = () => {
    if (document.getElementById("commentForm").style.display !== "flex") {
      document.getElementById("commentForm").style.display = "flex";
    } else {
      document.getElementById("commentForm").style.display = "none";
    }
  };

  const postComment = () => {
    // console.log(currentUser.username);
    // console.log(currentUser.userID);
    // console.log(commentBody);

    Axios.post(`https://threado-server.herokuapp.com/addComment`, {
      postID: postID,
      userID: currentUser.userID,
      username: currentUser.username,
      commentBody: commentBody,
    }).then((response) => {
      console.log(response);
      setCommentBody("");
      document.getElementById("commentForm").style.display = "none";
    });
  };

  useEffect(() => {
    Axios.get(`https://threado-server.herokuapp.com/post/${postID}`, {}).then(
      (response) => {
        // console.log(response.data[0]);

        setPostOP(response.data[0].username);
        setPostTitle(response.data[0].postTitle);
        setPostBody(response.data[0].postBody);
      }
    );

    Axios.get(
      `https://threado-server.herokuapp.com/getPostComment/${postID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllPostComment(response.data);
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

            {isLoggedIn === false ? (
              <></>
            ) : (
              <div className="commentFormBtnCont">
                <div className="commentFormBtn">
                  <button onClick={() => openCommentForm()}>Add Comment</button>
                </div>
              </div>
            )}

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
        <div className="commentFormCont">
          <div className="commentFormBorder">
            <div className="commentFormBody">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Comment"
                rows={3}
              />
            </div>
          </div>
          <div className="commentBtnCont">
            <div className="commentBtn">
              <button onClick={() => postComment()}>Comment</button>
            </div>
          </div>
        </div>
        <div className="postProfileIconCont">
          <div className="postProfileIconBorder">
            <div className="postProfileIconBody"></div>
          </div>
          <div className="postUsername">
            <p>{currentUser.username}</p>
          </div>
        </div>
      </div>

      <div>
        {allPostComment.map((comment) => (
          <div key={comment.commentID} className="commentCont">
            <div className="postProfileIconCont">
              <div className="postProfileIconBorder">
                <div className="postProfileIconBody"></div>
              </div>
              <div className="postUsername">
                <p>{comment.username}</p>
              </div>
            </div>
            <div className="commentBorder">
              <div className="commentBody">
                <p>{comment.commentBody}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
