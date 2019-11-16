import { messageConstants } from '../constants';

export function messages(state = { items: [] }, action) {
  switch (action.type) {
	case messageConstants.SEND_REQUEST:
		return {
			...state,
			loading: true
		};
    case messageConstants.SEND_SUCCESS:
		const item = action.payload.message;
		item['track'] = action.payload.result['track.id'];
		return {
			...state,
			loading: false,
			items: [...state.items, item]
		};
    case messageConstants.SEND_FAILURE:
		return { 
			...state,
			error: action.error
		};
    default:
      return state
  }
}