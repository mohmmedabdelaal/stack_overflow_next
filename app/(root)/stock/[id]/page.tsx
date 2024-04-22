interface Props {
    params: any
}

const Page = ({params}: Props) => {
    const {id} = params

    const brandContent = {
        nike: {
            title: 'Nike Shoes',
            description: 'Explore the latest Nike shoe collections.',
            imageUrl: '/images/nike.jpg',
        },
        adidas: {
            title: 'Adidas Shoes',
            description: 'Discover the popular Adidas shoe styles.',
            imageUrl: '/images/adidas.jpg',
        },
        // Add content for other brands
    };
    const brandInfo = brandContent[id];
    return (
        <div className="flex justify-between bg-accent-blue">
            {brandInfo ? (
                <div>
                    <h1>{brandInfo.title}</h1>
                    {/*<img src={brandInfo.imageUrl} alt={brandInfo.title} />*/}
                    <p>{brandInfo.description}</p>
                </div>
            ) : (
                <div>
                    <h1>Brand Not Found</h1>
                    <p>The requested brand details are not available.</p>
                </div>
            )}
        </div>
    );
};

export default Page;
