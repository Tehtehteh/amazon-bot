function save()
{
	//localStorage['keywords'] = $("#keywords").val().replace(/(.)\s(.)/g, '$1|$2');
	localStorage['site'] = $("#site").val();
	localStorage['RepeatOrder'] = $("#RepeatOrder").val();
	localStorage['url'] = $("#url").val();
	localStorage['purl'] = $("#purl").val();
	localStorage['productSearch'] = $("#productSearch").val();
    localStorage['keywords'] = $("#keywords").val();   
    localStorage['keywords2'] = $("#keywords2").val();   
    localStorage['KeywordsType'] = $("#KeywordsType").val();   
	localStorage['use_address'] = $("#use_address").val();
	localStorage['quantity'] = $("#quantity").val();
	localStorage['soundAlert'] = $("#soundAlert").val();
	localStorage['color'] = $("#color").val();
	localStorage['shoesSize'] = $("#shoesSize").val();
	localStorage['size2'] = $("#size2").val();
	localStorage['Seller'] = $("#Seller").val();
	localStorage['warranty'] = $("#warranty").val();
	localStorage['amazonFulfilled'] = $("#amazonFulfilled").val();
	localStorage['low'] = $("#low").val();
	localStorage['high'] = $("#high").val();
	localStorage['timeOut'] = $("#timeout").val();
	localStorage['timeoutMax'] = $("#timeoutMax").val();
    localStorage['autocheckoutselect'] = $("#autocheckoutselect").val();      
    localStorage['checkoutType'] = $("#checkoutType").val();
    localStorage['checkoutDelay'] = $("#checkoutDelay").val(); 
	localStorage['username2'] = $("#username2").val();
	localStorage['password2'] = $("#password2").val();
	
   //Billing Address
    localStorage['AccountBilling'] = document.getElementById("AccountBilling").checked;   
    localStorage['billCountry'] = $("#billCountry").val();    
    localStorage['billFirstName'] = $("#billFirstName").val();
    localStorage['billLastName'] = $("#billLastName").val();
    localStorage['billStreetAddress1'] = $("#billStreetAddress1").val();
    localStorage['billStreetAddress2'] = $("#billStreetAddress2").val();
    localStorage['billZipCode'] = $("#billZipCode").val();
    localStorage['billCity'] = $("#billCity").val();
    localStorage['billState'] = $("#billState").val();
    localStorage['billPhone'] = $("#billPhone").val();
    localStorage['billEmail'] = $("#billEmail").val();
	localStorage['AdT']		=$("#AdT").val();
    localStorage['billStateKythnyc']="";
    var m = document.getElementById("billState");
    for(var i=0; i<m.length; i++){
        if(m.options[i].value == m.value){
            localStorage['billStateKythnyc']=m.options[i].innerHTML;
            break;
        }
    }
    localStorage['billCountryKythnyc']="";
    var m = document.getElementById("billCountry");
    for(var i=0; i<m.length; i++){
        if(m.options[i].value == m.value){
            localStorage['billCountryKythnyc']=m.options[i].innerHTML;
            break;
        }
    }    
    //localStorage['billStateKythnyc'] = $("#billState").html();   
    //Shipping Address 
    var a = document.getElementsByName('shipAddress');
    var shippingAddress;
    for(var i = 0; i < a.length; i++){
        if(a[i].checked){
            shippingAddress = a[i].value;
        }
    }
    localStorage['shippingAddress'] = shippingAddress;
    if(shippingAddress === "bill"){
        localStorage['newCountry'] = $("#billCountry").val();    
        localStorage['newFirstName'] = $("#billFirstName").val();
        localStorage['newLastName'] = $("#billLastName").val();
        localStorage['newStreetAddress1'] = $("#billStreetAddress1").val();
        localStorage['newStreetAddress2'] = $("#billStreetAddress2").val();
        localStorage['newZipCode'] = $("#billZipCode").val();
        localStorage['newCity'] = $("#billCity").val();
        localStorage['newState'] = $("#billState").val();
        localStorage['newPhone'] = $("#billPhone").val();
        localStorage['newEmail'] = $("#billEmail").val();    
    }else{    
        localStorage['newCountry'] = $("#newCountry").val();    
        localStorage['newFirstName'] = $("#newFirstName").val();
        localStorage['newLastName'] = $("#newLastName").val();
        localStorage['newStreetAddress1'] = $("#newStreetAddress1").val();
        localStorage['newStreetAddress2'] = $("#newStreetAddress2").val();
        localStorage['newZipCode'] = $("#newZipCode").val();
        localStorage['newCity'] = $("#newCity").val();
        localStorage['newState'] = $("#newState").val();
        localStorage['newPhone'] = $("#newPhone").val();
        localStorage['newEmail'] = $("#newEmail").val();
    }
    localStorage['newStateKythnyc']="";
    var n = document.getElementById("newState");
    for(var i=0; i<n.length; i++){
        if(n.options[i].value == n.value){
            localStorage['newStateKythnyc']=n.options[i].innerHTML;
            break;
        }
    }    
    localStorage['newCountryKythnyc']="";
    var n = document.getElementById("newCountry");
    for(var i=0; i<n.length; i++){
        if(n.options[i].value == n.value){
            localStorage['newCountryKythnyc']=n.options[i].innerHTML;
            break;
        }
    }    
    //Payment Method
    localStorage['paymentMethod'] = $("#paymentMethod").val();
	localStorage['bank'] = $("#bank").val();	
    localStorage['paymentCard'] = $("#paymentCard").val();
    localStorage['cardNumber'] = $("#cardNumber").val();
    localStorage['expireMonth'] = $("#expireMonth").val();    
    localStorage['expireYear'] = $("#expireYear").val();
    localStorage['cardCVV'] = $("#cardCVV").val();
    localStorage['cardHolderName'] = $("#cardHolderName").val();
    localStorage['paypalEmail'] = $("#paypalEmail").val();
    localStorage['paypalPassword'] = $("#paypalPassword").val();	
}
function Validate(){
	if($("#productSearch").val()=="keywordSearching" || $("#productSearch").val()=="ProductpageSearching"){
		if($("#keywords").val()=="" || $("#keywords").val().match(/^ *$/) !== null){
			alert("Please Enter  Keywords");
			return false;
		}		
	}
	return true;
}
$('#save').live('click', function(){
	save();
	console.log("Data saved successfuly!");
	// alert("Data saved successfuly!");
});
$('#start').live('click', function(){	
    save();
	if(Validate()){	
		chrome.extension.sendMessage({action: "startListening"}, function(response) {
			$(".mainContainer").html('<div class="buttonContainer"><a href="#" id="stop" class="stop myButton">Stop</a></div>');
			window.close();
		});
	}		
});
$('#stop').live('click', function(){ 
	chrome.extension.sendMessage({action: "stopListening"}, function(response) {
		location.reload();
    });
});

localStorage['app']="amazon";
$('#deactivate').live('click', function(){ 
	$.ajax({
	  type: "POST",
	  url: "https://mostadvancedbot.com/activations/deactivate.php",
	  data: {'app': localStorage['app'], 'email': localStorage['userEmail'], 'action': 'delete'}
	}).done(function( res ) {
        if(res == "success"){
			chrome.extension.sendMessage({action: "deactivate"}, function(response) {
				localStorage['userEmail'] = '';
				window.close();
			});
        }
    });
});	

$('#logout').live('click', function(){ 
	$.ajax({
	  type: "GET",
	  url: "https://mostadvancedbot.com/activation/logout.php",
	  data: {'email': localStorage['userEmail']}
	}).done(function( res ) {
        if(res == "true"){
            localStorage['userEmail']="";
            chrome.extension.sendMessage({action: "logout"}, function(response) { });     
            
            signInHTML = '<div align="center"><button id="signIn"><h4>Login</h4></button></div> <br/> <div id="loginForm" class="hidden"><table ><tr><td align="right"><h4>Email Id: </h4></td><td align="left" style="padding-left:10px; padding-right:10px;"><input type="text" id="login_email" placeholder="Enter your registered email" name="login_email" size=25 ></td><td align="center"> <div id="validate"><button><b>OK</b></button></div></td></tr></table><div class="clear" style="padding-top:10px; padding-bottom:10px;"></div><br/></div>';   
            
            $(".mainContainer").html('<div class="buttonContainer">'+signInHTML+'</div>');
            $("#signIn").live("click", function(){
                $("#loginForm").removeClass("hidden");
                $("#login_email").focus();
            });
            
            $("#validate").live("click", function(){
                localStorage['userEmail'] = $("#login_email").val();
                $("#loginForm .clear").html('<img src="img/loading.gif" style="height: 20px; -webkit-filter: sepia(100%) hue-rotate(67deg) invert(13%);">');
                chrome.extension.sendMessage({action: "CheckUserRegistered"}, function(response) {
                    setTimeout(function(){
                        chrome.extension.sendMessage({action: "isUserLoged"}, function(response) {
                            if(response.action == true){
                                location.reload();
                            }else{
                                $("#loginForm .clear").html(localStorage['registerStatus']);
                            }
                        });
                    },1500);
                });
            });
        }
    });
});

