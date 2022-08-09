import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const MyThreads = () => {
  const { userID } = useParams();

  const [userThreads, setuserThreads] = useState([]);

  const unjoinThread = (mythreadsID) => {
    Axios.delete(
      `https://threado-server.herokuapp.com/unjoinThread/${mythreadsID}`,
      {}
    ).then((response) => {
      console.log(response);
      Axios.get(
        `https://threado-server.herokuapp.com/getJoinedThreads/${userID}`,
        {}
      ).then((response) => {
        setuserThreads(response.data.reverse());
      });
    });
  };

  useEffect(() => {
    Axios.get(
      `https://threado-server.herokuapp.com/getJoinedThreads/${userID}`,
      {}
    ).then((response) => {
      // console.log(response.data);
      setuserThreads(response.data.reverse());
    });
  }, []);

  return (
    <div className="myThreadsPage">
      <div className="pageBanner">
        <ListAltOutlinedIcon />
        <p>MyThreads</p>
      </div>

      <div className="userThreadCont">
        {userThreads.length <= 0 ? (
          <div className="notificationCont">
            <div className="notificationBorder">
              <div className="notificationBody">
                <p>There no threads you have joined!!</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {userThreads.map((thread) => (
              // <div>{thread.threadName}</div>
              <div key={thread.subthreadID} className="threadCont">
                <div className="threadNameCont">
                  <div className="threadNameBorder">
                    <div className="threadNameBody">
                      <h3>/{thread.threadName}</h3>
                    </div>
                  </div>
                </div>
                <div className="deleteThreadBtn">
                  <button
                    onClick={() => unjoinThread(thread.mythreadsID)}
                    style={{ cursor: "pointer" }}
                  >
                    <DeleteForeverOutlinedIcon />
                  </button>
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

export default MyThreads;
