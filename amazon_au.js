function getRndRefreshRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function keysFoundAnd(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(!data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return false;
		}
	}
	return true;
}
function keysFoundOr(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return true;
		}
	}
	return false;
}
function findNegativeKeys(keywords2,data)
{
	if(keywords2[0]=="")
	{
	return false
	}
	for(i=0; i<keywords2.length; i++)
	{
		if(data.match(new RegExp(keywords2[i], "i")))
		{
			
			return true;
		}
	}
	return false;
}	
chrome.extension.sendMessage({action: "isRecordingOn"}, function(response){
	if(response.action == 'true'){
		var	size = response.shoesSize;
		var	quantity = response.quantity;
		var	size2 = response.size2;
		var	soundAlert = response.soundAlert;
		var timeoutMin = Number(response.timeOut);    
        var timeoutMax = Number(response.timeoutMax);
		var	color = response.color;
		var	low = Number(response.low);
		var	high = Number(response.high);
		var	keywords = response.keywords;
		var	keywords2 = response.keywords2;
		var	KeywordsType = response.KeywordsType;
		var	Seller = response.Seller;
		var	warranty = response.warranty;
		var	amazonFulfilled = response.amazonFulfilled;
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;
        //var soldByAmazon = response.soldByAmazon;
		var username2 = response.username2;
		var password2 = response.password2;
		
		var AccountBilling = response.AccountBilling;
		var use_address = response.use_address;
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
		var RepeatOrder =  response.RepeatOrder;
		var url  = response.url;
		var cartURL = "";
		$(function(){ 
            try{
				keywords= keywords.trim().toLowerCase();
				keywords=keywords.split(",");
			}catch(err){}
			try{
				keywords2= keywords2.trim();
				keywords2=keywords2.split(",");
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
				size=size.split(",");
			}catch(err){}		
			v0 = setInterval(function(){
				if($(".s-result-item").is(":visible") && $(".a-price-whole").is(":visible")){					
					clearInterval(v0);
					try{
						var a = document.getElementsByClassName("s-result-item s-asin");
						for(var i=0; i<a.length ; i++){
							var b = a[i].textContent.trim().replace(/\s{2,}/g, ' ');;
							try{var c = a[i].getElementsByClassName("a-price-whole")[0].textContent.trim().replace(".","");}catch(err){}
							if(KeywordsType=="and"){
								if((keysFoundAnd(keywords, b))&&(!findNegativeKeys(keywords2,b))){
									if((low<=c && high>=c) || (low==0 && high==0)){
										a[i].getElementsByClassName('a-text-normal')[0].click();
										return;
									}
								}						
							}else{
								if((keysFoundOr(keywords, b))&&(!findNegativeKeys(keywords2,b))){
									if((low<=c && high>=c) || (low==0 && high==0)){
										a[i].getElementsByClassName('a-text-normal')[0].click();
										return;
									}
								}									
							}
						}
					}catch(err){}			
					setTimeout(function(){
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 									
				}
			}, 100);
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
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 			
				}				
			},100);
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
			
            if(autocheckoutselect==="yes"){				
				v21 = setInterval(function () {
					if($("[value='Proceed to checkout']").is(":visible")){										
						clearInterval(v21);
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
				vv55 = setInterval(function () {
					if($("h2:contains('Your Amazon Cart is empty')").is(":visible")){
						clearInterval(vv55);
						location.href=url;				
					}
				},100);			
                v5 = setInterval(function(){ 
                    try{  
                        if($("#enterAddressFullName").is(":visible")){
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
							if($('[name="shipToThisAddress"]').is(":visible")){
								$('[name="shipToThisAddress"]').click();
							}else{
								$("[value='Use this address']").click();
							}	         
                        }
                    }catch(err){}
				}, 100);

                v6 = setInterval(function(){ 
                    try{                    
                        if ($("[value='Deliver to this address']").is(":visible"))
                        {
							clearInterval(v6);
							document.getElementsByName("useSelectedAddress")[0].click();
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
				v7 = setInterval(function(){ 
                    try{  
                        if ($("[name='ppw-accountHolderName']").is(":visible")) {
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
						if($("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").is(":visible")){				
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
						if($("[title='Place your order']").is(":visible")){			
							clearInterval(v9);
							$("[title='Place your order']").click();
						}
					}catch(err){}
				},100);	
            }
		});
	}
});
