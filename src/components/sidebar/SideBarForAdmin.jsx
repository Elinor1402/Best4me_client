import React from "react";
import "./SideBarForAdmin.css";
import { LineStyle, PermIdentity, MailOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

//the sidebar in admin
export default function Sidebar() {
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem">
                <LineStyle className="sidebarIcon" />
                Summery
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Upload</h3>
          <ul className="sidebarList">
            <Link to="/files" className="link">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Files
              </li>
            </Link>
            {/* <Link to="/feedback" className="link">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            </Link>
            <Link to="/messages" className="link">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
