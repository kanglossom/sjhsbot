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
    if (msg.startsWith('!인사')) {
        replier.reply(sayhilist());
    }
    if (msg.startsWith('!한강물온도')) {
        replier.reply(Hwater());
    }

    if (msg.startsWith('!급식')) {
        replier.reply(bobnymnym());
    }

    function hiReply() {
        if (hiMsg.indexOf(msg) != -1) {
            let msg = repliMsg[hiMsg.indexOf(hiMsg)];
        }
        return msg;
    }
    hiReply();
}

var hiMsg = ['ㄱㅅ', 'ㅅㄱ'];
var repliMsg = [
    '고맙다~',
    '웅 너나 수고해~'
];


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
        '!인사 : 선정봇과 인사해요.',
        '!한강물온도 : 한강물 온도를 알려줘요.',
        '!급식 : 급식정보를 알려줘요.'
    ];
    msg += help_msg.join('\n');

    return msg;
}


function sayhilist() {
    let msg = '다음의 단어에 선정봇이 작동합니다.'
    const hi_msg = ['ㄱㅅ', 'ㅅㄱ'];

    msg += hi_msg.join('\n');
    return msg;
}


function bobnymnym() {
    let msg = '배고프냐?ㅋㅋ \n'
        //참고할 페이지는 웨일에 스크랩해둠.
        //7010191 - 학교코드 (B10)
        //코드의 순서(?) 먼저 매일매일의 날짜를 가져와서 n월 n일 급식입니다. 시전하기.
        //급식정보 가져와서 표기해야함.
    var now = new Date();
    var mon = now.getMonth();
    var year = now.getFullYear();
    var day = now.getDate();
    mon += 1;
    mon = String( mon );
    day = String( day );
    if(mon.length==1){
        mon = "0" + mon;
    }
    if(day.length==1){
        day = "0" + day;
    }
    
    
    //var yoil = ["일", "월", "화", "수", "목", "금", "토"];
    let dateMsg = mon + "월 " + day + "일 급식입니다! \n " ;
    var ymd = year+mon+day;
    
    var url = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=6b15c10192db4d8194e4b3c1b5df01c5&Type=json&plndex=1&pSize=30&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&MLSV_YMD="+ymd;
    var result = Utils.getWebText(url,false,false).split("<body>")[1].split("</body>")[0];
    
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
        msg += "급식 정보가 없습니다";
        
        
    }
    

   
    msg += dateMsg;
    msg += result;



    return msg;
}

