import Link from "next/link";

const MyComponent = () => {
    const shoeBrands = ['Nike', 'Adidas', 'Puma', 'NewBalance', 'Reebok'];
    return (
        <div>

            <ul>
                {shoeBrands.map((brand, index) => (
                    <li key={index}>
                        <Link href={`/stock/${brand.toLowerCase()}`}>
                            <h2>{brand}</h2>
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default MyComponent;
