import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import ReactJson from "react-json-view";

export const TopSection = (props: any) => {
  const { state, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
  const [authenticateState, setAuthenticateState] = useState<any>(null);

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
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>React-Asgardeo Single Page Application</h2>
          <h4>Authentication Response</h4>
        </div>
        <div className='row row-center'>
          <div className='col-xs-12 col-md-12 json'>
            {' '}
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
        </div>
      </div>
    </div>
  )
}