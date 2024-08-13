import React, { useState } from 'react';
import './WhitePaperPage.scss';
import { Modal, Button, Form } from 'react-bootstrap';

const WhitePaperPage = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedPaper, setSelectedPaper] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setShow(false);
    setEmail(''); // Reset email input
    setErrorMessage(''); // Reset error message
  };

  const handleShow = (paper) => {
    setSelectedPaper(paper);
    setShow(true);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:3000/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, paper: selectedPaper })
      });

      if (response.ok) {
        const result = await response.json();
        const pdfUrl = result.pdfUrl; // Use the URL returned from the server
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${selectedPaper}.pdf`; // Optional: Set a specific filename
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || 'Error saving email. Please try again.');
        console.error('Error saving email:', errorText);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Error:', error);
    }

    // Close the modal
    setShow(false);
  };

  return (
    <div className="whitepaper-page">
      <h1>White Papers</h1>
      <div className="content-box-container">
        <div className="content-box">
          <h2>Open Source Language Models</h2>
          <p>Open source language models such as TinyLlama and Mistral 1L-Tiny are designed to be resource-efficient and deliver strong performance for specific tasks with minimal infrastructure. They are easily accessible through platforms like OLLAMA. Local deployment of these models is straightforward, offering users full control over their data and model usage, while tools like LM Studio facilitate comprehensive testing to ensure performance and accuracy standards are met.</p>
          <Button className="download-button" onClick={() => handleShow('Open Source Language Models')}>
            See Full White Paper
          </Button>
        </div>

        <div className="content-box">
          <h2>Unifying Knowledge Graphs with Language Models</h2>
          <p>Synergising LLMs with knowledge graphs (graphRAGs) is the foundation for generating personalised education pathways Development pipelines involve knowledge graphs enhanced language model generations (graphRAGs) as well as language models augmented knowledge graphs Domain Knowledge Graphs enable the structured data organisation in education which encompass subjects, learning objectives, and competency requirements, while also accounting for emerging areas of study.</p>
          <Button className="download-button" onClick={() => handleShow('Unifying Knowledge Graphs with Language Models')}>
            See Full White Paper
          </Button>
        </div>

        <div className="content-box">
          <h2>Differentially-Private Offsite Prompt Tuning (DP-OPT)</h2>
          <p>In the rapidly evolving landscape of artificial intelligence, Differentially-Private Offsite Prompt Tuning (DP-OPT) emerges as a groundbreaking solution.Addresses pressing concerns about data privacy in the use of Large Language Models (LLMs).Innovative approach allows users, particularly students and researchers, to harness the power of LLMs.Ensures that sensitive information remains confidential.</p>
          <Button className="download-button" onClick={() => handleShow('Differentially-Private Offsite Prompt Tuning (DP-OPT)')}>
            See Full White Paper
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download White Paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Submit and Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WhitePaperPage;