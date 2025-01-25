// app/api/fetchData/route.js

import axios from 'axios';

export async function GET(request) {
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  const fromDate = urlParams.get('fromDate') || '2025-01-25'; // Default from date
  const toDate = urlParams.get('toDate') || '2025-01-26'; // Default to date

  console.log("Fetching data from:", fromDate, "to:", toDate);

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
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}
