interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  }
  
  const firebaseConfig: IFirebaseConfig = {
    apiKey: 'AIzaSyCDzy6jpTxC9XfPYrnmXFIXXTcxdXAjVhw',
    authDomain: 'crypto-project-94857.firebaseapp.com',
    databaseURL: 'https://crypto-project-94857.firebaseio.com',
    projectId: 'crypto-project-94857',
    storageBucket: 'crypto-project-94857.appspot.com',
    messagingSenderId: '877053045716',
    appId: '1:877053045716:web:8f2f442865741508eb0441',
  };
  
  export default firebaseConfig;  