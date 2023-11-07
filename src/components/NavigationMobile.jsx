import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import routes from '../helpers/routes';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    //const {logout} = useAuth();
    return (
        <nav className="pagination-down mb-5" >
            <Container>
                <Row className="justify-content-md-center text-center">
                    <Col><Nav.Link as={NavLink} to={routes.suppliers}>Suppliers</Nav.Link></Col>
                    <Col> <Nav.Link as={NavLink} to={routes.orders}>Pedidos</Nav.Link></Col>
                    <Col><Nav.Link as={NavLink} to={routes.team}>Equipo</Nav.Link></Col>
                </Row>
            </Container>

        </nav>
    )
}