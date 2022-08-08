import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";

const SinglePost = ({ isLoggedIn, currentUser }) => {
  const { postID } = useParams();

  const [postOP, setPostOP] = useState(" ");
  const [postTitle, setPostTitle] = useState(" ");
  const [postBody, setPostBody] = useState(" ");
  const [postSubthreadID, setPostSubthreadId] = useState(" ");

  const [commentBody, setCommentBody] = useState("");

  const [allPostComment, setAllPostComment] = useState([]);

  const [numLikes, setNumLikes] = useState("");
  const [numComments, setNumComments] = useState("");

  const openCommentForm = () => {
    if (document.getElementById("commentForm").style.display !== "flex") {
      document.getElementById("commentForm").style.display = "flex";
    } else {
      document.getElementById("commentForm").style.display = "none";
    }
  };

  const postComment = () => {
    Axios.post(`https://threado-server.herokuapp.com/addComment`, {
      postID: postID,
      userID: currentUser.userID,
      username: currentUser.username,
      commentBody: commentBody,
    }).then((response) => {
      console.log(response);
      setCommentBody("");
      document.getElementById("commentForm").style.display = "none";

      Axios.get(
        `https://threado-server.herokuapp.com/getPostComment/${postID}`,
        {}
      ).then((response) => {
        // console.log(response.data);
        setAllPostComment(response.data.reverse());
      });
    });
  };

  const bookmarkPost = () => {
    Axios.post(`http://localhost:3001/addBookmark`, {
      postID: postID,
      userID: currentUser.userID,
      username: currentUser.username,
      postTitle: postTitle,
      postBody: postBody,
      subthreadID: postSubthreadID,
    }).then((response) => {
      console.log(response);
    });
  };

  const likePost = () => {
    Axios.post(`http://localhost:3001/likePost/${postID}`, {
      userID: currentUser.userID,
      username: currentUser.username,
      lastName: currentUser.lastName,
      firstName: currentUser.firstName,
      email: currentUser.email,
    }).then((response) => {
      console.log(response);
    });
  };

  const likeCount = () => {
    Axios.get(`http://localhost:3001/getLikes/${postID}`, {}).then(
      (response) => {
        // console.log(res.data.length);
        setNumLikes(response.data.length);
      }
    );
    // console.log("hello");
    // console.log(numLikes);
    return numLikes;
  };

  const commentCont = () => {
    Axios.get(
      `https://threado-server.herokuapp.com/getPostComment/${postID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setNumComments(response.data.length);
    });
    return numComments;
  };

  useEffect(() => {
    Axios.get(`https://threado-server.herokuapp.com/post/${postID}`, {}).then(
      (response) => {
        // console.log(response.data[0]);

        setPostOP(response.data[0].username);
        setPostTitle(response.data[0].postTitle);
        setPostBody(response.data[0].postBody);
        setPostSubthreadId(response.data[0].subthreadID);
      }
    );

    Axios.get(
      `https://threado-server.herokuapp.com/getPostComment/${postID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setAllPostComment(response.data.reverse());
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
              <button onClick={() => likePost()}>
                <FavoriteBorderOutlinedIcon />
                {likeCount()}
              </button>
              <button onClick={() => openCommentForm()}>
                <ChatBubbleOutlineOutlinedIcon />
                {commentCont()}
              </button>
              <button onClick={() => bookmarkPost()}>
                <BookmarkBorderOutlined />
              </button>
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
        {allPostComment.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>There are no comments. Share your thoughts!!</p>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                <div className="commentMainCont">
                  <div className="commentBorder">
                    <div className="commentBody">
                      <p>{comment.commentBody}</p>
                    </div>
                  </div>
                  <div className="commentDateCont">
                    <div className="commentDateBorder">
                      <div className="commentDateBody">
                        <p>Posted on: *date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
