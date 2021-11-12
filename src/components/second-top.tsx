import React, { useState, useEffect } from 'react';
import ReactJson from "react-json-view";
import { useAuthContext } from "@asgardeo/auth-react";
import { withRouter } from 'react-router';


export const SecondTopSection = (props: any) => {

  const [authenticateState, setAuthenticateState] = useState<any>(null);
  const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();

  useEffect(() => {
    if (state?.isAuthenticated) {
      const getData = async () => {
        const basicUserInfo = await getBasicUserInfo();
        const idToken = await getIDToken();
        const decodedIDToken = await getDecodedIDToken();

        const authState: any = {
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
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Asgardeo Auth React SDK API Samples</h2>
        </div>
        <div className='row'>
          <div className='col-md-4 json'>
            {' '}
            <h4 className="text-center" style={{ color: 'white' }}>Encoded ID Token</h4>
            <div className='service-desc code'>
              <code>
                <span className="id-token-0">{authenticateState?.idToken[0]}</span>.
                <span className="id-token-1">{authenticateState?.idToken[1]}</span>.
                <span className="id-token-2">{authenticateState?.idToken[2]}</span>
              </code>
            </div>
          </div>
          <div className="column">
            <div className="json">
              <h5 className="text-center">
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
              <h5 className="text-center">
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
          </div>
        </div>
      </div>
    </div>
  )
}