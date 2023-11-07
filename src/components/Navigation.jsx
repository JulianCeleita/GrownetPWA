import { Navbar, Nav } from 'react-bootstrap';
import routes  from '../helpers/routes';
import useAuth from '../auth/useAuth';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const {logout} = useAuth();
    return (
        <Navbar className="pagination-up" collapseOnSelect expand="md" variant='dark' bg='primary'>
            <Navbar.Brand as={NavLink} to={routes.landing}>
                Grownet
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to={routes.suppliers}>Pedidos</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.orders}>Ordenes</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to={routes.login}>Iniciar Sesión</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.login} onClick={logout}>Cerrar Sesión</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.register}>Registrarme</Nav.Link>
                    <Nav.Link as={NavLink} to={routes.admin.team}>Team</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}