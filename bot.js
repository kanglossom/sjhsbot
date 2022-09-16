const scriptname = "sjhsBot";



/** 
 * (string) room 
 * (string) sender 
 * (boolean) isGroupChat 
 * (void) replier.reply(message) 
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환 
 * (string) imageDB.getProfileBase64() 
 * (string) packageName 
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (msg.startsWith('!도움말')) {
        replier.reply(help());
    }
    if (msg.startsWith('!한강물온도')) {
        replier.reply("한강물뜨러 다녀올게요!");
        replier.reply(Hwater());
    }

    if (msg.startsWith('!급식')) {
        replier.reply("오늘 급식이 뭐드라...");
        replier.reply(bobnymnym());
    }

    //사용자 등록하는걸 만들어야함.
    
    if (msg.startsWith('!사용자등록')){
        if(isGroupChat = false){
            replier.reply("사용자 등록은 개인챗에서만 가능합니다.")
        }else if(isGroupChat = true){
            replier.reply("사용자 등록을 진행합니다.")
            var user={
                name : "",
                grade : "",
                class : "",
            };
        }
    }
}


//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다. 
function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}

function help() {
    let msg = '안녕하세요! 선정봇이예요 >.0\n 아래 명령어를 입력하시면 선정봇이 작동해요! \n';
    const help_msg = [
        '!도움말 : 도움말을 보여줘요.',
        '!한강물온도 : 한강물 온도를 알려줘요.',
        '!급식 : 급식정보를 알려줘요.'
    ];
    msg += help_msg.join('\n');

    return msg;
}

function bobnymnym() {
    let msg = '';
        //참고할 페이지는 웨일에 스크랩해둠.
        //7010191 - 학교코드 (B10)
        //코드의 순서(?) 먼저 매일매일의 날짜를 가져와서 n월 n일 급식입니다. 시전하기.
        //급식정보 가져와서 표기해야함.
    var now = new Date();
    var mon = now.getMonth();
    var year = now.getFullYear();
    var day = now.getDate();
    var yoil = now.getDay();
    mon += 1;
    mon = String( mon );
    day = String( day );
    if(mon.length==1){
        mon = "0" + mon;
    }
    if(day.length==1){
        day = "0" + day;
    }
    
    
    var yoilHan = ["월","화","수","목","금","토","일"];
    let dateMsg = mon + "월 " + day + "일 " +yoilHan[yoil] + "요일 급식이래! \n";
    var ymd = year+mon+day;
    
    let url = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=6b15c10192db4d8194e4b3c1b5df01c5&Type=json&plndex=1&pSize=30&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&MLSV_YMD="+ymd;
    let result = Utils.getWebText(url,false,false).split("<body>")[1].split("</body>")[0];
    
    try{
                    
        //calories = result.split("CAL_INFO\":\"")[1].split("\",\"NTR_INFO")[0];
        result = result.split("중식")[1];
        result = result.split("\",\"ORPLC")[0].split("\"DDISH_NM\":\"")[1].replace(/(<([^>]+)>)/g, "");
        result = result.replace(/amp;/gi, "");
        result = result.replace(/undefined/gi,"");
        result = result.replace(/\./gi, "");
        result = result.replace(/\*/gi, "");
        
        result = result.trim(); 
        result = result.replace(/^ +/gm,"");

        result = result.replace(/[0-9]/g, "");
        
        

    }catch(e){
        msg += "급식 정보가 없다는데?";
        
        
    }
    
    msg += dateMsg;
    msg += result;

    return msg;
}

function Hwater() {

     let url = ""; //서울시 열린데이터 광장에서 갖고오면 될듯 :)
     let result = Utills.getWebText(url,false,false).split("<body>")[1].split("</body>")[0];

     try{
                    
        //여따 파싱하기
        
        

    }catch(e){
        msg += "저런. 한강가는길이 좀 막히네요.";
        
        
    }

     var msg0 = "지금 한강 수온은 " + result + "도래.";
     //{"station":"노량진","status":"success","temp":"22.1","time":"24:00","type":"hangangAPI"}
     //status 사용해서 연결 실패시도 해보기
     
      return msg0;
  }