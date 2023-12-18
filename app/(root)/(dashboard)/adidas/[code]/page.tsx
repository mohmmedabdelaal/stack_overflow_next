'use client'
import { useSearchParams } from 'next/navigation'// import {useRouter} from "next/router";

import React from 'react';

const Page = () => {
    const searchParams = useSearchParams();
    const pageNumber= searchParams.get('adidas');
    console.log(searchParams)
    return (
        <div className='flex flex-col gap-5 mt-3.5 bg-light-900'>
            <div className='border-l-dark-200'><h1>Title</h1></div>
            <div><h3>{pageNumber}</h3></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Page;
