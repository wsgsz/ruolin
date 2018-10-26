import * as type from './mutation-types';
const mutations = {
  [type.SET_GETTOKEN](state, gettoken) { // eslint-disable-line
    state.gettoken = gettoken;
  },
  [type.SET_USERMOBILE](state, user_mobile) { // eslint-disable-line
    state.user_mobile = user_mobile;
  }
}

export default mutations;
