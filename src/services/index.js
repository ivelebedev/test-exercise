import Sendsay from 'sendsay-api';

const sendsay = new Sendsay({
	auth: {
		login: 'ivelebedev@gmail.com', 
		password: 'ro0Chishu'
	}
});

export const service = {
    sendMessage,
	getStatus
};

function sendMessage(message) {
	
	return sendsay.request(
		{
			action: "issue.send.test",
			letter: {
				'subject': message.theme,
				'from.name': message.from_name,
				'from.email': message.from_email,
				'to.name': message.to_name,
				'message': { 'text': message.text }
			},
			sendwhen: "test",
			mca: [
				message.to_email
			]
		}
	).then(handleResponse);
	
}

function getStatus(messages) {

	const queries = messages.map(item => ({
			action: "track.get",
			id: item.track
		})
    ); 
	
	return sendsay.request(
		{
			action: "batch",
			stop_on_error: 1,
			do: queries
		}
	).then(handleResponse);
	
}

function handleResponse(response) {
    /*return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });*/
	return response;
}