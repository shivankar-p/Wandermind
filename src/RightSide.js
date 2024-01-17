import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './test.css'

import {
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const img1 = "https://assets.architecturaldigest.in/photos/62e8f25c499ca8eca0144817/16:9/w_2560%2Cc_limit/leela%2520palace-1.jpg"
const RightSide = () => (
  <Container className='test'>
    <Row>
      <Col md={12} className='fullcard'>
        <div className="card">
          <div className="card-header border-success bg-transparent ">#Best rated cafe</div>
            <img className="card-img-top" src={img1} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">LEELA CAFE</h5>
              <p className="card-text">Located right on the beach, this is the perfect place to hang out with your friends or family while enjoying mesmerising sunset views</p>
            </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6} className='leftcard'>
        <div className="card border-success p-3 text-right mb-0 h-100">
          <div className="card-body">
            <h5 className="card-title">Travel options</h5>
            <p className="card-text">Cabs offer the most convenience</p>
          </div>
        </div>
      </Col>
      <Col md={6} className='rightcard'>
        <div className="card border-success p-3 text-right h-100">
          <blockquote className="blockquote mb-0">
            <p>London bridge is by far the best structure I have seen!</p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                Shivankar
              </small>
            </footer>
          </blockquote>
        </div>
      </Col>
    </Row>
    <Row md={12} className='fullcard'>
        <MDBCard
              className="mb-2 gradient-custom"
              style={{ borderRadius: "25px" }}
            >
              <MDBCardBody className="pl-4 pr-4">
                <div className="d-flex justify-content-between pb-2">
                  <div>
                    <h2 className="display-2">
                      <strong>23°C</strong>
                    </h2>
                    <p className="text-muted mb-0">MON &#x2022; Coimbra, Portugal</p>
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp"
                      width="100px"
                    />
                  </div>
                </div>
              </MDBCardBody>
        </MDBCard>  
    </Row>
  </Container>
);


export default RightSide;