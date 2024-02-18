import generateStore from '@/plugins/valtio-persister';
import { history } from '@umijs/max';
interface appStoreType {
  token: string;
  userInfo: any;
}

const appStore = generateStore<appStoreType>({
  key: 'appStore',
  state: {
    token: '',
    userInfo: {},
  },
  actions: {
    setToken: async (token: string, state) => {
      state['token'] = token;
    },
    setUserInfo: (data, state) => {
      state.userInfo = data;
    },
    logOut: (_, state) => {
      state.userInfo = {};
      state.token = '';
      history.push('/login');
    },
  },
  persist: [
    {
      storage: localStorage,
      paths: ['token', 'userInfo'],
    },
  ],
});

export default appStore;
