import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

import PixelAnalyzer from "./components/PixelAnalyzer";

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Row>
            <Col className="text-center">
              <h1>
                Find the most 7 most frequently occuring pixels in an image
              </h1>
              <PixelAnalyzer />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
