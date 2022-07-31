import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const SubThreadsPage = ({ currentUser, isLoggedIn }) => {
  const { subthreadID } = useParams();

  const [curSubThread, setCurSubThread] = useState([]);
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
        console.log(response);
        setThreadPost(response.data.reverse());
      });
    });
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/getSubthread/${subthreadID}`,
      {}
    ).then((response) => {
      setCurSubThread(response.data[0]);
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
      <div>
        <p>SubThreadsPage</p>
        <p>{curSubThread.threadName}</p>
        <p>{curSubThread.threadDesc}</p>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="postForm">
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
