/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import Footer from './Footer';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <>
      <div id="sidebar-contain">
        <div className="side-links">
          <div>
            <div>
              <img src="/icons/freshlook.png" alt="brand tagline" className="sidebar-logo" />
            </div>
            <div className="page-links">
              <Link passHref href="/">
                <p className="nav-link">Routines</p>
              </Link>
              <Link passHref href="/products" className="nav-link">
                <p className="nav-link">Products</p>
              </Link>
            </div>
          </div>
          <div>
            <div id="user-profile">
              <Link passHref href="/user">
                <img src={user.photoURL} alt="user" className="nav-photo" />
              </Link>
            </div>
            <Button className="sign-out-btn" onClick={signOut}>Sign Out</Button>
            <Footer className="sidebar-footer" />
          </div>
        </div>
      </div>
    </>
  );
}