$('.fhButton').live('click', function(){
	if($(this).hasClass('selected')){
		$(this).removeClass('selected');
	}else{
		$(this).addClass('selected');
	}
});

$("#addHandle").live('click', function(){
	shopname = $("#newshop").val();
	if(shopname != ''){
		htmlcode = '<div class="fhButton selected">'+shopname+'</div>';
		$("#fastHandle").append(htmlcode);
	}
});

$('#download').live('click', function(){ 
	window.open("https://ebotlab.com");
});
$(function(){
	try{
		$.ajax({
		  type: "GET",
		  url: "https://mostadvancedbot.com/products/amazon-bot"
		}).done(function( res ) {
			if(res.indexOf(chrome.runtime.getManifest().version)==-1){
				$("#update").html('Updates available. <a id="download">Click here to download.</a>');
			}
		});	
	}catch(ecff){}
	$("#RepeatOrder").val(localStorage['RepeatOrder']);
	if (localStorage.getItem("username2") === null) {
		$("#username2").val();
	}else{
		$("#username2").val(localStorage['username2']);
	}
	if(localStorage.getItem("quantity") === null) {
		$("#quantity").val(1);
	}else{
		$("#quantity").val(localStorage['quantity']);
	}
	if(localStorage.getItem("soundAlert") === null) {
		$("#soundAlert").val("");
	}else{
		$("#soundAlert").val(localStorage['soundAlert']);
	}
	if(localStorage.getItem("color") === null) {
		$("#color").val();
	}else{
		$("#color").val(localStorage['color']);
	}
	if(localStorage.getItem("Seller") === null) {
		$("#Seller").val();
	}else{
		$("#Seller").val(localStorage['Seller']);
	}
	if(localStorage.getItem("amazonFulfilled") === null) {
		$("#amazonFulfilled").val();
	}else{
		$("#amazonFulfilled").val(localStorage['amazonFulfilled']);
	}
	if(localStorage.getItem("password2") === null) {
		$("#password2").val();
	}else{
		$("#password2").val(localStorage['password2']);
	}	
	if (localStorage.getItem("site") === null) {
		$("#site").val();
	}else{
		$("#site").val(localStorage['site']);
	}
	
	if (localStorage.getItem("url") === null) {
		$("#url").val("https://www.amazon.com/");
	}else{
		$("#url").val(localStorage['url']);
	}	
	if (localStorage.getItem("purl") === null) {
		$("#purl").val("");
	}else{
		$("#purl").val(localStorage['purl']);
	}	
	
	if (localStorage.getItem("shoesSize") === null) {
		$("#shoesSize").val();
	}else{
		$("#shoesSize").val(localStorage['shoesSize']);
	}
	if (localStorage.getItem("size2") === null) {
		$("#size2").val();
	}else{
		$("#size2").val(localStorage['size2']);
	}
	if (localStorage.getItem("warranty") === null) {
		$("#warranty").val();
	}else{
		$("#warranty").val(localStorage['warranty']);
	}
	if (localStorage.getItem("low") === null) {
		$("#low").val();
	}else{
		$("#low").val(localStorage['low']);
	}
	if (localStorage.getItem("high") === null) {
		$("#high").val();
	}else{
		$("#high").val(localStorage['high']);
	}
	if (localStorage.getItem("keywords") === null) {
		$("#keywords").val();
	}else{
		$("#keywords").val(localStorage['keywords']);
	}
	if (localStorage.getItem("productSearch") === null) {
		$("#productSearch").val("");
	}else{
		$("#productSearch").val(localStorage['productSearch']);
	}
	if (localStorage.getItem("keywords2") === null) {
		$("#keywords2").val();
	}else{
		$("#keywords2").val(localStorage['keywords2']);
	}
	if (localStorage.getItem("KeywordsType") === null) {
		$("#KeywordsType").val();
	}else{
		$("#KeywordsType").val(localStorage['KeywordsType']);
	}	
	if (localStorage.getItem("timeOut") === null) {
		$("#timeout").val(2000);
	}else{
		$("#timeout").val(localStorage['timeOut']);
	}
	if (localStorage.getItem("timeoutMax") === null) {
		$("#timeoutMax").val(3000);
	}else{
		$("#timeoutMax").val(localStorage['timeoutMax']);
	}
    
	if (localStorage.getItem("autocheckoutselect") === null) {
		$("#autocheckoutselect").val("yes");
	}else{
		$("#autocheckoutselect").val(localStorage['autocheckoutselect']);
	}
    
	if (localStorage.getItem("checkoutType") === null) {
		$("#checkoutType").val("partial");
	}else{
		$("#checkoutType").val(localStorage['checkoutType']);
	}       

	if (localStorage.getItem("checkoutDelay") === null) {
		$("#checkoutDelay").val("0");
	}else{
		$("#checkoutDelay").val(localStorage['checkoutDelay']);
	}     
    
    //billing address
	if (localStorage.getItem("AccountBilling") == "true") {
		document.getElementById("AccountBilling").checked=true;
	}

	if(localStorage.getItem("use_address") === null){
		$("#use_address").val();
	}else{
		$("#use_address").val(localStorage['use_address']);
	}
    if (localStorage.getItem("billCountry") === null) {
		$("#billCountry").val();
	}else{
		$("#billCountry").val(localStorage['billCountry']);
	}
	if (localStorage.getItem("billFirstName") === null) {
		$("#billFirstName").val();
	}else{
		$("#billFirstName").val(localStorage['billFirstName']);
	}
    
	if (localStorage.getItem("billLastName") === null) {
		$("#billLastName").val();
	}else{
		$("#billLastName").val(localStorage['billLastName']);
	}
    
	if (localStorage.getItem("billStreetAddress1") === null) {
		$("#billStreetAddress1").val();
	}else{
		$("#billStreetAddress1").val(localStorage['billStreetAddress1']);
	}
    
	if (localStorage.getItem("billStreetAddress2") === null) {
		$("#billStreetAddress2").val();
	}else{
		$("#billStreetAddress2").val(localStorage['billStreetAddress2']);
	}
    
	if (localStorage.getItem("billZipCode") === null) {
		$("#billZipCode").val();
	}else{
		$("#billZipCode").val(localStorage['billZipCode']);
	}
    
	if (localStorage.getItem("billCity") === null) {
		$("#billCity").val();
	}else{
		$("#billCity").val(localStorage['billCity']);
	}
    
	if (localStorage.getItem("billState") === null) {
		$("#billState").val();
	}else{
		$("#billState").val(localStorage['billState']);
	}
    if (localStorage.getItem("AdT") === null) {
		$("#AdT").val();
	}else{
		$("#AdT").val(localStorage['AdT']);
	}
	if (localStorage.getItem("billPhone") === null) {
		$("#billPhone").val();
	}else{
		$("#billPhone").val(localStorage['billPhone']);
	}
    
	if (localStorage.getItem("billEmail") === null) {
		$("#billEmail").val();
	}else{
		$("#billEmail").val(localStorage['billEmail']);
	}    
    //shipping address
    var shippingId="#".concat(localStorage.getItem("shippingAddress"));
    $(shippingId).prop("checked", true);
    
	if (localStorage.getItem("newCountry") === null) {
		$("#newCountry").val();
	}else{
		$("#newCountry").val(localStorage['newCountry']);
	}
    
	if (localStorage.getItem("newFirstName") === null) {
		$("#newFirstName").val();
	}else{
		$("#newFirstName").val(localStorage['newFirstName']);
	}
    
	if (localStorage.getItem("newLastName") === null) {
		$("#newLastName").val();
	}else{
		$("#newLastName").val(localStorage['newLastName']);
	}
    
	if (localStorage.getItem("newStreetAddress1") === null) {
		$("#newStreetAddress1").val();
	}else{
		$("#newStreetAddress1").val(localStorage['newStreetAddress1']);
	}
    
	if (localStorage.getItem("newStreetAddress2") === null) {
		$("#newStreetAddress2").val();
	}else{
		$("#newStreetAddress2").val(localStorage['newStreetAddress2']);
	}
    
	if (localStorage.getItem("newZipCode") === null) {
		$("#newZipCode").val();
	}else{
		$("#newZipCode").val(localStorage['newZipCode']);
	}
    
	if (localStorage.getItem("newCity") === null) {
		$("#newCity").val();
	}else{
		$("#newCity").val(localStorage['newCity']);
	}
    
	if (localStorage.getItem("newState") === null) {
		$("#newState").val();
	}else{
		$("#newState").val(localStorage['newState']);
	}
    
	if (localStorage.getItem("newPhone") === null) {
		$("#newPhone").val();
	}else{
		$("#newPhone").val(localStorage['newPhone']);
	}
    
	if (localStorage.getItem("newEmail") === null) {
		$("#newEmail").val();
	}else{
		$("#newEmail").val(localStorage['newEmail']);
	}    

    //Payment Option   
	if (localStorage.getItem("paymentMethod") === null) {
		$("#paymentMethod").val();
	}else{
		$("#paymentMethod").val(localStorage['paymentMethod']);
	}
	if (localStorage.getItem("bank") === null) {
		$("#bank").val();
	}else{
		$("#bank").val(localStorage['bank']);
	}
	if (localStorage.getItem("paymentCard") === null) {
		$("#paymentCard").val();
	}else{
		$("#paymentCard").val(localStorage['paymentCard']);
	}
    
	if (localStorage.getItem("cardNumber") === null) {
		$("#cardNumber").val();
	}else{
		$("#cardNumber").val(localStorage['cardNumber']);
	}
    
	if (localStorage.getItem("expireMonth") === null) {
		$("#expireMonth").val();
	}else{
		$("#expireMonth").val(localStorage['expireMonth']);
	}
    
	if (localStorage.getItem("expireYear") === null) {
		$("#expireYear").val();
	}else{
		$("#expireYear").val(localStorage['expireYear']);
	}
    
	if (localStorage.getItem("cardCVV") === null) {
		$("#cardCVV").val();
	}else{
		$("#cardCVV").val(localStorage['cardCVV']);
	}
    
	if (localStorage.getItem("paypalEmail") === null) {
		$("#paypalEmail").val();
	}else{
		$("#paypalEmail").val(localStorage['paypalEmail']);
	}

	if (localStorage.getItem("paypalPassword") === null) {
		$("#paypalPassword").val();
	}else{
		$("#paypalPassword").val(localStorage['paypalPassword']);
	}
    
	if (localStorage.getItem("cardHolderName") === null) {
		$("#cardHolderName").val();
	}else{
		$("#cardHolderName").val(localStorage['cardHolderName']);
	}
	if($("#shoesSize").val()==="custom"){
		$("#customSizeDiv").show();
	}else{
		$("#customSizeDiv").hide();
	}
	$("#url_div").hide();
	$("#keywords_div").hide();
	$("#product_page").hide();
	if($("#productSearch").val()=="directLink"){
		$("#url_div").show();
		$("#keywords_div").hide();
		$("#product_page").hide();
	}else if($("#productSearch").val()=="keywordSearching"){
		$("#url_div").hide();
		$("#keywords_div").show();
		$("#product_page").hide();
	}else if($("#productSearch").val()=="ProductpageSearching"){
		$("#url_div").hide();
		$("#product_page").show();
		$("#keywords_div").show();
	}
	$("#productSearch").click(function(){
		if($("#productSearch").val()=="directLink"){
			$("#url_div").show();
			$("#keywords_div").hide();
			$("#product_page").hide();
		}else if($("#productSearch").val()=="keywordSearching"){
			$("#url_div").hide();
			$("#keywords_div").show();
			$("#product_page").hide();
		}else if($("#productSearch").val()=="ProductpageSearching"){
			$("#url_div").hide();
			$("#product_page").show();
			$("#keywords_div").show();
		}
	});	
    $("#shoesSize").click(function() {
        if($("#shoesSize").val()==="custom"){
            $("#customSizeDiv").show();
        }else{
			$("#customSizeDiv").hide();
		}
    });
	
    //$("#loginDiv").hide();
    $("#loginLine").click(function() {
      $("#loginDiv").toggle();
    });
	$("#newAddressDiv").hide();
    $("[name='shipAddress']").click(function() {
		if($("[name='shipAddress']:checked").val()=="new")
		{
			$("#newAddressDiv").show();
		}else{
			$("#newAddressDiv").hide();
		}     
    });		

	$(".address").hide();
	$("#b_adderss").hide();
    $("#billingLine").click(function() {
      $(".address").toggle();
	  $("#b_adderss").show();
    });  
	
	$("#paymentMethodDiv").hide();
    $("#payment").click(function() {
      $("#paymentMethodDiv").toggle();
     });
	$("#creditcardDiv").hide();
		$("#internet").hide();
	  $("#paypalDiv").hide();
	  
    $("#paymentMethod").click(function() {		
		if($("#paymentMethod").val()=="paypal")
		{
		  $("#creditcardDiv").hide();
			$("#internet").hide();
		  $("#paypalDiv").show();		  		
		}else{
			$("#paypalDiv").hide();	
		}
		
		if($("#paymentMethod").val()=="internet")
		{
		  $("#creditcardDiv").hide();
			$("#internet").show();
		  $("#paypalDiv").hide();
		}
		else{
			$("#internet").hide();
		}
		if($("#paymentMethod").val()=="creditCard")
		{
		  $("#creditcardDiv").show();
		  $("#internet").hide();
		  $("#paypalDiv").hide();
		}else{
			$("#creditcardDiv").hide();
		}			
		
    });
	 if($("#use_address").val()=="no"){	
		  $("#billingAddressDiv").show();		  		
		}else{
			$("#billingAddressDiv").hide();
		}
	$(".address").click(function(){
		if($("#use_address").val()=="no"){	
		  $("#billingAddressDiv").show();		  		
		}else{
			$("#billingAddressDiv").hide();	
		}
	});
    //autocheckout
	if($("#autocheckoutselect").val()==="yes"){
		$("#autocheckout").show();
	}else{
		$("#autocheckout").hide();
	}
    
    $("#autocheckoutselect").click(function() {
        if($("#autocheckoutselect").val()==="yes"){
            $("#autocheckout").show();
        }else{
			$("#autocheckout").hide();
		}
    });   

	if($("#site").val()==="other"){
		$("#otherDiv").show();
	}else{
		$("#otherDiv").hide();
	}
    
    $("#site").click(function() {
        if($("#site").val()==="other"){
            $("#otherDiv").show();
        }else{
			$("#otherDiv").hide();
		}
    }); 	
	
    $("#keywords").on('mouseenter', function(){
      $("#info1").show();
    });	
    $("#keywords").on('mouseleave', function(){
      $("#info1").hide();
    });	
	
	if(localStorage['recording'] == 'true'){
		$(".mainContainer").html('<div align="center"><button href="#" id="stop" value="STOP"class="start myButton btn btn-large" style="align:center;"><span align="center"><h4> STOP </h4></span></button></div>');
	}
	//setStates();
});

