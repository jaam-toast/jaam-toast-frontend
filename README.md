## **Jaam Toast 프로젝트 소개( Introduction )**

<img src="https://user-images.githubusercontent.com/59520911/205429514-5171a3f9-e0cd-47e9-985a-5a190060d619.svg" width="250" />

###

<aside>

**[☑️ 프론트엔드 배포는 이제 Jaam Toast 에서! ( Click Me )](https://www.jaamtoast.app/index)**

</aside>

> GitHub 연동과 레포지토리 연결만으로 간편하게 프론트엔드 앱 배포를 완료해보세요.
> <br>프로젝트별 세부 옵션만 더해주면, Deploy 버튼 클릭과 함께 Building Log 가 생성됩니다.</br>

![Jaam Toast 시연 영상](https://user-images.githubusercontent.com/93423531/205428305-8a82e734-4157-45df-840a-167b6b406f99.gif)

<br/>

## **프로젝트 동기( Motivation )**

###

> In-House 서비스 개발을 목표로, 웹 프론트엔드 배포 서비스를 기획 및 개발하였습니다.
> <br>Netlify, Vercel 등 기존의 다양한 배포 서비스를 이용하면서 그 편의성과 유용함을 알게 되었고,</br>`프론트엔드 개발자에게 편리한 배포 서비스 개발`을 이번 프로젝트 주제로 선정하게 되었습니다.

<br/>

## **실행 방법( How to run )**

- git clone

  ```
  $ git clone https://github.com/jaam-toast/jaam-toast-frontend.git
  ```

- yarn install / yarn start

  ```
  $ yarn install
  $ yarn build
  $ yarn start
  ```

<br/>

## **프로젝트 일정( Schedule )**

###

**📆 전체 기간** ( `2022년 10월 10일 ~ 2022년 11월 27일` )

**Week 1 - 기획 및 설계**

`2022년 10월 10일 ~ 2022년 10월 16일`

- 아이디어 구상 및 선정
- 배포 기능 작업 프로세스 구상
- 칸반(KANBAN) 작성
- GitHub 레포 설정(+ Git 및 코드 컨벤션)

<br/>

**Week 2 ~ 6 - 기능 개발**

`2022년 10월 17일 ~ 2022년 10월 30일`

- pages > (dashboard/index/login.tsx) 페이지 구상

- Dashboard 페이지 구현
  - Repo(Card/CardList) 컴포넌트 구현
  - TemplateInitial 컴포넌트 구현
- Modal(Create/Build/Deploy/Global) 컴포넌트 구현
- GitHub Oauth 기반의 로그인/로그아웃 기능 구현
- 유저 GitHub 데이터 관련 엔드포인트 세팅

  - 유저 저장소 접근 => 특정 'Organization - Repository' 선택(배포) 가능

- 유저가 입력한 프로젝트 빌드 정보를 토대로, 이를 어떻게 빌드하고 배포시킬 것인지에 대한 구상 및 학습 진행
  - 앱의 유형에 따라 로직 분리(CRA-`CSR` vs Next.js-`SSR`)
  - AWS 주요 서비스 학습(EC2, Route53, S3, CloudFront, CloudWatch Logs 등)

`2022년 10월 31일 ~ 2022년 11월 20일`

- Modal(RepoDetails/Preview) 컴포넌트 구현
  - 배포 완료 후, 생성된 RepoCard 클릭 시 ModalRepoDetails(상세페이지) 확인 가능
- AccordionBuildingLog 컴포넌트 구현
- MobileDefense 컴포넌트 구현 => 모바일📱 환경 대응(UI/UX 개선)
- ModalDeploy 컴포넌트 내 Deploy 버튼 클릭에 따른 빌드 및 배포 기능 구현
  - 배포 완료 시, `https://${repoName}.jaamtoast.click` 형태의 Site URL(deployedUrl) 부여
  - Socket.IO-client 활용 => BuildingLog 데이터 표시 및 관련 기능 구현
  - PR 머지 시, GitHub webhook 요청 받아서 배포 자동 업데이트 기능 구현

<br/>

**Week 7 - 앱 배포 및 README 작성**

`2022년 11월 21일 ~ 2022년 11월 27일`

- 기능상 버그 수정 및 유저 배포 데이터 삭제 추가 기능 구현
- README 작성
- 최종 배포 완료

<br/>

## **프로젝트 설명( How to play )**

### **🎨 기술 스택**

#### **_FrontEnd_**

- ES6+
- NextJS
- TypeScript
- Recoil
- Socket.IO-client
- MUI
- Styled-components
- Jest

#### **_BackEnd_**

- Node.js
- Express
- AWS-SDK for JavaScript v3
  - EC2 / Route53 / CloudWatch Logs
- AWS-CLI
  - Systems Manager
- Nginx
- Let’s Encrypt—Certbot
- Socket.IO
- GitHub
  - OAuth App / REST API / Webhook
- MongoDB with Atlas and Mongoose
- Jest

#### **_Infra_**

- [FE] Vercel
- [BE] AWS EC2 / Route53 / Nginx

<br/>

### **📌 주요 기능**

|                                                      1. Deploy 버튼 클릭에 따른 빌드 및 배포 기능                                                      |                                                   2. PR 머지 시, 배포 자동 업데이트 기능 </br>                                                   |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
| ![1. Deploy 버튼 클릭에 따른 빌드 및 배포 기능](https://user-images.githubusercontent.com/93423531/205428305-8a82e734-4157-45df-840a-167b6b406f99.gif) | ![2. PR 머지 시, 배포 자동 업데이트 기능](https://user-images.githubusercontent.com/93423531/205429823-eb373756-ec29-4b8a-8aef-f93e693d4824.gif) |

#### **원클릭 배포 기능**

---

GitHub 계정과 연동하여 원하는 repository를 클릭 한번에 배포할 수 있습니다.

1. AWS-SDK로 EC2 instance 생성하고 배포에 필요한 환경 세팅

   > 유저가 배포를 요청할 때 보낸 빌드 옵션과 환경변수를 자동 실행시킬 명령어들과 함께 조합

   > AWS-SDK로 EC2 instance 생성
   >
   > - 기본환경 세팅해둔 `AMI` (Amazon Machine Image), `IAM: role`, `Security groups` 적용

   > - `UserData` 파라미터로 자동 실행시킬 명령어들 전달
   >   - 기본환경 세팅
   >     - `yum update`, `nvm` 환경 세팅, Nginx 세팅, https 인증 위한 `letsencrypt certbot` 세팅
   >   - 빌드파일 세팅
   >     - `git clone`, 환경변수 파일 생성, `npm install`, `npm build`, `pm2` 세팅
   >   - AWS 리소스 세팅
   >     - `aws cloud-watch-agent` 세팅, `aws ssm-agent` 세팅

2. AWS-SDK로 Route53 A record 생성

   > 배포되는 유저의 repository 이름을 subdomain으로 EC2 instance 의 Public IP address를 가리키는 A record 생성 ( `${subdomain}.${Config.SERVER_URL}` )

3. AWS-CLI로 `letsencrypt certbot`의 https 인증 요청하는 명령어 instance에 전달

   > https 인증을 하려면 instance와 record가 완전히 준비되어야 하기 때문에, 인터벌로 ping을 보내서 두 요소의 상태 확인

   > 두 가지 모두 준비되면 https 인증 요청 `certbot` 명령어들을 `aws-cli ssm` (Systems Manager)로 instance에 전달해서 원격 실행 (`aws-cli ssm`은 Node.js `child_process`로 실행)

4. AWS-SDK로 `CloudWatch Logs`에서 필요한 로그 요청

   > EC2 생성 후 `UserData` 명령어들이 실행된 log를 미리 `CloudWatch Logs` 특정 group에 쌓이도록 설정해둠

   > - 필요한 log가 `CloudWatch Logs` 특정 group에 준비됐는지 인터벌로 ping을 보내서 상태 확인
   > - 준비되면 log 불러와서 Socket을 통해 클라이언트로 전달

5. 배포한 데이터와 repository 데이터 mongoDB 저장

   > User model, Repo model 함께 mongoose transaction으로 저장

6. 클라이언트에서 필요한 데이터를 처음 배포요청의 응답으로서 전달

   > 새롭게 배포한 웹사이트의 URL 및 데이터 응답

#### **Building Log 전달**

---

- `SocketSingleton` 디자인 패턴

  > Express에서 Socket instance를 한번 만들면 항상 같은 Socket instance를 사용하기 위해 Singleton 패턴으로 Socket 클래스 생성

  > - 원하는 log들을 미리 만들어둔 `createDeploymentDebug()` 등의 debug 함수를 통해 특정한 로그 파일에 `fs.write()`로 기록
  > - Socket 클래스로 만든 instance에서 특정한 로그 파일을 `fs.watch()` 하다가 파일의 변화를 감지할 때마다 클라이언트로 전달

#### **PR Merge 시 배포 사이트 자동 업데이트**

---

- 배포한 repository의 PR GitHub에서 merge 할 때, 배포한 웹사이트 자동 업데이트

  > 유저가 배포 요청했을 때, `createRepoWebhook()`으로 해당 repository에 webhook 생성

  > - PR 관련한 action이 있을 때, origin 서버로 POST ping이 날아오고 PR이 merge 된 경우에는 `aws-cli ssm`으로 배포된 웹사이트 업데이트하는 명령어 instance에 전달 (`aws-cli ssm`은 Node.js `child_process`로 실행)

<br/>

## **Folder Structure**

<details><summary>배포 기능 관련 폴더 구조</summary>

```bash
.
├── api
│   ├── controllers
│   │   ├── auth.ts
│   │   ├── deployController
│   │   │   ├── deployCertbot.ts
│   │   │   ├── deployDomain.ts
│   │   │   ├── deployFilterData.ts
│   │   │   ├── deployInstance.ts
│   │   │   ├── deployLogs.ts
│   │   │   ├── deploySaveData.ts
│   │   │   ├── getUserDeployList.ts
│   │   │   └── index.ts
│   │   ├── updateController
│   │   │   ├── deleteDeployment.ts
│   │   │   ├── index.ts
│   │   │   └── updateDeployment.ts
│   │   └── user.ts
│   ├── github
│   │   ├── client.ts
│   │   └── oauth.ts
│   ├── index.ts
│   ├── middlewares
│   │   ├── errorHandler.ts
│   │   ├── morganMiddleware.ts
│   │   ├── validateSchema.ts
│   │   ├── verifyGithubCode.ts
│   │   ├── verifyGithubSignature.ts
│   │   └── verifyToken.ts
│   └── routes
│       ├── deploy.ts
│       ├── login.ts
│       ├── repos.ts
│       └── users.ts
├── app.ts
├── bin
│   └── www.ts
├── config
│   └── index.ts
├── deploy
│   ├── aws
│   │   ├── config
│   │   │   ├── cloudwatch-agent-config.json
│   │   │   ├── nginx-config-default.sh
│   │   │   └── setNginxScript.ts
│   │   ├── cwl_deletelogstream.ts
│   │   ├── cwl_describelogstreams.ts
│   │   ├── cwl_filterlogeventscommand.ts
│   │   ├── ec2_createinstances.ts
│   │   ├── ec2_describeinstances.ts
│   │   ├── ec2_terminateinstances.ts
│   │   ├── libs
│   │   │   ├── cloudWatchLogsClient.ts
│   │   │   ├── ec2Client.ts
│   │   │   ├── route53Client.ts
│   │   │   └── s3Client.ts
│   │   ├── route53_changerecord.ts
│   │   ├── route53_describerecord.ts
│   │   └── s3_upload_object.ts
│   ├── build-utils
│   │   ├── buildDeploymentCommands.ts
│   │   ├── createDeploymentInstance.ts
│   │   ├── getLogStreamStatus.ts
│   │   ├── getRecordInstanceStatus.ts
│   │   ├── runCertbot.ts
│   │   └── runGetFilteredLogEvents.ts
│   ├── cli
│   │   ├── runCertbotCommands.ts
│   │   └── runUpdateDeploymentCommands.ts
│   └── socket
│       ├── buildingLogSocket.ts
│       ├── index.ts
│       └── socketSingleton.ts
├── loaders
│   ├── express.ts
│   ├── index.ts
│   ├── logger.ts
│   └── mongoose.ts
├── models
│   ├── Repo.ts
│   └── User.ts
├── public
│   └── stylesheets
│       └── style.css
├── types
│   ├── custom
│   │   └── index.d.ts
│   └── express
│       └── index.d.ts
└── utils
    ├── asyncHandler.ts
    ├── createDebug.ts
    ├── errors.ts
    └── temp
        ├── readDir.ts
        └── runBuildCommand.ts
```

</details>

<br/>

## **Service Architecture**

### **전체 플로우**

![jaamtoast-flow-whole-architecture](https://user-images.githubusercontent.com/59520911/205441872-5d665aeb-ed09-4207-b8e7-095b32300ee4.svg)

### **배포 기능 프로세스**

![jaamtoast-flow-deployment-feature](https://user-images.githubusercontent.com/59520911/205441891-fea2104e-31c3-46c1-a43f-7ea5e73e5096.svg)

<br/>

## **🚀 Our Challenge**

프로젝트 기획부터 구현까지, 무엇을 어떻게 접근하면 좋을지 몰라 이번 프로젝트는 그 자체로 단계별 넘어야 할 산이자 도전이었습니다. 그 중 배포 기능과 관련한 주요 이슈를 위주로 다음과 같이 정리하였습니다. ( 저희 백엔드 서버는 “origin 서버”, 그리고 유저의 웹사이트를 배포해주는 기능은 “배포 기능” 이라 하겠습니다. )

#### **배포 기능 작업 프로세스**

---

유저를 위한 배포 기능을 처음 구상할 때, 막연히 알고 있던 것은 GitHub 연동으로 유저가 원하는 repository 파일들을 받아와서 build 명령어를 실행시킬 수 있어야 한다는 정도였고, 목표로 하는 것은 프론트엔드 프레임워크 `Next.js—SSR` 앱과 `Create React App—SPA` 앱을 배포해 줄 수 있는 기능이었습니다.

먼저 `build` 방법으로는 GitHub 문서를 꼼꼼히 살펴본 결과, 일반 repository 파일들을 binary 형태로 받기보단 `git clone`으로 가져오는 것이 효율적이라고 판단하였습니다. 따라서 우선 저희의 origin 서버에서 `git clone`-`npm install`-`build` 명령어를 자동 실행하는 테스트를 진행하였습니다.

이후 배포 기능의 방법으로 CRA 앱은 `S3`를 활용한 Web hosting으로, 그리고 Next.js 앱은 `npm start`를 했을 때 서버가 어떻게 실행되는지 소스코드를 확인해 본 후 `EC2` instance에서 `git clone`-`npm install`-`build`-`start` 명령어를 순차적으로 실행시키는 등의 방법으로 작업의 방향성을 정하였습니다. 여기서 `S3`를 활용한 Web hosting은 클라이언트 사이드 라우팅 상태와 실제 네트워크 요청 상태를 맞추는 데 필요한 `CloudFront` 작업을 어떻게 자동화 할 수 있을지 의문이었기에, 우선순위로 Next.js 앱의 배포 기능을 목표로 먼저 `EC2`를 어떻게 활용할 수 있을지에 대해 학습하였습니다.

이처럼 작업의 물꼬가 조금 트이자, 직접 저희의 origin 서버를 `EC2`로 배포해보면서 후에 유저의 앱을 배포해줄 때 자동 실행시켜야 할 필요 명령어들을 수집한 끝에, `EC2` instance의 생성을 요청하는 `AWS-SDK` 명령어를 만들 때 instance 동작이 시작된 후 실행시킬 명령어들을 `UserData` 파라미터로서 할당할 수 있음을 알게 되었습니다. 더불어 CRA 앱 또한 그러한 방법을 차용하여, 본격적으로 유저의 배포 요청이 들어왔을 때 새로운 `EC2` instance를 생성하고, 배포에 필요한 환경을 만드는 명령어들이 해당 instance 안에서 동적으로 자동 실행될 수 있게끔 코드로 구현하는 작업을 시작할 수 있었습니다.

#### **https 인증 요청**

---

유저가 배포를 요청했을 때, `EC2` instance를 생성하고 `Route53` record를 만들어 원클릭으로 http를 배포해주는 것까지는 성공했지만, https를 어떻게 적용해 줄 수 있을진 막막한 상황이었습니다. 다행히 Vercel 관련 자료를 조사하던 중 찾은, 무료로 https 인증을 제공해주는 'Let’s Encrypt' 라는 기관에서 제공하는 인증의 존재를 알게 되었고, 이를 활용하는 `certbot`이라는 오픈 소스 툴을 이용해, 먼저 수동으로 https 설정을 해보면서 유저의 배포 된 웹사이트가 돌아가는 `EC2` instance에서 https 설정을 자동 실행시키기 위한 필요 명령어들을 수집하였습니다.

관련 방법으로 'AWS Systems Manager' 에 `RunCommand`라는 `EC2` instance로 원격에서 명령어를 전달하는 기능이 있음을 알게 되었습니다. 하지만 배포 요청이 있을 때마다 콘솔창에서 수동으로 이를 진행할 순 없으니, `AWS-CLI`를 활용해 동적으로 `RunCommand`를 실행하는 자동 실행 요청의 코드가 필요하였습니다.

이전에 다른 명령어를 실행시킬 때 써본 `execa`라는 라이브러리를 먼저 활용해 봤지만, 현재 Node.js Express 환경에서 타입스크립트와 ES Modules을 (타입스크립트 컴파일은 CommonJS로) 사용하고 있어 지속적인 에러가 발생하였습니다. 이에 execa 버전을 바꾸고, `import`하는 방식을 적용해 보기도 하였으나, 여전히 에러는 해결되지 않았고 결국 라이브러리 자체를 지운 뒤 해결 방법을 찾다 `execa` 또한 `child_process`를 쉽게 사용하도록 만들어진 라이브러리기에 보다 기본적인 것을 사용하면 되지 않을까 하는 생각에 Node.js의 `child_process`로 우회한 끝에 해결할 수 있었습니다.

#### **배포 Building log 클라이언트로 전달**

---

배포 과정을 보여줄 수 있는 Building log를 전달해주기 위해 Socket.io를 활용하였습니다. 그러나 Express 동작 기저 내에서 어떻게 필요에 따라 동일 Socket instance를 가져와 사용할 수 있을지에 대한 의문이 있었고, 그렇게 Singleton 디자인패턴을 알게 되었습니다.

이제 관련 log를 어떻게 한 번에 하나씩 순차적으로 보내줄 수 있을지에 대해 고민하였고, 디버깅 작업을 위해 미리 만들어 사용하고 있던 debug 함수 활용의 아이디어가 떠올랐습니다. 작업 순서 확인을 위해 debug 함수로 곳곳의 배포 작업 log를 받아와 process.stderr.write로 log 확인 작업을 진행중이었는데, 이때 해당 log가 특정 파일에 보관되게 함으로써, 이후 log가 기록될 때마다 Socket instance에서 그러한 파일 변화를 감지해, 결과적으로 클라이언트에 log를 보내줄 수 있는 방식이었습니다. 더불어 Node.js `File system` 모듈에서 제공하는 API( `fs.open()`, `fs.write()`, `fs.watch()` ) 활용을 더해, 앞서 유추한 방식을 토대로 관련 기능 구현을 완료하였습니다.

#### **배포 기능 로직을 담은 함수 리팩토링**

---

배포 기능이 동작하는 데 주안점을 두고 작업을 진행하다 보니, 배포에 필요한 모든 로직을 담고 있는 `createDeployment()` 함수의 관리가 점점 어려워졌습니다. 또한 라우트를 통해 들어온 요청의 경우 그러한 함수를 단순 실행만 시킨 뒤, 다시 응답으로서 그대로 빠져 나가는 상황이었습니다.

따라서 원활한 유지보수는 물론, 에러 핸들링과 상황에 맞춰 필요한 에러 관련 데이터의 롤백도 불가할 것으로 판단하였기에 해당 함수의 리팩토링을 추가적으로 진행하였습니다. 더불어 로직의 경우 이중 `try catch` 및 `setInterval`과 `setTimeout`도 함께 섞여 있었기에 그에 따른 로직 관리의 효용성, 그리고 배포 기능의 보다 안정적인 동작 개선을 위해 함수 리팩토링을 택하게 되었습니다.

결과적으로 기존의 필요 데이터 사용을 위해 미들웨어에서 접근 가능한 `request object(req)`에 새로운 커스텀 타입을 지정하고 사용하면서 미들웨어 하나당 배포 기능 내 하나의 역할만 담당하도록 이를 분리하였습니다. 또한 미들웨어 내 await가 필요한 함수의 경우는 원하는 타이밍에 `resolve()` 할 수 있도록 `Promise`를 리턴하는 식으로 리팩토링함으로써 클라이언트가 필요로 하는 데이터를 배포 요청에 따른 응답으로서 담아 보낼 수 있었습니다.

#### **Origin 서버 배포 이후 에러**

---

Origin 서버와 프론트엔드 배포 이후, 로컬에선 보지 못한 에러들이 발생하였습니다. ( `aws` 권한 에러, `certbot` 및 `pm2` 관련 에러 등 ) 그 중 Socket cors 에러의 경우 cors 설정을 해 줬음에도 불구하고 발생 원인을 알 수 없었지만, 검색 끝에 Nginx에 socket 관련 `proxy_module` 세팅을 따로 해줘야 하는 것을 찾아 해결할 수 있었습니다. 더불어 구현된 배포 기능 특성상 배포 시 걸리는 시간이 상당하여, 클라이언트의 배포 요청에 따른 응답을 받기까지 꽤 오랜 시간이 걸리는데, 이 또한 Nginx의 `proxy_module`과 `core_module` 관련 설정 중 하나인 응답 대기 시간을 늘려줌으로써 해결하였습니다.

#### **익숙하지 않은 외부 서비스 활용 ( AWS-SDK, AWS-CLI, Nginx 등 )**

---

GitHub, Nginx, 그리고 AWS 등의 공식 문서를 꼼꼼히 살펴봄으로써 필요 정보를 찾고, 코드로서 직접 적용하는 데 많은 도움이 되었습니다. `AWS-SDK`( `EC2`, `Route53`, `CloudWatch Logs` )와 `AWS-CLI`( `Systems Manager` )가 대표적이며, [AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3) 소스코드의 인터페이스와 타입을 중심으로 살펴본 결과 특정 input을 넣었을 때 어떤 ouput이 나오는지 기대할 수 있었습니다.

같은 맥락에서 처음 GitHub OAuth와 REST API 등의 사용을 위해, 관련 문서를 익힐 때만 해도 마냥 어렵게 느껴지던 부분들이 점차 익숙해짐에 따라 해당 문서가 얼마나 잘 쓰여진 것임을 알게 됨은 물론, 후반부의 GitHub webhook 관련 기능 또한 비교적 수월히 구현하는 데 도움을 주었습니다.

#### **의존성으로 해결하지 못했지만 추후 개선하면 좋을 이슈**

---

- [`EC2` instance 휴면 처리](https://taewan.notion.site/3f3d986f202242b8924c36e90bf15777)

  > 배포 요청에 의해 생성된 `EC2` 수가 많아져, 예상치 못한 이슈가 발생할 것에 대비하여 `EC2` instance 생성 시 `hibernation` 옵션을 활성화시키는 방법을 고려하였습니다. 그러나 저희가 사용하는 무료 `t2-micro` `EC2` instance에서는 `hibernation` 옵션이 지원되지 않아, 결과적으로 적용하진 못하였습니다. ( 또한 `hibernation` 사용 조건으로 Amazon `EBS` root volume이 encrypt 되어 있어야 합니다. )

- [`EC2` instance 가 많아질 경우를 대비한 scale 대비 instance 설정](https://taewan.notion.site/scale-instance-2b4ce2d4ce3948bfa7c190451b4de04c)

  > 휴면 처리가 불가한 문제를 해결하기 위해 `EC2` instance 상태를 `stopped`와 `running` 둘 중, 필요 시에만 변경해주는 방법도 고려하였습니다. `hibernation`과 달리 `stopped`로 바꿨을 때 `EC2` 환경 관련 데이터는 삭제되지만, 명령어를 재실행시켜 줌으로써 관련 내역 전부를 재설치하면 되지 않을까 하는 생각 때문이었습니다. 그러나 해당 instance가 stopped에서 running 상태로 바뀔 경우 instance Public IP address 또한 변경되기에 해결 방안으로서 적절치 않았습니다. 더불어 고정된 IP 주소를 갖는 AWS Elastic IP address는 region별 개수 제한이 있어, 이 또한 적용하지 못 하였습니다. [five Elastic IP addresses per Region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html#using-instance-addressing-limit)

- [https 인증 요청을 위한 대기시간 줄이기 (Let’s Encrypt—`Certbot` 요청 전 대기)](https://taewan.notion.site/scale-instance-2b4ce2d4ce3948bfa7c190451b4de04c)

  > `Certbot`으로 https 인증 요청을 하려면 `EC2` instance와 `Route53` record가 완전히 준비된 상태여야 하기에 인터벌로 ping을 보내, 두 요소 간 상태 확인을 우선하였습니다. 그러나 두 요소의 상태가 각각 `RUNNING` / `INSYNC`로 변경 완료된 것을 확인한 뒤 요청을 날렸음에도 불구하고, 계속적으로 https 인증에 실패하였습니다. 여러 방법을 시도해 본 끝에, 변경이 확인된 이후에도 강제로 일정 시간을 `setTimeout`으로 대기했을 때 성공할 수 있었습니다. 배포 자체의 시간이 길어지는 문제점은 있지만, 의존성이 높은 부분이라 해결 방안을 명확히 모색하기 어려웠습니다.
  >
  > - https 인증 요청 대기 문제와 위에서 언급한 scale 대비 instance 설정을 동시에 해결하기 위한 방안으로 [배포요청이 들어왔을 때 로직을 추가](https://taewan.notion.site/scale-instance-2b4ce2d4ce3948bfa7c190451b4de04c)를 더해 보았습니다. 요약은 다음과 같습니다.
  >   - 미리 EC2 instance(stopped)와 Route53 A record들을 생성해서 mongoDB 저장
  >   - 배포 요청이 들어오면 만들어둔 instance 중 하나를 선택해서 상태를 running으로 변경 요청
  >   - instance 상태 변경에 따라 A record가 새로 만들어진 Public IP Address를 가리키게 설정
  >   - 배포 요청한 repo 이름으로 record(CNAME) 하나 만들어서 미리 만들어둔 A record 가리키게 설정
  >   - 생성한 record들 포함해서 Nginx 세팅과 certbot https 인증 요청 명령어 instance로 전달해서 자동 실행
  >   - instance 내부의 build 파일 실행을 위해 필요한 명령어들 instance로 전달해서 자동 실행
  > - 그러나 `EC2` instance의 상태가 변경되면 Public IP address 또한 변경되기에 미리 만들어둔 record A가 준비됐다 하더라도, 새롭게 실행되는 instance 때문에 결국 https 인증 요청을 하기 전에 강제로 일정 시간을 대기해야 될 것으로 짐작되어, 다소 아쉬운 이슈로 남게 되었습니다.

<br/>

## **After Project**

<details><summary>임태완</summary>

---

돌아보면 하나부터 열까지 몰랐던, 한 단계 한 단계가 넘어야 할 산처럼 느껴진 프로젝트라 그 자체로 도전이었습니다. ( 예를 들면 bash script 명령어들을 `EC2` Amazon Linux 2 instance에서 자동 실행시키기 위해서 origin 서버에서 `EC2` instance로 전달하는 기능 등 ) 프로젝트 기간 초반에는 배포를 해주는 메인 기능에 관해 어떻게 구현을 할 수 있을지 감이 오지 않을뿐더러 Node.js와 Express를 처음 TypeScript와 함께 ES modules 스타일로 초기 설정하는 부분도 쉽지 않았습니다.

하지만 결과적으로 프론트엔드의 경계를 넘어 이전에 해보지 않았던 부분을 학습하고 구현해야 했던 프로젝트를 도전한 경험을 통해 새로운 것을 시도하고 적용해보는 자신감을 얻을 수 있었습니다. 그리고 처음에 어떻게 풀어가야 할지 감이 오지 않던 배포기능과 관련해서 단계별로 문제를 하나씩 해결할 때마다 성취감을 느낄 수 있었고, 어떤 문제의 해결책을 찾아서 한 번에 해결한 것이 아닌 프로젝트를 진행하면서 쌓은 지식과 찾은 정보들을 조합해서 생각한 방법으로 구현한 코드가 들어맞아 문제를 해결했을 때는 뿌듯한 개발 경험이었습니다.

프로덕트가 만들어지고 배포되기까지 하나의 큰 사이클 안에서 이전에는 모르던 만큼 막연하게 여겨졌던 배포 과정을 다루어본 작업은 시야를 넓힐 수 있는 학습의 기회가 되었지만, 메인기능을 AWS 서비스들을 잘 연결해서 자동으로 실행시키는 방식으로 구현했기 때문에 의존성으로 해결하지 못한 부분도 있고 개선할 점도 정말 많은 프로젝트였습니다. 앞으로 다른 개발자들에게 도움 되는 더 나은 성능의 서비스를 만드는 것을 목표로 더 공부하고 싶습니다.

</details>

<details><summary>박수정</summary>

---

개발자에게 더 편리한 개발 환경과 시스템 개발 또한 평소 관심 있던 분야라, 이번 프로젝트를 기회 삼아 웹 프론트엔드 배포 서비스를 기획 및 개발하였습니다. 결과적으로 AWS 제공의 주요 서비스를 익히고, 활용하는 데 몰입할 수 있었던 프로젝트였던 만큼 관련 PoC에 상당한 기간이 할애되었습니다. 예로서 빌드 완료 후 번들링 된 유저의 파일을 일정 폴더 규칙에 맞춰 S3에 업로드 시킨 뒤 Route53에서 `userName-repoName` 형식으로 서브도메인을 생성하고, 이를 만들어 둔 CloudFront로 연결하는 등의 일련의 과정을 콘솔창이 아닌 코드로 직접 구현해야 했기에 그러한 기술 검증이 차례로 이뤄져야 했기 때문입니다. 무엇보다 일정 성과를 얻은 PoC였음에도, 개발의 방향성에 따라 적용이 철회된 순간 또한 있었기에 더욱 빠듯해진 개발 일정과 기능 구현 간 조율이 필요하였습니다.

프로젝트 전체 일정과 완성도 사이, 적정선을 도출하기 위해 많은 고민을 거듭하였으나 결국 일정의 늘어짐을 방지하지 못하였단 점이 아쉽습니다. 물론 AWS 제공의 주요 서비스를 다룸으로써 사내 인프라 개발자의 직무를 맛보았단 점에선 프로젝트 초기 기획 의도와도 부합하여 기대 이상의 큰 수확입니다. 그러나 구현에 급급한 나머지, 주어진 개발 일정과 기능의 우선순위를 고려하지 않은 등의 작업 방식은 이번 프로젝트를 교훈 삼아 앞으로 개선되어야 할 점이라고 생각합니다.

</details>

<br/>

## 🙇‍♀️ 팀원

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/taewanseoul">
        <img src="https://user-images.githubusercontent.com/59520911/204722492-42092426-703f-4e7b-83ec-a393da7c4e09.png" alt="임태완 프로필" width="200px" height="200px" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/krystarline">
	      <img src="https://user-images.githubusercontent.com/93423531/204848937-f5ab49f0-f062-4138-aabb-1bb4b9fbf3cf.png" width="200px" height="200px" />
    </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li><a href="https://github.com/taewanseoul">Taewan Lim 임태완</a></li>
		<li>taewan.seoul@gmail.com</li>
	</ul>
    </td>
    <td>
    <ul>
      <li><a href="https://github.com/krystarline">Sujeong Park 박수정</a></li>
		<li>krystarline@gmail.com</li>
	</ul>
    </td>
  </tr>
</table>
