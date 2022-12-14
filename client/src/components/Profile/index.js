import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const Profile = ({ currentUser }) => {
  const { userID } = useParams();

  const [usersPosts, setUsersPosts] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const [usersThreads, setUsersThreads] = useState([]);

  const getUserPost = () => {
    document.getElementById("allUsersPost").style.display = "flex";
    document.getElementById("allUsersComment").style.display = "none";
    document.getElementById("allUsersThread").style.display = "none";
  };

  const getUserComment = () => {
    document.getElementById("allUsersPost").style.display = "none";
    document.getElementById("allUsersComment").style.display = "flex";
    document.getElementById("allUsersThread").style.display = "none";
  };

  const getUserThreads = () => {
    document.getElementById("allUsersPost").style.display = "none";
    document.getElementById("allUsersComment").style.display = "none";
    document.getElementById("allUsersThread").style.display = "flex";
  };

  const getFollowing = () => {
    console.log("All people user is following");
  };

  const getFollower = () => {
    console.log("All people following user");
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/getMyPosts/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setUsersPosts(response.data);
    });

    Axios.get(
      `https://threado-server.herokuapp.com/getUserCom/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setUsersComments(response.data);
    });

    Axios.get(
      `https://threado-server.herokuapp.com/getUserThreads/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setUsersThreads(response.data);
    });
  }, []);

  return (
    <div className="profile">
      <div className="accountBanner">
        <div className="banner"></div>
        <div className="account">
          <div>
            <div className="accountIcon" />
            <h2>{currentUser.username}</h2>
            <h3>{currentUser.email}</h3>
          </div>
        </div>
      </div>

      <div className="profileNav">
        <div className="profileNavBtnBorder">
          <div className="profileNavBtnBody">
            <button onClick={() => getUserPost()} style={{ cursor: "pointer" }}>
              Posts
            </button>
          </div>
        </div>
        <div className="profileNavBtnBorder">
          <div className="profileNavBtnBody">
            <button
              onClick={() => getUserComment()}
              style={{ cursor: "pointer" }}
            >
              Comments
            </button>
          </div>
        </div>
        <div className="profileNavBtnBorder">
          <div className="profileNavBtnBody">
            <button
              onClick={() => getUserThreads()}
              style={{ cursor: "pointer" }}
            >
              My Threads
            </button>
          </div>
        </div>
        <div className="profileNavBtnBorder">
          <div className="profileNavBtnBody">
            <button
              onClick={() => getFollowing()}
              style={{ cursor: "pointer" }}
            >
              Following
            </button>
          </div>
        </div>
        <div className="profileNavBtnBorder">
          <div className="profileNavBtnBody">
            <button onClick={() => getFollower()} style={{ cursor: "pointer" }}>
              Followers
            </button>
          </div>
        </div>
      </div>

      <div className="allUsersPost" id="allUsersPost">
        {usersPosts.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>
                  You have no posts. Take a look through some threads and
                  contribute!!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {usersPosts.map((post) => (
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

      <div className="allUsersComment" id="allUsersComment">
        {usersComments.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>
                  You have no comments. Share your thoughts on other posts!!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {usersComments.map((comment) => (
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

      <div className="allUsersThread" id="allUsersThread">
        {usersThreads.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>You have no threads. Can't find one, let's make one!!!</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {usersThreads.map((thread) => (
              <div key={thread.subthreadID} className="threadCont">
                <div className="threadNameCont">
                  <div className="threadNameBorder">
                    <div className="threadNameBody">
                      <h3>/{thread.threadName}</h3>
                    </div>
                  </div>
                </div>
                <div className="threadBorder">
                  <div className="threadBody">
                    <Link to={`/subthread/${thread.subthreadID}`}>
                      <p>{thread.threadDesc}</p>
                    </Link>
                  </div>
                </div>
                <div className="threadInfoCont">
                  <div className="threadInfo">
                    <div>
                      <GroupsOutlinedIcon />
                    </div>
                    <div>
                      <CalendarMonthOutlinedIcon />
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

export default Profile;
