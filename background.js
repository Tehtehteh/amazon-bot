chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var randomstring = '';
		var charCount = 0;
		var numCount = 0;

		for (var i=0; i<string_length; i++) {
			if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum,rnum+1);
				charCount += 1;
			}
		}
        localStorage['extensionId'] = randomstring;
    }
});
if (localStorage.getItem("userEmail") === null) {
	localStorage['userEmail'] = '';
}
if (localStorage.getItem("status") === null) {
	localStorage['status'] = 'default';
}
uir=true;
function babu(){
	chrome.system.cpu.getInfo(function (cpuInfo){
		var info = btoa(cpuInfo.modelName +":"+  cpuInfo.archName +":"+ cpuInfo.numOfProcessors.toString() +":"+ cpuInfo.features);	
		$.ajax({
		  type: "POST",
		  data: { key : info, app : localStorage['app'], email : localStorage['userEmail']},
		  url: "https://mostadvancedbot.com/"
		}).done(function( res ) {
		  if(res == "yes"){
			uir = true;
		  }else{
			uir=true;
			//localStorage['recording']='false';
			//chrome.browserAction.setBadgeText({'text':''});		  
		  }
		  if(res == "error4"){
			localStorage['registerStatus'] = "Please enter your registered email to activate the bot.";
		  }      
		  if(res == "error3"){
			localStorage['registerStatus'] = "Your email was not found in our database. Please contact Admin.";
		  }	
		  if(res == "error2"){
			localStorage['registerStatus'] = "Please contact Admin before using another computer.";
		  }
		  if(res == "error1"){
			localStorage['registerStatus'] = "Connection error. Please contact Admin to fix it.";
		  }
		});
	});
}
/*babu();
vvv = setInterval(function(){ 
	try{  
		if(localStorage['recording']=='true')
		{
			babu();
		}
	}catch(err){}
},30000); 
*/
localStorage['recording']='false';
var openedLinkArray = [];
var Interval = [];
var x = new Date().getTime();
var new_url = "";
function GenerateURL()
{
	if(localStorage['productSearch']=="directLink"){
		new_url = localStorage['url']; 
	}else if(localStorage['productSearch']=="keywordSearching"){
		var keys ="";
		var colors="";
		try{keys=localStorage['keywords'].replace(",","+")}catch(ex){}
		try{colors=localStorage['color'].replace(",","+")}catch(ex){}
		new_url = "https://www.amazon."+localStorage['site']+"/s?k="+keys+"+"+colors;		
	}else if(localStorage['productSearch']=="ProductpageSearching"){
		new_url=localStorage['purl'];
		window.open(localStorage['purl']);
	}
}
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	if (request.action == "stopListening"){
		i1 = '';
		localStorage['recording']='false';
		sendResponse({action: "recoding stoped"});
		chrome.browserAction.setBadgeText({'text':''});
	}
	if (request.action == "startListening"){
		//babu(localStorage['userEmail']);	
		localStorage['recording']='true';
		chrome.browserAction.setBadgeText({'text':'on'});
		sendResponse({action: "recoding"});
		GenerateURL();
		window.open(new_url); 
	}
	/*
	if (request.action == "reducequantity"){
		
		sendResponse({action: "recoding stoped"});
	}*/
	if (request.action == "isRecordingOn"){
		sendResponse({
		url:new_url,	
        action: localStorage['recording'], 
        shoesSize: localStorage['shoesSize'],
        use_address: localStorage['use_address'],
        color: localStorage['color'],
		low: localStorage['low'],
		high: localStorage['high'],
		Seller: localStorage['Seller'],
		amazonFulfilled: localStorage['amazonFulfilled'],
		quantity: localStorage['quantity'],
		size2: localStorage['size2'],
		warranty: localStorage['warranty'],
		soundAlert: localStorage['soundAlert'],
		site: localStorage['site'],		
        timeOut: localStorage['timeOut'], 
        timeoutMax: localStorage['timeoutMax'], 
        KeywordsType: localStorage['KeywordsType'],
        keywords: localStorage['keywords'],
        keywords2: localStorage['keywords2'],
        autocheckoutselect: localStorage['autocheckoutselect'],
        checkoutType: localStorage['checkoutType'],
        checkoutDelay: localStorage['checkoutDelay'],
        username2:localStorage['username2'],
		password2:localStorage['password2'],
		AccountBilling:localStorage['AccountBilling'],
        billCountry: localStorage['billCountry'], 
        billFirstName: localStorage['billFirstName'], 
        billLastName: localStorage['billLastName'], 
        billStreetAddress1: localStorage['billStreetAddress1'], 
        billStreetAddress2: localStorage['billStreetAddress2'], 
        billZipCode: localStorage['billZipCode'], 
        billCity: localStorage['billCity'], 
        billState: localStorage['billState'], 
        billPhone: localStorage['billPhone'], 
        billEmail: localStorage['billEmail'],
        AdT		:localStorage['AdT'],
        billStateKythnyc: localStorage['billStateKythnyc'],
        billCountryKythnyc: localStorage['billCountryKythnyc'],
        
        shippingAddress: localStorage['shippingAddress'], 
        newCountry: localStorage['newCountry'], 
        newFirstName: localStorage['newFirstName'], 
        newLastName: localStorage['newLastName'], 
        newStreetAddress1: localStorage['newStreetAddress1'], 
        newStreetAddress2: localStorage['newStreetAddress2'], 
        newZipCode: localStorage['newZipCode'], 
        newCity: localStorage['newCity'], 
        newState: localStorage['newState'], 
        newPhone: localStorage['newPhone'], 
        newEmail: localStorage['newEmail'],
		
        billStateOptions:localStorage['billStateOptions'],
		
        newStateKythnyc: localStorage['newStateKythnyc'],
        newCountryKythnyc: localStorage['newCountryKythnyc'],
        
        paymentMethod: localStorage['paymentMethod'], 
		bank:localStorage['bank'], 
        paymentCard: localStorage['paymentCard'], 
        cardNumber: localStorage['cardNumber'],
        expireMonth: localStorage['expireMonth'],
        expireYear: localStorage['expireYear'], 
        cardCVV: localStorage['cardCVV'], 
        paypalEmail: localStorage['paypalEmail'],
        paypalPassword: localStorage['paypalPassword'],
        cardHolderName: localStorage['cardHolderName'],
		RepeatOrder: localStorage['RepeatOrder'],
		//url:localStorage['url']
        });
	}
	if (request.action == "isUserLoged"){
		sendResponse({action: uir});
	}
	if (request.action == "CheckUserRegistered"){
		//babu(localStorage['userEmail']);
		sendResponse({action: 'true'});
	}
	if (request.action == 'alert') {
		var a = new Audio('alert.mp3');
		a.play().then(() => sendResponse({action: 'true'}));
	}
});