import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setLogOut } from "../redux/features/authReducer";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, text, onClick, isActive }: any) => (
  <ListItemButton selected={isActive} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItemButton>
);

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogOut());
    navigate("/login", { replace: true, state: null });
  };

  return (
    <SidebarItem icon={<LogoutIcon />} text="Logout" onClick={handleLogout} />
  );
};

const MainListItems = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState<string | null>(
    "Dashboard"
  );

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <React.Fragment>
      <SidebarItem
        icon={<DashboardIcon />}
        text="Dashboard"
        onClick={() => {
          handleItemClick("Dashboard"), navigate("/");
        }}
        isActive={activeItem === "Dashboard"}
      />
      <SidebarItem
        icon={<ProductionQuantityLimitsIcon />}
        text="Products"
        onClick={() => {
          handleItemClick("Products"), navigate("/products");
        }}
        isActive={activeItem === "Products"}
      />
      <LogoutButton />
    </React.Fragment>
  );
};

export default MainListItems;
