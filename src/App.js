import ChartWrapper from "./ChartWrapper";
import Navbar from "react-bootstrap/Navbar";
import { Container, Col, Row } from "react-bootstrap";
import GenderDropdown from "./GenderDropdown";
import { useState } from "react";
function App() {
  const [gender, setGender] = useState("men");
  function changeHandler(e) {
    setGender(e.target.innerHTML.toLowerCase());
  }
  return (
    <div className="App">
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">D3 Stuff</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        {" "}
        <Row xs={"12"}>
          <Col>
            <GenderDropdown changeHandler={changeHandler} />
          </Col>
        </Row>
        <Row>
          <Col xs={"12"}>
            <ChartWrapper gender={gender} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
