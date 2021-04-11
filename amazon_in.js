chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if((response.action == 'true')){
		var	size = response.shoesSize;
		var	quantity = response.quantity;
		var	size2 = response.size2;
		var	keywords = response.keywords;
        var refreshInterval = response.timeOut;    
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;
        var	low = response.low;
		var	high = response.high;
		var username2 = response.username2;
		var password2 = response.password2;
		
		var AccountBilling = response.AccountBilling;
        var billCountry = response.billCountry;
        var billFirstName = response.billFirstName;
        var billLastName = response.billLastName;
        var billStreetAddress1 = response.billStreetAddress1;
        var billStreetAddress2 = response.billStreetAddress2;
        var billZipCode = response.billZipCode;
        var billCity = response.billCity;
        var billState = response.billState;
        var billPhone = response.billPhone;
		var AddressType=response.AdT;
        var billEmail = response.billEmail;
        var billStateKythnyc = response.billStateKythnyc;
        var shipStateKythnyc = response.newStateKythnyc; 

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
        
        var paymentMethod = response.paymentMethod;
		var bank=response.bank;
        var paymentCard = response.paymentCard;
        var cardNumber = response.cardNumber;
        var expireMonth = response.expireMonth;
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
        var cardHolderName = response.cardHolderName;

		$(function(){
            var refresh=true;  
            try{
				keywords= keywords.trim();
				keywords=keywords.split(",");
			}catch(err){}
			try{
				if(size.match('custom'))
				{
					size=size2;
				}
				size=size.trim().toLowerCase();
				size=size;
			}catch(err){}
            v0 = setInterval(function(){
				if($(".s-result-list").is(":visible")){
					clearInterval(v0);
					try{
						var a = document.getElementsByClassName("s-result-list")[0].getElementsByClassName("s-result-item");
						for(var i=0; i<a.length ; i++){
							var b = a[i].textContent.trim();
							var c = a[i].getElementsByClassName("a-offscreen")[0].textContent.trim();
							var r =c.substr(1);
							if(r.match(",")){
								var r = r.replace(',','');
							}
							for(var j=0; j<keywords.length;j++){
								if(b.match(new RegExp(keywords[j], "i"))){			
									if((low<=r&& high>=r) || (low==0 && high==0)){
										a[i].getElementsByTagName('a')[0].click();
										return;
									}
								}									
							}								
						}
					}catch(err){}			
					setTimeout(function(){
						location.reload();
					}, refreshInterval); 										
				}
			}, 2000);
			
			v01=setInterval(function() {
				try{
					if($("#mainResults").is(":visible")){					
						clearInterval(v01);
						var a=document.getElementById("mainResults").getElementsByClassName("s-result-item");
						for(var i=0; i<a.length ; i++){
							var b=a[i].getElementsByTagName("h2")[0].textContent;
							for(var j=0; j<keywords.length; j++){	
								if(b.match(new RegExp(keywords[j], "i"))){
									a[i].getElementsByTagName("a")[0].click();
									return;
								}
							}
						}						
						setTimeout(function(){
							location.reload();
						}, refreshInterval);					
					}
				}catch(err){console.log(err)}
			},100);
			
			/*v02=setInterval(function() {
				try{
					if($("#centerCol").is(":visible")){
						clearInterval(v02);							
							if(!document.getElementsByClassName("a-size-medium")[0].textContent.match("Currently unavailable")){
								if($("#native_dropdown_selected_size_name").is(":visible")){
									var a=document.getElementById("native_dropdown_selected_size_name");
									for(var i=0; i<a.options.length; i++){
										var b=a.options[i].textContent.trim().toLowerCase();								
										if(b==size){
											a.options[i].selected=true;
											a.dispatchEvent(new Event('change', {bubbles: true }));	
											return;	
										}								
									}
								}else{
									document.getElementById("add-to-cart-button").click();
									return;
								}
							}						
						setTimeout(function(){
							location.reload();
						}, refreshInterval);		
					}
				}catch(err){console.log(err)}
			},100);*/
			v02=setInterval(function() {
				if($("#submit\\.add-to-cart").is(":visible")){						
					try{
						clearInterval(v02);
						if($("#quantity").is(":visible")){
								var q = document.getElementById("quantity");								
								for(var j=0; j<q.options.length; j++){
									if(q.options[j].value==quantity){
										q.options[j].selected=true;
										q.dispatchEvent(new Event('change', {bubbles: true }));	
										break;
									}
								}
							}
						if($("#native_dropdown_selected_size_name").is(":visible")){							
							var c=document.getElementById("native_dropdown_selected_size_name");
							for(var i=0; i<c.length; i++){
								if(c.options[i].textContent.trim().toLowerCase()==size){
									c.options[i].selected=true;
									c.dispatchEvent(new Event('change', { bubbles: true }));
									document.getElementById("add-to-cart-button").click();
									return;
								}
							}
						}else{
							document.getElementById("add-to-cart-button").click();
							return;
						}												
					}catch(err){console.log(err)}
					setTimeout(function(){
						location.reload();
					}, refreshInterval);		
				}				
			},100);
			v3=setInterval(function () {
				try{
					if($("#soldByThirdParty").is(":visible")){
						clearInterval(v3);
						document.getElementById("add-to-cart-button").click();									
					}
				}catch(err){console.log(err)}
			},100);	
			
			v03=setInterval(function () {
				if($("#hlb-ptc-btn-native").is(":visible")){
					clearInterval(v03);
					$("#hlb-ptc-btn-native").click();
				}
			},100);
			
			v04=setInterval(function () {
				if($("#hlb-view-cart-announce").is(":visible")){
					clearInterval(v04);
					document.getElementById("hlb-view-cart-announce").click();
				}
			},100);
				
            if(autocheckoutselect==="yes"){				
				v21 = setInterval(function () {
					if($("[value='Proceed to checkout']").is(":visible")){										
						clearInterval(v21);
						$("[value='Proceed to checkout']").click();						
					}
				},10);
				
                v4 = setInterval(function(){ 
					if($("#ap_email").is(":visible")){
						try{
							clearInterval(v4);
							$("#ap_email").val(username2);
							document.getElementsByName("email")[0].dispatchEvent(new Event('change', { bubbles: true }));							
							document.getElementsByClassName("a-button-input")[0].click();							
						}catch(err){console.log(err)}						
					}
				},100);	
				
				v41 = setInterval(function(){ 
					if($("#ap_password").is(":visible")){
						try{
							clearInterval(v41);
							$("#ap_password").val(password2);
							document.getElementsByName("password")[0].dispatchEvent(new Event('change', { bubbles: true }));
							setTimeout(function(){
								document.getElementById("signInSubmit").click(function(){
								});
							},500);
						}catch(err){console.log(err)}						
					}
				},100);	
							
                v5 = setInterval(function(){ 
                    try{  
                        if ($("#enterAddressFullName").is(":visible") && !$(".address-book-entry").is(":visible")) {
							clearInterval(v5);
							$("#enterAddressCountryCode").val(shipCountry);
							$("#enterAddressFullName").val(shipFirstName);							
							document.getElementsByName("enterAddressFullName")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressAddressLine1").val(shipStreetAddress1);
							document.getElementsByName("enterAddressAddressLine1")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressAddressLine2").val(shipStreetAddress2);
							document.getElementsByName("enterAddressAddressLine2")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressCity").val(shipCity);
							document.getElementsByName("enterAddressCity")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressStateOrRegion").val(shipState);
							document.getElementsByName("enterAddressStateOrRegion")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressPostalCode").val(shipZipCode);
							document.getElementsByName("enterAddressPostalCode")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#enterAddressPhoneNumber").val(shipPhone);
							document.getElementsByName("enterAddressPhoneNumber")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("#AddressType").val(AddressType);
							document.getElementsByName("AddressType")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$('[name="shipToThisAddress"]').click();            
                        }
                    }catch(err){console.log(err)}
				}, 100);

                v6 = setInterval(function(){ 
                    try{                    
                        if($(".address-book-entry").is(":visible"))
                        {
							clearInterval(v6);
							document.getElementsByClassName("address-book-entry")[0].getElementsByTagName("a")[1].click();
                        }                               
                   }catch(err){console.log(err)}
                },50);	
	
				v66 = setInterval(function(){ 
                    try{                    
                        if($("[name='continue-bottom']").is(":visible"))
                        {
							clearInterval(v66);
							setTimeout(function(){
								document.getElementsByName("continue-bottom")[0].click();
							},3000)
                        }                               
                   }catch(err){console.log(err)}
                },100);	

				v67 = setInterval(function(){ 
                    try{                    
                        if($("#shippingOptionFormId").is(":visible"))
                        {
							clearInterval(v67);
							$("[value='Continue']").eq(0).click();
                        }                               
                   }catch(err){console.log(err)}
                },100);	

				v68 = setInterval(function(){ 
                   try{                    
                        if($(".pmts-payment-instruments-container-classic").is(":visible"))
                        {
							clearInterval(v68);
							if(paymentMethod=="creditCard"){
								$("[value='SelectableAddCreditCard']").click();
							}
							if(paymentMethod=="internet"){
								$( "input[name^='instrumentId=NetBanking']" ).click();																						
								$(".a-dropdown-prompt").eq(2).click();							
   
							}														
                        }                               
                   }catch(err){console.log(err)}
                },100);	
				
				v70 = setInterval(function(){ 
                   try{                    
                        if($(".a-nostyle").is(":visible"))
                        {
							clearInterval(v70);
							setTimeout(function(){
								var p = document.getElementsByClassName("a-nostyle")[0].getElementsByTagName("a");
								for(var i =0; i<p.length; i++)
								{
									if(p[i].textContent==bank)
									{
										p[i].click();										
									}									
								}
							},200)							
                        }                               
                  }catch(err){console.log(err)}
                },100);	
				
				v7 = setInterval(function(){ 
                    try{                          
						if($("[name='ppw-accountHolderName']").is(":visible")) {
							clearInterval(v7);
							$("[name='ppw-accountHolderName']").val(cardHolderName);						
							document.getElementsByName("ppw-accountHolderName")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("[name='addCreditCardNumber']").val(cardNumber);
							document.getElementsByName("addCreditCardNumber")[0].dispatchEvent(new Event('change', { bubbles: true }));
	
							$("[name='ppw-expirationDate_month']").val(expireMonth);
							document.getElementsByName("ppw-expirationDate_month")[0].dispatchEvent(new Event('change', { bubbles: true }));
	
							$("[name='ppw-expirationDate_year").val(expireYear);
							document.getElementsByName("ppw-expirationDate_year")[0].dispatchEvent(new Event('change', { bubbles: true }));
							$("[name='ppw-widgetEvent\\:AddCreditCardEvent']").click();
						}
                    }catch(err){console.log(err)}
				}, 100);
				v71 = setInterval(function(){ 
                    try{                          
						if($("[name^='addCreditCardVerificationNumber']").is(":visible")) {
							clearInterval(v71);							
							$("[name^='addCreditCardVerificationNumber']").val("");
							$("[name^='addCreditCardVerificationNumber']").sendkeys(cardCVV);
							document.getElementsByName("addCreditCardVerificationNumber0")[0].dispatchEvent(new Event('change', { bubbles: true }));	
							
							setTimeout(function(){
								document.getElementsByName("ppw-widgetEvent:SetPaymentPlanSelectContinueEvent")[0].click();																							
							},100);
						}
                    }catch(err){console.log(err)}
				}, 100);
				
				v8 = setInterval(function () {	
					try{
						if($("[name='ppw-widgetEvent\\:SetPaymentPlanSelectContinueEvent']").is(":visible")){	
							clearInterval(v8);
							setTimeout(function(){
								document.getElementsByName("ppw-widgetEvent:SetPaymentPlanSelectContinueEvent")[0].click();
							},500);
						}
					}catch(err){console.log(err)}
				},100);
				v9 = setInterval(function () {
					try{
						if($(".place-your-order-button").is(":visible")){			
							clearInterval(v9);
							setTimeout(function(){
								$(".place-your-order-button").click();
							},500);
						}
					}catch(err){console.log(err)}
				},100);	
            }
		});
	}
});
