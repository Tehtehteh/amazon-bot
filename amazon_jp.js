chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var	size = response.shoesSize;
		var	url = response.url;
		var	quantity = response.quantity;
		var	size2 = response.size2;
		var	low = response.low;
		var	color = response.color;
		var	high = response.high;
		var	keywords = response.keywords;
        var refreshInterval = response.timeOut;    
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;
        
		var username2 = response.username2;
		var password2 = response.password2;
		var use_address = response.use_address;
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
				keywords= keywords.trim().toLowerCase();
				keywords=keywords.split(",");
			}catch(err){}
			try{
				color= color.trim().toLowerCase();
				color=color.split(",");
			}catch(err){}
			try{
				if(size=="custom")
				{
					size=size2;
				}
				size=size.trim().toLowerCase();
			}catch(err){}
			low=Number(low);		
			high=Number(high);
			v00 = setInterval(function(){
				if($("#olpOfferList").is(":visible")){
					try{
						clearInterval(v00);
						var a=document.getElementsByClassName("olpOffer");
						for(var i=0; i<a.length; i++){
							var p=a[i].getElementsByClassName("olpOfferPrice")[0].textContent.trim();
							var r =p.substr(2);	
							var rc=r.replace(',','');	
							if((low<=rc && high>=rc) || (low==0 && high==0)){
								a[i].getElementsByClassName("a-button-input")[0].click();
								return;
							}
						}
					}catch(err){}			
					setTimeout(function(){
						location.reload();
					}, refreshInterval); 										
				}
			}, 200);
			v0 = setInterval(function(){
				if($(".s-result-list").is(":visible")){
					clearInterval(v0);
					try{
						var a = document.getElementsByClassName("s-search-results")[1].getElementsByClassName("s-result-item");
						for(var i=0; i<a.length ; i++){							
							var b = a[i].textContent.trim();
							try{
								var c = a[i].getElementsByClassName("a-offscreen")[0].textContent.trim();
							}catch(err){}
							var r = c.substr(1);
							var rc=r.replace(',','');
							for(var j=0; j<keywords.length; j++){
								if(b.match(new RegExp(keywords[j], "i"))){
									if((low<=rc && high>=rc) || (low==0 && high==0)){
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
			v01=setInterval(function () {
				try{
					if($("#ddmDeliveryMessage").is(":visible") && $("#native_dropdown_selected_size_name").is(":visible")){
						clearInterval(v01);
						document.getElementById("add-to-cart-button").click();									
					}
				}catch(err){console.log(err)}
			},100);		
			v3=setInterval(function () {
				try{
					if($("#soldByThirdParty").is(":visible")){
						clearInterval(v3);
						document.getElementById("add-to-cart-button").click();									
					}
				}catch(err){console.log(err)}
			},100);
			
			v93=setInterval(function () {
				try{
					if($("#addToCart").is(":visible")){	
						clearInterval(v93);
						if(!$("#outOfStock").is(":visible")){
							document.getElementById("addToCart").getElementsByTagName("a")[0].click();							
							return;
						}	
						setTimeout(function(){
							location.reload();
						}, refreshInterval); 						
					}
				}catch(err){}
			},100);			
			
			v03=setInterval(function() {
				if($("#submit\\.add-to-cart").is(":visible")){						
					try{
						clearInterval(v03);
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
							if($("#variation_color_name").is(":visible")){							
								var c = document.getElementById("variation_color_name").getElementsByTagName("li");
								for(var i=0; i<c.length; i++){
									var cl=c[i].getElementsByTagName("img")[0];
									for(var j=0; j<color.length; j++){									
										if(cl.alt.toLowerCase()==color[j]){
											cl.click();										
											break;
										}
									}
								}
							}	
							if($("#variation_color_name").is(":visible")){							
							var c = document.getElementById("variation_color_name").getElementsByTagName("li");
							for(var i=0; i<c.length; i++){
								var cl=c[i].getElementsByTagName("img")[0];
								for(var j=0; j<color.length; j++){									
									if(cl.alt.toLowerCase()==color[j]){
										cl.click();										
										break;
									}
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
			v04=setInterval(function () {
				try{
					if($("#proceed-to-checkout-desktop-container").is(":visible") && !$("#sc-important-message-alert").is(":visible")){
						clearInterval(v04);
						setTimeout(function(){
							location.reload();
						},refreshInterval);	
					}
				}catch(err){console.log(err)}
			},100);	
			v05=setInterval(function () {
				try{
					if(($(".lineitem-address:contains('申し訳ございませんが、お選びになった出品商品は入手不可になりました。この商品は')").is(":visible") && !$("#proceed-to-checkout-desktop-container").is(":visible")) || ($(".lineitem-address:contains('Sorry, the item you selected is no longer available. This product')") && !$("#proceed-to-checkout-desktop-container").is(":visible"))){
						clearInterval(v05);
						setTimeout(function(){
							//location.href=url;
						},3000);		
						
					}
				}catch(err){console.log(err)}
			},100);		
            if(autocheckoutselect==="yes"){				
				v21 = setInterval(function() {
					if($("[value='Proceed to checkout']").is(":visible")){										
						clearInterval(v2);
						try{
							$("[value='Proceed to checkout']").click();
						}catch(err){}						
					}
				},10);

				v2 = setInterval(function () {
					if($("#hlb-ptc-btn-native").is(":visible")){										
						clearInterval(v2);
						try{
							document.getElementById('hlb-ptc-btn-native').click();
						}catch(err){}						
					}
				},10);

				v3 = setInterval(function(){ 
					if($("#siNoCoverage-announce").is(":visible")){
						try{
							clearInterval(v3);
							document.getElementById('siNoCoverage-announce').click();
						}catch(err){}						
					}
				},50);
				
                v4 = setInterval(function(){ 
					if($("#continue-announce").is(":visible")){
						try{
							clearInterval(v4);
							$("#ap_email").val(username2);
							setTimeout(function(){
								$("[aria-labelledby='continue-announce']").click();
								document.getElementById("continue").dispatchEvent(new Event('click', { bubbles: true }));
							},1000);
						}catch(err){}						
					}
				},1000);	
                v40 = setInterval(function(){ 
					if($("#cvf-page-content").is(":visible")){
						try{
							clearInterval(v40);
							setTimeout(function(){
								$("[aria-labelledby='a-autoid-0-announce']").click();
								document.getElementById("continue").dispatchEvent(new Event('click', { bubbles: true }));
							},1000);
						}catch(err){}						
					}
				},1000);	
				
				v44 = setInterval(function(){
					try{					
						if(document.getElementById("ap_email").value==username2){					
							clearInterval(v44);								
							$("#continue").click();
							document.getElementById("continue").dispatchEvent(new Event('click', { bubbles: true }));
							document.getElementById("continue-announce").dispatchEvent(new Event('change', { bubbles: true }));																				
						}
					}catch(err){}	
				},1000);
			
				v41 = setInterval(function(){ 
					if($("#ap_password").is(":visible")){
						try{
							clearInterval(v41);
							$("#ap_password").val(password2);
							document.getElementsByName("password")[0].dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementById("signInSubmit").click();
						}catch(err){}						
					}
				},100);	
							
                v5 = setInterval(function(){ 
                    try{  
                         if($("#enterAddressFullName").is(":visible")){
							if(use_address==="no"){
								clearInterval(v5);
								$("#enterAddressCountryCode").val(shipCountry);
								$("#enterAddressFullName").val(shipFirstName);
								document.getElementsByName("enterAddressFullName")[0].dispatchEvent(new Event('change', { bubbles: true }));
								$("#enterAddressAddressLine1").val(shipStreetAddress1);
								document.getElementsByName("enterAddressAddressLine1")[0].dispatchEvent(new Event('change', { bubbles: true }));
								$("#enterAddressAddressLine2").val(shipStreetAddress2);
								document.getElementsByName("enterAddressAddressLine2")[0].dispatchEvent(new Event('change', { bubbles: true }));
								$("#enterAddressCity").val(shipCity);
								var s = document.getElementById("enterAddressStateOrRegion");
								for(var i=0; i<s.options.length; i++){
									var st=s.options[i].textContent.toLowerCase();
									shipState=shipState.toLowerCase();
									if(st==shipState){
										s.options[i].selected=true;
										s.dispatchEvent(new Event('change', {bubbles: true }));
									}
								}
								shipZipCode=shipZipCode.split("-");
								shipZipCode1=shipZipCode[0];
								shipZipCode2=shipZipCode[1];
								$("#enterAddressPostalCode1").val(shipZipCode[0]);
								document.getElementsByName("enterAddressPostalCode")[0].dispatchEvent(new Event('change', { bubbles: true }));
								$("#enterAddressPostalCode2").val(shipZipCode[1]);
								document.getElementsByName("enterAddressPostalCode2")[0].dispatchEvent(new Event('change', { bubbles: true }));
								$("#enterAddressPhoneNumber").val(shipPhone);
								document.getElementsByName("enterAddressPhoneNumber")[0].dispatchEvent(new Event('change', { bubbles: true }));
								if($('[name="shipToThisAddress"]').is(":visible")){
									$('[name="shipToThisAddress"]').click();
								}else{
									$("[value='Use this address']").click();
								}
							}else{								
								document.getElementsByClassName("ship-to-this-address")[0].getElementsByTagName("a")[0].click();
							}									
                        }
                    }catch(err){}
				}, 100);

                v6 = setInterval(function(){ 
                    try{                    
                        if($(".ship-to-this-address").is(":visible"))
                        {
							clearInterval(v6);
							document.getElementsByClassName("ship-to-this-address")[0].getElementsByTagName("a")[0].click();
                        }                               
                   }catch(err){}
                },50);	

	
				v66 = setInterval(function(){ 
                    try{                    
                        if($("#shippingOptionFormId").is(":visible"))
                        {
							clearInterval(v66);
							$("[value='Continue']").eq(0).click();
                        }                               
                   }catch(err){}
                },50);
				v67 = setInterval(function(){ 
                    try{                    
                        if($(".save-sosp-button-box").is(":visible"))
                        {
							clearInterval(v67);
							document.getElementsByClassName("save-sosp-button-box")[0].getElementsByClassName("a-button-text")[0].click();
                        }                               
                   }catch(err){}
                },50);		
				v68 = setInterval(function(){ 
                    try{ 
						if(paymentMethod=="creditCard"){
							if($(".pmts-add-new-card").is(":visible") && !$(".a-expander-inline-content").is(":visible"))
							{
								clearInterval(v68);
								document.getElementsByClassName("pmts-add-new-card")[0].click();
							} 
						}							
                   }catch(err){}
                },50);				
				v7 = setInterval(function(){ 
                    try{  
                        if ($(".a-expander-inline-content").is(":visible")) {
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
                    }catch(err){}
				}, 100);
				v77 = setInterval(function(){	
					try{
						if($("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").is(":visible") && !$("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").is(":disabled")){				
							clearInterval(v77);
							$("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").click();
						}
					}catch(err){}
				},100);
				v8 = setInterval(function () {	
					try{
						if($("#continue-top").is(":visible")){				
							clearInterval(v8);
							$("#continue-top").click();
						}
					}catch(err){}
				},100);
				v9 = setInterval(function () {
					try{
						if($("[name='placeYourOrder1']").is(":visible")){			
							clearInterval(v9);
							$("[name='placeYourOrder1']").click();
						}
					}catch(err){}
				},100);	
            }
		});
	}
});
