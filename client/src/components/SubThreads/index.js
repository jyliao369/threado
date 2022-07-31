import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const SubThreads = ({ currentUser, isLoggedIn }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [threadList, setThreadList] = useState([]);

  const createThread = () => {
    Axios.post(`https://threado-server.herokuapp.com/createThread`, {
      userID: currentUser.userID,
      username: currentUser.username,
      threadName: threadName,
      threadDesc: threadDesc,
    }).then((response) => {
      console.log(response);
      Axios.get(`https://threado-server.herokuapp.com/allThreads`, {}).then(
        (response) => {
          console.log(response);
          setThreadList(response.data);
        }
      );
    });
  };

  useEffect(() => {
    Axios.get(`https://threado-server.herokuapp.com/allThreads`, {}).then(
      (response) => {
        // console.log(response.data);
        setThreadList(response.data);
      }
    );
  }, []);

  return (
    <div className="subthreads">
      <p>SubThreads</p>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="createThreadForm">
          <input
            value={threadName}
            onChange={(e) => setThreadName(e.target.value)}
            placeholder="Thread Name"
          />
          <textarea
            value={threadDesc}
            onChange={(e) => setThreadDesc(e.target.value)}
            placeholder="Thread Description"
            rows={5}
          />
          <button onClick={createThread}>Create</button>
        </div>
      )}

      <div className="allThreads">
        {threadList.map((thread) => (
          <div key={thread.subthreadID}>
            <Link to={`/subthread/${thread.subthreadID}`}>
              <p>{thread.threadName}</p>
              <p>{thread.threadDesc}</p>
            </Link>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThreads;
