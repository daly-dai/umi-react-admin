import generateStore from '@/plugins/valtio-persister';
interface appStoreType {
  token: string;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  asideMenu: any[];
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  buttonMap: any;
}

const appStore = generateStore<appStoreType>({
  key: 'appStore',
  state: {
    token: '',
    asideMenu: [],
    buttonMap: {},
  },
  actions: {
    setToken: async (token: string, state) => {
      state['token'] = token;
    },
  },
  persist: [
    {
      key: 'dictData',
      paths: ['dictData'],
    },
    {
      storage: localStorage,
      paths: ['token'],
    },
  ],
});

export default appStore;
