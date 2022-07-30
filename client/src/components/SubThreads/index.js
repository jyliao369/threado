import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

const SubThreads = ({ currentUser }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [threadList, setThreadList] = useState([]);

  const createThread = () => {
    // console.log(threadName + " " + threadDesc);
    Axios.post(`https://threado-server.herokuapp.com/createThread`, {
      userID: currentUser[0].userID,
      username: currentUser[0].username,
      threadName: threadName,
      threadDesc: threadDesc,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get(`https://threado-server.herokuapp.com/allThreads`, {}).then(
      (response) => {
        console.log(response.data);
        setThreadList(response.data);
      }
    );
  }, []);

  return (
    <div className="subthreads">
      <p>SubThreads</p>

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
      <div className="allThreads">
        {threadList.map((thread) => (
          <div key={thread.subthreadID}>
            <p>{thread.threadName}</p>
            <p>{thread.threadDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThreads;
