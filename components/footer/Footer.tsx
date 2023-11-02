import Link from "next/link";
import classes from './footer.module.css'

const Footer = () => {
    return (
        <header className={classes.footer}>
            <ul>
               <Link href={'/'}>
                   <li>Home</li>
               </Link> <Link href={'/about'}>
                   <li>About</li>
               </Link> <Link href={'/contact'}>
                   <li>Contact</li>
               </Link>
            </ul>
        </header>
    );
};

export default Footer;
