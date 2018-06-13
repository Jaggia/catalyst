import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class SportAuthService {
  // domain = "http://localhost:8080"; // Development Domain - Not Needed in Production
  domain = "https://sheltered-coast-31311.herokuapp.com/"; // Development Domain - Not Needed in Production
  loginAuthToken;
  options;

  constructor(
    private http : Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to// JSON
        'authorization': this.loginAuthToken // Attach token
      })
    });
  }
  // Function to get token from client local storage
  loadToken() {
    this.loginAuthToken = localStorage.getItem('ng-jwt'); // Get token and asssign to variable to be used elsewhere
    // console.log('token boiys : ', this.loginAuthToken)
  }

  // Function to register user accounts
  createBaseballSchema(baseballSchema) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/createBaseballSchema', baseballSchema, this.options).map(res => res.json());
  }
  // Function to register user accounts
  createFootballSchema(footballSchema) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/createFootballSchema', footballSchema, this.options).map(res => res.json());
  }

  // Function to register user accounts
  createBasketballSchema(basketballSchema) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/createBasketballSchema', basketballSchema, this.options).map(res => res.json());
  }

  createAthlete(athlete) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/createAthlete', athlete, this.options).map(res => res.json());
  }

  createRecruit(recruit) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/createRecruit', recruit, this.options).map(res => res.json());
  }

  getAthletes() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getAthletes', this.options).map(res => res.json());
  }

  getRecruits() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getRecruits', this.options).map(res => res.json());
  }

  getSports() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getSports', this.options).map(res => res.json());
  }

  getUser(id) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getUser/' + id, this.options).map(res => res.json());
  }

  getAthlete(id) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getAthlete/' + id, this.options).map(res => res.json());
  }

  getBasketballStat(id) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + '/sportAuthentication/getBasketballStat/' + id, this.options).map(res => res.json());
  }

  changeAthlete(athlete) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/changeAthlete', athlete, this.options).map(res => res.json());
  }
  changeBasketballSchema(basketBall) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.post(this.domain + '/sportAuthentication/changeBasketballSchema', basketBall, this.options).map(res => res.json());
  }
}
