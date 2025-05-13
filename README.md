# sbe_backend_daehyckkim

학교종이 백엔드 엔지니어 채용 과제

## 문제1

- 종류 : 알고리즘 문제
- 문제 : 1,3,5,7,9 숫자를 각각 한번씩만 사용하여 만들 수 있는 두개의 숫자(13,579)중에, 그 곱이 가장 큰 조합을 찾는 스크립트 작성
- 언어 : TypeScript

- 풀이 과정

  - "1,3,5,7,9 숫자를 각각 한번씩만 사용하여 만들 수 두개의 숫자(13,579)중" -> 5개의 숫자중 5개를 선택해 순서를 갖고있는 경우의 수 찾기 -> 순열
  - 순서를 갖는 모든 경우의 수를 두개의 숫자로 나눠 값을 곱함
  - 곱한 숫자가 최댓값일떄 두 숫자가 정답을 의미한다.

- 입력
  - [1,3,5,7,9]
- 출력

  - result: 751, 93

- 실행 방법
  - cd project1
  - tsc index.ts
  - node index.js

## 문제2

- 종류 : API 설계/구현
- 문제 : 급식식단가정보를 활용해, 학교 가정통신문 서비스에서 활용할 수있는 GET 방식 API 1개를 자유롭게 설계
  (실사용자 관점에서 의미 있게 데이터를 가공 및 응답 구성)
- 언어 : Nest.js + TypeScript
- 조건 : 외부 API활용

- API

  - 기능

    - 사용자가 특정 날짜의 학교 급식 식단을 조회하면, 기간내 식단및 음식별 알러지 정보와 식단별 가장 많이 포함된 영양소 3개와 가장 적게 포함된 영양소 3개를 제시합니다.
    - 추가적으로 기간별 누적 영양성분 그래프 형식을 제시해 시각적인 데이터를 추출할 수 있도록 제시합니다.

  - 사용 OPEN API

    - [급식식단정보](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17320190722180924242823&infSeq=2)
    - [학교기본정보](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=1)

  - URL : http://localhost:3000/home-newsletter
  - TYPE : GET
  - QUERT
    - schoolName : 학교명
    - lctnName : 시도명 주의- **반드시 '대전광역시'와 같이 시도를 정확히 기제 필요**
    - schoolKind : 학교종류명
    - startDate : 검색 기간 시작일
    - endDate : 검색 기간 종료일
  - RESPONSE

  ```json
  {
    //메뉴리스트
    "mealInfoList": {
         {
            //메뉴정보
            "menu": [
                {
                    "menuName": "누룽지", //메뉴명
                    "allergenInfo": [] //알러지 성분
                }
            ],
            //영양소
            "nutrient": {
                //높은 영양소 TOP3
                "high": [
                    {
                        "nutrient": "칼슘(mg)",
                        "value": "200.1"
                    },
                ],
                //낮은 영양소 TOP3
                "low": [
                    {
                        "nutrient": "철분(mg)",
                        "value": "3.5"
                    },
                ]
            }
        }
    },
    //기간별 누적 영양성분 그래프 정보
    "accumulationNutrientGraph": {
      "title": [],
      "values": []
    }
  }
  ```

## 문제3

- 종류 : DB 구축 및 쿼리문 설계
- 문제 : 여러 단계의 승인 및 반려가 가능한 결제 시스템을 구축하는 시나리오에서 다음 조건을 충족
  1.  필요한 테이블을 최소한으로 정의하기.
  2.  특정 사용자가 처리해야 할 결재 건을 나열하는 쿼리를 작성하기
- 엔진 : mysql / typeORM
