import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import input from './input';
import search from './search';
import shows from './show';
import traffic from './traffic';
import user from './user';
import users from './users';

export default combineReducers({
  alert,
  auth,
  input,
  search,
  shows,
  traffic,
  user,
  users,
});
