import { useAuthContext } from "@asgardeo/auth-react";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";

const HomePage = () => {
    const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
    const [authenticateState, setAuthenticateState] = useState<any>(null);

    useEffect(() => {
        if (state?.isAuthenticated) {
            const getData = async () => {
                const basicUserInfo = await getBasicUserInfo();
                const idToken = await getIDToken();
                const decodedIDToken = await getDecodedIDToken();

                const authState:any = {
                    authenticateResponse: basicUserInfo,
                    idToken: idToken.split("."),
                    decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
                    decodedIDTokenPayload: decodedIDToken
                };

                setAuthenticateState(authState);
            };

            getData();
        }
    }, [state.isAuthenticated]);

    return (
        <div>
            {state.isAuthenticated && (
                <>
                    <h2>Authentication Response</h2>
                    <h4 className="sub-title">
                        Derived by the&nbsp;
                        <code className="inline-code-block">
                            <a href="https://www.npmjs.com/package/@asgardeo/auth-react/v/latest"
                                target="_blank" rel="noopener noreferrer" >
                                @asgardeo/auth-react
                            </a>
                        </code>&nbsp;SDK
                    </h4>
                    <div className="json">
                        <ReactJson
                            src={authenticateState?.authenticateResponse}
                            name={null}
                            enableClipboard={false}
                            displayObjectSize={false}
                            displayDataTypes={false}
                            iconStyle="square"
                            theme="monokai"
                        />
                    </div>

                    <h2 className="mb-0 mt-4">ID token</h2>

                    <div className="row1">
                        {authenticateState?.idToken && (
                            <div className="column1">
                                <h5>
                                    <b>Encoded</b>
                                </h5>
                                <div className="code">
                                    <code>
                                        <span className="id-token-0">{authenticateState?.idToken[0]}</span>.
                                        <span className="id-token-1">{authenticateState?.idToken[1]}</span>.
                                        <span className="id-token-2">{authenticateState?.idToken[2]}</span>
                                    </code>
                                </div>
                            </div>
                        )}
                        <div className="column">
                            <div className="json">
                                <h5>
                                    <b>Decoded:</b> Header
                                </h5>
                                <ReactJson
                                    src={authenticateState?.decodedIdTokenHeader}
                                    name={null}
                                    enableClipboard={false}
                                    displayObjectSize={false}
                                    displayDataTypes={false}
                                    iconStyle="square"
                                    theme="monokai"
                                />
                            </div>

                            <div className="json">
                                <h5>
                                    <b>Decoded:</b> Payload
                                </h5>
                                <ReactJson
                                    src={authenticateState?.decodedIDTokenPayload}
                                    name={null}
                                    enableClipboard={false}
                                    displayObjectSize={false}
                                    displayDataTypes={false}
                                    iconStyle="square"
                                    theme="monokai"
                                />
                            </div>
                            <div className="json">
                                <h5>
                                    Signature
                                </h5>
                                <div className="code">
                                    <code>
                                        HMACSHA256(
                                        <br />
                                        &nbsp;&nbsp;
                                        <span className="id-token-0">
                                            base64UrlEncode(
                                            <span className="id-token-1">header</span>)
                                        </span>{" "}
                                        + "." + <br />
                                        &nbsp;&nbsp;
                                        <span className="id-token-0">
                                            base64UrlEncode(
                                            <span className="id-token-1">payload</span>)
                                        </span>
                                        ,&nbsp;
                                        <span className="id-token-1">your-256-bit-secret</span> <br />
                                        );
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn primary mt-4"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default HomePage;
