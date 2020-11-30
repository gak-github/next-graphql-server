import React from 'react';
import Link from 'next/link';

function Header() {
    return (
        <header>
            <h1>TodoList</h1>
            <Link href="/"><a className="link-style">Home</a></Link> | <Link href="/about"><a className="link-style">About</a></Link>
        </header>
    )
}

export default Header;