$('#billCountry').live('click', function(){ 
	//setStates();
});

chrome.extension.sendMessage({action: "isUserLoged"}, function(response) {
	if(response.action== false){
		myButtonBuyHTML = '';
		signInHTML = '<div align="center"><button id="signIn"><h4>Login</h4></button></div> <br/> <div id="loginForm" class="hidden"><table ><tr><td align="right"><h4>Email Id: </h4></td><td align="left" style="padding-left:10px; padding-right:10px;"><input type="text" id="login_email" placeholder="Enter your registered email" name="login_email" size=25 ></td><td align="center"> <div id="validate"><button><b>OK</b></button></div></td></tr></table><div class="clear" style="padding-top:10px; padding-bottom:10px;"></div><br/></div>';
		
		$(".mainContainer").html('<div class="buttonContainer">'+myButtonBuyHTML+signInHTML+'</div>');
		
		$("#signIn").live("click", function(){
			$("#loginForm").removeClass("hidden");
			$("#login_email").focus();
		});
		
		$("#validate").live("click", function(){
			localStorage['userEmail'] = $("#login_email").val();
			$("#loginForm .clear").html('<img src="img/loading.gif" style="height: 20px; -webkit-filter: sepia(100%) hue-rotate(67deg) invert(13%);">');
			chrome.extension.sendMessage({action: "CheckUserRegistered"}, function(response) {
				setTimeout(function(){
					chrome.extension.sendMessage({action: "isUserLoged"}, function(response) {
						if(response.action == true){
							location.reload();
						}else{
							$("#loginForm .clear").html(localStorage['registerStatus']);
						}
					});
				},1500);
			});
		});
		
	}
});
var statesUS='<option data-code="AL" value="Alabama">Alabama</option>\
			<option data-code="AK" value="Alaska">Alaska</option>\
			<option data-code="AS" value="American Samoa">American Samoa</option>\
			<option data-code="AZ" value="Arizona">Arizona</option>\
			<option data-code="AR" value="Arkansas">Arkansas</option>\
			<option data-code="AA" value="Armed Forces Americas">Armed Forces Americas</option>\
			<option data-code="AE" value="Armed Forces Europe">Armed Forces Europe</option>\
			<option data-code="AP" value="Armed Forces Pacific">Armed Forces Pacific</option>\
			<option data-code="CA" value="California">California</option>\
			<option data-code="CO" value="Colorado">Colorado</option>\
			<option data-code="CT" value="Connecticut">Connecticut</option>\
			<option data-code="DE" value="Delaware">Delaware</option>\
			<option data-code="FM" value="Federated States of Micronesia">Federated States of Micronesia</option>\
			<option data-code="FL" value="Florida">Florida</option>\
			<option data-code="GA" value="Georgia">Georgia</option>\
			<option data-code="GU" value="Guam">Guam</option>\
			<option data-code="HI" value="Hawaii">Hawaii</option>\
			<option data-code="ID" value="Idaho">Idaho</option>\
			<option data-code="IL" value="Illinois">Illinois</option>\
			<option data-code="IN" value="Indiana">Indiana</option>\
			<option data-code="IA" value="Iowa">Iowa</option>\
			<option data-code="KS" value="Kansas">Kansas</option>\
			<option data-code="KY" value="Kentucky">Kentucky</option>\
			<option data-code="LA" value="Louisiana">Louisiana</option>\
			<option data-code="ME" value="Maine">Maine</option>\
			<option data-code="MH" value="Marshall Islands">Marshall Islands</option>\
			<option data-code="MD" value="Maryland">Maryland</option>\
			<option data-code="MA" value="Massachusetts">Massachusetts</option>\
			<option data-code="MI" value="Michigan">Michigan</option>\
			<option data-code="MN" value="Minnesota">Minnesota</option>\
			<option data-code="MS" value="Mississippi">Mississippi</option>\
			<option data-code="MO" value="Missouri">Missouri</option>\
			<option data-code="MT" value="Montana">Montana</option>\
			<option data-code="NE" value="Nebraska">Nebraska</option>\
			<option data-code="NV" value="Nevada">Nevada</option>\
			<option data-code="NH" value="New Hampshire">New Hampshire</option>\
			<option data-code="NJ" value="New Jersey">New Jersey</option>\
			<option data-code="NM" value="New Mexico">New Mexico</option>\
			<option data-code="NY" value="New York">New York</option>\
			<option data-code="NC" value="North Carolina">North Carolina</option>\
			<option data-code="ND" value="North Dakota">North Dakota</option>\
			<option data-code="MP" value="Northern Mariana Islands">Northern Mariana Islands</option>\
			<option data-code="OH" value="Ohio">Ohio</option>\
			<option data-code="OK" value="Oklahoma">Oklahoma</option>\
			<option data-code="OR" value="Oregon">Oregon</option>\
			<option data-code="PW" value="Palau">Palau</option>\
			<option data-code="PA" value="Pennsylvania">Pennsylvania</option>\
			<option data-code="PR" value="Puerto Rico">Puerto Rico</option>\
			<option data-code="RI" value="Rhode Island">Rhode Island</option>\
			<option data-code="SC" value="South Carolina">South Carolina</option>\
			<option data-code="SD" value="South Dakota">South Dakota</option>\
			<option data-code="TN" value="Tennessee">Tennessee</option>\
			<option data-code="TX" value="Texas">Texas</option>\
			<option data-code="UT" value="Utah">Utah</option>\
			<option data-code="VT" value="Vermont">Vermont</option>\
			<option data-code="VI" value="Virgin Islands">Virgin Islands</option>\
			<option data-code="VA" value="Virginia">Virginia</option>\
			<option data-code="WA" value="Washington">Washington</option>\
			<option data-code="DC" value="Washington DC">Washington DC</option>\
			<option data-code="WV" value="West Virginia">West Virginia</option>\
			<option data-code="WI" value="Wisconsin">Wisconsin</option>\
			<option data-code="WY" value="Wyoming">Wyoming</option>';
