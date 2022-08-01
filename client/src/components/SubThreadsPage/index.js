import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const SubThreadsPage = ({ currentUser, isLoggedIn }) => {
  const { subthreadID } = useParams();

  const [curThreadName, setCurThreadName] = useState("");
  const [curThreadDesc, serCurThreadDesc] = useState("");

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
      });
    });
  };

  const openPostForm = () => {
    if (document.getElementById("postForm").style.display !== "flex") {
      document.getElementById("postForm").style.display = "flex";
    } else {
      document.getElementById("postForm").style.display = "none";
    }
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/getSubthread/${subthreadID}`,
      {}
    ).then((response) => {
      // console.log(response.data[0]);

      setCurThreadName(response.data[0].threadName);
      serCurThreadDesc(response.data[0].threadDesc);
    });

    Axios.get(
      `https://threado-server.herokuapp.com/subthread/${subthreadID}`,
      {}
    ).then((response) => {
      if (response.data.length > 0) {
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
          <div className="threadBorder">
            <div className="threadBody">
              <p>{curThreadDesc}</p>
            </div>
          </div>
          <div className="threadInfoCont">
            <div className="threadInfo">
              <div>
                <GroupsOutlinedIcon />
                <p>users</p>
              </div>
              <div>
                <CalendarMonthOutlinedIcon />
                <p> *date</p>
              </div>
            </div>
          </div>
          <div className="addPostBtnCont">
            <div className="addPostBtn">
              <button onClick={() => openPostForm()}>Add Post</button>
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="postForm" id="postForm">
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Post Title"
          />
          <textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            row={5}
            placeholder="Post Body"
          />
          <button onClick={submitPost}>Post</button>
        </div>
      )}

      <br />

      <div>
        {threadPost.map((post) => (
          <div key={post.postID}>
            <p>{post.postTitle}</p>
            <p>{post.postBody}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThreadsPage;
