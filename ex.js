const request = new XMLHttpRequest();
   const url = 'https://open.neis.go.kr/hub/hisTimetable?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&AY=2022&SEM=2&GRADE=1&CLRM_NM=13'; // 긁어오고 싶은 주소를 넣는다. 예제는 네이버

    request.open('GET', url, true);
    request.onload = function () {
      let result = request.responseText
      var set1 = result.split("ITRT_CNTNT")[1];
      set1 = set1.split("LOAD_DTM")[0];
      set1 = set1.split(":")[1]
      console.log(set1); // 긁어온 내용 뿌리기
      };
//파싱 테스트할때 콘솔에서 쓰는 코드.