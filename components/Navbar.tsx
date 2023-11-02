import Link from 'next/link';
import React from 'react';
import classes from './navbar.module.css';

function Navbar() {
  return (
    <header>
      <nav className={classes.nav}>
        <Link href={'/'}>
          <p>Dev stack</p>
        </Link>
        <ul>
          <Link href={'/products'}>
            <li>products</li>
          </Link>
          <Link href={'/cart'}>
            <li>Shoping cart</li>
          </Link>

        <Link href={'/checkout'}>
            <li>Checkout</li>
          </Link>
        </ul>

      </nav>
    </header>
  );
}

export default Navbar;
