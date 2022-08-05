import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

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
          setThreadName("");
          setThreadDesc("");
        }
      );
    });
  };

  const openCreateThread = () => {
    if (document.getElementById("createThreadForm").style.display !== "flex") {
      document.getElementById("createThreadForm").style.display = "flex";
    } else {
      document.getElementById("createThreadForm").style.display = "none";
    }
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
      <div className="pageBanner">
        <FormatListBulletedOutlinedIcon />
        <p>SubThreads</p>
      </div>

      <div className="searchCreateBtn">
        <div className="searchInputBorder">
          <div className="searchInputBody">
            <input placeholder="Search..." />
          </div>
        </div>

        <div className="searchCreateCont">
          <div className="searchCreate">
            <button>Search</button>
            <button onClick={() => openCreateThread()}>+Create</button>
          </div>
        </div>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="createThreadForm" id="createThreadForm">
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
                  <p>users</p>
                </div>
                <div>
                  <CalendarMonthOutlinedIcon />
                  <p> *date</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubThreads;
