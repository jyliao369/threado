import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const SubThreads = ({ currentUser, isLoggedIn }) => {
  const [threadName, setThreadName] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  const [searchThreadWord, setSearchThreadWord] = useState("");

  const [threadList, setThreadList] = useState([]);
  const [showedThreadList, setShowThreadList] = useState([]);

  const searchThread = () => {
    let filteredThreads = [];

    for (let a = 0; a < threadList.length; a++) {
      if (threadList[a].threadName.includes(searchThreadWord)) {
        filteredThreads.push(threadList[a]);
      } else if (threadList[a].threadDesc.includes(searchThreadWord)) {
        filteredThreads.push(threadList[a]);
      } else {
        console.log(false);
      }
    }

    setShowThreadList(filteredThreads);
  };

  const createThread = () => {
    Axios.post(`https://threado-server.herokuapp.com/createThread`, {
      userID: currentUser.userID,
      username: currentUser.username,
      threadName: threadName,
      threadDesc: threadDesc,
    }).then((response) => {
      // console.log(response);
      Axios.get(`https://threado-server.herokuapp.com/allThreads`, {}).then(
        (response) => {
          // console.log(response);
          setThreadList(response.data.reverse());
          setThreadName("");
          setThreadDesc("");
          document.getElementById("createThreadForm").style.display = "none";
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
        setThreadList(response.data.reverse());
        setShowThreadList(response.data.reverse());
      }
    );
  }, []);

  return (
    <div className="subthreads">
      <div className="pageBanner">
        <FormatListBulletedOutlinedIcon />
        <p>Threads</p>
      </div>

      <div className="searchCreateBtn">
        <div className="searchInputBorder">
          <div className="searchInputBody">
            <input
              value={searchThreadWord}
              onChange={(e) => setSearchThreadWord(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="searchCreateCont">
          <div className="searchCreate">
            {searchThreadWord === "" ? (
              <button disabled={true}>
                <SearchOutlinedIcon />
              </button>
            ) : (
              <button
                onClick={() => searchThread()}
                style={{ cursor: "pointer" }}
              >
                <SearchOutlinedIcon />
              </button>
            )}

            {isLoggedIn === false ? (
              <></>
            ) : (
              <button
                onClick={() => openCreateThread()}
                style={{ cursor: "pointer" }}
              >
                <CreateOutlinedIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoggedIn === false ? (
        <></>
      ) : (
        <div className="createThreadForm" id="createThreadForm">
          <div className="threadCont">
            <div className="threadNameCont">
              <div className="threadPostNameBorder">
                <div className="threadPostNameBody">
                  <input
                    value={threadName}
                    onChange={(e) => setThreadName(e.target.value)}
                    placeholder="Thread Name"
                  />
                </div>
              </div>
            </div>
            <div className="threadMainCont">
              <div className="threadPostBorder">
                <div className="threadPostBody">
                  <textarea
                    value={threadDesc}
                    onChange={(e) => setThreadDesc(e.target.value)}
                    placeholder="Thread Description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="createThreadBtnCont">
                <div className="createThreadBtn">
                  <button onClick={() => createThread()}>Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="allThreads">
        {showedThreadList.map((thread) => (
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
                  <p>{thread.totalUser}</p>
                </div>
                <div>
                  <CalendarMonthOutlinedIcon />
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
