import { FETCH_WEATHER } from '../actions/index'

export default function(state=[], action) {
    // console.log('Action received', action);
    switch (action.type) {
        case FETCH_WEATHER:
            // 一定要返回新的 state
            return [ action.payload.data, ...state ]
            break;
        default:

    }
    return state
}
