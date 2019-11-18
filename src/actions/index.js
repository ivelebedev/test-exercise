import { messageConstants } from '../constants';
import { service } from '../services';

export const actions = {
    addMessage,
	getStatus
};

function getNowDate() {
	const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	const date = new Date();
	return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}

function addMessage(message) {
	
	message.date = getNowDate();
	message.status = '0';
	
	console.log(message);
	
	return dispatch => {
        dispatch(request());

        service.sendMessage(message)
            .then(
                result => dispatch(success(result, message)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: messageConstants.SEND_REQUEST } }
    function success(result, message) { return { type: messageConstants.SEND_SUCCESS, payload: {result, message} } }
    function failure(error) { return { type: messageConstants.SEND_FAILURE, error } }
	
}
function getStatus(messages) {
	
	return dispatch => {
		
		const filtered = messages.filter(item => item.status !== '-2');
		console.log(filtered.length);

		if(filtered.length > 0) {
			dispatch(request());

			service.getStatus(filtered)
				.then(
					result => dispatch(success(result)),
					error => dispatch(failure(error.toString()))
				);
		}
	};

    function request() { return { type: messageConstants.GETSTATUS_REQUEST } }
    function success(result) { return { type: messageConstants.GETSTATUS_SUCCESS, payload: result } }
    function failure(error) { return { type: messageConstants.GETSTATUS_FAILURE, error } }
	
}