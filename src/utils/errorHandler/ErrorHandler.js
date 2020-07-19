import {
	success,
	warn,
	danger,
	info,
	dismissAlert
} from '../../redux/actions/alert';

class ErrorHandler {

	displaySuccessError( dispatch, data ) {
		const state = {
			hasAlert: true,
			header: 'Error',
			body: data ? data.message || data.validationMessages : 'Request failed please try again',
			props: 'status-danger'
		};

		dispatch( danger( state ) );
	}

	displayError( dispatch, data ) {
		const state = {
			hasAlert: true,
			header: 'Error',
			body: data ? data : 'Request failed please try again',
			props: 'status-danger'
		};

		dispatch( danger( state ) );
	}

	displaySuccess(dispatch, data ) {
		const state = {
			hasAlert: true,
			header: 'Viola!',
			body: data,
			props: 'status-success'
		};

		dispatch( success( state ) );
	}

	displayWarning(dispatch, data ) {
		const state = {
			hasAlert: true,
			header: 'Warning',
			body: data,
			props: 'status-warn'
		};

		dispatch( warn( state ) );
	}

	displayInfo(dispatch, data ) {
		const state = {
			hasAlert: true,
			header: 'Info',
			body: data,
			props: 'status-warn'
		};
		
		dispatch( info( state ) );
	}

	dismiss(dispatch) {
		dispatch( dismissAlert() );
	}
}
export default ErrorHandler;
