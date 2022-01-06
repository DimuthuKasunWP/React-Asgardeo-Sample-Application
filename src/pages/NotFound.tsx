import React from "react";
import { useHistory } from "react-router-dom";

const NotFoundPage = () => {

    const history = useHistory();

    return (
        <div className="center-text">
            <h3>
                Oops .. Page not found
            </h3>
            <button className="btn primary" onClick={() => { history.push("/") }}>back to  home</button>
        </div>
    );
};

export default NotFoundPage;
