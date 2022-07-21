/* 
1) 리액트 프로젝트 생성
npx create-react-app my-app


2) 프로젝트 폴더로 이동
cd my-app


3) 프로젝트 폴더에서 node 프로젝트 시작 (package.json 생성)
npm init


4) express 설치
npm install express


5) 프로젝트 폴더에 server.js 생성
프로젝트 폴더 내에서 다른 경로에 생성해도 되지만 프로젝트 폴더 바로 아래에 생성해야 서버 실행할 때 경로 입력이 가장 간편

6) 아래와 같이 입력
서버 생성하기 위한 기본 코드라고 생각하면 된다.

(server.js)
*/

const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
/*
4) CORS 이슈 해결을 위해

우선 cors를 설치한다.
npm install cors

설치가 완료되었다면 server.js에 아래 코드 추가

CORS 이슈

CORS(Cross Origin Resource Sharing)는 브라우저가 보안상의 이유로 API를 차단하는 현상이다.
쉽게 말해, OPEN API를 사용하기 위해 내가 발급 받은 Client ID와 Secret KEY를 다른 이가 도용해서 무단으로 사용하지 못하도록 미리 차단하는 것이다.
로컬에서 다른 서버로 호출을 한다든지, 클라이언트는 3000번 포트인데 서버는 다른 포트로 서버를 띄운다든지 이런 행위를 할 때 발생한다.
(server.js)
*/

app.use(express.json());
const cors = require('cors');
app.use(cors());


/*
리액트와 서버 연결
1) 리액트로 작업이 완료되면 배포용 build 파일을 생성한다.
npm run build


2) build 파일이 생성되면, server.js에 아래 코드 추가

(server.js)
*/

app.use(express.static(path.join(__dirname, '/build')));

// 메인페이지 접속 시 build 폴더의 index.html 보내줘
app.get('/', (res, req) => {
  req.sendFile(path.join(__dirname, '/build/index.html'));
})

/*
3) 라우팅은 리액트가 담당하도록 설정하기
리액트는 자체적으로 react-router-dom으로 라우팅하기 때문에, 서버가 맡아서 라우팅할 필요가 없다. 따라서 라우팅은 리액트가 담당하도록 따로 설정을 해주어야 한다.

(server.js)
*/
app.get('*', (res, req) => {
    req.sendFile(path.join(__dirname, '/build/index.html'));
  });


// 8080번 포트에서 서버를 실행할거야
http.listen(8080, () => {
    // 서버가 정상적으로 실행되면 콘솔창에 이 메시지를 띄워줘
    console.log("Listening on 8080");
  });
  

  /*
  서버 실행하기
1) node (server.js경로)를 입력해 서버를 실행해본다.

node server.js

터미널에 "Listening on 8080"이 뜨면서 브라우저 창이 열린다면 성공
nodemon
node server.js로 서버를 실행하면 작업할 때 페이지에 자동으로 업데이트가 반영되지 않기 때문에 불편하다.
nodemon으로 실행하면 저장할 때마다 페이지에 반영이 된다.

설치 : npm install nodemon -g
글로벌로 설치하면 다른 디렉토리에서도 사용할 수 있다.
실행 : nodemon server.js

웹팩이슈 때문에 server.js를 만들고 npm run build를 실행시키면
신택스에러 <  가 뜬다

왜이러는지 3시간동안 git만 4개만들고 지웠다^^

이유는

저 에러는 빌드할때 웹팩이 chunkFile을 JS가 아닌 HTML 구문으로 인식해서 그렇습니다.
<DOCTYPE 으로 시작하는 html  의 <를 인식 하지못한다는 문법에러 입니다.

해결책은

package.json에 "homepage" : .,을 추가하고

src/index.html head태그 부분 안에

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
와
<base href="/" />
을 추가하여야 해결된다

더 꿀팁을 알려주자면

처음 create react app를 생성하고나서

바로 설정해주어야 나중에 run build를 실행하고 static/index.html도 자동으로 바뀐다

끗

  */