
import React ,{
    createContext,
    useState
} from 'react';


export const AuthContext = createContext({});

function AuthProvider({children}){ 


const endpoint = "https://php-api-financial.vercel.app/api";

//const [endpoint, setEndpoint] = useState("");

  

  const [load, setLoad] = useState(true);


  const [user, setUser] = useState("");

  

  const [bankData, setBankData] = useState([]); 

  const [accountData, setAccountData] = useState([]);

  const [amountAccount, setAmountAccount] = useState();

  const [creditCardData, setCreditCardData] = useState([]);

  //const [transactionsType, setTransactionsType] = useState("");


  const [infoDate, setInfoDate] = useState({    
    hours:"",
    day:"",
    month:"",
    nextMonth:"",
    year:""
  });

  /* use this to static api*/
  const [accounts, setAccounts] = useState([]);
  const [reports, setReports] = useState([]);
  const [creditcard, setCreditCard] = useState([]);
  const [postCreditcard, setPostCreditcard] = useState([]);


 // const [idAccont , setIdAccount] = useState(0);

 

    return(
        <AuthContext.Provider value={
             {
              //endpointPhp,

              setLoad,
              load,

              setUser,
              user, 

             // setEndpoint,
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

             // setTransactionsType,
             // transactionsType,              
                                   
             }}>
          {children}
        </AuthContext.Provider>
  )
}
export default AuthProvider;

