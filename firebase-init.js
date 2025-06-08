/**
 * Moz Doctor Dose - Configuração do Firebase
 * Este arquivo centraliza a configuração do Firebase para garantir consistência entre ambiente local e deploy
 * Versão otimizada para Netlify
 */

// Detectar ambiente
const isNetlify = window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify.com');
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

console.log(`Ambiente detectado: ${isNetlify ? 'Netlify' : isDevelopment ? 'Desenvolvimento local' : 'Produção'}`);

// Configuração do Firebase (substitua pelos seus dados reais)
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "moz-doctor-dose.firebaseapp.com",
  databaseURL: "https://moz-doctor-dose.firebaseio.com",
  projectId: "moz-doctor-dose",
  storageBucket: "moz-doctor-dose.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000",
  measurementId: "G-XXXXXXXXXX"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar componentes específicos
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();
const firestore = firebase.firestore();

// Verificar conexão com o banco de dados
const connectedRef = database.ref(".info/connected");
connectedRef.on("value", (snap) => {
  if (snap.val() === true) {
    console.log("Conectado ao Firebase");
  } else {
    console.log("Desconectado do Firebase");
  }
});

// Configuração de persistência para funcionamento offline
firestore.enablePersistence({synchronizeTabs: true})
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Múltiplas abas abertas, persistência disponível apenas em uma aba por vez');
    } else if (err.code == 'unimplemented') {
      console.log('O navegador não suporta persistência de dados');
    }
  });
