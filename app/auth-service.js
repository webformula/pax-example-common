const authService = new class {
  constructor() {
    this.onErrorCallbacks = new Set();
    this.bound_validateAuth = this.validateAuth.bind(this);
    window.addEventListener('hashchange', this.bound_validateAuth);
    this.setupAxiosInterceptor();
    this.validateAuth();
  }

  setupAxiosInterceptor() {
    // request interceptor (before request goes out)
    axios.interceptors.request.use(config => {

      // issue new token if the old one is expired
      // This is a simulation of the refresh token strategy
      if (this.isTokenExpired()) {
        this.token = this.generateToken(this.decodeToken(this.token).email);
        console.log('new token issued');
        // return issueTokenRequest().then((token) => {
        //   originalRequest['Authorization'] = 'Bearer ' + token;
        //   return Promise.resolve(originalRequest);
        // });
      }

      // add token to all requests
      config.headers.Authorization = `Bearer ${this.token}`;
      return config;
    }, async error => {
      console.log(error);
      throw error;
    });

    // response interceptor (when request fgets response)
    axios.interceptors.response.use(response => {
      // Return a successful response back to the calling service
      return response;
    }, async error => {
      // attempt a token refresh
      if (error.response.status === 401) {
        // normally this would hit a refresh token endpoint
        //    For now we will just re create the hardcoded jwt
        this.token = this.generateToken(this.decodeToken(this.token).email);

        // New request with new token
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;
        return axios.request(config);
      }

      // throw any error that is not 401
      throw error;
    });
  }

  validateAuth() {
    const parsed = this.decodeToken(this.token);

    // no experation
    if (!parsed.exp) this.token = '';
    // expired
    if (Date.now() > parsed.exp) this.token = '';

    // redirect to login
    if (!this.token) location.href = '/#/login';
  }

  isTokenExpired() {
    const parsed = this.decodeToken(this.token);

    // no experation
    if (!parsed.exp) return true;

    // expired
    if (Date.now() > parsed.exp) return true;

    return false;
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !password) return reject('missing credentials');

      // create dummy token
      this.token = this.generateToken(email);

      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

  async logout() {
    this.token = '';
    location.href = '/#/login';
  }

  get token() {
    return localStorage.getItem('token');
  }

  set token(value) {
    return localStorage.setItem('token', value);
  }

  generateToken(email) {
    const minutes = 10;
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ email: email, iat: Date.now(), exp: (new Date(Date.now() + 1 * 60000 * minutes)).getTime() }))}.NLvx-kWU2JE3VfMB6rMUS1cQq3e7N8FFKtRMEmsXU1g`;
  }

  decodeToken(token) {
    if (!token) return {};

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
};


export default authService;

globalThis.authService = authService;
