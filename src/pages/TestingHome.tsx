import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorPage from "./ClientIDMissingError";
import SmoothScroll from "smooth-scroll";
import authConfig from "../config.json";
import { JsonData } from "../data/Data";
import { useAuthContext } from "@asgardeo/auth-react";
import { BottomSection } from "../components/Bottom";
import { TopSection } from "../components/Top";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

interface DataJsonType {
  Top: any;
  Bottom: any;
}

const TestingHomePage = () => {
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
            <TopSection data={landingPageData.Top} />
            <BottomSection data={landingPageData.Bottom} />
          </div>
      }
    </div>
  );
};

export default TestingHomePage;