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

function Hwater() {

  //let hangang_server_raw = org.jsoup.Jsoup.connect("https://api.hangang.msub.kr/").get().text();
   //let hangang_json = JSON.parse(hangang_server_raw);
   //var msg0 = "현재 한강 수온은 " + hangang_json.temp + "도 입니다.";
   //{"station":"노량진","status":"success","temp":"22.1","time":"24:00","type":"hangangAPI"}
   //status 사용해서 연결 실패시도 해보기
   let Hwater0 = fetch("https://api.hangang.msub.kr/")
   .then((response) => response.json())
   .then((data) => data);
    //fetch is not defined

    var msg0 = "현재 한강 수온은 " + data.temp + "도 입니다.";
    return msg0;
}

function bobnymnym() {
    let msg = '배고프냐?ㅋㅋ'
        //pc사용가능할떄 넣기 참고할 페이지는 웨일에 스크랩해둠.
        //B100000467 - 학교코드

    return msg;
}

function bobnymnym() {
    
        var cut = msg.substring(6,msg.length)
        var cut2 = cut.split("=")
        var ct1 = cut2[0]
        var ct2 = cut2[1]
    //이 구조는 전에 가르치기 소스에서 설명해드렸습니다
    
        var day = new Date(); 
        var m = (day.getMonth() + 1); 
    //현재 달을 가져옵니다
    
        var pap = (m+"월 "+ct2+"일 [중식]");
    //ct2는 위에서 설정한겁니다 ex)/중식검색 예일고=7 이라고 치면
    //ct2가 지금 7을 의미합니다 그래서 6월 7일 [중식] 이라고 나올겁니다 
    
        var u=Utils.getWebText("http://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query="+ ct1 + "+급식");
    //여기는 ct1인 학교이름을 넣어줬습니다
        var a=u.split(pap+"</strong>"); 
        var b=a[1].split("</ul>");
        b = b[0].replace(/(<([^>]+)>)/g, "");
        replier.reply("["+ct1+"]\n"+pap+"입니다.\n"+b+"※숫자는 식품 알레르기 식별 번호입니다.※\n1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우 10.돼지고기 11.복숭아 12.토마토 13.아황산류 14.호두 15.닭고기 16.쇠고기 17.오징어 18.조개류(굴,전복,홍합 포함)"); 
        } 
    
    catch(e)
    {
        replier.reply("학교 정보가 없거나 식단이 없습니다.");
        }
    //여기까지 전에 배포했던 소스랑 똑같습니다 reply부분에서 ct1만 바꿔줬습니다
    
    //몸체닫기