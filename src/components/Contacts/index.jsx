import Container from 'react-bootstrap/Container';
import { useEffect, forwardRef } from 'react';
import './contacts.css';
import AOS from "aos";

const Contacts = forwardRef((props, ref) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
    <div data-aos="fade-up" ref={ref} className='about_us'>
        <span>Contact</span>
        <span>please someone hire me</span>
    </div>
    );
});

export default Contacts;