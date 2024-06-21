# Charging (차징)
- Charging은 환경과 경제성을 모두 챙기고 싶은 전기차주, 예비 차주분들을 위한 커뮤니티 서비스입니다

## 프로젝트 구성 안내

## 1. 프로젝트 소개

  - 사용하려는 데이터
    - 한국환경공단_전기자동차 충전소 정보 ( 전기차 충전소 )
    - 자동차별 탄소 배출 데이터
    - 연도별 리튬 배터리 가격 데이터
    - 연도별 전기차 판매량 데이터
    - 연도별 고속, 완속 충전기 데이터

  - 기술 스택 
    - Front-End
      ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
      ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
      ![Axios](https://img.shields.io/badge/Axios-20232A?style=flat-square&logo=axios&logoColor=61DAFB)
      ![Vite](https://img.shields.io/badge/Vite-20232A?style=flat-square&logo=vite&logoColor=AD46EF)
      ![ShadCN](https://img.shields.io/badge/ShadCN-20232A?style=flat-square&logo=shadcn&logoColor=black)
      ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
      ![Jotai](https://img.shields.io/badge/Jotai-20232A?style=flat-s&logo=jotai&logoColor=61DAFB)
      ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
    
    - Back-End
      ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
      ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node-dot-js&logoColor=white)
      ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
      ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
      ![OAuth](https://img.shields.io/badge/OAuth-000000?style=flat-square&logo=oauth&logoColor=white)
      ![Passport](https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=passport&logoColor=white)
      ![NanoID](https://img.shields.io/badge/NanoID-000000?style=flat-square&logo=nanoid&logoColor=white)

    - Data Analysis
      ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
      ![Numpy](https://img.shields.io/badge/Numpy-013243?style=flat-square&logo=numpy&logoColor=white)
      ![Matplotlib](https://img.shields.io/badge/Matplotlib-000000?style=flat-square&logo=matplotlib&logoColor=white)
      ![Seaborn](https://img.shields.io/badge/Seaborn-3776AB?style=flat-square&logo=seaborn&logoColor=white)

  - 웹서비스에 대한 자세한 개요
    - 서비스 개요

## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의**
  - 연도별 전기차 판매 데이터를 Bass모델로 분석한 결과 2032년까지 판매량이 증가하다 2033년부터 감소하기 시작할 것이라는 결론이 도출되었습니다.
  - 전기차의 주요 구매 요인은 경제적 요인 (정부의 보조금, 충전 비용의 감소)과 환경적 요인 (탄소배출량 감소)이 주를 이루었습니다.
  - 이러한 전기차 커뮤니티를 만들게 된 이유는 2032년부터는 전기차의 판매가 하락할 것이라는 전망때문입니다. 이러한 전망을 개선하기 위해 전기차의 WoM(구전 효과)를 극대화 시키면 이러한 판매 감소를 극복할 수 있다고 판단했습니다.
  - 이러한 WoM을 극대화 시키기 위해서는 솔직한 리뷰를 보는 것이라고 판단했습니다. 사람들이 전기차에 대한 정보를 획득할 수 있는 플랫폼의 수가 현재는 적기 때문에 이러한 구전효과가 발생하지 않아서 현재 전기차의 재고가 늘어나고 있습니다.
  - 따라서 이러한 커뮤니티를 통해 미래 문제 상황을 방지, 해결하고자 하였습니다.

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**

  - 주요 기능 : 
    - 전기차 충전소의 실시간 상황 파악, 리뷰 작성 및 조회 
    - 전기차에 대한 정보 제공 및 리뷰 작성 및 조회
    - 데이터 분석을 통한 전기차 시장의 확장

  - 부가 기능 : 
    - MBTI테스트를 이용한 차량 추천
    - 

  - 프로젝트의 차별점, 기대효과
    - 차별점 : 
      - 데이터 분석을 통해 전기차의 필요성 강조
      - Typescript로 작성하여 코드의 안정성 증가
      - 소셜로그인으로만 구성하여 개인민감정보 보안
      - 전기차 충전소 실시간 정보와 리뷰를 한번에 제공
      - 전기차 충전소 서치 기능

    - 기대효과 :
      - 전기차에 대한 사람들의 관심 증가 및 정보공유
      - 보다 윤택한 전기차 생활

## 4. 프로젝트 구성도
  - 로드맵
  <img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/4c9b16c2aa9cb2f2b9380c06c24565b9/Technology_Roadmap.jpg">
  - 소셜로그인

  - 전기차 정보
  <img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/b7e57ca4150d6f7f539a9575eca3e810/car_main.png" alt="전기차메인" width="50%"><img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/2cf7c888d9453a4fba8edfe14ccfa20e/car_info.png" alt="전기차정보" width="50%">
  - 전기차 충전기
  <img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/a6720f6899a33ead78c30478e4eebfdf/mao_info.png" alt="충전소 정보" width="33%"><img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/b507582968f9ad1f9462fa957514e8e7/map_charger.png" alt="충전기 정보" width="33%"><img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/d990d5ad9094e22379d5a82907df0443/map_comment.png" alt="충전기 리뷰" width="33%">

  - 나에게 맞는 전기차
  <img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/ea50af55dd5ce481bb22aac3b90841ad/MBTI.png" alt="mbti 메인" width="50%"><img src="https://kdt-gitlab.elice.io/ai_track/class_10/data_project/team02/charging_server/uploads/c260435150b2e7b3fb85b487e03af2b1/MBTI_result.png" alt="mbti 결과지" width="50%">


## 5. 프로젝트 팀원 역할 분담
|  이름  |             담당 업무                |
| ------ | ------------------------------------ |
| 김경하 | 프론트엔드 개발 / 데이터 분석        |
| 김재근 | 프론트엔드 개발 / 데이터 분석        |
| 김홍진 | 백엔드 개발 / 데이터 분석            |
| 원경혜 | 백엔드 개발 / 데이터 분석            |
| 임도헌 | 팀장 / 프론트엔드 개발 / 데이터 분석 |
| 한유림 | 백엔드 개발 / 데이터 분석            |

**멤버별 responsibility**

1. 팀장 
   - 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
   - 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
   - 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 
   - 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
   - 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
   - 수정 단계: 피드백 반영해서 프론트 디자인 수정

3. 백엔드 & 데이터 담당  
   - 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
   - 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할 수 있는 기능 구현, 데이터베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
   - 수정 단계: 코치님 피드백 반영해서 분석 / 시각화 방식 수정


## 6. 버전
  - 프로젝트의 버전 기입

## 7. FAQ
  - 자주 받는 질문 정리

## 8. 폴더 구조
```
│  .gitignore
│  package-lock.json
│  README.md
├─.gitlab
│  │  .gitkeep
│  │
│  ├─issue_templates
│  │      .gitkeep
│  │      feature_request.md
│  │      Issue_Dev_Template.md
│  │      Issue_Plan_Template.md
│  │
│  └─merge_request_templates
│          .gitkeep
│          MR_template.md
│
└─server
    │  .prettierrc
    │  nodemon.json
    │  package-lock.json
    │  package.json
    │  tsconfig.json
    │
    ├─config
    │      index.ts
    │
    ├─src
    │  │  index.ts
    │  │
    │  ├─controllers
    │  │      temp.ts
    │  │
    │  ├─DAO
    │  │      carsDao.ts
    │  │      carsImgDao.ts
    │  │      chargingMapDao.ts
    │  │      commentReactionDao.ts
    │  │      index.ts
    │  │      mapCommentDao.ts
    │  │      userCarDao.ts
    │  │      userDao.ts
    │  │
    │  ├─middleware
    │  │      authUser.ts
    │  │      checkCarReview.ts
    │  │      passport.ts
    │  │      setup-multer.ts
    │  │
    │  ├─routes
    │  │      authRouter.ts
    │  │      carImgRouter.ts
    │  │      carReviewRouter.ts
    │  │      carRouter.ts
    │  │      chargingMapRouter.ts
    │  │      commentLikesRouter.ts
    │  │      index.ts
    │  │      mapCommentRouter.ts
    │  │      profilePicRouter.ts
    │  │      profileRouter.ts
    │  │      stateRouter.ts
    │  │      userReviewRouter.ts
    │  │
    │  └─services
    │          temp.ts
    │
    └─utils
            appError.ts
            commonErrors.ts
```
