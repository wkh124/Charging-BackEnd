# Charging (차징)
- Charging은 환경과 경제성을 모두 챙기고 싶은 전기차주, 예비 차주분들을 위한 커뮤니티 서비스입니다

## 프로젝트 구성 안내

## 1. 프로젝트 소개

** 전기차 커뮤니티

**어떠한 데이터셋와 도구 및 기술을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

  - 사용하려는 데이터
    - 한국환경공단_전기자동차 충전소 정보 ( 전기차 충전소 )
    - 자동차별 탄소 배출 데이터
    - 연도별 리튬 배터리 가격 데이터
    - 연도별 전기차 판매량 데이터
    - 연도별 고속, 완속 충전기 데이터
  - 기술 스택 
    - Python, Pandas, Jupyter, Matplotlib, Seaborn 
  - 사용된 라이브러리 
    - Numpy, Matplotlib, Seaborn
  - 웹서비스에 대한 자세한 개요
    - 

## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의**
  - 연도별 전기차 판매 데이터를 Bass모델로 분석한 결과 2032년까지 판매량이 증가하다 2033년부터 감소하기 시작할 것이라는 결론이 도출되었습니다.
  - 전기차의 주요 구매 요인은 경제적 요인 (정부의 보조금, 충전 비용의 감소)과 환경적 요인 (탄소배출량 감소)이 주를 이루었습니다.
  - 이러한 전기차 커뮤니티를 만들게 된 이유는 2032년부터는 전기차의 판매가 하락할 것이라는 전망때문입니다. 이러한 전망을 개선하기 위해 전기차의 WoM(구전 효과)를 극대화 시키면 이러한 판매 감소를 극복할 수 있다고 판단했습니다.
  - 이러한 WoM을 극대화 시키기 위해서는 솔직한 리뷰를 보는 것이라고 판단했습니다. 사람들이 전기차에 대한 정보를 획득할 수 있는 플랫폼의 수가 현재는 적기 때문에 이러한 구전효과가 발생하지 않아서 현재 전기차의 재고가 늘어나고 있습니다.
  - 따라서 이러한 커뮤니티를 통해 미래 문제 상황을 방지, 해결하고자 하였습니다.

## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  - 주요 기능 (주된 활용성) 및 서브 기능
  - 프로젝트만의 차별점, 기대 효과

## 4. 프로젝트 구성도
  - 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담
| 이름   | 담당 업무               |
| ------ | ------------------------ |
| 김경하 | 프론트엔드 개발 / 데이터 분석 |
| 김재근 | 프론트엔드 개발 / 데이터 분석 |
| 김홍진 | 백엔드 개발 / 데이터 분석     |
| 원경혜 | 백엔드 개발 / 데이터 분석     |
| 임도헌 | 팀장 / 프론트엔드 개발 / 데이터 분석 |
| 한유림 | 백엔드 개발                |

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

## 6. 기술 스택

### 프론트엔드
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Zustand](https://img.shields.io/badge/Zustand-20232A?style=for-the-badge&logo=zustand&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=61DAFB)
![ShadCN](https://img.shields.io/badge/ShadCN-20232A?style=for-the-badge&logo=shadcn&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

### 백엔드
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![OAuth](https://img.shields.io/badge/OAuth-000000?style=for-the-badge&logo=oauth&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
![NanoID](https://img.shields.io/badge/NanoID-000000?style=for-the-badge&logo=nanoid&logoColor=white)

## 7. 버전
  - 프로젝트의 버전 기입

## 8. FAQ
  - 자주 받는 질문 정리
