import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { About } from "../components/About";
import ErrorPage from "./ClientIDMissingError";
import SmoothScroll from "smooth-scroll";
import authConfig from "../config.json";
import { JsonData } from "../data/Data";
import { useAuthContext } from "@asgardeo/auth-react";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

interface DataJsonType {
  Header: any;
  About: any;
}

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState<DataJsonType>(JsonData);
  const [configurationData, setConfigurationData] = useState<any>(authConfig);

  const { state } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (state?.isAuthenticated) {
      history.push("/home");
    } 
  }, [state.isAuthenticated, history]);

  return (
    <div>
      { configurationData.clientID === "" ?
          <ErrorPage />
          :
          <div>
            <Navigation/>
            <Header data={landingPageData.Header} />
            <About data={landingPageData.About} />
          </div>
      }
    </div>
  );
};

export default LandingPage;