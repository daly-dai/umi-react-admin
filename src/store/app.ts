import generateStore from '@/plugins/valtio-persister';
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
  },
  persist: [
    {
      storage: localStorage,
      paths: ['token',"userInfo"],
    },
  ],
});

export default appStore;
