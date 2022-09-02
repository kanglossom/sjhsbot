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
   if(msg.startsWith('!도움말')){ 
        replier.reply(help( )); 
   } 
   if(msg.startsWith('!인사')) { 
     replier.reply(sayhilist()); 
   }
   if(msg.startsWith('!한강물온도')){
    replier.reply(Hwater());
   } 

   if(msg.startsWith('!급식')){
    replier.reply(bobnymnym());
   }

   function hiReply(){
    if(hiMsg.indexOf(msg) != -1){
        replier.reply(repliMsg[hiMsg.indexOf(hiMsg)]);
    }
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
  
 function help( ){ 
  let msg = '안녕하세요! 선정봇이예요 >.0\n 아래 명령어를 입력하시면 선정봇이 작동해요! \n';
  const help_msg = [ 
     '!도움말 : 도움말을 보여줘요.', 
     '!인사 : 선정봇과 인사해요.' ,
     '!한강물온도 : 한강물 온도를 알려줘요.',
     '!급식 : 급식정보를 알려줘요.'
   ]; 
   msg += help_msg.join('\n'); 
  
   return msg; 
 } 
  
  
 function sayhilist() { 
   let msg = '다음의 단어에 선정봇이 작동합니다.' 
   const hi_msg = ['ㄱㅅ', 'ㅅㄱ'] ;

   msg += hi_msg.join('\n');
   return msg;
 }
 
 function Hwater(){
  let msg = '...'
  //pc사용 가능할때 이거부터 넣기

  return msg;
 }

function bobnymnym(){
  let msg = '배고프냐?ㅋㅋ'
  //pc사용가능할떄 넣기 참고할 페이지는 웨일에 스크랩해둠.

  return msg;
}