var statesCA='<option data-code="AB" value="Alberta">Alberta</option>\
			<option data-code="BC" value="British Columbia">British Columbia</option>\
			<option data-code="MB" value="Manitoba">Manitoba</option>\
			<option data-code="NB" value="New Brunswick">New Brunswick</option>\
			<option data-code="NL" value="Newfoundland">Newfoundland</option>\
			<option data-code="NT" value="Northwest Territories">Northwest Territories</option>\
			<option data-code="NS" value="Nova Scotia">Nova Scotia</option>\
			<option data-code="NU" value="Nunavut">Nunavut</option>\
			<option data-code="ON" value="Ontario">Ontario</option>\
			<option data-code="PE" value="Prince Edward Island">Prince Edward Island</option>\
			<option data-code="QC" value="Quebec">Quebec</option>\
			<option data-code="SK" value="Saskatchewan">Saskatchewan</option>\
			<option data-code="YT" value="Yukon">Yukon</option>';
var statesAU='<option data-code="ACT" value="Australian Capital Territory">Australian Capital Territory</option>\
			<option data-code="NSW" value="New South Wales">New South Wales</option>\
			<option data-code="NT" value="Northern Territory">Northern Territory</option>\
			<option data-code="QLD" value="Queensland">Queensland</option>\
			<option data-code="SA" value="South Australia">South Australia</option>\
			<option data-code="TAS" value="Tasmania">Tasmania</option>\
			<option data-code="VIC" value="Victoria">Victoria</option>\
			<option data-code="WA" value="Western Australia">Western Australia</option>';
var statesAR='<option data-code="B" value="Buenos Aires">Buenos Aires</option>\
			<option data-code="K" value="Catamarca">Catamarca</option>\
			<option data-code="H" value="Chaco">Chaco</option>\
			<option data-code="U" value="Chubut">Chubut</option>\
			<option data-code="C" value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>\
			<option data-code="X" value="Córdoba">Córdoba</option>\
			<option data-code="W" value="Corrientes">Corrientes</option>\
			<option data-code="E" value="Ente Ríos">Ente Ríos</option>\
			<option data-code="P" value="Formosa">Formosa</option>\
			<option data-code="Y" value="Jujuy">Jujuy</option>\
			<option data-code="L" value="La Pampa">La Pampa</option>\
			<option data-code="F" value="La Rioja">La Rioja</option>\
			<option data-code="M" value="Mendoza">Mendoza</option>\
			<option data-code="N" value="Misiones">Misiones</option>\
			<option data-code="Q" value="Neuquén">Neuquén</option>\
			<option data-code="R" value="Río Negro">Río Negro</option>\
			<option data-code="A" value="Salta">Salta</option>\
			<option data-code="J" value="San Juan">San Juan</option>\
			<option data-code="D" value="San Luis">San Luis</option>\
			<option data-code="Z" value="Santa Cruz">Santa Cruz</option>\
			<option data-code="S" value="Santa Fe">Santa Fe</option>\
			<option data-code="G" value="Santiago Del Estero">Santiago Del Estero</option>\
			<option data-code="V" value="Tierra Del Fuego">Tierra Del Fuego</option>\
			<option data-code="T" value="Tucumán">Tucumán</option>';
