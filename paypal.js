chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
        //basic variables
		var old_size = response.shoesSize;
		var	TIMEOUT_SETTING = response.timeOut;
        var delayInterval = TIMEOUT_SETTING;
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;
        
        //billing address
        var billCountry = response.billCountry;
        var billFirstName = response.billFirstName;
        var billLastName = response.billLastName;
        var billStreetAddress1 = response.billStreetAddress1;
        var billStreetAddress2 = response.billStreetAddress2;
        var billZipCode = response.billZipCode;
        var billCity = response.billCity;
        var billState = response.billState;
        var billPhone = response.billPhone;
        var billEmail = response.billEmail;

        //shipping address
        var shippingAddress = response.shippingAddress;
        var shipCountry = response.newCountry;
        var shipFirstName = response.newFirstName;
        var shipLastName = response.newLastName;
        var shipStreetAddress1 = response.newStreetAddress1;
        var shipStreetAddress2 = response.newStreetAddress2;
        var shipZipCode = response.newZipCode;
        var shipCity = response.newCity;
        var shipState = response.newState;
        var shipPhone = response.newPhone;
        var shipEmail = response.newEmail;
        
        //payment method
        var paymentMethod = response.paymentMethod;
        var paymentCard = response.paymentCard;
        var cardNumber = response.cardNumber;
        var expireMonth = response.expireMonth;
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
		$(function(){ 
            v = setInterval(function(){  
                    if($(".baslLoginButtonContainer").is(":visible")){
						clearInterval(v);
						document.getElementsByClassName("baslLoginButtonContainer")[0].getElementsByTagName("a")[0].click();
                    }
            },1000); 
			
            v1 = setInterval(function(){ 
				if($("#email").is(":visible")){
					clearInterval(v1);						
					$("#email").val(paypalEmail)
					$("#btnNext").click();                            
				}
            },500);
            v3 = setInterval(function(){ 
				if($("#password").is(":visible")){
                    if($(".notification-critical").is(":visible"))
					{
						clearInterval(v3);
					}else
					{
                        clearInterval(v3);						
						$("#password").val(paypalPassword)
						$("#btnLogin").click();  
					}					
				}
            },1000);
			
            v2 = setInterval(function(){ 
                try{  
                    if($("#continue_abovefold").is(":visible")){ 
                        var timeout = window.setTimeout(function() {
                            $("#continue_abovefold").click();
                            clearInterval(v2);
                        }, 1000);	//continue_abovefold
                    }
                }catch(err){}
            },1000);             
		});
	}
});                    