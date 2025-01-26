// netlify/functions/fetchData.js
const axios = require('axios');

exports.handler = async function (event, context) {
  const { fromDate, toDate } = event.queryStringParameters;
console.log("=========")
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.bseindia.com/BseIndiaAPI/api/AnnSubCategoryGetData/w?pageno=1&strCat=Company+Update&strPrevDate=${fromDate}&strScrip=&strSearch=P&strToDate=${toDate}&strType=C&subcategory=Award+of+Order+%2F+Receipt+of+Order`,
    headers: { 
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Connection': 'keep-alive',
      'Origin': 'https://www.bseindia.com',
      'Referer': 'https://www.bseindia.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    }
  };

  try {
    const response = await axios.request(config);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