var statesBR='<option data-code="AC" value="Acre">Acre</option>\
			<option data-code="AL" value="Alagoas">Alagoas</option>\
			<option data-code="AP" value="Amapá">Amapá</option>\
			<option data-code="AM" value="Amazonas">Amazonas</option>\
			<option data-code="BA" value="Bahia">Bahia</option>\
			<option data-code="CE" value="Ceará">Ceará</option>\
			<option data-code="DF" value="Distrito Federal">Distrito Federal</option>\
			<option data-code="ES" value="Espírito Santo">Espírito Santo</option>\
			<option data-code="GO" value="Goiás">Goiás</option>\
			<option data-code="MA" value="Maranhão">Maranhão</option>\
			<option data-code="MT" value="Mato Grosso">Mato Grosso</option>\
			<option data-code="MS" value="Mato Grosso do Sul">Mato Grosso do Sul</option>\
			<option data-code="MG" value="Minas Gerais">Minas Gerais</option>\
			<option data-code="PA" value="Pará">Pará</option>\
			<option data-code="PB" value="Paraíba">Paraíba</option>\
			<option data-code="PR" value="Paraná">Paraná</option>\
			<option data-code="PE" value="Pernambuco">Pernambuco</option>\
			<option data-code="PI" value="Piauí">Piauí</option>\
			<option data-code="RN" value="Rio Grande do Norte">Rio Grande do Norte</option>\
			<option data-code="RS" value="Rio Grande do Sul">Rio Grande do Sul</option>\
			<option data-code="RJ" value="Rio de Janeiro">Rio de Janeiro</option>\
			<option data-code="RO" value="Rondônia">Rondônia</option>\
			<option data-code="RR" value="Roraima">Roraima</option>\
			<option data-code="SC" value="Santa Catarina">Santa Catarina</option>\
			<option data-code="SP" value="São Paulo">São Paulo</option>\
			<option data-code="SE" value="Sergipe">Sergipe</option>\
			<option data-code="TO" value="Tocantins">Tocantins</option>';
var statesGT='<option data-code="AVE" value="Alta Verapaz">Alta Verapaz</option>\
			<option data-code="BVE" value="Baja Verapaz">Baja Verapaz</option>\
			<option data-code="CMT" value="Chimaltenango">Chimaltenango</option>\
			<option data-code="CQM" value="Chiquimula">Chiquimula</option>\
			<option data-code="EPR" value="El Progreso">El Progreso</option>\
			<option data-code="ESC" value="Escuintla">Escuintla</option>\
			<option data-code="GUA" value="Guatemala">Guatemala</option>\
			<option data-code="HUE" value="Huehuetenango">Huehuetenango</option>\
			<option data-code="IZA" value="Izabal">Izabal</option>\
			<option data-code="JAL" value="Jalapa">Jalapa</option>\
			<option data-code="JUT" value="Jutiapa">Jutiapa</option>\
			<option data-code="PET" value="Petén">Petén</option>\
			<option data-code="QUE" value="Quetzaltenango">Quetzaltenango</option>\
			<option data-code="QUI" value="Quiché">Quiché</option>\
			<option data-code="RET" value="Retalhuleu">Retalhuleu</option>\
			<option data-code="SAC" value="Sacatepéquez">Sacatepéquez</option>\
			<option data-code="SMA" value="San Marcos">San Marcos</option>\
			<option data-code="SRO" value="Santa Rosa">Santa Rosa</option>\
			<option data-code="SOL" value="Sololá">Sololá</option>\
			<option data-code="SUC" value="Suchitepéquez">Suchitepéquez</option>\
			<option data-code="TOT" value="Totonicapán">Totonicapán</option>\
			<option data-code="ZAC" value="Zacapa">Zacapa</option>';
var statesIN='<option data-code="AN" value="Andaman and Nicobar">Andaman and Nicobar</option>\
			<option data-code="AP" value="Andhra Pradesh">Andhra Pradesh</option>\
			<option data-code="AR" value="Arunachal Pradesh">Arunachal Pradesh</option>\
			<option data-code="AS" value="Assam">Assam</option>\
			<option data-code="BR" value="Bihar">Bihar</option>\
			<option data-code="CH" value="Chandigarh">Chandigarh</option>\
			<option data-code="CG" value="Chattisgarh">Chattisgarh</option>\
			<option data-code="DN" value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>\
			<option data-code="DD" value="Daman and Diu">Daman and Diu</option>\
			<option data-code="DL" value="Delhi">Delhi</option>\
			<option data-code="GA" value="Goa">Goa</option>\
			<option data-code="GJ" value="Gujarat">Gujarat</option>\
			<option data-code="HR" value="Haryana">Haryana</option>\
			<option data-code="HP" value="Himachal Pradesh">Himachal Pradesh</option>\
			<option data-code="JK" value="Jammu and Kashmir">Jammu and Kashmir</option>\
			<option data-code="JH" value="Jharkhand">Jharkhand</option>\
			<option data-code="KA" value="Karnataka">Karnataka</option>\
			<option data-code="KL" value="Kerala">Kerala</option>\
			<option data-code="LD" value="Lakshadweep">Lakshadweep</option>\
			<option data-code="MP" value="Madhya Pradesh">Madhya Pradesh</option>\
			<option data-code="MH" value="Maharashtra">Maharashtra</option>\
			<option data-code="MN" value="Manipur">Manipur</option>\
			<option data-code="ML" value="Meghalaya">Meghalaya</option>\
			<option data-code="MZ" value="Mizoram">Mizoram</option>\
			<option data-code="NL" value="Nagaland">Nagaland</option>\
			<option data-code="OR" value="Orissa">Orissa</option>\
			<option data-code="PY" value="Puducherry">Puducherry</option>\
			<option data-code="PB" value="Punjab">Punjab</option>\
			<option data-code="RJ" value="Rajasthan">Rajasthan</option>\
			<option data-code="SK" value="Sikkim">Sikkim</option>\
			<option data-code="TN" value="Tamil Nadu">Tamil Nadu</option>\
			<option data-code="TS" value="Telangana">Telangana</option>\
			<option data-code="TR" value="Tripura">Tripura</option>\
			<option data-code="UP" value="Uttar Pradesh">Uttar Pradesh</option>\
			<option data-code="UK" value="Uttarakhand">Uttarakhand</option>\
			<option data-code="WB" value="West Bengal">West Bengal</option>';
