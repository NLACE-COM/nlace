
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  to,
  icon,
  label,
  collapsed,
  onClick,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center h-12 px-4 rounded-md transition-colors ${
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-muted/50"
        } ${collapsed ? "justify-center" : "gap-3"}`
      }
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <span className="text-[15px]">{label}</span>}
    </NavLink>
  );
};

export default SidebarItem;
