import React from 'react';
import Link from "next/link";

const AllProudcts = () => {
    return (
        <div>
            <ul>
                <Link href={'/products/ogiy'}>
                    <li>
                        ogiy
                    </li>
                </Link>
                <Link href={'/products/nike'}>
                    <li>
                        nike
                    </li>
                </Link>
                <Link href={'/products/adidas'}>
                    <li>
                        adidas
                    </li>
                </Link> <Link href={'/products/alpha'}>
                    <li>
                        alpha
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default AllProudcts;
