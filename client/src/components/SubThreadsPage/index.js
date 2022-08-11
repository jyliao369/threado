import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

const SubThreadsPage = ({ currentUser, isLoggedIn }) => {
  const { subthreadID } = useParams();

  const [curThreadName, setCurThreadName] = useState("");
  const [curThreadDesc, serCurThreadDesc] = useState("");
  const [curTotalUser, setCurTotalUser] = useState(0);

  const [threadPost, setThreadPost] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const submitPost = () => {
    Axios.post("https://threado-server.herokuapp.com/addPost", {
      userID: currentUser.userID,
      username: currentUser.username,
      postTitle: postTitle,
      postBody: postBody,
      subthreadID: subthreadID,
    }).then(() => {
      Axios.get(
        `https://threado-server.herokuapp.com/subthread/${subthreadID}`,
        {}
      ).then((response) => {
        // console.log(response);
        setThreadPost(response.data.reverse());
        setPostTitle("");
        setPostBody("");
        document.getElementById("postFormCont").style.display = "none";
      });
    });
  };

  const openPostForm = () => {
    if (document.getElementById("postFormCont").style.display !== "flex") {
      document.getElementById("postFormCont").style.display = "flex";
    } else {
      document.getElementById("postFormCont").style.display = "none";
    }
  };

  const joinThread = () => {
    Axios.post(`https://threado-server.herokuapp.com/joinThread`, {
      userID: currentUser.userID,
      username: currentUser.username,
      subthreadID: subthreadID,
      threadName: curThreadName,
      threadDesc: curThreadDesc,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/getSubthread/${subthreadID}`,
      {}
    ).then((response) => {
      console.log(response.data[0]);

      setCurThreadName(response.data[0].threadName);
      serCurThreadDesc(response.data[0].threadDesc);
      setCurTotalUser(response.data[0].totalUser);
    });

    Axios.get(
      `https://threado-server.herokuapp.com/getSubthreadPost/${subthreadID}`,
      {}
    ).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setThreadPost(response.data.reverse());
      } else {
        setThreadPost([]);
      }
    });
  }, []);

  return (
    <div className="subthreadPage">
      <div className="curThreadCont">
        <div className="threadCont">
          <div className="threadNameCont">
            <div className="threadNameBorder">
              <div className="threadNameBody">
                <h3>/{curThreadName}</h3>
              </div>
            </div>
          </div>
          {isLoggedIn === false ? (
            <></>
          ) : (
            <div className="addPostBtnCont">
              <div className="addPostBtn">
                <button
                  onClick={() => openPostForm()}
                  style={{ cursor: "pointer" }}
                >
                  <AddCommentOutlinedIcon />
                </button>
                <button
                  onClick={() => joinThread()}
                  style={{ cursor: "pointer" }}
                >
                  <GroupAddOutlinedIcon />
                </button>
              </div>
            </div>
          )}
          <div className="threadBorder">
            <div className="threadBody">
              <p>{curThreadDesc}</p>
            </div>
          </div>
          <div className="threadInfoCont">
            <div className="threadInfo">
              <div>
                <GroupsOutlinedIcon />
                <p>{curTotalUser}</p>
              </div>
              <div>
                <CalendarMonthOutlinedIcon />
                <p> *date</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="postFormCont" id="postFormCont">
          <div className="addPostForm">
            <div className="postTitleFormCont">
              <div className="postTitleFormBorder">
                <div className="postTitleFormBody">
                  <input
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Post Title"
                  />
                </div>
              </div>
            </div>

            <div className="postBodyFormBorder">
              <div className="postBodyFormBody">
                <textarea
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  row={5}
                  placeholder="Post Body"
                />
              </div>
            </div>

            <div className="postFormBtnCont">
              <div className="postFormBtn">
                <button onClick={submitPost}>Post</button>
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
      )}

      <div className="threadsPostCont">
        {threadPost.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>There are no posts here. Share your thoughts!!</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {threadPost.map((post) => (
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
                      <p>{post.likeTotal}</p>
                    </button>
                    <button>
                      <ChatBubbleOutlineOutlinedIcon />
                      <p>{post.commentTotal}</p>
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

export default SubThreadsPage;
