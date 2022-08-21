import axios from 'axios';

import * as t from '../../constant/initialType';
import * as i from '../../constant/initialHttp';

import HttpApi from '../../api';

export const clearPost = () => async (dispatch: any) => {
    dispatch({type: t.CLEAR_POST, payload: false, multiple: {type: t.CLEAR_POST}});
}

export function loadPostHttp(dt: any, state: any, dispatch: any, clear: string) {
    let cancelToken = axios.CancelToken.source();
    dispatch({type: clear, payload: cancelToken, multiple: {type: clear, nested: true}});

    return HttpApi.callPost(i.URI_POST, dt, false, false, cancelToken).then(dt => {
        return dt; 
    }).catch(err => {
        throw(err);
    });
}

export const loadPost = (dt: any, wait: boolean, timer = 1000, state: any) => async (dispatch: any) => {
    let data = await new Promise(resolve => {
        setTimeout(((dt, state, dispatch, t): any => {
            resolve(loadPostHttp(dt, state, dispatch, t.CLEAR_POST)) 
        })(dt, state, dispatch, t), timer)
    })

    let multiple = (state && state.type) ? Object.assign(state, {type: state.type}) : state;
    multiple = (state && state.nested) ? Object.assign(state, {nested: state.nested}) : multiple;

    if (state && state.merge === false) delete multiple.type;

    dispatch({type: t.LOAD_POST, payload: data, multiple: multiple});
    return data;
}