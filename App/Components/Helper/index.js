
import Axios from 'axios'
import Snackbar from 'react-native-snackbar';


export const tostalert = (msg, color, toast) => {
  // // const toast = useToast();
  Snackbar.show({
    text: `Copied: ${msg}`,
    textColor: 'white',
    backgroundColor: '#007aff',
    // marginBottom: 100,
    placement: 'top',
  });
};
export const danger = msg => {
  Snackbar.show({
    text: `${msg}`,
    textColor: 'white',
    backgroundColor: 'red',
    // marginBottom: 100,
    placement: 'top',
  });
};
export const warinng = msg => {
  Snackbar.show({
    text: `${msg}`,
    textColor: 'white',
    backgroundColor: '#ffca18',
    // marginBottom: 100,
    placement: 'top',
  });
};
export const success = msg => {
  Snackbar.show({
    text: `${msg}`,
    textColor: 'white',
    backgroundColor: '#4DD637',
    // marginBottom: 100,
    placement: 'top',
  });
};
export const copyText = text => {
  Clipboard.setString(text);
};


export const setAuthToken = token => {
    if (token) {
        Axios.defaults.headers.common['Authorization'] = token
    } else {
        Axios.defaults.headers.common['Authorization'] = ''
    }
}
export const expireCheck=()=>{
  console.log("object");
}

export const conVertText=(data)=>{
  switch (true) {
    case data=='equity':
      return 'EQC';
      break;
      case data=='face_value':
      return 'FV';
      break;  
      case data=='reserves':
      return 'RES';
      break;  
      case data=='dividend':
      return 'DIV';
      break;  
      case data=='sales_turnover':
      return 'STO';
      break;  
      case data=='net_profit':
      return 'NP';
      break;  
      case data=='full_year_cps':
      return 'CPS';
      break;  
      case data=='eps':
      return 'EPS';
      break;  
  
    default:
      return false
      
  }

}