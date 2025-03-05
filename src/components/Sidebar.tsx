
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarNavItems from "./sidebar/SidebarNavItems";
import SidebarFooter from "./sidebar/SidebarFooter";
import SidebarHeader from "./sidebar/SidebarHeader";
import CollapseButton from "./sidebar/CollapseButton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Handle clicks outside the sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isOpen, onClose]);

  // Control mobile sidebar visibility with animation
  useEffect(() => {
    if (isOpen) {
      setShowMobileSidebar(true);
    } else {
      const timer = setTimeout(() => {
        setShowMobileSidebar(false);
      }, 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // If it's not mobile, and not showing mobile sidebar, don't render
  if (isMobile && !showMobileSidebar) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full bg-background border-r border-border pt-16 transition-all duration-300 ${
          collapsed && !isMobile ? "w-20" : "w-72"
        } ${
          isMobile
            ? isOpen
              ? "translate-x-0 shadow-xl"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Company Selector */}
          <SidebarHeader collapsed={collapsed} />

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <SidebarNavItems 
              collapsed={collapsed} 
              onItemClick={isMobile ? onClose : undefined} 
            />
          </ScrollArea>

          {/* Footer with Settings and Logout */}
          <SidebarFooter 
            collapsed={collapsed} 
            onItemClick={isMobile ? onClose : undefined} 
          />

          {/* Collapse toggle button (non-mobile only) */}
          {!isMobile && (
            <CollapseButton 
              collapsed={collapsed} 
              onClick={onToggleCollapse} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
