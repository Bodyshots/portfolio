import './not_found.css';
import '../../components/globals.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext, useEffect } from 'react';

function NotFound() {

    const { setLoading } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        AOS.init({ duration: 1000 });
        setLoading(false);
    }, [setLoading]);

    return (
        <AnimatePage>
            <Container id='not_found_container'>
            <h1 id='not_found_title'>Page not found!</h1>
            <h4 id='not_found_subtitle'>Hmmm... Are you sure you're supposed to be here?</h4>
            </Container>
        </AnimatePage>
    );
}

export default NotFound;