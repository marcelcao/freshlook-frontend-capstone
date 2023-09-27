/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import Footer from './Footer';

function Signin() {
  return (
    <>
      <div>
        <div className="sign-in-contain">
          <div className="copy-items">
            <div className="copy">
              <img src="/icons/faceicon.png" alt="flower icon" className="signin-icon" />
              <p>Never miss a step again! Create and organize your personalized list of skincare routines.</p>
            </div>
            <div className="copy">
              <img src="/icons/sorticon.png" alt="flower icon" className="signin-icon" />
              <p>Catalog your skincare routine products and assign them to your routines!</p>
            </div>
            <div className="copy">
              <img src="/icons/flowericon.png" alt="flower icon" className="signin-icon" />
              <p>Simplify, steamline and enhance your path to radiant, healthy skin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sign-in-content">
        <div className="sign-in-div">
          <Button type="button" size="lg" className="sign-in-btn" onClick={signIn}>
            Sign In
          </Button>
        </div>
        <div className="logo-contain">
          <img src="/icons/freshlook.png" alt="freshlook logo" className="signin-logo" />
        </div>
        <img src="/icons/tagline.png" alt="brand tagline" className="signin-tagline" />
        <Footer className="sign-in-footer" />
      </div>
    </>
  );
}

export default Signin;
