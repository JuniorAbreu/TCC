var conversationId = "NewConversation";

$(document).ready(function(){
	
	$('.chat_head').click(function(){
		$('.chat_body').slideToggle('slow');
	});
	$('.msg_head').click(function(){
		$('.msg_wrap').slideToggle('slow');
	});
	$('.close').click(function(){
		$('.msg_box').hide();
	});
	sendToWatsonConversation();
	
	$('textarea').keypress(
    function(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            
            var msg = $(this).val();
			$(this).val('');
			if(msg !='')
			$('<div class="msg_b">'+msg+'</div>').fadeIn(900).insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);			
			
			if(conversationId!=="NewConversation"){
			sendToWatsonConversation(msg);
			}else if(conversationId==="NewConversation"){
				sendToWatsonConversation(null);
			}
						
        }
    });	
	
	function sendToWatsonConversation(msgData){
		 try
		    {
		        asyncRequest = new XMLHttpRequest();
		        asyncRequest.addEventListener("readystatechange", stateChange, false);
		        asyncRequest.open('GET', '/SHPS/watson?nome='+msgData+ "&conversationId="+ conversationId, true);    //   /Test is url to Servlet!
		        asyncRequest.send(null);
		        count++;
		    }
		    catch(exception)
		   {
		   }
	} 
	
	function stateChange(){
		if(asyncRequest.readyState == 4 && asyncRequest.status == 200){
			conversationId = "existent";
			var msgResponse = JSON.parse(asyncRequest.responseText).output.text;
			
			$('<div class="msg_a">'+msgResponse+'</div>').fadeIn(900).insertBefore('.msg_push').slideDown();
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			$('#bodyContainer').scrollTop($('#bodyContainer')[0].scrollHeight);

			
	    }
	}
});


