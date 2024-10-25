import Container from 'react-bootstrap/Container';
import './navbar.css';
import '../globals.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ScrollIndicator from '../ScrollIndicator';
import { HashLink } from 'react-router-hash-link';

// Framework from https://react-bootstrap.github.io/components/navbar/
function NavBar() {
    const location = useLocation();
    const [navbar, setNavBar] = useState(false);
    const resume_link = 'https://drive.google.com/file/d/1_yZNUNJS9qVqkB8xW_xGcATTfDX1KLAv/view?usp=drive_link'

    const handleScroll = () => {
      if (window.scrollY >= 700) {
        setNavBar(true);
      }
      else {
        setNavBar(false);
      }
    }
    
    // From https://github.com/rafgraph/react-router-hash-link/issues/25#issuecomment-536688104
    const scrollWithOffset = (el) => {
      const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
      const yOffset = -120; 
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  }

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, [])


  return (
    <Navbar bg='dark' variant='dark' expand="lg" id="globalnavbar" className={navbar ? "active": ""}>
      <Container fluid>
        <LinkContainer to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Nav.Link as={Link} id='nav-brand'>
                <Navbar.Brand>
                    Lanz Angeles{/* <span id="slogan">someone please hire me</span> */}
                </Navbar.Brand>
            </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer smooth to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Nav.Link as={Link} active={location.pathname === '/'}>home</Nav.Link>
            </LinkContainer>
            <HashLink smooth to="/#projects" scroll={e => scrollWithOffset(e)} className="nav-link">
              projects
            </HashLink>
            <HashLink smooth to="/#about" scroll={e => scrollWithOffset(e)} className="nav-link">
              about me
            </HashLink>
            <HashLink smooth to="/#contact" scroll={e => scrollWithOffset(e)} className="nav-link">
            contact
            </HashLink>
            <a href={resume_link} as={Link} className="nav-link">
              resume
            </a>
            <LinkContainer to='/secret'>
                <Nav.Link as={Link} active={location.pathname === '/secret'}>secret</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ScrollIndicator />
    </Navbar>
  );
}

export default NavBar;