var statesIT='<option data-code="AG" value="Agrigento">Agrigento</option>\
			<option data-code="AL" value="Alessandria">Alessandria</option>\
			<option data-code="AN" value="Ancona">Ancona</option>\
			<option data-code="AO" value="Aosta">Aosta</option>\
			<option data-code="AR" value="Arezzo">Arezzo</option>\
			<option data-code="AP" value="Ascoli Piceno">Ascoli Piceno</option>\
			<option data-code="AT" value="Asti">Asti</option>\
			<option data-code="AV" value="Avellino">Avellino</option>\
			<option data-code="BA" value="Bari">Bari</option>\
			<option data-code="BT" value="Barletta-Andria-Trani">Barletta-Andria-Trani</option>\
			<option data-code="BL" value="Belluno">Belluno</option>\
			<option data-code="BN" value="Benevento">Benevento</option>\
			<option data-code="BG" value="Bergamo">Bergamo</option>\
			<option data-code="BI" value="Biella">Biella</option>\
			<option data-code="BO" value="Bologna">Bologna</option>\
			<option data-code="BZ" value="Bolzano">Bolzano</option>\
			<option data-code="BS" value="Brescia">Brescia</option>\
			<option data-code="BR" value="Brindisi">Brindisi</option>\
			<option data-code="CA" value="Cagliari">Cagliari</option>\
			<option data-code="CL" value="Caltanissetta">Caltanissetta</option>\
			<option data-code="CB" value="Campobasso">Campobasso</option>\
			<option data-code="CI" value="Carbonia-Iglesias">Carbonia-Iglesias</option>\
			<option data-code="CE" value="Caserta">Caserta</option>\
			<option data-code="CT" value="Catania">Catania</option>\
			<option data-code="CZ" value="Catanzaro">Catanzaro</option>\
			<option data-code="CH" value="Chieti">Chieti</option>\
			<option data-code="CO" value="Como">Como</option>\
			<option data-code="CS" value="Cosenza">Cosenza</option>\
			<option data-code="CR" value="Cremona">Cremona</option>\
			<option data-code="KR" value="Crotone">Crotone</option>\
			<option data-code="CN" value="Cuneo">Cuneo</option>\
			<option data-code="EN" value="Enna">Enna</option>\
			<option data-code="FM" value="Fermo">Fermo</option>\
			<option data-code="FE" value="Ferrara">Ferrara</option>\
			<option data-code="FI" value="Firenze">Firenze</option>\
			<option data-code="FG" value="Foggia">Foggia</option>\
			<option data-code="FC" value="Forlì-Cesena">Forlì-Cesena</option>\
			<option data-code="FR" value="Frosinone">Frosinone</option>\
			<option data-code="GE" value="Genova">Genova</option>\
			<option data-code="GO" value="Gorizia">Gorizia</option>\
			<option data-code="GR" value="Grosseto">Grosseto</option>\
			<option data-code="IM" value="Imperia">Imperia</option>\
			<option data-code="IS" value="Isernia">Isernia</option>\
			<option data-code="AQ" value="L\'Aquila">L\'Aquila</option>\
			<option data-code="SP" value="La Spezia">La Spezia</option>\
			<option data-code="LT" value="Latina">Latina</option>\
			<option data-code="LE" value="Lecce">Lecce</option>\
			<option data-code="LC" value="Lecco">Lecco</option>\
			<option data-code="LI" value="Livorno">Livorno</option>\
			<option data-code="LO" value="Lodi">Lodi</option>\
			<option data-code="LU" value="Lucca">Lucca</option>\
			<option data-code="MC" value="Macerata">Macerata</option>\
			<option data-code="MN" value="Mantova">Mantova</option>\
			<option data-code="MS" value="Massa-Carrara">Massa-Carrara</option>\
			<option data-code="MT" value="Matera">Matera</option>\
			<option data-code="VS" value="Medio Campidano">Medio Campidano</option>\
			<option data-code="ME" value="Messina">Messina</option>\
			<option data-code="MI" value="Milano">Milano</option>\
			<option data-code="MO" value="Modena">Modena</option>\
			<option data-code="MB" value="Monza e Brianza">Monza e Brianza</option>\
			<option data-code="NA" value="Napoli">Napoli</option>\
			<option data-code="NO" value="Novara">Novara</option>\
			<option data-code="NU" value="Nuoro">Nuoro</option>\
			<option data-code="OG" value="Ogliastra">Ogliastra</option>\
			<option data-code="OT" value="Olbia-Tempio">Olbia-Tempio</option>\
			<option data-code="OR" value="Oristano">Oristano</option>\
			<option data-code="PD" value="Padova">Padova</option>\
			<option data-code="PA" value="Palermo">Palermo</option>\
			<option data-code="PR" value="Parma">Parma</option>\
			<option data-code="PV" value="Pavia">Pavia</option>\
			<option data-code="PG" value="Perugia">Perugia</option>\
			<option data-code="PU" value="Pesaro e Urbino">Pesaro e Urbino</option>\
			<option data-code="PE" value="Pescara">Pescara</option>\
			<option data-code="PC" value="Piacenza">Piacenza</option>\
			<option data-code="PI" value="Pisa">Pisa</option>\
			<option data-code="PT" value="Pistoia">Pistoia</option>\
			<option data-code="PN" value="Pordenone">Pordenone</option>\
			<option data-code="PZ" value="Potenza">Potenza</option>\
			<option data-code="PO" value="Prato">Prato</option>\
			<option data-code="RG" value="Ragusa">Ragusa</option>\
			<option data-code="RA" value="Ravenna">Ravenna</option>\
			<option data-code="RC" value="Reggio Calabria">Reggio Calabria</option>\
			<option data-code="RE" value="Reggio Emilia">Reggio Emilia</option>\
			<option data-code="RI" value="Rieti">Rieti</option>\
			<option data-code="RN" value="Rimini">Rimini</option>\
			<option data-code="RM" value="Roma">Roma</option>\
			<option data-code="RO" value="Rovigo">Rovigo</option>\
			<option data-code="SA" value="Salerno">Salerno</option>\
			<option data-code="SS" value="Sassari">Sassari</option>\
			<option data-code="SV" value="Savona">Savona</option>\
			<option data-code="SI" value="Siena">Siena</option>\
			<option data-code="SR" value="Siracusa">Siracusa</option>\
			<option data-code="SO" value="Sondrio">Sondrio</option>\
			<option data-code="TA" value="Taranto">Taranto</option>\
			<option data-code="TE" value="Teramo">Teramo</option>\
			<option data-code="TR" value="Terni">Terni</option>\
			<option data-code="TO" value="Torino">Torino</option>\
			<option data-code="TP" value="Trapani">Trapani</option>\
			<option data-code="TN" value="Trento">Trento</option>\
			<option data-code="TV" value="Treviso">Treviso</option>\
			<option data-code="TS" value="Trieste">Trieste</option>\
			<option data-code="UD" value="Udine">Udine</option>\
			<option data-code="VA" value="Varese">Varese</option>\
			<option data-code="VE" value="Venezia">Venezia</option>\
			<option data-code="VB" value="Verbano-Cusio-Ossola">Verbano-Cusio-Ossola</option>\
			<option data-code="VC" value="Vercelli">Vercelli</option>\
			<option data-code="VR" value="Verona">Verona</option>\
			<option data-code="VV" value="Vibo Valentia">Vibo Valentia</option>\
			<option data-code="VI" value="Vicenza">Vicenza</option>\
			<option data-code="VT" value="Viterbo">Viterbo</option>';
var statesMX='<option data-code="AGS" value="Aguascalientes">Aguascalientes</option>\
			<option data-code="BC" value="Baja California">Baja California</option>\
			<option data-code="BCS" value="Baja California Sur">Baja California Sur</option>\
			<option data-code="CAMP" value="Campeche">Campeche</option>\
			<option data-code="CHIS" value="Chiapas">Chiapas</option>\
			<option data-code="CHIH" value="Chihuahua">Chihuahua</option>\
			<option data-code="COAH" value="Coahuila">Coahuila</option>\
			<option data-code="COL" value="Colima">Colima</option>\
			<option data-code="DF" value="Distrito Federal">Distrito Federal</option>\
			<option data-code="DGO" value="Durango">Durango</option>\
			<option data-code="GTO" value="Guanajuato">Guanajuato</option>\
			<option data-code="GRO" value="Guerrero">Guerrero</option>\
			<option data-code="HGO" value="Hidalgo">Hidalgo</option>\
			<option data-code="JAL" value="Jalisco">Jalisco</option>\
			<option data-code="MEX" value="México">México</option>\
			<option data-code="MICH" value="Michoacán">Michoacán</option>\
			<option data-code="MOR" value="Morelos">Morelos</option>\
			<option data-code="NAY" value="Nayarit">Nayarit</option>\
			<option data-code="NL" value="Nuevo León">Nuevo León</option>\
			<option data-code="OAx" value="Oaxaca">Oaxaca</option>\
			<option data-code="PUE" value="Puebla">Puebla</option>\
			<option data-code="QRO" value="Querétaro">Querétaro</option>\
			<option data-code="Q ROO" value="Quintana Roo">Quintana Roo</option>\
			<option data-code="SLP" value="San Luis Potosí">San Luis Potosí</option>\
			<option data-code="SIN" value="Sinaloa">Sinaloa</option>\
			<option data-code="SON" value="Sonora">Sonora</option>\
			<option data-code="TAB" value="Tabasco">Tabasco</option>\
			<option data-code="TAMPS" value="Tamaulipas">Tamaulipas</option>\
			<option data-code="TLAX" value="Tlaxcala">Tlaxcala</option>\
			<option data-code="VER" value="Veracruz">Veracruz</option>\
			<option data-code="YUC" value="Yucatán">Yucatán</option>\
			<option data-code="ZAC" value="Zacatecas">Zacatecas</option>';
var statesNZ='<option data-code="AUK" value="Auckland">Auckland</option>\
			<option data-code="BOP" value="Bay of Plenty">Bay of Plenty</option>\
			<option data-code="CAN" value="Canterbury">Canterbury</option>\
			<option data-code="GIS" value="Gisborne">Gisborne</option>\
			<option data-code="HKB" value="Hawke\'s Bay">Hawke\'s Bay</option>\
			<option data-code="MWT" value="Manawatu-Wanganui">Manawatu-Wanganui</option>\
			<option data-code="MBH" value="Marlborough">Marlborough</option>\
			<option data-code="NSN" value="Nelson">Nelson</option>\
			<option data-code="NTL" value="Northland">Northland</option>\
			<option data-code="OTA" value="Otago">Otago</option>\
			<option data-code="STL" value="Southland">Southland</option>\
			<option data-code="TKI" value="Taranaki">Taranaki</option>\
			<option data-code="TAS" value="Tasman">Tasman</option>\
			<option data-code="WKO" value="Waikato">Waikato</option>\
			<option data-code="WGN" value="Wellington">Wellington</option>\
			<option data-code="WTC" value="West Coast">West Coast</option>';
