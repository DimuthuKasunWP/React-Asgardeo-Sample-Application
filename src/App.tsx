import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/About";
import { JsonData } from "./data/Data";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

interface DataJsonType {
    Header: any;
    About: any;
}

const App = () => {
    const [landingPageData, setLandingPageData] = useState<DataJsonType>(JsonData);

    return (
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <About data={landingPageData.About} />
        </div>
    );
};

export default App;