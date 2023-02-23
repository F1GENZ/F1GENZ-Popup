import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  return (
    <div class="sidebar">
      <img src="/logo.png" alt="F1GENZ Window Popup" />
      <ul className="sidebar-features">
        <li>Giới thiệu</li>
        <li>Cấu hình</li>
      </ul>
      <ul className="sidebar-contact">
        <li><a href=""><i className="fa fa-phone"></i> Liên hệ với chúng tôi</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
