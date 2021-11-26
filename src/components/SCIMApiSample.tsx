import React, { useEffect, useState } from 'react';
import { useAuthContext, HttpRequestConfig } from "@asgardeo/auth-react";
import ReactJson from "react-json-view";

export const SCIMAPISection = (props: any) => {
    const { state, httpRequest } = useAuthContext();
    const [name, setName] = useState<string>("");
    const [scimUserInfo, setScimUserInfo] = useState<any>({});
    const [country, setCountry] = useState<string>("");
    const [dob, setDateOfBirth] = useState<string>("");


    useEffect(() => {
        if (state?.isAuthenticated) {
            sendRequest();
        }
    }, [state.isAuthenticated]);



    function sendRequest() {
        const requestConfig: HttpRequestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json"
            },
            attachToken: true,
            method: "GET",
            url: "https://api.asgardeo.io/t/dimuthuk1/scim2/Me"
        };
        httpRequest(requestConfig).then((response: any) => {
            setScimUserInfo(response.data);
            setName(response.data.name.givenName);
            setCountry(response.data["urn:scim:wso2:schema"]["country"]);
            setDateOfBirth(response.data["urn:scim:wso2:schema"]["dateOfBirth"])

        }).catch((error) => {
            console.log("request error: " + error);

        })
    }

    function sendPatchRequest() {
        const requestConfig: HttpRequestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/scim+json"
            },
            method: "PATCH",
            url: "https://api.asgardeo.io/t/dimuthuk1/scim2/Me",
            data: {
                "Operations": [
                    {
                        "op": "replace",
                        "value": {
                            "name": {
                                "givenName": name
                            }
                        }
                    },
                    {
                        "op": "replace",
                        "value": {
                            "urn:scim:wso2:schema": {
                                "country": country,
                                "dateOfBirth": dob,
                            }
                        }
                    },
                ],
                "schemas": [
                    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
                ]
            }
        };
        httpRequest(requestConfig).then((response) => {
            setScimUserInfo(response.data);
            alert("Updated!");

        }).catch((error) => {
            console.log("request error: " + error);

        })

    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        sendPatchRequest();
    }

    return (
        <div id='features' className='text-center'>
            <div className='container'>
                <div className='col-md-10 col-md-offset-1 section-title'>
                    <h2>React-Asgardeo Single Page Application</h2>
                    <h4>SCIM API</h4>
                </div>
                <div className='row row-center'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Change GivenName:&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name} type="text" name="name" />
                        </label>
                        <br />
                        <label>
                            Change Country:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                onChange={(e) => setCountry(e.target.value)}
                                value={country} type="text" name="country" />
                        </label>
                        <br />
                        <label>
                            Change Date Of Birth:&nbsp;&nbsp;
                            <input
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                value={dob} type="text" name="dob" />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                    <div className='col-xs-12 col-md-12 json'>
                        {' '}
                        <ReactJson
                            src={scimUserInfo}
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