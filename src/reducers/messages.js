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
		//console.log(state.items, action.payload.result, "AAAAAAAAA");
		const result = action.payload.result;
		return {
			...state,
			items: state.items.map((item, index) => 
				result[index] && item.track === action.payload.result[index].obj.id ? { ...item, status: action.payload.result[index].obj.status } : item
			)
			/*items: result.map((item, index) => 
				item.obj.id === state.items[index].track ? { ...state.items[index], status: item.obj.status } : state.items[index]
			)*/
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