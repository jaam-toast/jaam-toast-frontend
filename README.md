### **프로젝트 소개( Introduction )**

---

###

<aside>

**[☑️ 프론트엔드 배포는 이제 Jaam Toast 에서! ( Click Me )](Jaam Toast - Jamstack App Deployment Service Platform | Deploy Your Own Websites Quick And Easy Like Toasts)**

</aside>

> GitHub 연동과 레포지토리 연결만으로 간편하게 프론트엔드 앱 배포를 완료해보세요.
> <br>프로젝트별 세부 옵션만 더해주면, Deploy 버튼 클릭과 함께 Building Log 가 생성됩니다.</br>

![Jaam Toast 시연영상]()

### **프로젝트 동기( Motivation )**

---

###

> In-House 서비스 개발을 목표로, 웹 프론트엔드 배포 서비스를 기획 및 개발하였습니다.
> Netlify, Vercel 등 기존의 다양한 배포 서비스를 이용하면서 그 편의성과 유용함을 알게 되었고,
> `프론트엔드 개발자에게 편리한 배포 서비스 개발`을 이번 프로젝트 주제로 선정하게 되었습니다.

### **실행 방법( How to run )**

---

- git clone

  ```
  $ git clone https://github.com/jaam-toast/jaam-toast-frontend.git
  ```

- yarn install / yarn start

  ```
  $ yarn install
  $ yarn start
  ```

### **프로젝트 일정( Schedule )**

---

###

**📆 전체 기간** ( `2022년 10월 10일 ~ 2022년 11월 27일` )

Week 1 - 기획 및 설계

`2022년 10월 10일 ~ 2022년 10월 16일`

- 아이디어 구상 및 선정
- 배포 기능 작업 프로세스 구상
- 칸반(KANBAN) 작성
- GitHub 레포 설정(+ Git 및 코드 컨벤션)

Week 2 ~ 6 - 기능 개발

`2022년 10월 17일 ~ 2022년 10월 30일`

- pages > (dashboard/index/login.tsx) 페이지 구상

- Dashboard 페이지 구현
  - Repo(Card/CardList) 컴포넌트 구현
  - TemplateInitial 컴포넌트 구현
- Modal(Create/Build/Deploy/Global) 컴포넌트 구현

- GitHub Oauth 기반의 로그인/로그아웃 기능 구현

  - 유저 저장소 접근 => 특정 'Organization - Repository' 선택(배포) 가능

- 유저가 입력한 프로젝트 빌드 정보를 토대로, 이를 어떻게 빌드하고 배포시킬 것인지에 대한 구상 및 학습 진행
  - 앱의 유형에 따라 로직 분리(CRA-`CSR` vs Next.js-`SSR`)
  - AWS 주요 서비스 학습(EC2, Route53, S3, CloudFront, CloudWatch Logs 등)

---

`2022년 10월 31일 ~ 2022년 11월 20일`

- Modal(RepoDetails/Preview) 컴포넌트 구현
  - 배포 완료 후, 생성된 RepoCard 클릭 시 ModalRepoDetails(상세페이지) 확인 가능
- AccordionBuildingLog 컴포넌트 구현
- MobileDefense 컴포넌트 구현 => 모바일📱 환경 대응(UI/UX 개선)

- ModalDeploy 컴포넌트 내 Deploy 버튼 클릭에 따른 빌드 및 배포 기능 구현
  - 배포 완료 시, `https://${repoName}.jaamtoast.click` 형태의 Site URL(deployedUrl) 부여
  - Socket.IO-client 활용 => BuildingLog 데이터 표시 및 관련 기능 구현
  - PR 머지 시, GitHub webhook 요청 받아서 배포 자동 업데이트 기능 구현

---

Week 7 - 앱 배포 및 README 작성

`2022년 11월 21일 ~ 2022년 11월 27일`

- 기능상 버그 수정
- README 작성
- 최종 배포 완료

### **프로젝트 설명( How to play )**

---

###

**🎨 기술 스택**

### _FrontEnd_

- ES6+
- NextJS
- TypeScript
- Recoil
- Socket.IO-client
- MUI
- Styled-components
- Jest

### _BackEnd_

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

### _Infra_

- [FE] Vercel
- [BE] AWS EC2 / Route53 / Nginx

###

**📌 주요 기능**

| **1. **  | **2. </br>** |
| :------: | :----------: |
| ![1. ]() |   ![2. ]()   |

###

**🚀 Our Challenge**

### **After Project**

---

### 🙇‍♀️ 팀원

---
