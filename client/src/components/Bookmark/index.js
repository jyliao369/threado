import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Bookmark = () => {
  const { userID } = useParams();

  const [userBookmark, setUserBookmark] = useState([]);

  const unBookmark = (bookmarkID) => {
    Axios.delete(
      `https://threado-server.herokuapp.com/deleteBookmark/${bookmarkID}`,
      {}
    ).then((response) => {
      // console.log(response);
      Axios.get(
        `https://threado-server.herokuapp.com/allUserBookmark/${userID}`,
        {
          userID: userID,
        }
      ).then((response) => {
        setUserBookmark(response.data.reverse());
      });
    });
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/allUserBookmark/${userID}`,
      {
        userID: userID,
      }
    ).then((response) => {
      // console.log(response.data);
      setUserBookmark(response.data.reverse());
    });
  }, []);

  return (
    <div className="bookmarkPage">
      <div className="pageBanner">
        <BookmarkBorderOutlinedIcon />
        <p>Bookmark</p>
      </div>

      <div>
        {userBookmark.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>No posts have been bookmarked!!</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {userBookmark.map((post) => (
              // <div key={post.postID}>{post.postBody}</div>
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
                  <div className="deleteBtn">
                    <button
                      onClick={() => unBookmark(post.bookmarkID)}
                      style={{ cursor: "pointer" }}
                    >
                      <DeleteForeverOutlinedIcon />
                    </button>
                  </div>
                  <Link to={`/post/${post.postID}`}>
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
                    <button>
                      <FavoriteBorderOutlinedIcon />
                      {post.likeTotal}
                    </button>
                    <button>
                      <ChatBubbleOutlineOutlinedIcon />
                      {post.commentTotal}
                    </button>
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

export default Bookmark;