var statesPT='<option data-code="PT-20" value="Açores">Açores</option>\
			<option data-code="PT-01" value="Aveiro">Aveiro</option>\
			<option data-code="PT-02" value="Beja">Beja</option>\
			<option data-code="PT-03" value="Braga">Braga</option>\
			<option data-code="PT-04" value="Bragança">Bragança</option>\
			<option data-code="PT-05" value="Castelo Branco">Castelo Branco</option>\
			<option data-code="PT-06" value="Coimbra">Coimbra</option>\
			<option data-code="PT-07" value="Évora">Évora</option>\
			<option data-code="PT-08" value="Faro">Faro</option>\
			<option data-code="PT-09" value="Guarda">Guarda</option>\
			<option data-code="PT-10" value="Leiria">Leiria</option>\
			<option data-code="PT-11" value="Lisboa">Lisboa</option>\
			<option data-code="PT-30" value="Madeira">Madeira</option>\
			<option data-code="PT-12" value="Portalegre">Portalegre</option>\
			<option data-code="PT-13" value="Porto">Porto</option>\
			<option data-code="PT-14" value="Santarém">Santarém</option>\
			<option data-code="PT-15" value="Setúbal">Setúbal</option>\
			<option data-code="PT-16" value="Viana do Castelo">Viana do Castelo</option>\
			<option data-code="PT-17" value="Vila Real">Vila Real</option>\
			<option data-code="PT-18" value="Viseu">Viseu</option>';
var statesRU='<option data-code="ALT" value="Altai Krai">Altai Krai</option>\
			<option data-code="AL" value="Altai Republic">Altai Republic</option>\
			<option data-code="AMU" value="Amur Oblast">Amur Oblast</option>\
			<option data-code="ARK" value="Arkhangelsk Oblast">Arkhangelsk Oblast</option>\
			<option data-code="AST" value="Astrakhan Oblast">Astrakhan Oblast</option>\
			<option data-code="BEL" value="Belgorod Oblast">Belgorod Oblast</option>\
			<option data-code="BRY" value="Bryansk Oblast">Bryansk Oblast</option>\
			<option data-code="CE" value="Chechen Republic">Chechen Republic</option>\
			<option data-code="CHE" value="Chelyabinsk Oblast">Chelyabinsk Oblast</option>\
			<option data-code="CHU" value="Chukotka Autonomous Okrug">Chukotka Autonomous Okrug</option>\
			<option data-code="CU" value="Chuvash Republic">Chuvash Republic</option>\
			<option data-code="IRK" value="Irkutsk Oblast">Irkutsk Oblast</option>\
			<option data-code="IVA" value="Ivanovo Oblast">Ivanovo Oblast</option>\
			<option data-code="YEV" value="Jewish Autonomous Oblast">Jewish Autonomous Oblast</option>\
			<option data-code="KB" value="Kabardino-Balkarian Republic">Kabardino-Balkarian Republic</option>\
			<option data-code="KGD" value="Kaliningrad Oblast">Kaliningrad Oblast</option>\
			<option data-code="KLU" value="Kaluga Oblast">Kaluga Oblast</option>\
			<option data-code="KAM" value="Kamchatka Krai">Kamchatka Krai</option>\
			<option data-code="KC" value="Karachay–Cherkess Republic">Karachay–Cherkess Republic</option>\
			<option data-code="KEM" value="Kemerovo Oblast">Kemerovo Oblast</option>\
			<option data-code="KHA" value="Khabarovsk Krai">Khabarovsk Krai</option>\
			<option data-code="KHM" value="Khanty-Mansi Autonomous Okrug">Khanty-Mansi Autonomous Okrug</option>\
			<option data-code="KIR" value="Kirov Oblast">Kirov Oblast</option>\
			<option data-code="KO" value="Komi Republic">Komi Republic</option>\
			<option data-code="KOS" value="Kostroma Oblast">Kostroma Oblast</option>\
			<option data-code="KDA" value="Krasnodar Krai">Krasnodar Krai</option>\
			<option data-code="KYA" value="Krasnoyarsk Krai">Krasnoyarsk Krai</option>\
			<option data-code="KGN" value="Kurgan Oblast">Kurgan Oblast</option>\
			<option data-code="KRS" value="Kursk Oblast">Kursk Oblast</option>\
			<option data-code="LEN" value="Leningrad Oblast">Leningrad Oblast</option>\
			<option data-code="LIP" value="Lipetsk Oblast">Lipetsk Oblast</option>\
			<option data-code="MAG" value="Magadan Oblast">Magadan Oblast</option>\
			<option data-code="ME" value="Mari El Republic">Mari El Republic</option>\
			<option data-code="MOW" value="Moscow">Moscow</option>\
			<option data-code="MOS" value="Moscow Oblast">Moscow Oblast</option>\
			<option data-code="MUR" value="Murmansk Oblast">Murmansk Oblast</option>\
			<option data-code="NIZ" value="Nizhny Novgorod Oblast">Nizhny Novgorod Oblast</option>\
			<option data-code="NGR" value="Novgorod Oblast">Novgorod Oblast</option>\
			<option data-code="NVS" value="Novosibirsk Oblast">Novosibirsk Oblast</option>\
			<option data-code="OMS" value="Omsk Oblast">Omsk Oblast</option>\
			<option data-code="ORE" value="Orenburg Oblast">Orenburg Oblast</option>\
			<option data-code="ORL" value="Oryol Oblast">Oryol Oblast</option>\
			<option data-code="PNZ" value="Penza Oblast">Penza Oblast</option>\
			<option data-code="PER" value="Perm Krai">Perm Krai</option>\
			<option data-code="PRI" value="Primorsky Krai">Primorsky Krai</option>\
			<option data-code="PSK" value="Pskov Oblast">Pskov Oblast</option>\
			<option data-code="AD" value="Republic of Adygeya">Republic of Adygeya</option>\
			<option data-code="BA" value="Republic of Bashkortostan">Republic of Bashkortostan</option>\
			<option data-code="BU" value="Republic of Buryatia">Republic of Buryatia</option>\
			<option data-code="DA" value="Republic of Dagestan">Republic of Dagestan</option>\
			<option data-code="IN" value="Republic of Ingushetia">Republic of Ingushetia</option>\
			<option data-code="KL" value="Republic of Kalmykia">Republic of Kalmykia</option>\
			<option data-code="KR" value="Republic of Karelia">Republic of Karelia</option>\
			<option data-code="KK" value="Republic of Khakassia">Republic of Khakassia</option>\
			<option data-code="MO" value="Republic of Mordovia">Republic of Mordovia</option>\
			<option data-code="SE" value="Republic of North Ossetia–Alania">Republic of North Ossetia–Alania</option>\
			<option data-code="TA" value="Republic of Tatarstan">Republic of Tatarstan</option>\
			<option data-code="ROS" value="Rostov Oblast">Rostov Oblast</option>\
			<option data-code="RYA" value="Ryazan Oblast">Ryazan Oblast</option>\
			<option data-code="SPE" value="Saint Petersburg">Saint Petersburg</option>\
			<option data-code="SA" value="Sakha Republic (Yakutia)">Sakha Republic (Yakutia)</option>\
			<option data-code="SAK" value="Sakhalin Oblast">Sakhalin Oblast</option>\
			<option data-code="SAM" value="Samara Oblast">Samara Oblast</option>\
			<option data-code="SAR" value="Saratov Oblast">Saratov Oblast</option>\
			<option data-code="SMO" value="Smolensk Oblast">Smolensk Oblast</option>\
			<option data-code="STA" value="Stavropol Krai">Stavropol Krai</option>\
			<option data-code="SVE" value="Sverdlovsk Oblast">Sverdlovsk Oblast</option>\
			<option data-code="TAM" value="Tambov Oblast">Tambov Oblast</option>\
			<option data-code="TOM" value="Tomsk Oblast">Tomsk Oblast</option>\
			<option data-code="TUL" value="Tula Oblast">Tula Oblast</option>\
			<option data-code="TVE" value="Tver Oblast">Tver Oblast</option>\
			<option data-code="TYU" value="Tyumen Oblast">Tyumen Oblast</option>\
			<option data-code="TY" value="Tyva Republic">Tyva Republic</option>\
			<option data-code="UD" value="Udmurtia">Udmurtia</option>\
			<option data-code="ULY" value="Ulyanovsk Oblast">Ulyanovsk Oblast</option>\
			<option data-code="VLA" value="Vladimir Oblast">Vladimir Oblast</option>\
			<option data-code="VGG" value="Volgograd Oblast">Volgograd Oblast</option>\
			<option data-code="VLG" value="Vologda Oblast">Vologda Oblast</option>\
			<option data-code="VOR" value="Voronezh Oblast">Voronezh Oblast</option>\
			<option data-code="YAN" value="Yamalo-Nenets Autonomous Okrug">Yamalo-Nenets Autonomous Okrug</option>\
			<option data-code="YAR" value="Yaroslavl Oblast">Yaroslavl Oblast</option>\
			<option data-code="ZAB" value="Zabaykalsky Krai">Zabaykalsky Krai</option>';
