import { messageConstants } from '../constants';
import { service } from '../services';

export const actions = {
    addMessage
};

function addMessage(message) {
	
	message.date = "30 сентября";
	message.status = "Отправлено";
	
	//service.sendMessage(message);
	
	return dispatch => {
        dispatch(request());

        service.sendMessage(message)
            .then(
                result => dispatch(success(result, message)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: messageConstants.SEND_REQUEST } }
    function success(result, message) { return { type: messageConstants.SEND_SUCCESS, payload: {result, message} } }
    function failure(error) { return { type: messageConstants.SEND_FAILURE, error } }
	
	//return { type: messageConstants.ADD_MESSAGE, payload: message }
}