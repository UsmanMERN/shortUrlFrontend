// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Home() {
//   const [originalUrl, setOriginalUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [loading, setLoading] = useState(false); // New loading state

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true); // Set loading to true when the request is initiated

//     await fetchUrl();

//     setLoading(false); // Set loading back to false after the request is complete
//   };

//   const validateForm = () => {
//     if (
//       originalUrl === "" ||
//       description === "" ||
//       description.length < 10 ||
//       image === ""
//     ) {
//       toast.error("Fill in the form fields carefully");
//       return false;
//     }
//     return true;
//   };

//   const fetchUrl = async () => {
//     try {
//       const response = await axios.post(
//         "https://learnwithfaizan.onrender.com/url",
//         {
//           url: originalUrl,
//           description: description,
//           image: image,
//         }
//       );
//       const { shortId } = response.data;
//       setShortUrl(shortId);
//       toast.success("URL shortened successfully!");
//       setOriginalUrl("");
//       setDescription("");
//       setImage("");
//     } catch (error) {
//       if (error.response) {
//         const { status, data } = error.response;
//         if (status === 400) {
//           toast.error(data.error);
//         } else {
//           toast.error("Something went wrong");
//         }
//       } else {
//         toast.error("Network error. Please try again.");
//       }
//     }
//   };

//   const handleCopyClick = () => {
//     const shortenedUrlField = document.getElementById("shortenedUrlField");
//     shortenedUrlField.select();
//     document.execCommand("copy");
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000);
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={{ span: 5, offset: 3 }}>
//           <Form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Enter URL</Form.Label>
//               <Form.Control
//                 type="url"
//                 placeholder="https://example.com"
//                 value={originalUrl}
//                 onChange={(e) => setOriginalUrl(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter a description (minimum 10 characters)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="url"
//                 placeholder="https://example.com/image.jpg"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               />
//             </Form.Group>

//             {shortUrl && (
//               <Form.Group>
//                 <Form.Label>Shortened URL</Form.Label>
//                 <div className="input-group">
//                   <Form.Control
//                     id="shortenedUrlField"
//                     value={"learnwithfaizan.onrender.com/" + shortUrl}
//                     readOnly
//                   />
//                   <Button
//                     className="btn btn-outline-success text-white"
//                     onClick={handleCopyClick}
//                   >
//                     {copySuccess ? "Copied!" : "Copy"}
//                   </Button>
//                 </div>
//               </Form.Group>
//             )}

//             {/* Conditional rendering based on loading state */}
//             {loading ? (
//               <Button
//                 className={"w-100"}
//                 style={{ marginTop: "2rem" }}
//                 variant="outline-success"
//                 disabled
//               >
//                 <Spinner animation="border" size="sm" />
//                 Loading...
//               </Button>
//             ) : (
//               <Button
//                 className={"w-100"}
//                 style={{ marginTop: "2rem" }}
//                 variant="outline-success"
//                 type="submit"
//               >
//                 Shorten
//               </Button>
//             )}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handle redirection confirmation here if needed
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isRedirected = urlParams.get("redirected");

    if (isRedirected) {
      const shouldRedirect = window.confirm(
        "Do you want to redirect to the shortened URL?"
      );

      if (shouldRedirect) {
        window.location.href = getShortenedUrl(shortUrl);
      }
    }
  }, [shortUrl]);

  const getShortenedUrl = (shortId) => {
    // Use a configuration variable for the redirect URL
    return `https://example.com/${shortId}`; // Replace with your actual URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    await fetchUrl();

    setLoading(false);
  };

  const validateForm = () => {
    if (originalUrl === "" || description === "" || description.length < 10 || image === "") {
      toast.error("Fill in the form fields carefully");
      return false;
    }
    return true;
  };

  const fetchUrl = async () => {
    try {
      const response = await axios.post("https://learnwithfaizan.onrender.com/url", {
        url: originalUrl,
        description: description,
        image: image,
      });
      const { shortId } = response.data;
      setShortUrl(shortId);
      toast.success("URL shortened successfully!");
      setOriginalUrl("");
      setDescription("");
      setImage("");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.error);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  const handleCopyClick = (fieldId) => {
    const shortenedUrlField = document.getElementById(fieldId);
    shortenedUrlField.select();
    document.execCommand("copy");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 5, offset: 3 }}>
          <Form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description (minimum 10 characters)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            {shortUrl && (
              <div>
                <Form.Group>
                  <Form.Label>Shortened URL</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      id="shortenedUrlField1" // Unique ID for the first URL
                      value={"learnwithfaizan.onrender.com/" + shortUrl}
                      readOnly
                    />
                    <Button
                      className="btn btn-outline-success text-white"
                      onClick={() => handleCopyClick("shortenedUrlField1")} // Pass the ID as an argument
                    >
                      {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Shortened URL</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      id="shortenedUrlField2" // Unique ID for the second URL
                      value={"learnwithfaizan-nine.vercel.app/" + shortUrl}
                      readOnly
                    />
                    <Button
                      className="btn btn-outline-success text-white"
                      onClick={() => handleCopyClick("shortenedUrlField2")} // Pass the ID as an argument
                    >
                      {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </Form.Group>
              </div>
            )}

            {loading ? (
              <Button
                className={"w-100"}
                style={{ marginTop: "2rem" }}
                variant="outline-success"
                disabled
              >
                <Spinner animation="border" size="sm" />
                Loading...
              </Button>
            ) : (
              <Button
                className={"w-100"}
                style={{ marginTop: "2rem" }}
                variant="outline-success"
                type="submit"
              >
                Shorten
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
