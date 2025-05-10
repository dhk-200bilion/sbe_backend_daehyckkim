import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HomeNewsletterService {
  constructor(private readonly httpService: HttpService) {}
  /**
   * TODO: 학교 명칭을 전달받아 "시도교육청코드,행정표준코드"를 반환 로직 테스트
   * OPEN API URL : https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=3
   * @param schoolName : 학교 명칭
   * @returns "시도교육청코드,행정표준코드"
   */
  async getSchoolCode(
    schoolName: string,
    lctnName: string,
    schoolKind: string,
  ) {
    try {
      const url = process.env.NEIS_API_URL;
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
        throw new Error(
          '동일한 학교정보가 있습니다. 검색 조건을 확인해주세요.',
        );
      }

      const schoolInfo = response.data.schoolInfo[1].row[0];

      return schoolInfo;
    } catch (error) {
      console.error('Error fetching school code:', error);
      throw error;
    }
  }
}
