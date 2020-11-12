// const host = process.env.REACT_APP_HOST;
// const host = process.env.REACT_APP_HOST;
const API_URL = {
	identity: `${process.env.REACT_APP_HOST}api/identity/`,
	configuration: `${process.env.REACT_APP_HOST}api/configuration/`,
	artisans: `${process.env.REACT_APP_HOST}api/artisans/`,
	jobs: `${process.env.REACT_APP_HOST}api/jobs/`,
	requests: `${process.env.REACT_APP_HOST}api/requests/`,
	reviews: `${process.env.REACT_APP_HOST}api/reviews/`,
	users: `${process.env.REACT_APP_HOST}api/users/`,
	social: `${process.env.REACT_APP_HOST}api/social/`,
	category: `${process.env.REACT_APP_HOST}api/category/`,
	chats: `${process.env.REACT_APP_HOST}api/chats/`,
	notifications: `${process.env.REACT_APP_HOST}/`
};

export default API_URL;
