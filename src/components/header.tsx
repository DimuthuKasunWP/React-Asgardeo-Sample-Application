import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

export const Header = (props:any) => {

  const { signIn } = useAuthContext();

  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <button
                  onClick={ () => signIn() }
                  className='btn btn-custom btn-lg'
                >
                  Log In
                </button>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
