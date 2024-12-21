import React from 'react';
import Sidebar from '../components/partials/Sidebar'; // Import Sidebar
import Navbar from '../components/partials/Navbar'; // Import Navbar

interface LayoutProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  isSidebarOpen,
  toggleSidebar,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          role="button"
          aria-label="Close sidebar"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main
          className="flex-1 container mx-auto px-6 py-8 overflow-auto"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

