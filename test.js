const myHeaders = new Headers();
myHeaders.append("accept", "application/json, text/plain, */*");
myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
myHeaders.append("content-type", "application/json");
myHeaders.append("origin", "http://localhost:3001");
myHeaders.append("priority", "u=1, i");
myHeaders.append("referer", "http://localhost:3001/");
myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
myHeaders.append("sec-fetch-dest", "empty");
myHeaders.append("sec-fetch-mode", "cors");
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");

const raw = JSON.stringify({
  "input_query": "check",
  "input_query_type": "",
  "sort_by": "default",
  "status": [],
  "exact_match": false,
  "date_query": false,
  "owners": [],
  "attorneys": [],
  "law_firms": [],
  "mark_description_description": [],
  "classes": [],
  "page": 1,
  "rows": 10,
  "sort_order": "desc",
  "states": [],
  "counties": []
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://vit-tm-task.api.trademarkia.app/api/v3/us", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));