const scriptname = "sjhsBot";

var now = new Date();
var month = now.getMonth();
var year = now.getFullYear();
var date = now.getDate();
var yoil = now.getDay();
month += 1;
var yoilHan = ["월","화","수","목","금","토","일"];
var todayYoil = yoilHan[yoil-1];


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

    if (msg.startsWith('!시간표')) {
        replier.reply("시간표 알려줘?");
        replier.reply(schedule());
    }

    //이선우 요청으로 개발하는 석식 ^^
    if (msg.startsWith('!석식')) {
        replier.reply("오늘 석식이 뭐드라...?");
        replier.reply(seaksik());
    }

    //사용자 등록하는걸 만들어야함. --일단보류--
    
    if (msg.startsWith('!사용자등록')){
        if(isGroupChat == false){
            replier.reply("사용자 등록은 개인챗에서만 가능합니다.")
        }else if(isGroupChat == true){
            replier.reply("사용자 등록을 진행합니다.")
            var user={
                name : "",
                grade : "",
                class : "",
            };
        }
    }
}


function help() {
    let msg = '안녕하세요! 선정봇이예요 >.0\n 아래 명령어를 입력하시면 선정봇이 작동해요! \n';
    const help_msg = [
        '!도움말 : 도움말을 보여줘요.',
        '!한강물온도 : 한강물 온도를 알려줘요.',
        '!급식 : 급식정보를 알려줘요.',
        '!사용자등록 : 사용자를 등록할 수 있어요.',
        '!시간표 : 시간표를 보여줘요.',
        '!석식 : 석식정보를 알려줘요.'
    ];
    msg += help_msg.join('\n');

    return msg;
}


function dateString(){
    month = String( month );
    date = String( date );
    if(month.length==1){
        month = "0" + month;
    }
    if(date.length == 1){
        date = "0" + date;
    }
}

function bobnymnym() {
    let msg = '';
        //참고할 페이지는 웨일에 스크랩해둠.
        //7010191 - 학교코드 (B10)
        //코드의 순서(?) 먼저 매일매일의 날짜를 가져와서 n월 n일 급식입니다. 시전하기.
        //급식정보 가져와서 표기해야함.
    
   
    dateString();
    let dateMsg = month + "월 " + date + "일 " +todayYoil + "요일 중식이래! \n";
    var ymd = year+month+date;
    //10월 11일 화요일 급식이래 작동잘됨~
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
        msg += "급식 정보가 없다는데?";
    }
    
    msg += dateMsg;
    msg += result;

    return msg;
}

function seaksik() {
    let msg = '';
    
    dateString();
    let dateMsg = month + "월 " + date + "일 " +todayYoil + "요일 석식이래! \n";
    var ymd = year+month+date;
    var url = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=6b15c10192db4d8194e4b3c1b5df01c5&Type=json&plndex=1&pSize=30&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010191&MLSV_YMD="+ymd;
    var result = Utils.getWebText(url,false,false).split("<body>")[1].split("</body>")[0];
    
    try{
                    
        //calories = result.split("CAL_INFO\":\"")[1].split("\",\"NTR_INFO")[0];
        result = result.split("석식")[1];
        result = result.split("\",\"ORPLC")[0].split("\"DDISH_NM\":\"")[1].replace(/(<([^>]+)>)/g, "");
        result = result.replace(/amp;/gi, "");
        result = result.replace(/undefined/gi,"");
        result = result.replace(/\./gi, "");
        result = result.replace(/\*/gi, "");
        
        result = result.trim(); 
        result = result.replace(/^ +/gm,"");

        result = result.replace(/[0-9]/g, "");
        msg += dateMsg;
    }catch(e){
        msg += "급식 정보가 없다는데?";
    }
    
    msg += result;

    return msg;

}

function Hwater() {
    let msg=''
    //70514e677a6c756c35344245666372 인증키 
     let url = "http://openapi.seoul.go.kr:8088/70514e677a6c756c35344245666372/json/WPOSInformationTime/1/5/"; 
     //서울시 열린데이터 광장에서 갖고오면 될듯 :) -> 가져옴.
     var result = Utils.getWebText(url,false,false);
     //UNDEFIND. 얘가 링크에 있는걸 가져오지 못하는듯? -> 링크에 xml을 json으로 바꾸면 되는거였음^^

     try{
        result = result.split("W_TEMP")[4];
        result = result.split("W_PH")[0]; //선유 기준 온도. ":"3.9","
        result = result.split(":")[1]; // "3.9","
        result = result.split('"')[1]; // 3.9","
        result = result.split('"')[0]; //3.9
        msg = "지금 한강 수온은 " + result + "°C 래!";
    }catch(e){
        msg += "저런. 한강가는길이 좀 막히네요.";   
    }
     return msg;
  }

  