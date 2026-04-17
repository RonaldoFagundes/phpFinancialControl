
import React ,{
    createContext,
    useState
} from 'react';


export const AuthContext = createContext({});

function AuthProvider({children}){ 

const endpoint = "https://php-api-financial.vercel.app/api";


  const [load, setLoad] = useState(true);

  const [user, setUser] = useState("");  

  const [bankData, setBankData] = useState([]); 

  const [accountData, setAccountData] = useState([]);

  const [amountAccount, setAmountAccount] = useState();

  const [creditCardData, setCreditCardData] = useState([]); 


  const [infoDate, setInfoDate] = useState({    
    hours:"",
    day:"",
    month:"",
    nextMonth:"",
    year:""
  });

  
  const [accounts, setAccounts] = useState([]);
  const [reports, setReports] = useState([]);
  const [creditcard, setCreditCard] = useState([]);
  const [postCreditcard, setPostCreditcard] = useState([]);



    return(
        <AuthContext.Provider value={
             {
              
              setLoad,
              load,

              setUser,
              user, 
             
              endpoint, 

              setInfoDate,
              infoDate,
              
              setBankData,
              bankData, 
              
               /* use this to static api */
              setAccounts,
              accounts,              
              setReports,
              reports,
              setCreditCard, 
              creditcard,
              setPostCreditcard ,
              postCreditcard,

              setAccountData,
              accountData,

              setAmountAccount,
              amountAccount,

              setCreditCardData,
              creditCardData,                          
                                   
             }}>
          {children}
        </AuthContext.Provider>
  )
}
export default AuthProvider;

