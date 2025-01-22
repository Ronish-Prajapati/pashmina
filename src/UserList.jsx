import React, { useState, useEffect } from "react";
import { fetchUsers } from "./utils/api.jsx"; // Import the fetchUsers function
import { Layout,Menu } from "antd";

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  NotificationOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  HomeOutlined,
  UserOutlined,
  CheckSquareOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  UnlockOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { PiNotebookFill } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";

const { Sider, Content } = Layout;


  

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // Extract the last part of the path as the selected key
  const selectedKey = location.pathname.split("/").pop();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <MdDashboardCustomize style={{ color: "" }} />,
      label: "Dashboard",
      link: "/userlist",
    },
    
    
    {
      key: "/addattendee",
      icon: <HomeOutlined style={{ color: "" }} />,
      label: "Add Attendee",
      link: "/register",
    },
    
    // {
    //   key: "workerlist",
    //   icon: <TeamOutlined style={{ color: "" }} />,
    //   label: "Staffs",
    //   link: "workerlist",
    // },
    // {
    //   key: "attendance",
    //   icon: <UserOutlined style={{ color: "" }} />,
    //   label: "Attendance",
    //   link: "attendance",
    // },
    
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList); // Update state with fetched users
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>; // Error state
  if (users.length === 0) return <div>Loading...</div>; // Loading state

  return (
    <>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#3F3F95" }}>
            {!isMobile ? (
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={250}
                theme="light"
                breakpoint="md"
                collapsedWidth={80}
                style={{
                  backgroundColor: "#3F3F95",
                  height: "100vh",
                  overflowY: "auto", // Makes sidebar scrollable
                  position: "fixed", // Fixes the sidebar
                  left: 0,
                }}
                className="no-scrollbar"
              >
                <div className="px-10 py-4">
                  {!collapsed && (
                    <img
                      src="../public/pashmina.png"
                      alt="logo"
                      className="bg-white p-4 rounded-xl mx-auto"
                    />
                  )}
                </div>
                {!collapsed && (
                <p className="text-white font-bold text-xl font-roboto text-center pb-4">
                  PASHMINA EXPO 2025
                </p>)}
                <Menu
                  mode="inline"
                  selectedKeys={[selectedKey]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                    backgroundColor: "#3F3F95",
                  }}
                >
                  {menuItems.map(({ key, icon, label, link, children }) =>
                    children ? (
                      <Menu.SubMenu
                        key={key}
                        icon={icon}
                        title={<span style={{ color: "white" }}>{label}</span>}
                        style={{ color: "white" }}
                      >
                        {children.map((subItem) => (
                          <Menu.Item
                            key={subItem.key}
                            icon={subItem.icon}
                            style={{
                              color: selectedKey === subItem.key ? "blue" : "white",
                            }}
                          >
                            <Link to={subItem.link}>{subItem.label}</Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    ) : (
                      <Menu.Item
                        key={key}
                        icon={icon}
                        style={{
                          color: selectedKey === key ? "blue" : "white",
                        }}
                      >
                        <Link to={link}>
                          <span>{label}</span>
                        </Link>
                      </Menu.Item>
                    )
                  )}
                  <Menu.Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    style={{ color: "white" }}
                  >
                    <span>Logout</span>
                  </Menu.Item>
                </Menu>
              </Sider>
            ) : (
              <div className="flex gap-4 justify-center px-2 py-4 mb-2 fixed bg-[#3F3F95] bottom-0 w-[100%]">
                {menuItems.map(({ key, icon, label, link }) => (
                  <Link key={key} to={link} className="flex flex-col">
                    <div className="mx-auto">{icon}</div>
                    <div
                      style={{
                        color: selectedKey === key ? "blue" : "white",
                      }}
                      className="text-center text-[12px] text-white"
                    >
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <div
              onClick={handleLogout}
              className="fixed bg-[#3F3F95] rounded-md p-4 right-2 top-2 flex gap-1 md:hidden"
            >
              <LogoutOutlined style={{ color: "#ffffff" }} />
            </div>
      
            <Layout style={{ padding: "0 0px 0px" }}>
              <Content style={{ marginLeft: !isMobile ? (collapsed ? 80 : 250) : 0, }}>
              <div className="min-h-screen">
        <h1 className="text-center text-2xl  bg-[url('/title.jpg')] bg-cover font-bold p-10 text-white">
          User List
        </h1>

        <div className="overflow-x-auto overflow-y-auto">
          <table className="table-auto w-full border border-gray-500 shadow-lg bg-white rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Registration ID
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  First Name
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Middle Name
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Last Name
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Country
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Address
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Phone
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Organization
                </th>
                <th className="px-4 py-2 border border-gray-500 text-left text-gray-600 font-semibold">
                  Designation
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.registration_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-500">
                    {user.registration_id}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.first_name}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.middle_name || "-"}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.last_name}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.country}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.address}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.organization}
                  </td>
                  <td className="px-4 py-2 border border-gray-500">
                    {user.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              </Content>
            </Layout>
          </Layout>

      
    </>
  );
};

export default UserList;
