# **Jaam Toast**

<p align="center">
  <img width=300 src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/6030a365-a620-41c4-ba96-3b5830d41910" />
</p>

Jaam Toast는 웹 사이트를 쉽게 배포할 수 있는 서비스입니다. 프로젝트를 생성하고 Github Repository와 연결해 웹 사이트를 손쉽게 배포할 수 있습니다.

그리고 Headless CMS 기능을 제공해, 사용자는 콘텐츠를 생성하고 이미지 파일 등을 저장할 수도 있습니다.

Jaam Toast는 릴레이 프로젝트입니다. 기존에 있던 프로젝트를 이어받아 진행하게 되었습니다.

프로젝트를 유지 보수함과 동시에 실서비스로 런칭할 수 있도록 방향성을 수정하고 확장성 있는 프로젝트가 될 수 있도록 개선하는 역할을 맡았습니다.

- [이전 프로젝트(Frontend) 링크](https://github.com/jaam-toast/jaam-toast-frontend/tree/release-01)
- [이전 프로젝트(Backend) 링크](https://github.com/jaam-toast/jaam-toast-backend/tree/release-01)

현직 Frontend 및 Backend 개발자분들과 코드 리뷰 및 멘토링을 받으며 진행하였습니다.

- [당근마켓 Frontend Lead 원지혁님 멘토링 기록](https://vanillacoding.notion.site/23-04-01-d88dce3e966e4b0c82a9fde0ffc4a3cb)
- [카카오모빌리티 Backend 이영교님 멘토링 기록](https://vanillacoding.notion.site/23-04-08-81fdc846ebc84416823b0ca713ad62af)
- [와이어드컴퍼니 Frontend 장명재님 멘토링 기록](https://vanillacoding.notion.site/23-04-15-cb8c375b2c8e44b89719f3968ddba554)
<br />

# 목차

- [서비스 화면](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%99%94%EB%A9%B4)
- [고민한 부분](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EA%B3%A0%EB%AF%BC%ED%95%9C-%EB%B6%80%EB%B6%84)
  - [배포 기능 개선하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EB%B0%B0%ED%8F%AC-%EA%B8%B0%EB%8A%A5-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
    - [SSH 프로토콜로 접속해서 배포 시간을 단축해보기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#ssh-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C%EB%A1%9C-%EC%A0%91%EC%86%8D%ED%95%B4%EC%84%9C-%EB%B0%B0%ED%8F%AC-%EC%8B%9C%EA%B0%84%EC%9D%84-%EB%8B%A8%EC%B6%95%ED%95%B4%EB%B3%B4%EA%B8%B0)
    - [정적 웹 호스팅에 집중하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%A0%95%EC%A0%81-%EC%9B%B9-%ED%98%B8%EC%8A%A4%ED%8C%85%EC%97%90-%EC%A7%91%EC%A4%91%ED%95%98%EA%B8%B0)
    - [정적 웹 호스팅으로 전환하면서 얻게 된 문제](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%A0%95%EC%A0%81-%EC%9B%B9-%ED%98%B8%EC%8A%A4%ED%8C%85%EC%9C%BC%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EB%A9%B4%EC%84%9C-%EC%96%BB%EA%B2%8C-%EB%90%9C-%EB%AC%B8%EC%A0%9C)
  - [효율적인 스타일링 구조 제작](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81-%EA%B5%AC%EC%A1%B0-%EC%A0%9C%EC%9E%91)
  - [이벤트 기반 구조 도입](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B8%B0%EB%B0%98-%EA%B5%AC%EC%A1%B0-%EB%8F%84%EC%9E%85)
  - [Next.js에서 React로 Migration](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#nextjs%EC%97%90%EC%84%9C-react%EB%A1%9C-migration)
  - [사용자 경험 개선](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B2%BD%ED%97%98-%EA%B0%9C%EC%84%A0)
    - [Suspense, Lazy import 적용하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#suspense-lazy-import-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [에러를 효율적으로 관리할 수 있는 커스텀 컴포넌트 만들기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%97%90%EB%9F%AC%EB%A5%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - [React Query로 렌더링 이후의 에러 대응하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#react-query%EB%A1%9C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9D%B4%ED%9B%84%EC%9D%98-%EC%97%90%EB%9F%AC-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0)
  - [Headless CMS 제작](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#headless-cms-%EC%A0%9C%EC%9E%91)
    - [JSON Schema를 이용해 Jaam Schema 만들기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#json-schema%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-jaam-schema-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - [CMS에 접근할 수 있는 API 제공하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#cms%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-api-%EC%A0%9C%EA%B3%B5%ED%95%98%EA%B8%B0)
    - [페이지네이션 적용하기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [보안, 유저 권한 최소화](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EB%B3%B4%EC%95%88-%EC%9C%A0%EC%A0%80-%EA%B6%8C%ED%95%9C-%EC%B5%9C%EC%86%8C%ED%99%94)
    - [Github 유저 권한](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#github-%EC%9C%A0%EC%A0%80-%EA%B6%8C%ED%95%9C)
    - [S3 Public Access 차단](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#s3-public-access-%EC%B0%A8%EB%8B%A8)
    - [Route 별 CORS 설정](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#route-%EB%B3%84-cors-%EC%84%A4%EC%A0%95)
  - [타입스크립트로 개발자(DX) 경험 향상시키기](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90dx-%EA%B2%BD%ED%97%98-%ED%96%A5%EC%83%81%EC%8B%9C%ED%82%A4%EA%B8%B0)
- [기술 스택](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
- [작업 기록](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%EC%9E%91%EC%97%85-%EA%B8%B0%EB%A1%9D)
- [팀원](https://github.com/jaam-toast/jaam-toast-frontend/tree/docs/readme#%ED%8C%80%EC%9B%90)
<br />

# **서비스 화면**

## **Deployment**
<p align="center">
  <img src="https://github.com/h-alex2/imgaes/blob/main/jaam-cms-%EC%8B%9C%EC%97%B0.gif?raw=true" alt="deployment-demo" width="800"/>
</p>
<a href="https://www.youtube.com/watch?v=OVwu7LXL3Jo" target="_blank">
영상으로 확인하고 싶다면 여기를 클릭해주세요.
</a>
<br />
<br />

## **Headless CMS**
<p align="center">
  <img src="https://github.com/h-alex2/imgaes/blob/main/deployment4.gif?raw=true" alt="cms-demo" width="800"/>
</p>

<a href="https://www.youtube.com/watch?v=jdSHSlmhc8g" target="_blank">
영상으로 확인하고 싶다면 여기를 클릭해주세요.
</a>
<br />
<br />

</details>

# **고민한 부분**

## **배포 기능 개선하기**

프로젝트 진행 중 제일 먼저 고민했던 부분은 배포 기능을 어떻게 개선할지였습니다.

기존의 서비스는 가상 컴퓨팅 환경인 EC2 인스턴스를 생성한 후 EC2 인스턴스에서 사용자의 프로젝트를 실행시켜 배포하는 방식입니다. 기존의 방식으로는 CSR, SSR 등 모든 유형의 배포를 적용할 수 있다는 장점이 있었지만 배포 속도, 비용 발생이라는 문제점이 발생하게 되었습니다.

<p align="center">
  <img width="642" alt="deploy-speed-improvements" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/a5af39fa-fb4b-4a96-9e39-4fe308b49566" />
</p>

크게 이 두 가지 문제점을 해결하는 것을 배포 기능 개선의 주요 목표로 설정하게 되었고 그 결과로는 30% 이상의 배포 속도 개선, 89.7%의 비용 절약이라는 결과를 얻었습니다.

<br />

### **SSH 프로토콜로 접속해서 배포 시간을 단축해보기**

<p align='center'>
  <img width="642" alt="jaamtoast-01-method" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/4875cce0-9c08-4a83-85c3-e4fd667c9a55" />
</p>
저희 서비스는 배포 시간이 3분 이상 걸린다는 문제점이 있었습니다(기본 CRA 어플리케이션 기준). 배포 시간이 느린 이유는 크게 2가지가 있습니다.

1. 빌드 로그를 받는 데 대기하는 시간이 깁니다. AWS CloudWatch에서 로그를 생성하는데 시간이 소요되었습니다(1분 가량).
2. 명령어를 입력하기 위한 대기시간이 깁니다. EC2 인스턴스에 command를 보낼 수 있는 SSM Client 설치 완료를 기다리는데 시간이 소요되었습니다.(2분 가량)

위의 두 가지 문제는 언뜻 별개의 문제로 보이기 쉽지만, 사실 같은 문제점을 공유하고 있습니다. script를 실행할 수 없는 문제와 script에 대한 log를 받을 수 있는 문제이기 때문입니다.

두 문제를 해결하기위해 Client를 이용해 간접적으로 Script를 보내고 그 로그를 받지 않고 직접 할 수 있도록 해결책을 세우게 되었습니다. 그래서 SSH 프로토콜로 접속해 직접 명령어를 입력해주는 방안을 도입하게 되었습니다. 서버에서 Child Process를 통해 직접 EC2에 접속하고 스트림으로 실시간 로그를 받아오게 되면 두 가지의 문제점을 모두 해결할 수 있을 것이라 기대하였습니다.

하지만 SSH 접속 도입은 결과적으로 실패하게 되었습니다. 실패하게 된 이유는

1. 배포할 때 EC2에 설치되어야하는 초기 script의 설치 완료시간이 일정하지 않아, 일정시간을 대기해야했습니다.
2. SSH 터널링이 끊기는 증상이 자주 나타났습니다.
3. 특정 시간대(저녁 10시 이후)에 접속이 잘 되지 않는 문제가 있었습니다.

초기 Script가 설치되기 전에 SSH 접속을 하게 되면, 사용해야 할 프로세스가 아직 설치되지 않아 터널링이 뻗게 됩니다. 설치 완료를 정확하게 알 수 있는 방법이 없어 결론적으로는 이전과 같이 강제적으로 시간을 설정해 기다릴 수밖에 없게 되었습니다. SSH 접속은 연결되는 EC2 인스턴스의 상태를 가장 고려해야 합니다. 저희가 접속하려는 EC2 인스턴스는 생성한 지 얼마 되지 않은 상태의 인스턴스라는 점, 가장 저렴한 유형인 t2.micro 타입이라는 점 때문에 안정적으로 접속할 수 없게 되었습니다.

EC2 인스턴스 내부의 문제점을 해결하는 것은 저희가 해결하기 힘든 영역이라 판단하여 다른 배포 방식을 고민하게 되었습니다.

<br />

### **정적 웹 호스팅에 집중하기**

<p align='center'>
  <img width="642" alt="jaamtoast-01-method-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/9b119c68-b6fd-4f8e-8e20-e57a0495e276" />
</p>
기존의 배포 방식은 새로운 프로젝트 하나당 EC2 인스턴스 하나를 생성합니다. 사이즈가 작은 프로젝트라도 EC2 인스턴스 하나를 생성하게 됩니다. 그래서 많은 배포를 처리할수록 비용이 크게 늘어나게 된다는 단점이 있었습니다.

리소스를 최대한 재사용하기 위해 하나의 인스턴스 내에서 도커를 이용해 여러 빌드를 생성하는 등, 인스턴스 자체를 개선하려는 목표를 세웠습니다. 하지만 위에서 언급한 SSH 적용이 실패하게 되면서 EC2 내부에 직접 접근하는 방식은 안정적으로 제어할 수 없다는 문제점이 있었습니다.

결국 문제가 발생하는 근본적인 원인으로 돌아가서 상황을 분석하게 되었습니다.

- EC2에서 배포 시간을 줄이기 위해서는 인스턴스 환경의 개선이 필요합니다.
- EC2 인스턴스 환경 개선은 곧 비용의 증가로 이어집니다.

시간을 줄이기 위해 환경을 개선하게 되면 비용이 늘어나는 등 환경적인 요인이 크게 작용하게 됩니다. 위의 ssh 접속 문제와 EC2 인스턴스의 리소스 개선의 한계를 느끼게 되어, 배포 방식을 변경하게 되었습니다.

CSR(Client SIde Rendering) 방식은 보통 HTML, CSS, JS로 이루어진 정적 파일들을 단순 호스팅하는 방식으로 이루어집니다. 여기에 Cache-Control 등 몇 가지 설정들을 해주어야 하지만 비교적 더 간편한 방식으로 고려됩니다.

SSR(Server Side Rendering)의 경우는 다릅니다. SSR은 Server에서 HTML을 렌더링해서 응답을 보내주는 방식입니다. 따라서 SSR 어플리케이션을 배포할 때는 요청이 올 때마다 응답을 보내줄 Server를 실행시켜주어야 합니다. 배포하는 방식에 완전한 차이가 있었고, 두 배포 방식은 구분됩니다.

기존의 EC2 방식은 가상 컴퓨터 환경을 사용하여 웹 서버를 띄우는 방식으로, 은 웹 서버를 띄워 두 가지의 배포 방식을 모두 지원할 수 있지만 저희는 HTML, CSS, JS의 정적 웹 호스팅만을 일단 지원하기로 했습니다. 두 가지 방식을 모두 아우를 필요가 없다고 판단했고, 우선은 기본적인 정적 웹 호스팅을 해주는 것이 먼저라고 생각했습니다.

<br />

### **정적 웹 호스팅으로 전환하면서 얻게 된 문제**

<p align='center'>
  <img alt="jaamtoast-01-method-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/3b174242-b147-472d-b920-ff6f95299e88" />
</p>
저희는 Cloudflare Pages로 배포 방식을 전환하게 되었습니다. 기존에 EC2를 이용한 배포 방식의 문제였던

1. build log를 받을 수 없었던 문제
2. 내부 script를 실행하는 데 제한이 있었던 문제
3. 하나의 배포에 너무 많은 리소스가 낭비되는 문제
4. 그로 인해 비용이 상승하는 문제

를 모두 해결할 수 있게 되었습니다.

CloudFlare는 Wrangler라는 CLI를 제공하고, 비교적 높은 수준의 추상화 된 기능을 제공해 웹 사이트를 손쉽게 만들 수 있는 장점이 있습니다. 반면 저희 사용자 입장에서 세부적인 내용을 제어하기가 쉽지 않았습니다.

예를 들어, Jaam Toast에는 사용자가 배포된 프로젝트에 새로운 커스텀 도메인을 추가할 수 있는 기능이 있습니다. 또 Github의 Repository에 Commit이 추가되면 프로젝트를 업데이트하는 기능도 있는데요.

문제는 두 가지의 기능이 함께하게 되면서부터입니다. CloudFlare는 CloudFlare와 Github 연동을 해야만 프로젝트를 업데이트 할 수 있습니다. 하지만 Github 연동까지 맡기게되면 저희의 전체 서비스가 CloudFlare에 의존하게 됩니다. 결국 프로젝트를 업데이트 하기 위해서는 새로운 프로젝트를 생성해야만 합니다.

새로운 프로젝트를 생성하게 되면 새로운 도메인이 생기게 됩니다. Jaam Toast에서는 Cloudflare의 도메인으로 `[projectName].jaamtoast.click` 을 생성하여 유저에게 전달해줍니다. 프로젝트가 업데이트되어 기존의 도메인이 달라진다면, 도메인의 레코드 설정을 변경하고, 새롭게 만들어진 프로젝트에 다시 도메인을 등록하면 됩니다.

문제는 커스텀 도메인을 연결해주는 부분입니다. 커스텀 도메인을 연결해주는 방식은 유저가 기존 도메인을 가리키는 CNAME 레코드를 직접 연결해주어야 합니다. Cloudflare 배포 프로세스를 계속 유지하기 위해서는 기존 도메인이 변경될 때 마다 유저에게 CNAME 값을 변경하도록 할 수 밖에 없습니다.

CloudFlare 자체의 낮은 자유도로 인해서 예상치 못했던 문제를 만나게 되었고, 결국 한 번 더 배포 프로세스를 변경하게 되었습니다. 현재의 문제를 어떻게 해결한다고 하더라도 CloudFlare를 이용하는 방식으로는 조금 더 세부적인 제어를 하기 힘들 것 같다고 판단했습니다. 이 시점엔 프로젝트 마무리 기한이 얼마 남지 않아 변경을 고민했지만, 앞선 EC2를 이용해 AWS에 대해 학습 했던 경험 덕분에 생각보다 빠르게 적용할 수 있었습니다.

<p align='center'>
  <img alt="jaamtoast-01-method-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/68f6df9c-a2b8-4ccb-ba3b-5be93d411697" />
</p>

바뀐 방식은 S3에 직접 파일을 올리고, CloudFront와 연결되는 방식인데요.

1. 배포 요청시 프로젝트 빌드 데이터 생성합니다.
2. S3 Bucket 생성 후 stream으로 빌드 데이터 전송합니다.
3. CloudFront CDN을 생성하여 S3 Bucket 도메인으로 설정하고, HTTPS 인증서를 등록하고 도메인을 연결합니다.

S3를 이용한 방법으로 HTTPS를 직접 적용할 수 없기 때문에, AWS의 CDN 서비스인 CloudFront를 활용하여 HTTPS와 CDN을 적용하였습니다. Cloudflare Pages로는 커스터마이징에 제약이 있었던 것과 달리, CloudFront를 이용하면 CDN 옵션 설정과 버킷 내 파일 확인 등을 자유롭게 조정할 수 있었습니다.

<p align="center">
  <img width="642" alt="jaamtoast-01-method-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/ec6246a8-73b4-430f-beee-5e6a4ff262f7">
  <p align="center">
    <sub>하루 평균 $2.22의 비용에서 $0.23 달러로 비용을 89.7%나 절감할 수 있게 되었습니다.</sub>
  </p>
</p>

우여곡절 끝에 정적 웹사이트 배포 방식을 성공적으로 적용할 수 있게 되었습니다. 프로젝트의 배포 속도 및 비용 효율성을 향상시킬 수 있었습니다.

<br />

## **효율적인 스타일링 구조 제작**

기존 웹 페이지는 MUI를 기반으로 이루어져 있었습니다. MUI는 미리 작성된 Component들을 가져다 손쉽게 사용할수 있는 컴포넌트 라이브러리인데요. 일일이 CSS를 작성할 필요 없이 원하는 페이지를 빠르게 만들 수 있는 장점이 있습니다. 반면 MUI는 기본적으로 제공하는 스타일에서 커스텀하기가 용이하지 않은 단점이 있습니다. MUI에서 Component를 커스텀하려면 `createTheme` 함수에 Component Option을 인자로 넣어 설정해줄 수 있습니다. 문제는 점점 커스텀할 수록 `createTheme`가 거대해진다는 것입니다.

```js
const theme = createTheme({
  typography: {
    fontFamily: "Pretendard",
  },
  palette: {
    primary: {
      main: "#00ff62",
      light: "#00ff62",
      dark: "#4d00ff",
    },
    light: {
      main: WHITE,
    },
		// ...넣어줄 색상이 추가될 때마다 palette option에 인자로 넣어줍니다.
  },
  components: {
    MuiAvatar: {
      variants: [
        {
          props: { color: "default" },
          style: {
            backgroundColor: "#8c8c8c",
          },
        },
        {
          props: { color: "point" },
          style: {
            backgroundColor: RED_LIGHT,
          },
        },
      ],
    },
  // ...custom할 컴포넌트가 추가될 때마다 아래에 Compenent를 추가해주어야 합니다.
});
```

단순히 몇 가지의 설정만을 추가했을 뿐인데도 파일이 크고 복잡해지게 되었습니다. 이는 디버깅할 때에도 원하는 Component를 찾기 힘든 결과를 낳게 되었습니다.

좀 더 관리하기 용이하도록 별도로 Theme를 분리하려고 하였으나, 오히려 파일 간 switching이 잦아지면서 개발 경험에 역효과를 낳게 되었습니다.

추후의 스타일링 구조의 확장성을 생각해보았을 때, MUI와 같은 UI Tool보다는 직접 CSS를 작성하는 것이 용이하겠다는 판단을 내렸습니다.

이렇게 새로운 CSS Tool로 Vanillla-extract를 도입하게 되었습니다. Vanilla-extract를 선택한 이유는 크게 2가지가 있습니다.

1. 확장성 및 커스텀에 용이한 구조를 가지기 위해 도입하였습니다.
2. 빌드 시 변환되는 방식으로 성능 개선의 효과를 누리기 위해 도입하였습니다.

#### 확장성 및 커스텀에 용이한 구조

Atomic하게 CSS를 작성하게 되면 미리 정의되어있는 스타일을 조합하는 것만으로도 새로운 컴포넌트들을 손쉽게 만들어 낼 수 있습니다.

```js
import { style } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const inlineFlex = style({
  display: "inline-flex",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
});

export const flexCenter = style({
  alignItems: "center",
  justifyContent: "center",
});

// 공통 스타일 속성을 미리 저장해두고, 조합해서 컴포넌트 스타일링을 할 수 있습니다.
```

#### 성능

다른 이유는 성능입니다. MUI는 emotion이라는 css-in-js 라이브러리를 이용해서 개발되었습니다. css-in-js는 특성상 런타임에 자바스크립트를 실행시켜 스타일을 주입하는 방식입니다. 이러한 특성 때문에, rumtime에 자바스크립트를 실행해야하는 한계에 부딪힐 수 밖에 없습니다. 이는 성능에 좋지 않은 영향을 끼칠거라 생각했습니다. Vanilla-Extract를 선택한 이유는 빌드 시에 CSS 파일로 변환되기 때문에, runtime시 별도로 자바스크립트가 실행되지 않기 때문입니다. 그래서 비교적 더 나은 성능을 기대할 수 있습니다.

스타일링 구조를 전환한 뒤, lighthouse 측정 시 Perfomance에서 많은 향상을 보이게 되었습니다. 기존에 MUI를 실행할 때는 자바스크립트 실행에 꽤 많은 시간을 할애했습니다. 하지만 스타일 구조 전환 후에는 그런 과정이 생략될 수 있었습니다. 대부분의 공통 스타일링을 미리 지정해두었기 때문에, 컴포넌트를 많이 만들게 되어도 CSS 파일의 크기가 급격하게 늘어나지도 않습니다. 개발자 경험에 있어서, 그리고 성능에 있어서 더 효율적인 스타일 구조가 되었습니다.

<br />

<table>
  <tr>
    <td>개선 전</td>
    <td>개선 후</td>
  </tr>
  <tr>
    <td width="50%">
      <img alt="jaamtoast-02-performance-01" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/9dbe3bb2-5396-488b-a12a-85b0eff7cf57" />
    </td>
    <td width="50%">
      <img alt="jaamtoast-01-performance-01" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/b92c5140-3755-43b0-b3b8-4d4df7399b3e" />
    </td>
  </tr>
  <tr>
    <td>
      <img alt="jaamtoast-01-performance-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/ab702cfb-735c-4eb8-b12e-90b9195aed77" />
    </td>
    <td>
      <img alt="jaamtoast-02-performance-02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/56256e23-5c7e-437e-9a17-3d0758591c4d" />
    </td>
  </tr>
  <tr>
    <td>개선 전 - mui logic이 runtime에 1.88s 동안 실행됩니다.</td>
  </tr>
  <tr>
    <td>
      <img alt="jaamtoast-01-performance-03" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/b160ca6f-0f03-423d-a09e-059bcf3c62df" />
    </td>
  </tr>
</table>

<br />

## **이벤트 기반 구조 도입**

<p align='center'>
  <img width="642" alt="jaamtoast-original-structure" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/e7b4408d-5672-4b12-b0d5-8c0191faf59c" />
</p>

기존에 HTTP route 계층에서 있었던 문제점은 크게 두 가지가 있었습니다.

1. HTTP 요청을 처리할 때, 동기 방식으로 처리될 경우 짧게는 1, 2분에서 길게는 몇 분의 시간이 걸립니다.
2. HTTP 요청을 처리하는 역할 뿐만 아니라 비즈니스 로직에 대한 관심사가 결합되어있었습니다.

프로젝트를 생성하는 동작의 경우 보통 몇 분이 걸립니다. 그렇지만 하나의 HTTP 요청에 몇 분의 시간이 소요되는 과정은, 사용자가 일반적인 상황으로 받아들이기 힘든 시간입니다.

경우가 조금 다를 수는 있지만, 웹사이트의 경우 일반적으로 3초 이상의 응답시간을 가지게 되는 경우, 사용자의 이탈율이 크게 증가하게 된다고 합니다. 하지만 프로젝트의 생성을 3초 이내에 끝내는 것은 불가능합니다.

따라서 저희는 프로젝트를 생성하는 과정을 비동기적으로 처리하기로 결정하였습니다. Client가 프로젝트를 생성하는 요청을 보낼 때, Data에 대한 validation을 마친 후 곧 바로 요청에 대한 응답을 보내게 됩니다.

두 번째 문제는 관심사의 분리가 어렵다는 것 입니다. 프로젝트가 생성될 때 단순히 배포만 시켜주는 것은 아닙니다. DB에 프로젝트를 생성하기도 해야하며 CMS 서비스를 제공하기 위해서 저장소 또한 생성됩니다. 이러한 요구사항이 점차 추가되다보니 route 계층에서 이러한 사항을 모두 동작시켜주기에 이르렀습니다. route 계층에서는 비즈니스 로직의 구성과 변경에 따른 의존 관계가 있어서는 안됩니다. 하지만 바람대로 이루어지지 않고 있었습니다.

위와 같은 문제를 해결하기 위해서 이벤트 기반 구조를 도입하게 되었습니다. 이벤트 기반 구조란, 메소드나 함수를 직접적으로 호출하는 것이 아니라, 이벤트를 발생시켜 특정 동작을 수행하게 만드는 구조를 말합니다.

상위 계층에서는 특정 이벤트가 발생함을 알리고, 그 이벤트를 수신하는 하위 계층에서 동작을 수행하게 됩니다. 이벤트 기반 구조를 구성하기 위해 Pub-Sub 패턴을 활용해 함수들을 직접 제작해 적용하였습니다

<p align='center'>
  <img width="642" alt="event-driven-development" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/0b0d072c-3c2f-4904-83bc-2da99d3bb3d7">
</p>

이벤트 기반 구조를 도입하면서 얻은 장점은, 우선 하나의 동작으로 여러 동작을 처리할 수 있다는 것입니다. 여러 이벤트 핸들러가 하나의 이벤트를 수신할 수 있게 때문에 하나의 이벤트 발행으로 여러 동작을 할 수 있습니다.

프로젝트를 생성하는 과정을 살펴보면, 우선 서버에서 요청을 수신하면, CREATE_PROJECT라는 이벤트를 발행하게 됩니다.

```js
// event와 함께 payload를 담아보냅니다.
emitEvent("CREATE_PROJECT", {
  ...req.body,
  userId,
  status: ProjectStatus.Pending,
  framework: CLIENT_FRAMEWORK_INFO[framework],
  storageKey,
});
```

그러면 DB는 프로젝트를 생성하고, 프로젝트를 배포해주고, CMS의 저장소를 생성하는 과정이 모두 이루어집니다.

비동기적으로 이루어지기 때문에, 동기적으로 기다리지 않고 처리할 수 있습니다. 반면에 동기적으로 처리해야하는 부분은 기존에 메소드를 사용하는 방식으로 구분하였습니다.

```js
// createBuild 메서드의 호출은 CREATE_PROJECT 이벤트를 구독합니다.
// 서버가 실행될 때 각 메서드들의 구독이 이루어집니다.

subscribeEvent(
  "CREATE_PROJECT",
  (
    {
      // ...
    },
  ) => {
    buildService.createBuild({
      // ...
    });
  },
);

// createDocument 메서드의 호출 또한 CREATE_PROJECT 이벤트를 구독합니다.
subscribeEvent(
  "CREATE_PROJECT",
  async (
    {
      // ...
    },
  ) => {
    // ...
    await projectRepository.createDocument({
      document: {
        // ...
      },
    });
  },
);
```

Jaam Toast는 프로젝트의 배포가 업데이트 될 때, 사용자의 콘텐츠가 생성, 수정, 삭제되었을 때 webhook을 적용할 수 있습니다. webhook은 애플리케이션에 어떤 동작이 일어났을 때, 사용자가 입력한 URL로 HTTP 요청을 보내주는 기능입니다. webhook 기능을 적용할 때, 이벤트 기반 아키텍처를 이용해 손쉽게 적용할 수 있었습니다. 원하는 동작이 일어날 때, Event를 발생시키고 subscribe 계층에서 webhook을 발생시키기만 하면 됩니다. 별도로 webhook을 호출하는 메소드를 비즈니스 로직과 결합시키지 않아도 됩니다.

반면 이벤트 기반을 도입하면서 어려웠던 부분은, 동작이 실행되는 흐름을 파악하는 것이었습니다. 직접적인 메소드 호출로 동작하는 것이 아니기 때문에 이벤트의 흐름을 직관적을 알 수 없었습니다.

## **Next.js에서 React로 Migration**

원래 저희 프로젝트는 Next.js로 제작되었습니다. Next.js는 React를 기반으로 Server Side Rendering(SSR)을 더 용이하게 해주는 Framework인데요.

프로젝트와 Next.js를 사용하면서 힘들었던 점은 Hydration Error를 처리하는 부분이었습니다. 특히 React-Query와 Suspense를 쓰는 상황에서 예상치못한 에러가 발생하는 경우가 많았습니다.

한 가지 예는 ProjectList라는 Component를 작성할 때 인데요. React-query에서 QueryClient의 `suspense` 옵션을 `true`로 설정했음에도 Suspense가 제대로 되지 않았습니다. React-Query에서 Initial Data를 Fetching하려면 서버에서 미리 Prefetch를 해 Dehydrate를 해주는 방식으로 동작합니다. 특정 상황에서 분기에 의한 데이터는 Suspense를 이용해 Fetch하면 됩니다.

하지만 작업 중에 Prefetch가 아닌 일반 Fetch로 로직을 실행했고, 이를 디버깅을 하는 데 적지 않은 시간이 소요되었습니다. 문제는 해결되었으나 까다로운 추가 설정과 계속되는 Hydration 에러, Warning을 디버깅하기가 까다롭다고 느끼게 되었습니다.

<p align='center'>
  <img width="642" alt="hydration-error" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/833504d8-1de3-4456-8228-0628b9497066">
</p>

```js
// 이 Trick은 Next.js가 CSR로 동작하게 해 Hydration Error가 발생할 여지가 없어집니다.

function CSRCompnent() {
  const [isRendering, setIsRendering] = useState < boolean > false;

  useEffect(() => {
    setIsRendering(true);
  }, []);

  if (!isRendering) {
    return null;
  }

  // ..rendering logic
}
```

한 가지 해결책은 CSR 방식으로 렌더링 되도록 Trick을 주는 방식입니다. useState와 useEffect를 통해서 컴포넌트가 CSR처럼 동작하도록 Trick을 주면 Hydration Error는 발생하지 않습니다.

서버에서 렌더링되는 HTML이 없기 때문입니다. 하지만 저희는 많은 useQuery와 Suspense를 사용하고 있었고 Hydration 에러가 발생하는 부분마다 해당 Trick을 사용해야 할 지에 의문이 있었습니다. 분명 SSR을 사용하기 위해서 Next.js를 활용하는 것인데 대부분의 컴포넌트에서 CSR을 사용한다면 SSR을 쓰는 의미가 퇴색되어버리는게 아닐까 생각했습니다.

<p align='center'>
  <img width="642" alt="csr-ssr" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/af5961fc-a810-4434-8195-741c36e7b3ee">
</p>

그리고 저희의 프로젝트와 맞는 방식은 어떤 것일까?를 고민해보았습니다.

SSR의 장점이라고 한다면, 서버에서 static html을 만들어서 제공하므로 초기 렌더링이 빠르다는 점, 그리고 각 페이지마다 `<meta>` 태그를 삽입해 SEO를 구성하는 데에 조금 더 유리하다는 점을 들 수 있습니다.

반면 CSR은 초기 렌더링 속도가 비교적 느린 반면에 이 후에는 빠른 반응속도로 매끄럽게 페이지를 이용할 수 있습니다.

각각의 장단점을 생각해보았을 때에, SSR은 콘텐츠 중심의 전통적인 웹 사이트를 구축하는 데에 적합하고, CSR은 Dashboard와 같은 웹 앱을 구축하는 데 좀 더 적합하다고 판단했습니다.

저희 프로젝트는 콘텐츠 중심의 사이트이거나 SEO 별도로 구성해야하기보다는, 대시보드와 같은 웹 앱과는 더 적합한 애플리케이션이라 생각하였습니다.

이런 상황에서 저희는 SPA React로의 전환을 하게 되었습니다. Next.js를 걷어낸 이 후로는 디버깅하기 힘들었던 hydration 에러와 계속 씨름하지 않아도 되어서 원활하게 개발 속도를 낼 수 있었습니다. 그리고 CSR의 장점인 빠른 페이지 이동 속도의 장점도 누릴 수 있게 되었습니다.

<br />

## **사용자 경험 개선**

### **Suspense, Lazy import 적용하기**

<p align='center'>
  <img width="642" alt="suspense" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/1471cf72-6845-43b0-a02c-6167ecc12371">
</p>

React의 Suspense는 자식 컴포넌트에서 감지된 Promise가 이행되기 전까지 Component의 Rendering을 지연할 수 있는 기능입니다.

Suspense와 함께 fallback Component로 Skeleton UI를 적용하였습니다. 데이터가 로드되기 전 로딩 상태를 시각적으로 표시하는 것은 사용자 경험에 큰 영향을 미치는 부분이라 생각합니다. fallback 컴포넌트를 기존 컴포넌트와 유사한 형태로 디자인하여 사용자가 로딩이 완료된 후에도 비슷한 레이아웃을 유지하여 일관된 UI 경험을 제공할 수 있도록 하였습니다.

그리고 Suspense와 함께 Lazy import도 적용하였습니다. Lazy import는 Suspense와 사용하였을 때 더욱 사용하기 좋습니다. 동적 import 자체는 약간의 지연이 있어, 로드 상태를 표현해줘야 하기 때문입니다.

Lazy import는 동적 import 방식을 통해 모듈을 필요한 시점에 로드하는 것을 말합니다. 일반적인 정적 import 방식은 한 번에 모든 모듈을 불러와야 한다는 제약 사항이 있어 초기 번들 사이즈가 커지고 초기 렌더링 속도가 느려질 수 있습니다. 이러한 단점을 보완하기 위해 lazy import를 사용하였습니다. 번들 코드를 분할하여 초기 번들 사이즈를 줄이고 빠른 초기 렌더링 속도를 얻게되었습니다.

<p align='center'>
  <img width="642" alt="lazy-import" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/094e6a93-9808-4ec7-b1ba-cf15f51abe86">
</p>

기존의 정적 import 방식으로만 이뤄진 코드라면 번들이 하나로 생성되지만, lazy import를 적용하면 코드가 여러 청크(chunk)로 분할되고 초기 번들과 함께 사용됩니다.

<p align='center'>
  <img width="642" alt="lazy-import-result" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/47e52432-e77f-4351-9200-dc07dc66f6a9">
</p>

기존에는 Landing 페이지에서 모든 페이지 컴포넌트를 모두 불러오게 되었는데요. 이는 비효율적인 방식이라 생각했습니다. app.tsx에서 Route 페이지 컴포넌트와, 유저와의 상호작용이 필요한 컴포넌트에 Lazy import를 적용하게 되었습니다. 그 결과 페이지 내에서 필요한 파일들만 로드되므로 초기 페이지 로딩 시간을 줄이고, 더 개선된 초기 렌더링 속도를 얻게 되었습니다.

<br />

### **에러를 효율적으로 관리할 수 있는 커스텀 컴포넌트 만들기**

서버와의 데이터 통신이 늘어나면서 에러 핸들링이 매우 중요해졌습니다. 많은 커스텀 훅의 에러 핸들링을 개별적으로 처리하는 것은 유지 보수에 어려움을 초래할 수 있기 때문에, 한 번에 에러를 관리할 수 있는 방법을 도입하게 되었습니다. 저희는 Suspense와 ErrorBoundary를 합친 `AsyncBoundary` 컴포넌트를 제작하였습니다. 거기에 에러 핸들링을 추가해 손쉽게 에러를 관리할 수 있도록 하였습니다.

```js
function ErrorFallback({ error }: ErrorFallbackProps) {
  if (axios.isAxiosError(error)) {
    return <HttpErrorFallback error={error} />;
  }

  if (error instanceof NotFoundError) {
    return (
      <Navigate to="/error" state={{ code: 404, message: error.message }} />
    );
  }

  if (error instanceof ReferenceError) {
    return <Error code="Reference error" message={error.message} />;
  }

  return <UnknownErrorFallback error={error} />;
}
```

`AsyncBoundary` 컴포넌트는 Suspense와 유사한 방식으로 사용할 수 있으며, `ErrorFallback` 컴포넌트를 통해 에러 발생 시 적절한 에러 메시지를 보여줄 수 있도록 설계하였습니다.

`ErrorFallback` 컴포넌트는 각 에러 타입에 따라 분기 처리하여 해당 상황에 맞는 메시지를 표시할 수 있도록 구성하였습니다.

### **React Query로 렌더링 이후의 에러 대응하기**

ErrorBoundary는 주로 컴포넌트 렌더링 과정에서 발생하는 에러를 감지하고 처리하는 역할을 수행합니다. 렌더링 이후에 직접 throw하거나 데이터 변경과 같은 과정에서 발생하는 에러는 ErrorBoundary로는 감지되지 않기 때문에 추가적인 에러 핸들링 처리가 필요했습니다.

```js
// index.tsx

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      if (error instanceof ValidationError) {
        return toast.error(error.message);
      }

      if (error instanceof AxiosError && error.response) {
        return toast.error(new HttpError(error).message);
      }

      return toast.error("An error occurred. Please try again.");
    },
  }),
});
```

저희는 react query를 사용하여 서버와의 통신을 관리했기 때문에, 데이터 수정, 추가, 삭제시 발생하는 에러도 쉽게 핸들링 할 수 있었습니다. 데이터 변경 작업을 관리할 수 있는 캐시 시스템인 MutatonCache를 이용해 데이터 변경시의 에러를 전역적으로 관리하며 일관된 처리 방식을 적용할 수 있었습니다.

```js
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class HttpError extends AxiosError {
  constructor(error: AxiosError) {
    super(error.message);
    this.name = "HttpError";
    this.status = error.response?.status ?? 500;

    if (this.status === 401) {
      this.message = "Please sign in.";
    }

    if (this.status === 400) {
      this.message = "The processing failed. Please check again.";
    }
  }
}
```

클라이언트 단에서 에러를 직접 정의하고 throw해야 할 때에는 `ValidationError`와 `NotFoundrror`와 같이 특정 상황에 맞는 에러를 정의하고 throw할 수 있도록 하였습니다. 이렇게 함으로써 에러의 타입이 명확해졌고, 각 에러 instance에 맞는 적절한 대응을 할 수 있었습니다. 또한, AxiosError가 발생했을 때는 서버에서 받은 메시지를 그대로 노출하거나 상태 코드에 따라 다른 메시지를 설정할 수 있도록 설정했습니다.

에러가 발생했을 때는 toast 메시지를 사용하여 사용자 경험을 해치지 않도록 처리하였습니다.

<br />

## **Headless CMS 제작**

이번 프로젝트에서 새로운 기능으로 Headless CMS 기능을 추가하게 되었습니다.

Headless CMS는 보통 학습 곡선이 있는 경우가 많지만, 저희 프로젝트에서는 처음 접하는 사람도 직관적인 방법으로 기능을 사용할 수 있도록 고민하였습니다.

<br />

### **JSON Schema를 이용해 Jaam Schema 만들기**

<p align='center'>
  <img width="642" alt="schema" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/0d0eec31-b3dc-4a2f-9eb2-7a6a7b1d8368">
</p>

스키마는 유저가 직접 콘텐츠 유형을 정의할 수 있도록 하는 콘텐츠 모델입니다. Headless CMS의 핵심은 콘텐츠 제공입니다. 그리고 콘텐츠 제공의 편리함은 스키마 설정에서부터 시작하게 됩니다.

`text`, `textarea`, `emali`, `link`, `date`, `number`, `boolean` 이렇게 7가지의 필드 타입을 선택할 수 있고, 유형에 따라 콘텐츠 필드를 구성할 수 있습니다.

어떤 유형의 스키마를 사용해야 할 지였습니다. 저희는 많은 스키마 유형을 고민하였습니다. zod나 joi와 같은 validate 라이브러리에서도 일종의 스키마를 정의할 수 있고, Typescript에서 type을 정의하는 것 또한 일종의 스키마로서 작동할 수 있습니다.

스키마를 선택할 때 유의했던 점은 서버와의 네트워크 통신입니다. 스키마는 서버로 전송한 뒤 DB에 저장되어야하기 때문에, 이 부분에 있어서 강점이 있는 스키마를 찾게 되었습니다.

JSON Schema라는 스키마를 알게되었고, 단순히 JSON 형식으로 이루어져있는 Schema Data임을 알게되었습니다. 서버와의 통신에 유리했고 DB에 저장하기도 좋은 데이터였기 때문에 JSON Schema를 선택하게 되었습니다.

Validation은 JSON Schema를 이용해 ajv라는 라이브러리로 하였습니다.

- JSON Schema 형태

```json
{
  "title": "post",
  "type": "object",
  "properties": {
    "description": {
      "type": "string",
      "description": "text"
    },
    "date": {
      "type": "string",
      "format": "date"
    },
    "title": {
      "type": "string",
      "description": "text"
    },
    "post": {
      "type": "string",
      "description": "textarea"
    }
  },
  "required": []
}
```

- Jaam Toast에서 사용하는 Schema 형태 (Jaam Schema)

```json
{
  "title": "post",
  "type": "object",
  "properties": {
    "description": {
      "type": "text"
    },
    "date": {
      "type": "date"
    },
    "title": {
      "type": "text"
    },
    "post": {
      "type": "textarea"
    }
  }
}
```

다만 JSON Schema는 렌더링 될 때에는 다루기 편하도록 가공해야하는 과정을 거쳐야 했습니다. Client에서는 JSON Schema에서 위 Jaam Toast에서 사용해야 하는 스키마 형태인 Jaam Schema로 변환되어야 했기 때문입니다.

이를 위해 저희는 Jaam Schema와 JSON Schema 간의 변환 로직을 [Jaam Schema 패키지](https://github.com/jaam-toast/jaam-toast-frontend/tree/main/packages/jaam-schema)로 제작하여 관리하고 있습니다. 패키지 내에는 Jaam Schema에서 JSON Schema로 변환하거나 그 반대로 변환하는 기능이 포함되어 있습니다.

```js
// Validation 결과값
{
  result: boolean
  message: "must match format ...",
}
```

패키지에는 콘텐츠 유효성 검사를 위한 validator 기능도 추가하여 Jaam Schema 형식에 맞는 결과와 메시지를 편리하게 얻을 수 있도록 구현하였습니다.

<br />

### **CMS에 접근할 수 있는 API 제공하기**

유저가 프로젝트 생성을 하게되면 아래와 같이 2개의 URL이 주어지도록 구성했습니다.

- 배포 URL: `https://[projectName].jaamtoast.click`
- API URL: `https://api.[projectName].jaamtoast.click`

유저에게 CMS 기능을 제공해주기 위해서는 API 주소가 콘텐츠 서버로 직접 접근할 수 있어야 했습니다. 이를 위해 API 레코드를 Jaam Toast 서버로 향하도록 구성해야 하는데, 어떻게 저희 서버로 향하게 할 지 고민하게 되었습니다.

저희 서버는 EC2 내에서 nginx를 이용해 프록시 처리가 되고 있기 때문에, 유저 API 주소의 형태도 프록시를 이용하여 처리할 수 있을 것으로 판단하였습니다.

<p align='center'>
  <img width="642" alt="deployment-domain" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/07f411fa-a6fc-4726-8ddd-96307844e932">
</p>

먼저 API 용도의 레코드를 만든 후 Jaam Toast 서버의 IP를 가리킬 수 있도록 A 레코드를 생성하였습니다. 이후 nginx의 프록시 설정을 통해서 \*.jaamtoast.click 의 형태로 들어오는 요청을 Jaam Toast 서버로 맵핑시켜주었습니다.

<br />

### **페이지네이션 적용하기**

사용자에게 콘텐츠를 제공해줄 때, 모든 콘텐츠를 한 번에 주지 않고 특정 갯수만큼만 줄 수 있도록 페이지네이션 기능을 적용하였습니다. Jaam Toast는 CMS 기능을 mongoDB로 구현하였습니다. 콘텐츠 쿼리 및 페이지네이션 기능도 mongoDB의 내부 기능을 활용해서 구현하였습니다.

pagination을 구현하는 방법은 크게 두 가지를 들 수 있습니다. 각각 오프셋 기반 페이지네이션과 커서 기반 페이지네이션인데요. 오프셋 기반 페이네이션은 데이터 베이스에서 원하는 수만큼 skip해 콘텐츠를 가져오는 방식입니다. 오프셋 기반은 그 구현이 어렵지 않은 반면, 콘텐츠의 갯수가 많아졌을 때의 성능 문제를 야기할 수 있습니다. 보통 mongoDB의 `skip()` method를 이용해서 구현하는 것이 일반적인데요. `skip` method의 경우 각 레코드를 하나씩 스캔하는 과정을 거치기 때문에 콘텐츠의 갯수가 늘어날 수록 쿼리 시간이 길어질 수 있습니다. 반대로 커서 기반 페이지네이션은 특정 포인터를 기억해 해당 포인터의 앞 또는 뒤의 콘텐츠를 가져오는 방식입니다. 성능 문제에 있어 더 유리한 방식입니다.

저희는 약간의 성능 문제가 있지만 오프셋 기반 페이지네이션으로 구현하게 되었습니다. 크게 두 가지 이유가 있는데요.

첫 번째는 구현이 간결하다는 점입니다. 커서 기반 페이지네이션을 구현할 때는 단순 id 뿐만 아니라 다중 쿼리에 대한 지원, 다음 페이지 유무에 따른 분기를 고려해야 하는 데요. 이를 구현하기에는 한정된 시간 속에서 지나치게 높은 복잡도를 가진 방식이라 판단하였습니다.

두 번째는 사용자 편의성입니다. 사용자가 저희의 API에 접근할 때 단순히 page number를 통해서 페이지네이션이 이뤄지는 것이 더욱 이해하기 쉬운 방식일거라 생각했습니다. 반면 커서 기반 페이지네이션은 커서 값을 nextPageToken 같은 값으로 내려주어야 할텐데요. 이전에 부트캠프 과제로 Youtube API를 이용한 적이 있었는데, Youtube API는 nextPageToken 값을 받아 페이지네이션이 이루어졌습니다. 그 때 많은 분들이 이 방식을 낯설어 하셨고, 저희는 누구나 쉽게 API를 사용했으면 좋겠다는 생각으로 더 직관적인 방식을 택하게 되었습니다.

<br />

## **보안, 유저 권한 최소화**

### **Github 유저 권한**

<table>
  <tr>
    <td width=400>
      <img alt="github-login-access-list" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/fec3f141-db79-4508-a44a-ce3dfbbe17d9">
    </td>
    <td>
      <img alt="github-login-access-list02" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/30f670b7-7fe5-453b-83d5-0478bceec96a">
    </td>
  </tr>
</table>

Jaam Toast는 Github Repository와 연동되어 동작합니다. 때문에 Github에 대한 권한이 필수적인데요. 다만 지나치게 많은 권한을 요구하는 것은 신중해질 필요가 있습니다. 기존의 방식은 Github Oath를 이용해 User의 login을 처리합니다. 그리고 그 과정에서 Repository에 대한 권한 등을 요구하게 되는데요. User의 모든 Repository에 접근할 수 있게 되며 Webhook도 지나치게 많은 권한이 포함되어 있었습니다.

Private Repository까지 권한을 받게 되는 것은 사용자의 Private Repo라고 할 지라도 배포 기능이 제공되어야 하기 때문입니다. 하지만 그렇다고 사용자 입장에서 Private Repo에 대한 권한을 선뜻 내줄 수는 없었습니다.

Webhook에 대한 권한을 요구하는 이유는, 프로젝트의 Repository로 Commit이 push 될 때 프로젝트가 업데이트되는 기능이 있는데 그 과정에서 Webhook을 이용하기 때문입니다.

두 권한을 축소시키면서도 충분한 서비스를 제공하는 것이 저희의 목표였고, Github Oath 대신 Github Apps를 이용하게 되었습니다. Github Apps는 사용자가 원하는 Repository에만 설치할 수 있습니다. 사용자는 자신의 민감한 Repository를 제공하지 않을 선택권이 주어지게 되는 셈입니다. 그리고 Webhook과 유사하게 특정 event를 수신할 수 있어 기존의 기능을 그대로 제공해줄 수도 있었습니다.

<br />

### **S3 Public Access 차단**

사용자의 프로젝트 하나당 S3 Bucket이 하나씩 생성됩니다. 이 Bucket은 Web hosting을 위해 생성된 Bucket이며 그 이외에는 접근할 여지가 없습니다.

혹시 모를 접근을 미연에 방지하기위해서 Bucket의 Public 접근 권한을 차단하였습니다. 그리고 Access Id(Origin Access Identity)를 생성해 Web hosting을 해주는 CloudFront에서만 접근할 수 있도록 해주었습니다.

<br />

### **Route 별 CORS 설정**

여타 다른 API들과는 달리, CMS API는 Open API입니다. Contents의 권한이 있는 누구나 이용할 수 있는 API인데요. 이는 저희의 목적인 CMS 서비스를 제공하기 위함입니다.

하지만 나머지 서비스들은 Jaam Toast Client에서만 접근할 수 있어야 합니다. 다른 API Route들은 CORS가 구성되어야 했습니다.

그래서 특정 Route만 CORS가 구성되도록 하였습니다.

<br />

## **타입스크립트로 개발자(DX) 경험 향상시키기**

타입스크립트는 단순히 정적 타입을 검사하는 깐깐한 언어가 아닌, 개발자들을 도와주는 똑똑한 도구로 사용할 수도 있게 됩니다.

위에서 소개한 이벤트 기반 구조를 만들 때 타입스크립트를 적극적으로 적용하게 되었습니다.

저희는 Event를 만들어줄 수 있도록 BaseEvent를 정의하였습니다. 각 Event는 고유한 name이 있고, 각 Event마다 고유한 payload를 갖게 됩니다.

새로운 Event를 정의하기 위해서 Generic으로 넣어주어 Event를 정의할 수 있습니다.

```js
// BaseEvent
type BaseEvent<Name extends string, Payload> = {
  name: Name;
} & Payload;

// Event를 정의할 때
// 모든 Event들인 Events에 Union으로 추가합니다.
// Generic으로 두 개의 타입을 넣어 Event를 정의합니다.
type Events =
  | OtherEvent
  // ...
  | CreateProjectEvent;

type CreateProjectEvent = BaseEvent<
  "CREATE_PROJECT",
  {
    projectName: string;
    repositoryUrl: string;
  }
>;
```

Event를 불러와 사용하게 되는 경우는, Event를 발행하는 경우와 구독하는 경우입니다. 이 때 Event의 이름만 알고있다면 Payload는 자동완성이 되도록 하고 싶었습니다.

```js
function emitEvent<EventName extends Event["name"]> (
  eventName: EventName,
  payload: Omit<
    Extract<Events, { name: EventName }>,
    "name"
  >,
) {
  // ...
}
```

emitEvent는 Generic을 받을 수 있도록하였습니다. 이는 사용자에게 직접 부여받는 게 아니라, 아래의 eventName 인자를 작성하면서 역으로 부여되게 하기 위함입니다.

eventName이 작성되면서 Generic이 채워지게 됩니다. 이 때 payload는 위에서 등록한 Events Union 타입으로부터 특정 Event 타입을 가져올 수 있습니다.

Omit util type을 이용해 공통의 name 프로퍼티를 제거하게 되면 온전히 payload만을 사용할 수 있게 됩니다.

이제 Event를 사용할 때 Event의 이름을 입력하게 되면 Payload에서 자동완성을 넣어줄 수 있게 되었습니다.

<p align='center'>
  <img width="642" alt="event-auto-complete" src="https://github.com/jaam-toast/jaam-toast-frontend/assets/84281505/5b4ee2f0-0b12-4bf7-bd24-3c7b4caaf95d">
</p>

<br />

# **기술 스택**

- Typescript
- React
- Vite
- React-query
- Zustand
- Vanilla-Extract
- Socket.io
- Node.js
- Express
- MongoDB
- AWS SDK(S3, Route53, CloudFront)
- Zod
- Puppeteer
- Multer

<br />

# **작업 기록**

**1주차 - 2023.03.07. ~ 2023.03.11.**

- 보완, 개선할 점 목표 설정
- 기존 코드 파악
- AWS와 EC2 개념 학습

**2, 3주차 - 2023.03.12. ~ 2023.04.01.**

- 기존 프로젝트 리팩토링 작업
- Next.js SSR 적용
- Modal 기반에서 Page 기반으로 Frontend 구조 변경
- React query 적용
- 상태관리 Tool Recoil → Zustand로 변경
- Backed service 계층 분리
- Build 서버와 API 서버 분리 작업
- DB watcher 적용

**4주차 - 2023.04.02. ~ 2023.04.08.**

- 원지혁님 멘토링
- Next.js 걷어내기
- 이벤트 기반 구조, CQRS, 이벤트 소싱 개념 학습 후 적용 시도

**5주차 - 2023.04.09. ~ 2023.04.15.**

- 이영교님 멘토링
- 서버 구조 레이어드 아키텍처 적용
- Vite 도입, Next.js 제거
- Vanilla-Extract 도입
- Puppeteer 기반 Screenshot 서버 제작
- Cloudflare로 배포 프로세스 변경
- CMS Domain 생성 기능 추가

**6주차 - 2023.04.16. ~ 2023.04.22.**

- 장명재님 멘토링
- 의존성 주입(DI) 및 제어 역전(IoC) 적용
- Schema 페이지 제작
- Favicon 서버 제작
- React Suspense 적용
- Skeleton 적용

**7주차 - 2023.04.23. ~ 2023.04.29.**

- Validation Tool로 Zod 도입
- Contents 기능 추가
- Contents query시 pagination 적용
- 프로젝트 발표

**8주차 - 2023.04.30. ~ 2023.05.06.**

- Event 기반 구조 적용
- Github Oath → Github Apps 도입
- JSON Schema - Jaam Schema 변환 패키지 제작
- Custom Error 및 Custom Event 적용

**9주차 - 2023.05.07. ~ 2023.05.13.**

- CloudFlare → S3 + CloudFront 방식 배포 프로세스 변경
- Webhook 기능 추가
- 사용자 Custom Domain 기능 추가
- Frontend Error Handling, React Error Boundary 적용

**10주차 - 2023.05.14. ~ 2023.05.17.**

- 프로젝트 배포
- README 문서 작성

# **팀원**

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ponjaehyeok">
        <img src="https://avatars.githubusercontent.com/u/79369983?v=4" alt="공재혁 프로필" width="200px" height="200px" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/h-alex">
	      <img src="https://avatars.githubusercontent.com/u/84281505?v=4" alt="임현정 프로필" width="200px" height="200px" />
    </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li><a href="https://github.com/ponjaehyeok">Jaehyeok Gong 공재혁</a></li>
		<li>ruud091@gmail.com</li>
	</ul>
    </td>
    <td>
    <ul>
      <li><a href="https://github.com/h-alex">Hyunjung Im 임현정</a></li>
		<li>glowhyun1@gmail.com</li>
	</ul>
    </td>
  </tr>
</table>
