// const host = 'http://localhost:5000/';
// const host = 'https://sandbox.artisana.ng/';
const API_URL = {
	// identity: `${host}api/identity/`,
	identity: `${process.env.REACT_APP_HOST}api/identity/`,
	configuration: `${process.env.REACT_APP_HOST}api/configuration/`,
	// configuration: `${process.env.REACT_APP_HOST}api/configuration/`,
	// artisans: `${process.env.REACT_APP_HOST}api/artisans/`,
	artisans: `${process.env.REACT_APP_HOST}api/artisans/`,
	jobs: `${process.env.REACT_APP_HOST}api/jobs/`,
	reviews: `${process.env.REACT_APP_HOST}api/reviews/`,
	users: `${process.env.REACT_APP_HOST}api/users/`,
	// social: `${process.env.REACT_APP_HOST}api/social/`,
	social: `${process.env.REACT_APP_HOST}api/social/`,
};

export default API_URL;
