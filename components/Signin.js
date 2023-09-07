import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div>
        <div className="sign-in-contain">
          <div className="copy-items">
            <div className="copy">
              <h1>icon</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="copy">
              <h1>icon</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="copy">
              <h1>icon</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          <div className="sign-in-content">
            <div className="sign-in-div">
              <Button type="button" size="lg" className="sign-in-btn" onClick={signIn}>
                Sign In
              </Button>
            </div>
            <div className="logo-contain">
              <h1>freshlook</h1>
              <p>transform your skin</p>
              <p>one step at a time</p>
            </div>
          </div>
        </div>
        <footer>
          View on Github | © 2023 freshlook by marcelcao
        </footer>
      </div>
    </>
  );
}

export default Signin;
