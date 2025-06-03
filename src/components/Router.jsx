import { useState, useEffect } from "react";
import { Home } from "./nav/Home";
import { About } from "./nav/About";
import { Contact } from "./nav/Contact";
import { VIEWS } from "../constants/view";
import DataViewContainer from "./data/DataViewContainer";

// window.location.pathname eg. /about

const Router = () => {
  // const [historyStack, setHistoryStack] = useState([defaultView]);
  const [currentView, setCurrentView] = useState(
    () => sessionStorage.getItem("currentView") || VIEWS.HOME
  );

  // reset url to root when url is used to access pages
  // stay at current page
  useEffect(() => {
    if (window.location.pathname !== "/") {
      setCurrentView(currentView);
      sessionStorage.setItem("currentView", currentView);
      window.history.replaceState(null, "", "/");
    }
  }, [currentView]);

  // handle nav buttons when pressed
  useEffect(() => {
    const handleNavBarNavigation = (e) => {
      const newView = e.detail;
      // console.log(`Router: navigate event received for: `, newView);
      setCurrentView(newView);
      // keep currentView on page reload
      sessionStorage.setItem("currentView", newView);
    };
    // console.log("Router: Adding navigate event listener");
    window.addEventListener("navigate", handleNavBarNavigation);
    return () => {
      // console.log("Router: Removing navigate event listener");
      window.removeEventListener("navigate", handleNavBarNavigation);
    };
  }, []);

  const navigate = (e, view) => {
    e.preventDefault();
    setCurrentView(view);
    console.log(`Current view is ${view}`);
  };

  const views = {
    [VIEWS.HOME]: <Home navigate={navigate} />,
    [VIEWS.ABOUT]: <About />,
    [VIEWS.CONTACT]: <Contact />,
    [VIEWS.NOT_FOUND]: <h1>404 - Page not found</h1>,
  };

  const isDataView = Object.values(VIEWS.DATA).includes(currentView);
  const ViewComponent = isDataView ? (
    <DataViewContainer
      view={isDataView ? currentView : VIEWS.HOME}
      navigate={navigate}
    />
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
