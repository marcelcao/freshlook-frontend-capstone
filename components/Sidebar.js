import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function Sidebar() {
  return (
    <>
      <div id="sidebar-contain">
        <div className="side-links">
          <div>
            <div>
              <h1>freshlook</h1>
            </div>
            <di className="page-links">
              <Link passHref href="/">
                Routines
              </Link>
              <Link passHref href="/products">
                Products
              </Link>
            </di>
          </div>
          <div>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </div>
        </div>
      </div>
    </>
  );
}
