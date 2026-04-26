import { useState } from "react";
import Navbar from "@/components/Navbar";
import MapPage from "@/pages/MapPage";
import RoutesPage from "@/pages/RoutesPage";
import ProfilePage from "@/pages/ProfilePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

const Index = () => {
  const [activePage, setActivePage] = useState("map");

  const renderPage = () => {
    switch (activePage) {
      case "map": return <MapPage />;
      case "routes": return <RoutesPage />;
      case "profile": return <ProfilePage />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      default: return <MapPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
