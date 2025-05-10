import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HomeNewsletterDto } from './dto/home-newsletter.dto';

@Injectable()
export class HomeNewsletterService {
  constructor(private readonly httpService: HttpService) {}
  /**
   * NOTE: 학교 명칭을 전달받아 "시도교육청코드,행정표준코드"를 반환 로직 테스트
   * OPEN API URL : https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=3
   * @param schoolName : 학교 명칭
   * @returns "시도교육청코드,행정표준코드"
   */
  async getSchoolCode(params: {
    schoolName: string;
    lctnName: string;
    schoolKind: string;
  }) {
    const { schoolName, lctnName, schoolKind } = params;
    const url = 'https://open.neis.go.kr/hub/schoolInfo';
    const apiKey = process.env.NEIS_API_ACCESS_KEY;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          KEY: apiKey,
          Type: 'json',
          SCHUL_NM: schoolName,
          SCHUL_KND_SC_NM: schoolKind,
          LCTN_SC_NM: lctnName,
        },
      }),
    );

    /**
       *     "schoolInfo": [
        {
            "head": [
                {
                    "list_total_count": 1
                },
                {
                    "RESULT": {
                        "CODE": "INFO-000",
                        "MESSAGE": "정상 처리되었습니다."
                    }
                }
            ]
        },
        {
            "row": [
                {
                    "ATPT_OFCDC_SC_CODE": "G10",
                    "ATPT_OFCDC_SC_NM": "대전광역시교육청",
                    "SD_SCHUL_CODE": "7441034",
                    "SCHUL_NM": "보문중학교",
                    "ENG_SCHUL_NM": "Bomoon Middle School",
                    "SCHUL_KND_SC_NM": "중학교",
                    "LCTN_SC_NM": "대전광역시",
                    "JU_ORG_NM": "대전광역시동부교육지원청",
                    "FOND_SC_NM": "사립",
                    "ORG_RDNZC": "34619 ",
                    "ORG_RDNMA": "대전광역시 동구 우암로 57",
                    "ORG_RDNDA": "(삼성동/ 보문중학교)",
                    "ORG_TELNO": "042-620-6705",
                    "HMPG_ADRES": "http://bomoonms.djsch.kr",
                    "COEDU_SC_NM": "남",
                    "ORG_FAXNO": "042-672-9365",
                    "HS_SC_NM": "  ",
                    "INDST_SPECL_CCCCL_EXST_YN": "N",
                    "HS_GNRL_BUSNS_SC_NM": "일반계",
                    "SPCLY_PURPS_HS_ORD_NM": null,
                    "ENE_BFE_SEHF_SC_NM": "전기",
                    "DGHT_SC_NM": "주간",
                    "FOND_YMD": "19451220",
                    "FOAS_MEMRD": "19451220",
                    "LOAD_DTM": "20230615"
                }
            ]
        }
    ]
       */

    //NOTE: 학교 정보를 찾을 수 없는 경우 예외 처리
    if (response.data.RESULT) {
      throw new Error(response.data.RESULT.MESSAGE);
    }

    //학교 정보를 찾을 경우
    const schoolCount = response.data.schoolInfo[0].head[0].list_total_count;

    if (schoolCount > 1) {
      throw new Error('동일한 학교정보가 있습니다. 검색 조건을 확인해주세요.');
    }

    const schoolInfo = response.data.schoolInfo[1].row[0];

    return schoolInfo;
  }

  /**
   * TODO: 학교 코드를 전달받아 "음식 정보"를 반환 로직 테스트
   * OPEN API URL : https://open.neis.go.kr/hub/mealServiceDietInfo
   * @param schoolCode : 학교 코드
   * @returns "음식 정보"
   */
  async getHomeNewsletter(homeNewsletterDto: HomeNewsletterDto) {
    try {
      console.log(homeNewsletterDto);
      const { schoolName, lctnName, schoolKind, startDate, endDate } =
        homeNewsletterDto;
      const schoolInfo = await this.getSchoolCode({
        schoolName,
        lctnName,
        schoolKind,
      });

      const url = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
      const apiKey = process.env.NEIS_API_ACCESS_KEY;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            KEY: apiKey,
            Type: 'json',
            pIndex: 1,
            pSize: 100,
            ATPT_OFCDC_SC_CODE: schoolInfo.ATPT_OFCDC_SC_CODE, //시도교육청코드
            SD_SCHUL_CODE: schoolInfo.SD_SCHUL_CODE, //행정표준코드
            MLSV_FROM_YMD: `${startDate}`, //시작일
            MLSV_TO_YMD: `${endDate}`, //종료일
          },
        }),
      );

      /**
       * {
            "mealServiceDietInfo": [
                {
                    "head": [
                        {
                            "list_total_count": 1
                        },
                        {
                            "RESULT": {
                                "CODE": "INFO-000",
                                "MESSAGE": "정상 처리되었습니다.(해당 자료는 단순 참고용으로만 활용하시기 바랍니다.)"
                            }
                        }
                    ]
                },
                {
                    "row": [
                        {
                            "ATPT_OFCDC_SC_CODE": "G10",
                            "ATPT_OFCDC_SC_NM": "대전광역시교육청",
                            "SD_SCHUL_CODE": "7441266",
                            "SCHUL_NM": "대전경덕중학교",
                            "MMEAL_SC_CODE": "2",
                            "MMEAL_SC_NM": "중식",
                            "MLSV_YMD": "20250507",
                            "MLSV_FGR": 534,
                            "DDISH_NM": "작은밥(선택) <br/>스파게티*소시지*루꼴라 (1.2.5.6.10.12.13.15.16)<br/>옥수수스프 (2.5.6.13.16)<br/>오이쌈장무침 (5.6.13)<br/>크루통샐러드 (2.5.6.13)<br/>배추김치 (9)<br/>누룽지(선택) ",
                            "ORPLC_INFO": "쇠고기(종류) : 국내산(한우)<br/>쇠고기 식육가공품 : 국내산<br/>돼지고기 : 국내산<br/>돼지고기 식육가공품 : 국내산<br/>닭고기 : 국내산<br/>닭고기 식육가공품 : 국내산<br/>오리고기 : 국내산<br/>오리고기 가공품 : 국내산<br/>쌀 : 국내산<br/>배추 : 국내산<br/>고춧가루 : 국내산<br/>콩 : 국내산<br/>낙지 : 국내산<br/>고등어 : 국내산<br/>갈치 : 국내산<br/>오징어 : 국내산<br/>꽃게 : 국내산<br/>참조기 : 국내산<br/>비고 : ",
                            "CAL_INFO": "1336.3 Kcal",
                            "NTR_INFO": "탄수화물(g) : 207.5<br/>단백질(g) : 37.0<br/>지방(g) : 40.2<br/>비타민A(R.E) : 148.0<br/>티아민(mg) : 0.6<br/>리보플라빈(mg) : 1.1<br/>비타민C(mg) : 49.5<br/>칼슘(mg) : 131.1<br/>철분(mg) : 4.6",
                            "MLSV_FROM_YMD": "20250507",
                            "MLSV_TO_YMD": "20250507",
                            "LOAD_DTM": "20250510"
                        }
                    ]
                }
            ]
        }
       */

      //   console.log(response.data);

      return response.data;
    } catch (error) {
      //XXX: 예외 처리 추가 필요
      console.error('Error fetching food info:', error);
      throw error;
    }
  }
}
