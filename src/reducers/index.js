import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { messages } from './messages';

const rootReducer = combineReducers({
	messages: messages,
	form: formReducer
});

export default rootReducer;