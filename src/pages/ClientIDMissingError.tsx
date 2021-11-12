import React from "react";

const ErrorPage = () => {

    return (
        <div className="content center-text">
            <h2>Please add Asgardeo configurations to proceed.</h2>
            <p>Open the "src/config.json" file in an file editor and update the <b>clientID</b> field value with the registered application's client ID.</p>
            <p> You can find more details from this <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/master/samples/asgardeo-react-ts-app">README</a>  .</p>
        </div>
    );
};

export default ErrorPage;
