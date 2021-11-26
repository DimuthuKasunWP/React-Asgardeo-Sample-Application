import React, { useEffect, useState } from 'react';
import { useAuthContext, HttpRequestConfig } from "@asgardeo/auth-react";
import * as authConfig from "../config.json"
import ReactJson from "react-json-view";
import { useHistory } from "react-router-dom";

export const SessionManagementAPISection = (props: any) => {
    const { state, httpRequest } = useAuthContext();
    const [sessionID, setSessionId] = useState<string>("");
    const [sessionsInfo, setSessionsInfo] = useState<any>({});
    const history = useHistory();


    useEffect(() => {
        if (state?.isAuthenticated) {
            getAllSessions();
        }
    }, [state.isAuthenticated]);



    function getAllSessions() {
        const requestConfig: HttpRequestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json"
            },
            attachToken: true,
            method: "GET",
            url: authConfig.serverOrigin+"/api/users/v1/me/sessions"
        };
        httpRequest(requestConfig).then((response: any) => {
            setSessionsInfo(response.data);

        }).catch((error) => {
            console.log("request error: " + error);
            history.push("/networkError");
        })
    }

    function terminateAllSessions() {
        const requestConfig: HttpRequestConfig = {
            method: "DELETE",
            url: authConfig.serverOrigin+"/api/users/v1/me/sessions"
        };
        httpRequest(requestConfig).then((response: any) => {
            if (response.status === 204){
                getAllSessions();
                setSessionId("");
                alert("All authenticated sessions terminated successfully!");
            }

        }).catch((error) => {
            console.log("request error: " + error);
            history.push("/networkError");
        })

    }
    function terminateSpecificSession(sessionID: string) {
        const requestConfig: HttpRequestConfig = {
            method: "DELETE",
            url: authConfig.serverOrigin+"/api/users/v1/me/sessions/" + sessionID
        };
        httpRequest(requestConfig).then((response: any) => {
            if (response.status === 204){
                setSessionId("");
                getAllSessions();
                alert("session " + sessionID + " is successfully terminated!");
            }

        }).catch((error) => {
            console.log("request error: " + error);
            history.push("/networkError");

        })

    }
    const handleTerminateAll = (event: any) => {
        event.preventDefault();
        terminateAllSessions();
    }

    const handleTerminateSession = (event: any) => {
        event.preventDefault();
        terminateSpecificSession(sessionID);
    }
    return (
        <div id='features' className='text-center'>
            <div className='container'>
                <div className='col-md-10 col-md-offset-1 section-title'>
                    <h4>Session Management API</h4>
                </div>
                <div className='row row-center'>
                    <form id="delete-specific-session-form" onSubmit={handleTerminateSession}>
                        <label>
                            Enter Session ID:&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                onChange={(e) => setSessionId(e.target.value)}
                                value={sessionID} type="text" name="sessionID" />
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" value="Terminate Session" />
                    </form>
                    <br />
                    <form onSubmit={handleTerminateAll}>
                        <input type="submit" value="Terminate All Sessions" />
                    </form>
                    <div className='col-xs-12 col-md-12 json'>
                        {' '}
                        <ReactJson
                            src={sessionsInfo}
                            name={null}
                            enableClipboard={false}
                            displayObjectSize={false}
                            displayDataTypes={false}
                            iconStyle="square"
                            theme="monokai"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}