var statesZA='<option data-code="EC" value="Eastern Cape">Eastern Cape</option>\
			<option data-code="FS" value="Free State">Free State</option>\
			<option data-code="GT" value="Gauteng">Gauteng</option>\
			<option data-code="NL" value="KwaZulu-Natal">KwaZulu-Natal</option>\
			<option data-code="LP" value="Limpopo">Limpopo</option>\
			<option data-code="MP" value="Mpumalanga">Mpumalanga</option>\
			<option data-code="NW" value="North West">North West</option>\
			<option data-code="NC" value="Northern Cape">Northern Cape</option>\
			<option data-code="WC" value="Western Cape">Western Cape</option>';
var statesKR='<option data-code="KR-26" value="Busan">Busan</option>\
			<option data-code="KR-43" value="Chungbuk">Chungbuk</option>\
			<option data-code="KR-44" value="Chungnam">Chungnam</option>\
			<option data-code="KR-27" value="Daegu">Daegu</option>\
			<option data-code="KR-30" value="Daejeon">Daejeon</option>\
			<option data-code="KR-42" value="Gangwon">Gangwon</option>\
			<option data-code="KR-29" value="Gwangju">Gwangju</option>\
			<option data-code="KR-47" value="Gyeongbuk">Gyeongbuk</option>\
			<option data-code="KR-41" value="Gyeonggi">Gyeonggi</option>\
			<option data-code="KR-48" value="Gyeongnam">Gyeongnam</option>\
			<option data-code="KR-28" value="Incheon">Incheon</option>\
			<option data-code="KR-49" value="Jeju">Jeju</option>\
			<option data-code="KR-45" value="Jeonbuk">Jeonbuk</option>\
			<option data-code="KR-46" value="Jeonnam">Jeonnam</option>\
			<option data-code="KR-50" value="Sejong">Sejong</option>\
			<option data-code="KR-11" value="Seoul">Seoul</option>\
			<option data-code="KR-31" value="Ulsan">Ulsan</option>';
var statesES='<option data-code="C" value="A Coruña">A Coruña</option>\
			<option data-code="VI" value="Álava">Álava</option>\
			<option data-code="AB" value="Albacete">Albacete</option>\
			<option data-code="A" value="Alicante">Alicante</option>\
			<option data-code="AL" value="Almería">Almería</option>\
			<option data-code="O" value="Asturias">Asturias</option>\
			<option data-code="AV" value="Ávila">Ávila</option>\
			<option data-code="BA" value="Badajoz">Badajoz</option>\
			<option data-code="PM" value="Balears">Balears</option>\
			<option data-code="B" value="Barcelona">Barcelona</option>\
			<option data-code="BU" value="Burgos">Burgos</option>\
			<option data-code="CC" value="Cáceres">Cáceres</option>\
			<option data-code="CA" value="Cádiz">Cádiz</option>\
			<option data-code="S" value="Cantabria">Cantabria</option>\
			<option data-code="CS" value="Castellón">Castellón</option>\
			<option data-code="CE" value="Ceuta">Ceuta</option>\
			<option data-code="CR" value="Ciudad Real">Ciudad Real</option>\
			<option data-code="CO" value="Córdoba">Córdoba</option>\
			<option data-code="CU" value="Cuenca">Cuenca</option>\
			<option data-code="GI" value="Girona">Girona</option>\
			<option data-code="GR" value="Granada">Granada</option>\
			<option data-code="GU" value="Guadalajara">Guadalajara</option>\
			<option data-code="SS" value="Guipúzcoa">Guipúzcoa</option>\
			<option data-code="H" value="Huelva">Huelva</option>\
			<option data-code="HU" value="Huesca">Huesca</option>\
			<option data-code="J" value="Jaén">Jaén</option>\
			<option data-code="LO" value="La Rioja">La Rioja</option>\
			<option data-code="GC" value="Las Palmas">Las Palmas</option>\
			<option data-code="LE" value="León">León</option>\
			<option data-code="L" value="Lleida">Lleida</option>\
			<option data-code="LU" value="Lugo">Lugo</option>\
			<option data-code="M" value="Madrid">Madrid</option>\
			<option data-code="MA" value="Málaga">Málaga</option>\
			<option data-code="ML" value="Melilla">Melilla</option>\
			<option data-code="MU" value="Murcia">Murcia</option>\
			<option data-code="NA" value="Navarra">Navarra</option>\
			<option data-code="OR" value="Ourense">Ourense</option>\
			<option data-code="P" value="Palencia">Palencia</option>\
			<option data-code="PO" value="Pontevedra">Pontevedra</option>\
			<option data-code="SA" value="Salamanca">Salamanca</option>\
			<option data-code="TF" value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>\
			<option data-code="SG" value="Segovia">Segovia</option>\
			<option data-code="SE" value="Sevilla">Sevilla</option>\
			<option data-code="SO" value="Soria">Soria</option>\
			<option data-code="T" value="Tarragona">Tarragona</option>\
			<option data-code="TE" value="Teruel">Teruel</option>\
			<option data-code="TO" value="Toledo">Toledo</option>\
			<option data-code="V" value="Valencia">Valencia</option>\
			<option data-code="VA" value="Valladolid">Valladolid</option>\
			<option data-code="BI" value="Vizcaya">Vizcaya</option>\
			<option data-code="ZA" value="Zamora">Zamora</option>\
			<option data-code="Z" value="Zaragoza">Zaragoza</option>';
var statesAE='<option data-code="AZ" value="Abu Dhabi">Abu Dhabi</option>\
			<option data-code="AJ" value="Ajman">Ajman</option>\
			<option data-code="DU" value="Dubai">Dubai</option>\
			<option data-code="FU" value="Fujairah">Fujairah</option>\
			<option data-code="RK" value="Ras al-Khaimah">Ras al-Khaimah</option>\
			<option data-code="SH" value="Sharjah">Sharjah</option>\
			<option data-code="UQ" value="Umm al-Quwain">Umm al-Quwain</option>';
function setStates()
{
	var state = document.getElementById("billCountry").value;
	var statesNotAvailable='<option value="" disabled="disabled"></option>';
	switch(state)
	{
		case "United States": $("#billState").html(statesUS); 	break;
		case "Canada": $("#billState").html(statesCA); 	break;
		case "Australia": $("#billState").html(statesAU); 	break;
		case "Argentina": $("#billState").html(statesAR); 	break;
		case "Brazil": $("#billState").html(statesBR); 	break;
		case "Guatemala": $("#billState").html(statesGT); 	break;
		case "India": $("#billState").html(statesIN); 	break;
		case "Italy": $("#billState").html(statesIT); 	break;
		case "Mexico": $("#billState").html(statesMX); 	break;
		case "New Zealand": $("#billState").html(statesNZ); 	break;
		case "Portugal": $("#billState").html(statesPT); 	break;
		case "Russia": $("#billState").html(statesRU); 	break;
		case "South Africa": $("#billState").html(statesZA); 	break;
		case "South Korea": $("#billState").html(statesKR); 	break;
		case "Spain": $("#billState").html(statesES); 	break;
		case "United Arab Emirates": $("#billState").html(statesAE); 	break;
		default:$("#billState").html(statesNotAvailable);
	}	
}
