import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Container>
        <Row>
          <Col className="text-center py-3">Indigo 64</Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
