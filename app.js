const http = require('http');
const path = require('path');
const fs = require('fs');
// console.log(typeof http);
// console.dir(http);
// console.dir(http.globalAgent);
let httpArr = [];
for (let key in http) {
  //console.log(key);
  httpArr.push(key);
}
//console.log(httpArr);

// 백엔드에서 뭔가 다를거라는 생각을 버려라 (모든것은 데이터구조론에서 벗어나지 않는다. 변수 객체 배열 매서드......... 데이터 타입 이외에는 없다.)
// 막히는 포인트는 작성법이 아니라 기반지식의 부족이다.
// 검사하는 것을 꾸준히 해야한다.
// http, html은 네트워크지 언어는 아니다. 네트워크라는 카테고리는 어떤언어든지 변하지 않는다.


const server = http.createServer((req, res) => {
  const test = fs.readFileSync("./index.html", (err) => {
    if (err) throw err;
    //console.log(data);    
  });
    
  const css = fs.readFileSync("./style.css", (err) => {
    if (err) throw err;
  });

  if (req.method === "GET") { // GET은 뒤에 쿼리스크링이 붙는다.
    if (req.url === "/") {
      console.log("이거슨  슬래시");
      //res.statusCode = 200;    
      //console.log(req.url, "이거뭐지?");
      res.writeHead(200, { "Content-Type": "text/html" }); // >> html방식으로 읽기
      //res.writeHead(200, { "Content-Type": "text/plain" }); // >> 단순 텍스트로 읽기      
      //res.write("hello");
      //res.write({"insa" : "hello"});
      res.write(test);
      res.end();            
    } else if (req.url === "/style.css") { // css 라우팅
      //console.log("무슨 모양 ?");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(css);        
      res.end();      
    }    
  }
});

server.listen(5678, (err) => {
  console.log('server listening on!');
  if (err) throw err;
});