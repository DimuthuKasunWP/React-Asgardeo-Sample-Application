import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorPage from "./ClientIDMissingError";
import SmoothScroll from "smooth-scroll";
import authConfig from "../config.json";
import { useAuthContext } from "@asgardeo/auth-react";
import { SecondTopSection } from "../components/second-top";
import { TopSection } from "../components/Top";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const TestingHomePage = () => {
  const [configurationData, setConfigurationData] = useState<any>(authConfig);

  const { state, signOut } = useAuthContext();
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
            <TopSection  />
            <SecondTopSection  />
            <div className="logout-btn" style={{background:"white",height:"100px"}}>
            <button
                  onClick={ () => signOut() }
                  className='btn btn-custom btn-lg'
                >
                  Logout
                </button>{' '}
            </div>
          </div>
      }
    </div>
  );
};

export default TestingHomePage;