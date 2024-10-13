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

// Framework from https://react-bootstrap.github.io/components/navbar/
function NavBar() {
    const location = useLocation();
    const [navbar, setNavBar] = useState(false);

    const handleScroll = () => {
      if (window.scrollY >= 840) {
        setNavBar(true);
      }
      else {
        setNavBar(false);
      }
    }

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, [])


  return (
    <Navbar bg='dark' variant='dark' expand="lg" id="globalnavbar" className={navbar ? "active": ""}>
      <Container fluid>
        <LinkContainer to='/'>
            <Nav.Link as={Link} active={location.pathname === '/'} id='nav-brand'>
                <Navbar.Brand className='nav-link'>
                    Lanz Angeles<span id="slogan">someone please hire me</span>
                </Navbar.Brand>
            </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/'>
                <Nav.Link as={Link} active={location.pathname === '/'}>home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
                <Nav.Link as={Link} active={location.pathname === '/'} hash={"#about"}>about me</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
                <Nav.Link as={Link} active={location.pathname === '/'} hash={"#projects"}>projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/'>
                <Nav.Link as={Link} active={location.pathname === '/'} hash={"#contact"}>contact</Nav.Link>
            </LinkContainer>
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