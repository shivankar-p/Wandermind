import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './test.css'
import {ArrowClockwise} from 'react-bootstrap-icons';

import {
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const img1 = "https://assets.architecturaldigest.in/photos/62e8f25c499ca8eca0144817/16:9/w_2560%2Cc_limit/leela%2520palace-1.jpg"
const RightSide = () => (
  <Container className='test'>
    <Row md={12} className='fullcard'>
        <MDBCard
              className="gradient-custom"
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
                      width="150px"
                    />
                  </div>
                </div>
              </MDBCardBody>
        </MDBCard>  
    </Row>
    <Row>
      <Col md={12} className='fullcard'>
        <div class="card">
          <div class="card-header border-success bg-transparent"><strong>#Best rated cafe</strong></div>
            <img class="card-img-top" src={img1} alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">LEELA CAFE</h5>
              <p class="card-text">Located right on the beach, this is the perfect place to hang out with your friends or family while enjoying mesmerising sunset views</p>
            </div>
        </div>
      </Col>
    </Row>
    <Row>
    <Col md={6} className='leftcard'>
    <div class="card mb-2" >
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
        alt="Trendy Pants and Shoes"
        class="img-fluid rounded-start"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Hotel 1</h5>
        <p class="card-text">
          <small class="text-muted">Price : $31  <span><ArrowClockwise /></span></small>
        </p>
        <a href="#" class="btn btn-primary">Book Now</a>
      </div>
    </div>
  </div>
</div>
    </Col>
    <Col md={6} className='leftcard'>
    <div class="card mb-2" >
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
        alt="Trendy Pants and Shoes"
        class="img-fluid rounded-start"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Hotel 1</h5>
        <p class="card-text">
          <small class="text-muted">Price : $31  <span><ArrowClockwise /></span></small>
        </p>
        <a href="#" class="btn btn-primary">Book Now</a>
      </div>
    </div>
  </div>
</div>
    </Col>
    </Row>
    <Row>
      <Col md={6} className='leftcard'>
        <div class="card bg-light p-3 text-right mb-0 h-100">
          <div class="card-body">
            <h5 class="card-title">Travel options</h5>
            <p class="card-text">Cabs offer the most convenience</p>
          </div>
        </div>
      </Col>
      <Col md={6} className='rightcard'>
        <div class="card border-success p-3 text-right h-100">
          <blockquote class="blockquote mb-0">
            <p>London bridge is by far the best structure I have seen!</p>
            <footer class="blockquote-footer">
              <small class="text-muted">
                Shivankar
              </small>
            </footer>
          </blockquote>
        </div>
      </Col>
    </Row>
    
  </Container>
);


export default RightSide;