
import * as Print from 'expo-print';



export default async function PrintPdf (img, title, report, today)  {

     var reportList;

     for (let i in report) {

      const item = report[i];

      // console.log(item.id_anl);
       
         reportList = reportList +
        `         
          <tr>
           <td>${item.id_rpt}</td>
           <td>${item.date_rpt}</td>
           <td>${item.desc_rpt}</td> 
           <td>${item.value_rpt}</td> 
          </tr>       
         `       
     }
     

     /*
     const htmlContent = `
      <html>
        <body>
          <h1>Hello from React Native!</h1>
          <p>This is a test print.</p>
        </body>
      </html>
    `;
     */


   
    const html =
    `
     <!DOCTYPE html> 

      <html>

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  
          <style>
           body{
            padding: 0;
            margin: 0;
            text-align: center;    
            } 
            .containerImg{
               display: flex;
               justify-content:center;
            }
            main{
             width: 1000px;
             height: 800px;            
             padding: 20px;         
             margin-top: 80px;
            }
            table {
             height: auto;
             width: 98%;
             padding: 5px;
             border-collapse: separate;
             border-spacing: 2px;             
             margin: 10px;
             margin-top:100px;
           }
           th {
            font-size: 1.6em;
            text-transform: capitalize;
            color: black;
            background-color: white;
           }
           tr,
           td {
            border: 2px solid black;
            text-align: center;
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            font-size: 1.1em;
            line-height: 1.66667em;
            color: black;
            text-transform: capitalize;
            padding: 2px;
           }
          </style>    
        </head> 

        <body>   
            <div class="containerImg">
              <img src="data:image/png;base64, ${img}" style='display:block; width:100px;height:100px;'/>
            </div> 
            <h1>
              Extrato de Conta
            </h1>   
            <p>${today}</p>
          <main>  
            <h2>Conta ${title}</h2>           
            <table>     
              <thead>
                <tr>
                 <th>ID</th>
                 <th>Date</th>                
                 <th>Desc</th>
                 <th>Value</th>                              
               </tr>   
              </thead> 
              <tbody>
                <tr>              
                 ${reportList} 
                </tr> 
              </tbody>  
            </table>
          </main>    
        </body>
      </html>        
    `
  


   
   try {
        await Print.printAsync({
          html: html, // Or uri: 'path/to/your/pdf.pdf'
          // Optional: printerUrl: selectedPrinter?.url, // iOS only
        });
      } catch (error) {
        console.error('Printing failed:', error);
      }


};
