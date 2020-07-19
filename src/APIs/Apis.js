const API_URL = {
	configuration: `https://configuration-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	identity: `https://identity-${process.env.REACT_APP_ENV}.bankly.ng/`,
	payments: `https://payments-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	transfers: `https://transfers-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	savings: `https://savings-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	vouchers: `https://vouchers-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	transactions: `https://transactions-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	withdrawals: `https://withdrawal-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	ussd: `https://ussd-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	paystack: `https://paystack-api-${process.env.REACT_APP_ENV}.bankly.ng/api/paystack/api/`,
	bills: `https://bills-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	interswitch: `https://interswitch-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	providus: `https://providus-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	teller: `https://agent-teller-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	pos: `https://pos-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	agent: `https://agent-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	customer: `https://customer-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	agentLoan: `https://agent-loan-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	jira: `https://jira-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	mail: `https://mail-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	aggregator: `https://aggregator-api-${process.env.REACT_APP_ENV}.bankly.ng/api/`,
	aggregatorPortal: `https://aggregator.bankly.ng/account/email-confirmation/api/`,
	otp: `https://otp-${process.env.REACT_APP_ENV}.bankly.ng/api/`
};

export default API_URL;
