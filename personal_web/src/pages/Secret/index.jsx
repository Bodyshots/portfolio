import './secret.css';
import '../../components/globals.css'
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import morse_code_img from "../../images/morse_code_better.png"
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext, useEffect } from 'react';
import LargeSearch from '../../components/LargeSearch';

function Secret() {
     
    const { loading, setLoading } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        AOS.init({ duration: 1000 });
        document.title = "shhhhhhhhh";
        setLoading(false);
    }, [loading]);

    return (
        <AnimatePage>
            <Container className="secret_back" id='secret_container'>
                <p id='secret_instructions'>you're given the following morse code:</p>
                <img
                    id="morse_code_pic"
                    src={morse_code_img}
                    alt="morse_code_lol"
                >
                </img>
                <p id='secret_q'>what does this translate to?</p>
                <LargeSearch/>
            </Container>
        </AnimatePage>
    );
}

export default Secret;