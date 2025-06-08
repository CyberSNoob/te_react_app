import { useState, useEffect } from "react";
import { Home } from "./nav/Home";
import { About } from "./nav/About";
import { Contact } from "./nav/Contact";
import { VIEWS } from "../constants/view";
import DataViewContainer from "./data/DataViewContainer";

const Router = () => {
  const [currentView, setCurrentView] = useState(
    () => sessionStorage.getItem("currentView") || VIEWS.HOME
  );

  // reset url to root when url page access
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/");
    }
  }, [currentView]);

  useEffect(() => {
    const handleNavigation = (e) => {
      e.preventDefault();
      const newView = e.detail;
      console.log(`Router: navigate event received for: `, newView);
      setCurrentView(newView);
      // keep currentView on page reload
      sessionStorage.setItem("currentView", newView);
    };
    console.log("Router: Adding navigate event listener");
    window.addEventListener("navigate", handleNavigation);
    return () => {
      console.log("Router: Removing navigate event listener");
      window.removeEventListener("navigate", handleNavigation);
    };
  }, []);

  const views = {
    [VIEWS.HOME]: <Home />,
    [VIEWS.ABOUT]: <About />,
    [VIEWS.CONTACT]: <Contact />,
    [VIEWS.NOT_FOUND]: <h1>404 - Page not found</h1>,
  };

  const isDataView = Object.values(VIEWS.DATA).includes(currentView);
  const ViewComponent = isDataView ? (
    <DataViewContainer view={isDataView ? currentView : VIEWS.HOME} />
  ) : (
    views[currentView] || views[VIEWS.NOT_FOUND]
  );

  return (
    <main className="container mx-auto w-full h-full flex-grow overflow-x-auto">
      {ViewComponent}
    </main>
  );
};

export default Router;
