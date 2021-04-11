function ATC(){
	if($("#buy-now-button").is(":visible")){
		document.getElementById("buy-now-button").click();
		return;
	}else{
		if($("#add-to-cart-button").is(":visible")){	
			document.getElementById("add-to-cart-button").click();
			return;
		}else{
			try{document.getElementById("add-to-cart-button-ubb").click()}catch(err){}
			return;
		}
	}
}
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
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")) && !data.match('Currently unavailable'))
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
								if((keysFoundAnd(keywords, b))&&(!findNegativeKeys(keywords2,b) && !b.match('Currently unavailable'))){
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
			v01 = setInterval(function(){
				if($("li[class*='style__itemOuter']").is(":visible")){					
					clearInterval(v01);
					try{
						var a = $("li[class*='style__itemOuter']");
						for(var i=0; i<a.length; i++){
							var b = a[i].textContent.trim();
							try{
								var c = a[i].getElementsByClassName("price")[0].textContent.trim();
								var p = c.trim().split(".");
								var r= p[0].replace(',','').match(/(\d+)/g);
							}catch(err){}
							for(var j=0; j<keywords.length; j++){
								if(KeywordsType=="and"){
									if((keysFoundAnd(keywords, b))&&(!findNegativeKeys(keywords2,b) && !b.match('Currently unavailable'))){
										if((low<=r && high>=r) || (low==0 && high==0)){	
											location.href=a[i].getElementsByTagName('a')[0].href;
											return;
										}
									}						
								}else{
									if((keysFoundOr(keywords, b))&&(!findNegativeKeys(keywords2,b))){
										if((low<=r && high>=r) || (low==0 && high==0)){	
											location.href=a[i].getElementsByTagName('a')[0].href;
											return;
										}
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
			v1 = setInterval(function(){
				if($(".dealContainer").is(":visible")){
					clearInterval(v1);
					try{
						var a = document.getElementsByClassName("dealContainer");
						for(var i=0; i<a.length ; i++){
							var b = a[i].textContent.trim();
							
							try{var c = a[i].getElementsByClassName("dealPriceText")[0].textContent.trim();}catch(err){};
							var r = Number(c.trim().substr(1));
							for(var j=0; j<keywords.length; j++){
								if(b.match(new RegExp(keywords[j], "i"))){
									if((low<=r && high>=r) || (low==0 && high==0)){
										a[i].getElementsByTagName('a')[0].click();
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
			}, 2000);
			
			v2=setInterval(function(){
				if($("#productTitle").is(":visible") && !$("#attach-accessory-pane").is(":visible") && !$("#siAddCoverage-announce").is(":visible")){
					clearInterval(v2);					
					//try{	
						console.log("hii");
						if($("#checkout-button").is(":visible")){
							$("#checkout-button").click();
						}
						var a;
						if($("#availability").is(":visible")){
							try{var a = document.getElementById("availability").textContent.trim();}catch(err){}
						}else{
							try{var a = document.getElementById("availability_feature_div").textContent.trim();}catch(err){}
						}						
						if(!a.match("Currently unavailable")){
							if($("#add-to-cart-button").is(":visible")||$("#add-to-cart-button-ubb").is(":visible")){
								//setTimeout(function(){
									try{
										var b = document.getElementsByClassName("a-color-price")[0].textContent.trim();
										var p = b.trim().split(".");
										var r= p[0].match(/(\d+)/g);
									}catch(err){}										
									if((low<=r && high>=r) || (low==0 && high==0)){							
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
											try{var c = document.getElementById("variation_color_name").getElementsByTagName("li");
												for(var i=0; i<c.length; i++){
													var cl=c[i].getElementsByTagName("img")[0];
													for(var j=0; j<color.length; j++){									
														if(cl.alt.toLowerCase()==color[j]){
															cl.click();										
															break;
														}
													}
												}
											}catch(err){}
										}

										if($("#variation_size_name").is(":visible")){
											try{
												var s = document.getElementById("variation_size_name").getElementsByClassName("a-size-base");
												for(var i=0; i<s.length; i++){
													for(var j=0; j<size.length; j++){
														var sz=s[i].textContent.trim().toLowerCase();	
														if(sz==size[j]){
															s[i].click();															
															break;
														}
													}
												}
											}catch(err){}												
										}										
										if($("#variation_style_name").is(":visible")){
											try{
												var stl=document.getElementById("variation_style_name").getElementsByTagName("li");
												for(var k =0; k<stl.length; k++){
													for(var l=0; l<color.length; l++){													
														var st=stl[k].getElementsByClassName("a-size-base")[0].textContent.toLowerCase();
														if(st==color[l]){	
															stl[k].getElementsByTagName("button")[0].click();								
															break;
														}																
													}	
													
												}
											}catch(err){}												
										}																			
										if($("#native_dropdown_selected_size_name").is(":visible")){
											var s=document.getElementById("native_dropdown_selected_size_name");
											for(var i=0; i<s.length; i++){
												for(var j=0; j<size.length; j++){
													if(s.options[i].textContent.trim().toLowerCase()==size[j]){
														s.options[i].selected=true;
														s.dispatchEvent(new Event('change', { bubbles: true }));
														v01 = setInterval(function(){
															if($("#priceInsideBuyBox_feature_div").is(":visible")){
																try{var sellerDetail=document.getElementsByClassName('tabular-buybox-text')[2].textContent;
																	if(Seller=="amazon"){
																		if(sellerDetail.match("Amazon")){
																			ATC();
																		}
																	}else{
																		ATC();
																	}
																}catch(err){}
																clearInterval(v01);
															}
														},100);														
													}
												}
											}												
										}else{	
											
											try{var sellerDetail=document.getElementsByClassName('tabular-buybox-text')[2].textContent;}catch(er){}
												try{if(Seller=="amazon"){												
													if(sellerDetail.match("Amazon.com")){
														ATC();
													}
												}else{
													console.log("ghh");
													ATC();
												}
											}catch(err){}
										}
									}
								//},500);
							}
							/*else{
								if(Seller=='any'){
									if($("#buybox-see-all-buying-choices-announce").is(":visible")){
										location.href=document.getElementById("buybox-see-all-buying-choices-announce").href;
										return;
									}
								}
							}*/
						}						
					//}catch(err){}														
					setTimeout(function(){
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 										
				}				
			},1000);
			/*v3 = setInterval(function () {
				if($("#olpOfferList").is(":visible")){
					try{
						clearInterval(v3);
						var a=document.getElementById("olpOfferList").getElementsByClassName("olpOffer");
						for(var i=0; i<a.length;i++){
							var b=a[i].getElementsByClassName("olpOfferPrice")[0].textContent.trim();
							var p = b.split(".");
							var r= p[0].match(/(\d+)/g);									
							if((low<=r && high>=r) || (low==0 && high==0)){
	
								var b =a[i].getElementsByTagName("input");
								for(j=0; j<b.length;j++)
								{									
									if(b[j].name=="submit.addToCart"){ b[j].click();return}
								}
								return;
							}
						}
					}catch(err){}											;					
					setTimeout(function(){
						location.reload(true);
					}, refreshInterval);
				}
			},100);	*/
	
			v3 = setInterval(function () {
				if($("#attach-warranty").is(":visible")){
					clearInterval(v3);
					if(warranty=="yes"){
						$("#attachSiAddCoverage-announce").click();
					}else{
						$("#attachSiNoCoverage-announce").click();						
					}					
				}
			},getRndRefreshRange(timeoutMin, timeoutMax)); 
            if(autocheckoutselect==="yes"){
				
				
				vv52 = setInterval(function () {
					if($("div:contains('your order has been placed')").is(":visible")){
						clearInterval(vv52);
						if(RepeatOrder=="yes")
						{
							location.href=url;	
						}						
					}
				},1000);
				
				vv53 = setInterval(function () {
					if($("div:contains('There was a problem with')").is(":visible")){
						clearInterval(vv53);
						location.href="https://www.amazon.co.uk/gp/cart/view.html?ref_=nav_cart";					
					}
				},1000);				
				
				vv54 = setInterval(function () {
					if($("div:contains('Oops! We're sorry')").is(":visible")){
						clearInterval(vv54);
						location.href="https://www.amazon.co.uk/gp/cart/view.html?ref_=nav_cart";					
					}
				},1000);
				vv55 = setInterval(function () {
					if($("h2:contains('Your Amazon Cart is empty')").is(":visible")){
						clearInterval(vv55);
						location.href=url;				
					}
				},100);
				v45 = setInterval(function () {
					if($("#siAddCoverage-announce").is(":visible")&&document.getElementsByClassName("a-button-close").length>1){
						//clearInterval(v45);
						document.getElementsByClassName("a-button-close")[1].click();	
						//location.href="https://www.amazon.com/gp/cart/view.html?ref_=nav_cart";			
					}
				},50);
				
				v5 = setInterval(function() {
					if($("#attach-accessory-pane").is(":visible")){										
						clearInterval(v5);
						try{
							setTimeout(function(){
								location.href="https://www.amazon.co.uk/gp/cart/view.html?ref_=nav_cart";
							},20);

						}catch(err){}						
					}
				},100);
				v55 = setInterval(function () {
					if($("[name='placeYourOrder1']").is(":visible")){										
						clearInterval(v55);
						try{
							$("[name='placeYourOrder1']").click();
						}catch(err){}						
					}
				},10);	
				v6 = setInterval(function () {
					if($("#hlb-ptc-btn-native").is(":visible")){										
						clearInterval(v6);
						try{
							if(soundAlert=="yes"){
								chrome.extension.sendMessage({action: "alert"}, function(response) {});
							}
							document.getElementById('hlb-ptc-btn-native').click();
						}catch(err){}						
					}
				},10);
				v66 = setInterval(function () {
					if($(".sc-empty-cart-header").is(":visible")){										
						clearInterval(v66);
						setTimeout(function(){
							location.reload(true);
						},getRndRefreshRange(timeoutMin, timeoutMax)); 			
					}
				},100);

				v7 = setInterval(function(){ 
					if($("#siNoCoverage-announce").is(":visible")){
						try{
							clearInterval(v7);
							document.getElementById('siNoCoverage-announce').click();
						}catch(err){}						
					}
				},50);
				v77 = setInterval(function(){ 
					if($("[name='proceedToRetailCheckout']").is(":visible")){
						try{
							if(soundAlert=="yes"){
								chrome.extension.sendMessage({action: "alert"}, function(response) {});
							}
							clearInterval(v77);
							document.getElementsByName('proceedToRetailCheckout')[0].click();
						}catch(err){}						
					}
				},50);
				
                v8 = setInterval(function(){ 
					if($("#continue-announce").is(":visible")){
						try{
							clearInterval(v8);
							$("#ap_email").val(username2);
							setTimeout(function(){
								$("[aria-labelledby='continue-announce']").click();
								document.getElementById("continue").dispatchEvent(new Event('click', { bubbles: true }));
							},1000);
						}catch(err){}						
					}
				},1000);
					
                v9 = setInterval(function(){ 
					if($("#cvf-page-content").is(":visible")){
						try{
							clearInterval(v9);
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
			
				v10 = setInterval(function(){ 
					if($("#ap_password").is(":visible")){
						try{
							clearInterval(v10);
							$("#ap_password").val(password2);
							document.getElementsByName("password")[0].dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementById("signInSubmit").click();
						}catch(err){}						
					}
				},100);	
				if(use_address==="yes"){					
					v11 = setInterval(function(){ 
						try{  
							if($("#address-ui-widgets-enterAddressFullName").is(":visible")){
								clearInterval(v11);
								if(use_address==="no"){								
									$("#address-ui-widgets-enterAddressFullName").val(shipFirstName);
									document.getElementsByName("address-ui-widgets-enterAddressFullName")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressLine1").val(shipStreetAddress1);
									document.getElementsByName("address-ui-widgets-enterAddressLine1")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressLine2").val(shipStreetAddress2);
									document.getElementsByName("enterAddressAddressLine2")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressCity").val(shipCity);
									document.getElementsByName("address-ui-widgets-enterAddressCity")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressStateOrRegion").val(shipState);
									document.getElementsByName("address-ui-widgets-enterAddressStateOrRegion")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressPostalCode").val(shipZipCode);
									document.getElementsByName("address-ui-widgets-enterAddressPostalCode")[0].dispatchEvent(new Event('change', { bubbles: true }));
									$("#address-ui-widgets-enterAddressPhoneNumber").val(shipPhone);
									document.getElementsByName("address-ui-widgets-enterAddressPhoneNumber")[0].dispatchEvent(new Event('change', { bubbles: true }));																	
									document.getElementById("address-ui-widgets-form-submit-button-announce")[0].getElementsByTagName("a")[0].click();
								}									
							}
						}catch(err){}
					}, 100);
				}

               v12 = setInterval(function(){ 
                    try{
						if(use_address==="yes"){		
							if($(".ship-to-this-address").is(":visible"))
							{
								clearInterval(v12);
								document.getElementsByClassName("ship-to-this-address")[0].getElementsByTagName("a")[0].click();
							}
						}							
                   }catch(err){}
                },50);	
	
				v13 = setInterval(function(){ 
                    try{                    
                        if($("#shippingOptionFormId").is(":visible")){
							clearInterval(v13);
							$("[value='Continue']").eq(0).click();
                        }                               
                   }catch(err){}
                },50);	
				
				v131 = setInterval(function(){ 
                    try{                    
                        if($(".pmts-select-payment-instrument-form").is(":visible")){
							clearInterval(v131);
							if(paymentMethod=="amazonStoreCard"){
								$("[data-co-brand='AmazonStoreCardConsumerPLCC']>input").click();
								v132 = setInterval(function(){
									if($(".pmts-select-payment-instrument-form").is(":visible")){
										clearInterval(v132);
										$("[aria-labelledby='orderSummaryPrimaryActionBtn-announce']").click();
									}
								},100)
							}else if(paymentMethod=="creditCard"){
								$("[data-co-brand='NotSpecified']>input").click();
								$("[aria-labelledby='orderSummaryPrimaryActionBtn-announce']").click();
							}
                        }                               
                   }catch(err){}
                },50);				
				v14 = setInterval(function(){ 
                    try{  
                        if ($("[name='ppw-accountHolderName']").is(":visible")) {
							clearInterval(v14);
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
				v15 = setInterval(function(){	
					try{
						if($("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").is(":visible")){				
							clearInterval(v15);
							$("[name='ppw-widgetEvent:SetPaymentPlanSelectContinueEvent']").click();
						}
					}catch(err){}
				},100);
				v16 = setInterval(function () {	
					try{
						if($("#continue-top").is(":visible")){				
							clearInterval(v16);
							$("#continue-top").click();
						}
					}catch(err){}
				},100);
				v17 = setInterval(function () {
					try{
						if($("[title='Place your order']").is(":visible")){			
							clearInterval(v17);
							$("[title='Place your order']").click();
						}
					}catch(err){}
				},100);
				v18 = setInterval(function () {
					try{
						if($(".pet-checkout-button:contains('Continue placing your order')").is(":visible")){			
							clearInterval(v18);
							$(".pet-checkout-button:contains('Continue placing your order')").click();
						}
					}catch(err){}
				},100);	
				v19 = setInterval(function () {
					try{
						if($("span:contains('PO number')").is(":visible")){	
							clearInterval(v19);
							$("[value='Continue']").click();
						}
					}catch(err){}
				},100);	
				v20 = setInterval(function () {
					try{
						if($("[name='placeYourOrder1']").is(":visible") ){								
							setTimeout(function(){
								document.getElementsByName("placeYourOrder1")[0].click();
							},1000);
							clearInterval(v20);
						}
					}catch(err){}
				},500);
				v21 = setInterval(function () {
					try{
						if($("#apx-add-credit-card-action-test-id").is(":visible") ){								
							clearInterval(v21);
							$("#apx-add-credit-card-action-test-id").click();
						}
					}catch(err){}
				},500);
            }

		});
	}
});
