//사실상 코드저장소.


//시간표기능 개발 중단 -> 2학년 시간표에 선택이 너무 많아서 의미가 없음.
function schedule(){
    let mag = ''
    //나이스api에서 가져와야함. 일단 우리반 시간표 보여주는걸 먼저 만들자.

    //학기가 1인지 2인지.
    if(month<8){
        var sem = 1
    }else if(month>=8){
        var sem = 2
    }

    let url = "https://open.neis.go.kr/hub/hisTimetable?KEY=6b15c10192db4d8194e4b3c1b5df01c5&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&AY="+year+"&SEM="+sem+"&GRADE=1&CLRM_NM=13&LOAD_DTM="+ymd;
    var result = Utils.getWebText(url,false,false).split("<body>")[1].split("</body>")[0];

    try{
        let period = {};
        for(i=1;i<=7;i++){
            period[`perio${i}`] = result.split("PERIO")[i]; 
            period[`perio${i}`] = period[`perio${i}`].split("ITRT_CNTNT")[i-1]; //":"1","
            period[`perio${i}`] = period[`perio${i}`].split(":")[i]; //"1","
            period[`perio${i}`] = period[`perio${i}`].split('"')[i]; // 1","
            period[`perio${i}`] = period[`perio${i}`].split('"')[i-1]; // 1 *월요일 1교시의 '1' 파싱.

        } 
        //파싱할때 저 0과 1 i로 넣고 돌리면 되겠죠? -> 완료

        let acaName = {};
        for(i=1;i<=7;i++){
            acaName[`aca${i}`] = result.split("ITRT_CNTNT")[i];
            acaName[`aca${i}`] = acaName[`aca${i}`].split("LOAD_DTM")[i-1]; //":"한국사","
            acaName[`aca${i}`] = acaName[`aca${i}`].split(":")[i] //"한국사","
            acaName[`aca${i}`] = acaName[`aca${i}`].split('"')[i] // 한국사","
            acaName[`aca${i}`] = acaName[`aca${i}`].split('"')[i-1] //한국사  *월요일 1교시 한국사 파싱.
        }

        //이제 이케하면 하루치 시간표 다 파싱한건가.
        for(i=1;i<=7;i++){
        msg += period[`perio${i}`]+'교시 :'+ acaName[`aca${i}`];
        }
    }catch(e){
        msg += "저런.";   
    }
    return msg;
  }

  //어따쓰는지 몰라서요...

  //아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다. 
function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

//역시 어따쓰는지 모르는것들
function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
