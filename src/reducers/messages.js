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
		
	case messageConstants.GETSTATUS_REQUEST:
		return {
			...state
		};
    case messageConstants.GETSTATUS_SUCCESS:
	
		const result = action.payload.result;
		const arr = [];
		for(let i=0;i<state.items.length;i++) {
			for(let j=0;j<result.length;j++) {
				if(state.items[i].track === result[j].obj.id) {
					state.items[i]['status'] = result[j].obj.status;
				}
			}
			arr.push(state.items[i]);
		}
		
		return {
			...state,
			items: arr
		};
    case messageConstants.GETSTATUS_FAILURE:
		return { 
			...state,
			error: action.error
		};
		
    default:
      return state
  }
}