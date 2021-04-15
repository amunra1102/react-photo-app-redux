import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import './styles.scss';

const Header = () => (
  <header className="header">
    <Container>
      <Row className="justify-content-between">
        <Col xs="auto">
          <a
            className="header__link header__title"
            href="https://youtube.com/easyfrontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            Photo App Demo
            </a>
        </Col>

        <Col xs="auto">
          <NavLink
            exact
            className="header__link"
            to="/photos"
            activeClassName="header__link--active"
          >
            Redux Project
            </NavLink>
        </Col>
      </Row>
    </Container>
  </header>
);

Header.propTypes = {};

export default Header;
