import Button from "react-bootstrap/Button";
import Header from "components/Header";
import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";

const notify = () => {};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validPassword = "aqivahtest";
  const validEmail = "aqivahtest";

  function attemptSignin() {
    if (email !== validEmail || password !== validPassword) {
      notify.error("Invalid email or password");
      return;
    }

    localStorage.setItem("IS_SIGNEDIN", true);
    window.location.href = "/";
  }

  return (
    <div style={{ width: "500px", margin: "auto", marginTop: "20vh" }}>
      <Header>Login</Header>
      <Container>
        <Card>
          {/* <Card.Header></Card.Header> */}
          <Card.Body>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={input => setEmail(input.target.value)}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={input => setPassword(input.target.value)}
                placeholder="Password"
                type="password"
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button
              style={{ marginLeft: "auto", display: "block" }}
              variant="dark"
              onClick={attemptSignin}
            >
              Login
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}
