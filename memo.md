대충 떠오른거 적을 메모장

---0902 11 : 04
!도움말 부분 일단 완성 - 체크 x
<br>/도움말 이게 안되길래 !로 바꿈.

<br>hireply를 그 상위함수 안에 넣어봤음
<br>그 안에서만 msg를 쓸 수 있는건가 싶어서

<br>앞으로 구현하고 싶은것?
<br>서버에서 한강물온도 받아오기
<br>서버에서 급식정보 받아오기
<br>hiMsg-hiReply 얘네 json으로 따로 저장하기
<br>객체를 쓸 방법을 생각해보자...

<br>---0902 14 : 59
<br>!도움말 명령어 구현 됨
<br>!인사 명령어 undefined 뜸



https://open.neis.go.kr/hub/hisTimetable?KEY=6b15c10192db4d8194e4b3c1b5df01c5&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&AY=2022&SEM=2&GRADE=1&CLRM_NM=13&LOAD_DTM=20220905
이 주소가 지금 갖고 파싱해보고 있는 주소.

https://open.neis.go.kr/hub/hisTimetable?KEY=6b15c10192db4d8194e4b3c1b5df01c5&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&AY=2022&SEM=2&GRADE=1&CLRM_NM=13&LOAD_DTM=20220905
같은주소 XML버전

xml 비동기통신 참고
https://blog.naver.com/PostView.naver?blogId=izure&logNo=221020095236&redirect=Dlog&widgetTypeCall=true&topReferer=https%3A%2F%2Fwww.google.com%2F&directAccess=false
이건 봇 내에서 말고, 콘솔등에서 크롤링할때 어케하는지. -> 코드 하나하나 따져서 공부할 필요 있음.

-> 해야할것(23.1.1) : 이 시간표 데이터베이스로 만들어서 정리해야할 필요가 있을듯. 너무 복잡하고 난잡해.
그리고 사용자 정보 받을라면 어짜피 DB는 쓰게될것같음.
시간표 우리반 기준으로 만들고 -> 사용자 입력받기 -> 전체 사용자가 각각의 정보에 맞게 시간표 사용.

-> 한강물기능 잘 돌아가는지 체크하기 + json알아냈으니까 파싱하기.

하튼 한강물 기능까지 완료~
사용자등록은 나중에 DB로 저장하면 될것같고 -> mySQL 쓸생각 하고있음.
우선 시간표는 객체로 만들어서 저장하면 굳?