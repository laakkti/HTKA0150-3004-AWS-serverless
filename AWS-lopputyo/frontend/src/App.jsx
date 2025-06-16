import React, { useState, useEffect, useRef } from "react";

import { Row, Col } from "react-bootstrap";

import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Dropdown,
  InputGroup,
} from "react-bootstrap";

import {
  List,
  Search,
  Fullscreen,
  FullscreenExit,
} from "react-bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css"; // import Bootstrap CSS

import OnProgressModal from "./components/OnProgressModal";
import ConfirmModal from "./components/ConfirmModal";
import Demo from "./pages/Demo";
import GeoJSONValidator from "./components/GeoJSONValidator";
import "./App.css";

import { useFullscreen } from "./hooks/useFullscreen";

import LoginDialog from "./components/login/LoginDialog";
import userService from "./services/user-service";
import startImage from "./img/start.jpg";
import BGimage from "./components/BGimage";
import logo from "./logobrand.png";

const App = () => {
  const [socket, setSocket] = useState(null);

  const [progress, setProgress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [geometry, setGeometry] = useState(null);

  const [data, setData] = useState(null);
  const [page, setPage] = useState(null);
  const [geoJson, setGeoJson] = useState(null);
  const appRef = useRef(null);
  const navbarRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);

  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("Loading...");

  ////////////////////////////

  let startDate = "2024-04-01T00:00:00Z";
  let endDate = new Date().toISOString();

  const geoData = {
    start_date: startDate,
    end_date: endDate,
    geometry: geoJson,
  };

  /**
   * Handle user registration.
   *
   * @async
   * @param {Object} user - The user data.
   * @returns {Object} The response data.
   */
  const handleRegister = async (user) => {
    const data = await userService.register(user);

    return data;
  };

  /**
   * Handle user login.
   *
   * @async
   * @param {number} id - The identifier for the login type.
   * @param {Object} data - The login data.
   * @param {Function} func - The callback function.
   * @returns {Object|null} The response data or null.
   */

  const handleLogin = async (id, data, func) => {
    if (id === 1) {
      if (data !== null) {
        const response = await userService.login(data);

        if (response !== null) {
          if (response.code === 200) {
            console.log("############################# ", response.data.token);
            setUser(response.data.name);
            setToken(response.data.token);
            //setPage("Demo");
          }
          return response;
        } else {
          return null;
        }
      }
    } else if (id === 2) {
      data = {
        email: data.email,
        password: data.password,
        name: `${data.firstname} ${data.lastname}`,
      };

      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(data);

      return await handleRegister(data);
    }
  };

  // if token ehdoksi ja toki backendilläkin pitöisi jotenkin mutta miten AWS:ssä onistuukohan

  useEffect(() => {
    if (!token) return;

    const socketUrl = `wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev?token=${token}`;

    const ws = new WebSocket(socketUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status === "done") {
        console.log("DONE =====================================");
        setData(data.data);
        setIsProcessing(false);
        setMessage("Loading...");
        setPage("Demo");
      } else if (data.status === "progress") {
        console.log("PROGRESS ===================================== ", data);
        if (!data.total) {
          setMessage(data.progress);
        } else {
          setMessage(`Image ${data.progress} of ${data.total}`);
        }
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsProcessing(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      setIsProcessing(false);
    };

    return () => {
      ws.close();
    };
  }, [token]); // ← dependency here

  /*
  useEffect(() => {
    
    const socketUrl ="wss://w2iuklgym6.execute-api.eu-north-1.amazonaws.com/dev";
    const ws = new WebSocket(socketUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.status === "done") {
        console.log("DONE=====================================");
        setData(data.data);
        setIsProcessing(false);

        //setStatus("Processing Complete");
        setPage("Demo");
      } else if (data.status === "progress") {
        //setStatus("Processing...");
        console.log("PROGRESS ===================================== ",data);
        
        //tätä tarvittaamm progreesbar
        //setProgress(`Progress: ${data.progress} / ${data.total}`);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsProcessing(false);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      setIsProcessing(false);
    };

    return () => {
      ws.close();
    };
  }, []);
*/

  const handleGetDates = () => {
    if (socket && socket.readyState === WebSocket.OPEN && !isProcessing) {
      socket.send(JSON.stringify({ action: "getNdviDates", data: geoData }));
      console.log(geoData);
      setIsProcessing(true);
      //setStatus("Starting NDVI processing...");
      setProgress(null);
      //setImages([]);

      //console.log("öööööööööööööööööööööö ",data.geometry);
      setGeometry(geoData.geometry);
    }
  };

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const buttonRef = useRef(null);

  return (
    <Container id="App" fluid className="App" ref={appRef}>
      <ConfirmModal show={confirmShow} onHide={() => setConfirmShow(false)} />
      <LoginDialog
        _show={loginDialog}
        showDialog={setLoginDialog}
        func={handleLogin}
      ></LoginDialog>
      <>
        <Navbar
          ref={navbarRef}
          collapseOnSelect
          fixed="top"
          bg="dark"
          expand="lg"
          data-bs-theme="dark"
          className="justify-content-right"
          expanded={expanded}
        >
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="35"
              height="35"
              alt="Logo"
              style={{ marginLeft: "10px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            ref={buttonRef}
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          ></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <>
              <Nav className="ms-0">
                <div
                  className="mt-1"
                  style={{ color: "#B2B7BA", fontSize: "20px" }}
                >
                  NDVI demo for agriculture
                </div>
              </Nav>
            </>

            <Nav className="ms-auto me-2">
              <>
                {page === "Demo" && (
                  <Nav variant="pills">
                    <div style={{ width: "75px" }}></div>

                    <Button
                      variant="outline-secondary"
                      style={{
                        fontSize: "16px",
                        color: "#B2CDBA",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        setPage(null);
                        setGeoJson(null);
                      }}
                      active={page === "Geometry"}
                    >
                      Geometry
                    </Button>
                  </Nav>
                )}

                <Nav.Link
                  style={{
                    fontSize: "16px",
                    color: "#68cbf8",
                    marginLeft: "20px",
                  }}
                >
                  {user}
                </Nav.Link>

                <Button
                  variant={token ? "outline-info" : "outline-warning"}
                  onClick={() => {
                    if (token) {
                      setToken(false);
                      setPage(null);
                      setUser(null);
                      //  setGeometry(null);
                      setName(null);
                    } else {
                      setLoginDialog(true);
                    }
                  }}
                >
                  {token ? "Log out" : "Log in"}
                </Button>
                <Nav.Link onClick={() => setConfirmShow(true)}>About</Nav.Link>
                <Button
                  variant="outline-secondary"
                  className="me-2 border-0"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <FullscreenExit color="#0d6efd" size={20} />
                  ) : (
                    <Fullscreen color="#0d6efd" size={20} />
                  )}
                </Button>
              </>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
      <OnProgressModal show={isProcessing} message={message} />

      <BGimage show={!token} image={startImage} />

      {page === "Demo" && !isProcessing && data ? (
        <Demo
          data={data}
          geometry={geometry}
          navbarHeight={navbarRef.current.clientHeight}
          token={token}
        />
      ) : (
        token && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              marginTop: "0", // Remove marginTop, not needed in full height layout
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <GeoJSONValidator setGeoJson={setGeoJson} />

              <Button
                onClick={handleGetDates}
                disabled={!geoJson || isProcessing}
              >
                {isProcessing ? "Processing..." : ["Get NDVI Images"]}
              </Button>
            </div>
          </div>
        )
      )}
    </Container>
  );
};

export default App;
