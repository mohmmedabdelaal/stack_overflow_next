import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <ul>
                <Link href={'/order/1'}>
                    <li>Order 1</li>
                </Link> <Link href={'/order/2'}>
                    <li>Order 2</li>
                </Link> <Link href={'/order/3'}>
                    <li>Order 3</li>
                </Link>
            </ul>
            </div>
    );
};

export default Page;
