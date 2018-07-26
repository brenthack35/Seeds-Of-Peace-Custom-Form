/*
====================================================================
Custom Javascript
--------------------------------------------------------------------
 Client: 		Seeds of Peace	
 Author(s): 	Brent Hackman		
-------------------------------------------------------------------- 
 Changelog: 
====================================================================
====================================================================
*/

BBI = {

	Config: {
		isEditView: !!window.location.href.match('pagedesign')
	},
	
	Defaults: {
		
	},
	
	Methods: {
	
		init: function() {
			BBI.Options = $.extend(true,BBI.Defaults,BBI.Options);
		},
	
		pageLoad: function() {
			this.checkEditView();
			this.showPartTitle();
		},
		
		getUrlVars: function() {
			// Gets variables and values from URL
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = unescape(value.replace(/\+/g, " "));
			});
			return vars;
		},
		
		checkEditView: function() {
			// Re-checks isEditView against template design view:
			if (!this.isEditView) {
				this.isEditView = window.location.href.match('templatedesigner');
			}
		},
		
		donation: {
			
			init: function() {
			
				var d = BBI.Methods.donation;
				
				d.prep();
				d.preselectFields();
			
			},
			
			prep: function() {
			
				var tributeSection;
				
				//var formID = $("table[id$='tblAmount']").attr("id").split("_")[0];
				
				// Create Custom Radio Button and Checkbox Graphics with PrettyCheckbox jQuery
				$('input[type=checkbox], input[type=radio]').prettyCheckboxes();
				
				
				// Re-Labels Main Headers
				$('td.BBListingHeading span:contains("Donation Information")').text("1. Your Gift");
				$('td.BBListingHeading span:contains("Billing Information")').text("2. Your Information");
				$('td.BBListingHeading span:contains("Payment Information")').text("3. Credit Card Information");
				$('td.BBListingHeading span:contains("Tribute Information")').text("Is This Gift in Honor or Memory of Someone?");
				
				// Hide Certain Form Elements
				//$('tr[id*="_trTributeDesc2"]').hide();
				
				$('div.singleCol p span a:contains("Make a donation in honor or memory of someone »")').hide();
				$('tr td.DonationListingHeading span[id*="_lblTributeHeading"]').hide();
				
				//$('td[id*="_Recurrence_tdFrequency"]').hide();
				//$('td.DonationFieldControlCell tr:contains("Installments")').hide();
				
				$('td[id*="_Recurrence_tdFrequency"]').remove();
				$('td.DonationFieldControlCell tr:contains("Installments")').remove();
				
				$('tr[id*="_trAdditInformation"]').hide();
				$('td[id*="_tdGiftTypeCaption"]').hide();
				$('td.DonationFieldCaption:contains("")').hide();
				$('td.DonationFieldCaption:contains("Corporate:")').hide();
				$('td.DonationFieldCaption:contains("Anonymous:")').hide();
				$('td.DonationCaptureFieldCaption:contains("")').hide();
				
				// Add Classes to Certain Form Elements
				$('table[id*="_rdoGiftType"] tr:contains("one-time gift")').addClass("_TB_pnlDonationType").hide();
				$('table[id*="_rdoGiftType"] tr:contains("monthly")').addClass("_TB_pnlRecurringGift");
				$('table.DonationFormTable tbody:contains("Is This Gift in Honor or Memory of Someone?")').addClass("_tributeSection");
				tributeSection = $('tbody._tributeSection');
				tributeSection.find('tr td:contains("Is This Gift in Honor or Memory of Someone?")').addClass("normal");
				
				// Move Certain Elements 
				$('tr[id*="_trGiftType"]').detach().appendTo('tbody[id*="_TB_pnlDonation"]');
				$('tbody[id*="_DonationCapture1_tbdyMatchingGifts"] tr').detach().appendTo('tbody:contains("Additional Information")');
				$('tr td:contains("My company will match my gift")').addClass("_tr_CompanyMatchGift");
				$('tr td:contains("My company will match my gift")').parent().addClass("CompanyMatch");
				$('table.DonationFormTable tbody:contains("My company will match my gift")').addClass("_matchingGiftsSection");
				$('tr:contains("Matching Gifts")').hide();
				$('td._tr_CompanyMatchGift').css('width','100%');
				$('table[id*="_rdoGiftType"] tr._TB_pnlRecurringGift').detach().insertAfter('table[id*="_tblAmount"] tr[id*="_trOther"]');
				
				$('._matchingGiftsSection tr[id*="_trAnonymous"]').detach().insertBefore("tr.CompanyMatch");
				$('._matchingGiftsSection tr[id*="_trCorporate"]').detach().insertAfter('tr[id*="_trAnonymous"]');
				
				
				// Change HTML Text of Radio Button 
				
				/*
				var label_contents = $("label[for*='_rdoGiftType_1']").contents(); 
					label_contents[label_contents.length-1].nodeValue = "monthly";					
					
					
				var label_contentsOneTime = $("tr._TB_pnlDonationType label[for*='_rdoGiftType_0']").contents(); 
					label_contentsOneTime[label_contentsOneTime.length-1].nodeValue = "one-time gift";
				*/
				
				// Move Tribute Section to Top
				$('table.DonationFormTable tbody._tributeSection').detach().insertAfter('table.DonationFormTable tbody[id*="_TB_pnlDonation"]');
				$('tr#trECardsHeading').detach().appendTo('tbody._tributeSection');
				$('table.DonationFormTable tbody._tributeSection tr td.DonationButtonCell').detach().insertAfter('table.DonationFormTable tbody[id*="_tbdyPaymentInfo"] tr:last').parent();
				$('table.DonationFormTable tbody._tributeSection tr:contains("Mail a letter on my behalf")').addClass("_MailALetterOnBehalf");
				
				// Create Input PrettyCheckbox to Tribute Section Header for Drop Down Function
				tributeSection.find('tr td:contains("Is This Gift in Honor or Memory of Someone?")').prepend('<input type="checkbox" id="rdoHonorMem" value="rdo_honor_mem" name="rdoHonorMem" class="hiddenCheckbox" /> <label class="prettyCheckbox checkbox list" for="rdoHonorMem"><span class="holderWrap" style="width: 27px; height: 24px; margin: 5px 5px 0 0;"><span class="holder" style="width: 26px;"></span></span>My gift is in honor or memory of someone</label>');
				
				$("._tributeSection tr:first-child").addClass("tributeSectionHeader");
				
				// Delete Margins from eCard Section Body
				$('div.DonationECardSectionBody div:contains("Send me a copy of each email.")').css('margin-left','0px');
				
				// Move Tribute Section Fields
				$('<tr class="_BillingAddressSection"><td class="BBListingHeading DonationCaptureListingHeading" colspan="3"><span id="_lblBillingAddress">4. Billing Address</span></td></tr>').insertBefore('td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_addrline"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_city"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_state"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_zip"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_county"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_prov"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_suburb"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_Country"]').parent().detach().insertBefore('tbody[id*="_tbdyPaymentInfo"] td.DonationButtonCell');
				$('tr[id*="_trTributeDesc"]').detach().insertBefore('tr[id*="_trTributeName"]');
				
				
				// Turn Existing Select Options for "Honor of" & "In Memory Of" to radio buttons  
				tributeSection.find('select[id*="_ddlTribute"]').each(function(i, select) {
						
					var $select = $(select);
					$select.find('option').each(function(j, option){
						var $option = $(option);
						// Create a radio:
						var $radio = $('<input type="radio" />');
						// Set name and value:
						$radio.attr('name', $select.attr('name')).attr('value', $option.val());
						
						// When radio clicked change option on hidden select list
						$radio.click(function () {
							$('select[id*="_ddlTribute"]').val($(this).val());
							// Make Name Required
						    $('tr[id*="_trTributeName"] td[id*="_tdTributeRequiredMarker"]').css('visibility', 'visible');
						})
						
						// Set checked if the option was selected
						if ($option.attr('selected')) $radio.attr('checked', 'checked');							
						// Insert radio before select box:
						$select.before($radio);
						// Insert a label:
						$select.before(
						  $("<label />").attr('for', $select.attr('name')).text($option.text())
						);
						
						// Insert a space:
						$select.before("&nbsp;");
						
					});
					//hide select box
					$select.hide();
					//hide first "0" value in radio options
					$('td[id*="_tdTribDescControls"] input:radio[value=0]').hide();
					
				});
				
				$('td[id*="_tdTribDescControls"] input[value=1403]').attr('id', 'honorRadioButton');
				$('td[id*="_tdTribDescControls"] input[value=1404]').attr('id', 'memoryRadioButton');
				$('td[id*="_tdTribDescControls"] input[value=0]').attr('id', 'generalRadioButton');
				
				function tributeTypeCheck(){
					//if a tribute type is selected, check the radio button
					//var formID = $("table[id$='tblAmount']").attr("id").split("_")[0];
						
						var tributeType = $('select[id*="_ddlTribute"] option:selected').val();
						
						if(tributeType==1403){
							$("#honorRadioButton").attr("checked", "checked");
						}
						else if(tributeType==1404){
							$("#memoryRadioButton").attr("checked", "checked");
						}
						else if(tributeType==0){
							$("#generalRadioButton").attr("checked", "checked");
						}
				}
				
				// Move and remove tribute section form elements after they have been created/customized
				$('<tr class="_trTributeEmail"><td class="BBFieldControlCell DonationFieldControlCell"><input type="text" class="BBFormTextbox DonationTextboxWide" id="PC1819_txtAcknEmail" maxlength="120" name="PC1819$txtTributeAcknEmail"></td></tr>').insertAfter('tbody._tributeSection tr[id*="_trTributeName"]');
				tributeSection.find('tr._trTributeEmail').remove();
				tributeSection.find('tr td[id*="_AddressCtl_lbl_country"]').parent().remove();
				
				// Move Comments Section into Honor Section
				$('tr[id*="_trComments"] td textarea[id*="_txtComments"]').parent().parent().detach().insertAfter('tbody._matchingGiftsSection tr.CompanyMatch');
				
				tributeSection.find('tr td[id*="_AddressCtl_ctl_city"]').parent().addClass("tributeCity");
				tributeSection.find('tr td[id*="_AddressCtl_ctl_state"]').parent().addClass("tributeState");
				tributeSection.find('tr td[id*="_AddressCtl_ctl_zip"]').parent().addClass("tributeZip");
				tributeSection.find('tr td[id*="_AddressCtl_ctl_county"]').parent().addClass("tributeCounty");
				tributeSection.find('tr td[id*="_AddressCtl_ctl_prov"]').parent().addClass("tributeProv");
				tributeSection.find('tr td[id*="_AddressCtl_ctl_suburb"]').parent().addClass("tributeSuburb");
				
				tributeSection.find('tr td input[id*="_txtTributeAcknPhone"]').parent().parent().remove();
				tributeSection.find('tr td input[id*="_txtTributeAcknEmail"]').parent().parent().remove();
				tributeSection.find('tr[id*="_trTributeFirstName"]').remove();
				tributeSection.find('tr[id*="_trTributeLastName"]').remove();
				tributeSection.find('tr[id*="_trAcknowledgeeFirstName"]').remove();
				tributeSection.find('tr[id*="_trAcknowledgeeLastName"]').remove();
				$('.DonationCaptureFormTable tr td select[id*="_DonationCapture1_cboTitle"]').parent().parent().remove();
				$('input[id*="_DonationCapture1_txtPhone"]').parent().parent().addClass("_phoneNumber");
				
				$('._matchingGiftsSection tr td input#PC1819_269').parent().parent().addClass("_PersonalMessage");
				$("._matchingGiftsSection tr._PersonalMessage").detach().insertBefore('tbody._tributeSection tr#trECardsHeading');
				tributeSection.find("tr._PersonalMessage td input#PC1819_269").attr("maxlength", "300");
				tributeSection.find("tr._PersonalMessage td input#PC1819_269").css("width", "437");
				
				$('td[id*="_DonationCapture1_AddressCtl_ctl_zip"]').parent().css('position','relative');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_state"]').parent().css('width','135px');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_county"]').parent().css('width','135px');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_prov"]').parent().css('width','135px');
				$('td[id*="_DonationCapture1_AddressCtl_ctl_suburb"]').parent().css('width','135px');
				$('tbody[id*="_DonationCapture1_tbdyPaymentInfo"] tr select[id*="_DonationCapture1_cboCardType"]').parent().parent().addClass("cardType");
				$('tbody[id*="_DonationCapture1_tbdyPaymentInfo"] tr input[id*="_DonationCapture1_txtCardNumber"]').parent().parent().addClass("cardNumber");
				
				$('tbody._tributeSection tr#trECardsHeading').detach().insertBefore('tr._MailALetterOnBehalf');
				
				$('._tributeSection tr td[id*="_AddressCtl_ctl_addrline"]').parent().addClass("acknowledgeeAddress");
				
				// Change HTML Text of Radio Button
				var label_eCard = $("label[for*='_chkSendAnECard']").contents(); 
					label_eCard[label_eCard.length-1].nodeValue = "Send a card via email";
					
				var label_mail = $("label[for*='_chkAcknowledge']").contents(); 
					label_mail[label_mail.length-1].nodeValue = "Send a card through the mail on my behalf";
				
				// Change Need Help Icon to Text
				$('a.BBLinkHelpIcon').html("Need Help?");
				
				// Show/Hide In Honor or Memory Of Section based on options selected
				$('input[value="rdo_119_7"]').parent().parent().hide();
				$('input[value="rdo_120_7"]').parent().parent().hide();
				$('table.DonationECardTemplate tr td input[type="radio"]').removeClass("hiddenCheckbox");
				//tributeSection.find('tr[id*="_trTributeDesc2"] td input[id*="_txtTributeDescription"]').parent().parent().addClass("_PersonalMessage");
				$("tr._TB_pnlDonationType").show().insertBefore("tr._TB_pnlRecurringGift");
				
				//writeData();
				hideHonorMemor();
				$("tr._PersonalMessage").hide();
				$("tbody._tributeSection").attr('id', 'TributeSectionID');
				
				//Function to Scroll to the Tribute Section
				function skipToTop(){
					$(window).scrollTop($('body').offset().top);
				}
				
				function skipToTributeSection(){
					$(window).scrollTop($('tbody#TributeSectionID').offset().top);
				}
								
				
				//Function to Show the Honor/Memory Section when "My gift is in honor or memory of someone" is Checked
				function showHonorMemor() {
					$('tr[id*="_trTributeDesc"] td[id*="_tdTribDescControls"] input[type="radio"]').removeAttr("disabled");
					$('tr td:contains("My gift is in honor or memory of someone") label').addClass("checked");
					$('input#rdoHonorMem').attr("checked", "checked");
					$('input#rdoHonorMem').addClass("checked");
					$('tr[id*="_trTributeName"]').show().css('display','block');
					$('tr[id*="_trTributeDesc"]').show().css('display','block');
					$('tr#trECardsHeading').show();
					$('tr._MailALetterOnBehalf').show().css('display','inline-block');
					$("tr._PersonalMessage").hide();
					$('td[id*="_tdTribDescControls"] input:radio[value=0]').attr('checked', 'checked');
					$('tr._MailALetterOnBehalf').css("padding", "0 80px 0 12px");
					
					if ($('input[id*="_chkAcknowledge"]').attr('checked')) {
						
						$("tr._PersonalMessage").show().css('display','block');
						$("tr._PersonalMessage").css('margin-bottom','15px');
						$("tr.tributeCity").css('display','block');
						$("tr.tributeState").css('display','block');
						$("tr.tributeZip").css('display','block');
						$('._tributeSection tr[id*="trAcknowledgeeName"]').css('display','inline-block');
						$('._tributeSection tr.acknowledgeeAddress').css('display','inline-block');
						$('tr._MailALetterOnBehalf').css('margin-bottom','0px');
						
					}
					
					if ($.browser.msie && parseInt($.browser.version, 11) > 7){ 
						$('tr#trECardsHeading').css("float", "left");
						$('tr#trECardsHeading').css("width", "200px");
						$('tr#trECardsHeading').css("margin", "0px 0px 0px 0px");
						
						$('tr._MailALetterOnBehalf').css("float", "left");
						$('tr._MailALetterOnBehalf').css("width", "415px");
						$('tr._MailALetterOnBehalf').css("padding", "0 80px 0 0px");
					}
					
				}
				
				//Function to Hide the Honor/Memory Section when "My gift is in honor or memory of someone" radio is NOT Checked
				function hideHonorMemor() {
					$('tr td:contains("My gift is in honor or memory of someone") label').removeClass("checked");
					$('input#rdoHonorMem').removeClass("checked");
					$('tr[id*="_trTributeName"]').hide();
					$('tr[id*="_trTributeDesc"]').hide();
					$('tr#trECardsHeading').hide();
					$('tr._MailALetterOnBehalf').hide();
					$("tr._PersonalMessage").hide();
					$('td[id*="_tdTribDescControls"] input:radio[value=0]').attr('checked', 'checked');
				}
				
				//Function to Show the eCard Section when "Send a card via email" is Checked
				function showeCard() {
					$('#trECardsHeading td:contains("Send a card via email") label').addClass("checked");
					$('._MailALetterOnBehalf td:contains("Send a card through the mail on my behalf") label').removeClass("checked");
					$('table.DonationECardTemplate tr td input[type="radio"]').removeClass("hiddenCheckbox");
					$('#trECardsHeading input[id*="_chkSendAnECard"]').attr("checked", "checked");
					$("tr._PersonalMessage").hide();
					$('tr._MailALetterOnBehalf').css('margin-bottom','1px');
					
				}
				
				//Function to Hide the eCard Section when "Send a card via email" is NOT Checked
				function hideeCard() {
					$('#trECardsHeading td:contains("Send a card via email") label').removeClass("checked");
					$('#trECardsHeading input[id*="_chkSendAnECard"]').removeAttr("checked");
				}
				
				//Function to Show the Send a Card through the mail Section when "Send a card through the mail on my behalf" is Checked
				function showSendACardMail() {
					$("tr._PersonalMessage").show().css('display','block');
					$("tr._PersonalMessage").css('margin-bottom','15px');
					$("tr.tributeCity").css('display','block');
					$("tr.tributeState").css('display','block');
					$("tr.tributeZip").css('display','block');
					$('._tributeSection tr[id*="trAcknowledgeeName"]').css('display','inline-block');
					$('._tributeSection tr.acknowledgeeAddress').css('display','inline-block');
					$('tr._MailALetterOnBehalf').css('margin-bottom','0px');
				}
				
				
				//Function to Hide the Send a Card through the mail Section when "Send a card through the mail on my behalf" is NOT Checked
				function hideSendACardMail() {
					$("tr._PersonalMessage").hide();
				}	
				
				honorMemCheckbox = "";
					if($("#rdoHonorMem").parent().length > 0){
						honorMemCheckbox = $("input#rdoHonorMem")[0];
					}
				
				/*
				$("input#rdoHonorMem").change(function(){
					showHonorMemor();
					tributeTypeCheck();
					
					$(honorMemCheckbox).attr("checked", "checked");
					
					if (!location.hash.substring(1)){
						window.location.href = window.location.href + '#rdo_honor_mem';
						showHonorMemor();
						tributeTypeCheck();
					}
					else{
						//window.location.href = window.location.href.replace(/#(.*?)$/,'');
						hideHonorMemor();
					}
					tributeTypeCheck();
					setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
					setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
					
				});
			
				$('tr#trECardsHeading input[id*="_chkSendAnECard"]').click(function(e){
					e.preventDefault();
					tributeTypeCheck();
					$(honorMemCheckbox).attr("checked", "checked");
					$('tr#trECardsHeading input[id*="_chkSendAnECard"]').attr("checked", "checked");
						
					if (!location.hash.substring(1)) {
						
						window.location.href = window.location.href + '#eCard';
					}
					else {
						window.location.href = window.location.href.replace(/#(.*?)$/,'#eCard');
						
						$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').removeAttr("checked");
						tributeTypeCheck();
						setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
						setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
					}
				
				});
				
			
				$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').click(function(e){
					e.preventDefault();
					tributeTypeCheck();
					$(honorMemCheckbox).attr("checked", "checked");
					$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').attr("checked", "checked");	
					showSendACardMail();
					
					if (!location.hash.substring(1))
						window.location.href = window.location.href + '#mailCard';
						
					else 
						window.location.href = window.location.href.replace(/#(.*?)$/,'#mailCard');
						
					$('tr#trECardsHeading input[id*="_chkSendAnECard"]').removeAttr("checked");
					tributeTypeCheck();
					setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
					setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
						
				});
				*/
				
				var formID = $("table[id$='tblAmount']").attr("id").split("_")[0];
				
				//alert (formID);
				
				$("input#rdoHonorMem").change(function(){
					
					tributeTypeCheck();
					//skipToTributeSection();
					showHonorMemor();
					$(honorMemCheckbox).attr("checked", "checked");
					
					if (!location.hash.substring(1)){
						window.location.href = window.location.href + '#rdo_honor_mem';
						showHonorMemor();
						tributeTypeCheck();
					}
					else{
						window.location = "https://16765.thankyou4caring.org/sslpage.aspx?pid=407";
						hideHonorMemor();
						tributeTypeCheck();
						
						setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
						setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
					}
					
				});
			
				$('tr#trECardsHeading input[id*="_chkSendAnECard"]').click(function(e){
					
					e.preventDefault();
					tributeTypeCheck();
					
					$(honorMemCheckbox).attr("checked", "checked");
					$('tr#trECardsHeading input[id*="_chkSendAnECard"]').attr("checked", "checked");
						
					if (!location.hash.substring(1)) {
						
						window.location.href = window.location.href + '#eCard';
						tributeTypeCheck();
					}
					else{
						window.location.href = window.location.href.replace(/#(.*?)$/,'#eCard');
						
						$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').removeAttr("checked");
						
						tributeTypeCheck();
						setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
						setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
					}
					
				});
				
			
				$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').click(function(e){
					
					e.preventDefault();
					tributeTypeCheck();
					
					$(honorMemCheckbox).attr("checked", "checked");
					$('tr._MailALetterOnBehalf input[id*="_chkAcknowledge"]').attr("checked", "checked");	
					showSendACardMail();
					
					if (!location.hash.substring(1)){
						window.location.href = window.location.href + '#mailCard';
						tributeTypeCheck();
					}
						
					else{ 
						window.location.href = window.location.href.replace(/#(.*?)$/,'#mailCard');
						
						$('tr#trECardsHeading input[id*="_chkSendAnECard"]').removeAttr("checked");
						
						tributeTypeCheck();
						setTimeout("__doPostBack(\'"+formID+"$chkSendAnECard\',\'\')", 0);
						setTimeout("__doPostBack(\'"+formID+"$chkAcknowledge\',\'\')", 0);
					}
		
				});	
				

				
				
				if(window.location.href.match("rdoHonorMem=rdo_honor_mem")) {
					showHonorMemor();
					//skipToTributeSection();
					
				}
				
				if(window.location.href.match("#rdo_honor_mem")) {
					showHonorMemor();
					tributeTypeCheck();
					//skipToTributeSection();
					
				}
				
				if(window.location.href.match("#eCard")) {
					showHonorMemor();
					//skipToTributeSection();
					hideSendACardMail();
					$('tr._MailALetterOnBehalf').css('margin-bottom','1px');
					tributeTypeCheck();
				}
				
				if(window.location.href.match("#mailCard")) {
					showHonorMemor();
					//skipToTributeSection();
					showSendACardMail();
					tributeTypeCheck();
				}
				
								
				// Add Default Text to all input fields
				$('select[id*="_DonationCapture1_cboTitle"]').find("option[value=228]").attr("selected", true);
				$('select[id*="_DonationCapture1_cboMonth"]').find("option[value=1]").attr("selected", true);
				$('select[id*="_DonationCapture1_cboYear"]').find("option[value=2012]").attr("selected", true);
				$('td.DonationButtonCell input.DonationSubmitButton').attr("value", "Donate");
				
				  
				 // Hide Labels in eCard Section
				 $('tr[id*="_trECardsData"] .DonationECardSectionBody table[id*="_gvRecipientInfo"] tr:first-child').hide();
				 $('tr[id*="_trECardsData"] .DonationECardSectionBody table[id*="_gvSenderInfo"] tr:first-child').hide();
				  
				//Create Table for Auto Credit Card Detection Logos
				$('<tr id="CCLogos"><td class="DonationCaptureFieldControlCell CardLogos"><img class="amexLogo" src="image/custom-donation-form-images/cc_americanexpress.png" alt="American Express" /><img class="discoverLogo" src="image/custom-donation-form-images/cc_discover.png" alt="Discover" /><img class="mastercardLogo" src="image/custom-donation-form-images/cc_mastercard.png" alt="MasterCard" /><img class="visaLogo" src="image/custom-donation-form-images//cc_visa.png" alt="Visa" /></td></tr>').insertAfter('tbody[id*="_DonationCapture1_tbdyPaymentInfo"] tr.cardType');
				
				
				// Auto Detect CC Card Type when a user types credit card number into form field
				var CardIssuers = new function() {
				var issuerInput = $('[id*="_DonationCapture1_cboCardType"]');
			 
					function cardIssuer(name, pattern, logo) {
						this.Name = name;
						this.Logo = logo;
						this.Pattern = pattern;
					};
					 
					var issuers = new Array (
							new cardIssuer("c4a56513-9fdb-44c5-9b19-e617f2596107", /^3[47][0-9]{13}$/, $(".amexLogo")),
							new cardIssuer("bf0ed898-ab0c-4374-9cef-1e66b09e816d", /^6(?:011|5[0-9]{2})[0-9]{12}$/, $(".discoverLogo")),
							new cardIssuer("b34832f7-8a95-47fa-9c43-bc8682562ea5", /^5[1-5][0-9]{14}$/, $(".mastercardLogo")),
							new cardIssuer("5963a708-fc7f-48af-952f-16d574c4b833", /^4[0-9]{12}(?:[0-9]{3})?$/, $(".visaLogo"))
						);
			 
					function resetIssuer() {
						//issuerInput.val("");
			 
						for (issuer in issuers) {
							issuers[issuer].Logo.css({opacity: 0.25});
						}
					};
			 
					function validateLuhnChecksum(cardNumber) {
						var sum = 0;
						var mul = 1;
			 
						for (var x = cardNumber.length; x > 0 ; x--) {
							var tproduct = parseInt(cardNumber.charAt(x - 1), 10) * mul;
							if (tproduct >= 10)
								sum += (tproduct % 10) + 1;
							else
								sum += tproduct;
							 
							if (mul == 1)
								mul++;
							else
								mul--;
						}
				 
						return ((sum % 10) == 0);
					}
			 
					var ValidateNumber = function(cardNumber) {
						//resetIssuer();
		 
						if (!validateLuhnChecksum(cardNumber))
							return false;
		 
						for (issuer in issuers) {
							if (issuers[issuer].Pattern.test(cardNumber)) {
								issuers[issuer].Logo.css({opacity: 1.0});
								issuerInput.val(issuers[issuer].Name);
								return true;
							}
						}
		 
						return false;
					};
			 
					resetIssuer();
					return { ValidateNumber : ValidateNumber };
				};
				
			$('[id*="_DonationCapture1_txtCardNumber"]').bind("change keyup", function() {
				CardIssuers.ValidateNumber($(this).val());     
			});
			
			$('form').submit(function(evt){
				evt.preventDefault();
				setTimeout("__doPostBack(\'PC1819$btnNext\',\'\')", 0);
			}); 
			
			$('tr[id*="_trECardsData"] input[name="PC1819$gvSenderInfo$ctl02$txtName"]').parent().parent().addClass("senderName");
			$('tr[id*="_trECardsData"] input[name="PC1819$gvSenderInfo$ctl02$txtEmail"]').parent().parent().addClass("senderEmail");
			
			$('tr[id*="_trECardsData"] input[name="PC1819$gvRecipientInfo$ctl02$txtName"]').parent().parent().addClass("recipentName");
			$('tr[id*="_trECardsData"] input[name="PC1819$gvRecipientInfo$ctl02$txtEmail"]').parent().parent().addClass("recipentEmail");
			
			// Add Placeholder Text for all form inputs
			$('input[id*="_DonationCapture1_txtFirstName"]').attr('placeholder', 'first name');
			$('input[id*="_DonationCapture1_txtLastName"]').attr('placeholder', 'last name');
			$('textarea[id*="_DonationCapture1_AddressCtl_tb_AddressLine"]').attr('placeholder', 'billing street address');
			tributeSection.find('textarea[id*="_AddressCtl_tb_AddressLine"]').attr('placeholder', 'recipient address');
			$('input[id*="_AddressCtl_tb_Zip"]').attr('placeholder', 'zip');
			$('input[id*="_AddressCtl_tb_City"]').attr('placeholder', 'city');
			$('tr[id*="_trTributeName"] td input[id*="_txtTribute"]').attr('placeholder', 'tribute name');
			$('input[id*="_DonationCapture1_txtEmail"]').attr('placeholder', 'email');
			$('input[id*="_DonationCapture1_txtPhone"]').attr('placeholder', 'phone');
			$('input[id*="_DonationCapture1_txtCardholder"]').attr('placeholder', 'name on card');
			$('input[id*="_DonationCapture1_txtCardNumber"]').attr('placeholder', 'card number');
			$('input[id*="_DonationCapture1_txtCSC"]').attr('placeholder', 'cvv code');
			$('tr._trTributeEmail td input[id*="_txtAcknEmail"]').attr('placeholder', 'contact email');
			$('tr[id*="_trAcknowledgeeName"] td input[id*="_txtTributeAcknFullName"]').attr('placeholder', 'recipient name');
			$('tr[id*="_DonationCapture1_tr_MGCompany"] td input[id*="_DonationCapture1_MGCompany"]').attr('placeholder', 'company name');
			$('tr._PersonalMessage input').attr('placeholder', 'personal message');
			$('tr[id*="_trComments"] td textarea[id*="_txtComments"]').attr('placeholder', 'comments');
			
			$('tr[id*="_Recurrence_trRange"] input[id*="_Recurrence_DatePickerStart"]').removeAttr('placeholder');
			$('tr[id*="_trECardsData"] .DonationECardSectionBody input[id*="_dpSendDate"]').removeAttr('placeholder');
			
			$('tr[id*="_trECardsData"] td.senderName input').attr('placeholder', 'sender name');	
					
			$('tr[id*="_trECardsData"] td.senderEmail input').attr('placeholder', 'sender email');
			
			$('tr[id*="_trECardsData"] td.recipentName input').attr('placeholder', 'recipient name');			
			$('tr[id*="_trECardsData"] td.recipentEmail input').attr('placeholder', 'recipient email');
			
			$('tr.cardType td option:first').html("select card type");
			$('tr.cardType td option:first').attr('placeholder', 'select card type');
			$('tr.cardType td option:first').attr('val', 'select card type');
			
			
			$('input[placeholder], textarea[placeholder]').placeholder();
			
			$('.DonationValidationSummary ul li:contains("Please select a Tribute type from the drop down list.")').html("Please select &quot;in memory of&quot; or &quot;in honor of&quot; below.");
			
			$('tr[id*="_trECardsData"] .DonationECardSectionSeparator span[id*="_lblECardSenderHeading"]:contains("Sender information")').html("Your information as it should appear on the eCard");
			
			$('tr[id*="_trECardsData"] .DonationECardSectionBody label:contains("Do not send, as I prefer to print the eCard.")').hide();
			
			$('input[id*="_txtCSC"]').parent().parent().addClass("CSCNumber");


			// IE FIXES
			if ($.browser.msie && parseInt($.browser.version, 11) > 7) { 
			
			$('tr[id*="_trECardsData"] td.senderName input').val('sender name');	
			$('tr[id*="_Recurrence_trRange"] input[id*="_Recurrence_DatePickerStart"]').removeAttr('placeholder');
			$('tr[id*="_trECardsData"] .DonationECardSectionBody input[id*="_dpSendDate"]').removeAttr('placeholder');
				
				$('tr#trECardsHeading').css("float", "left");
				$('tr#trECardsHeading').css("width", "200px");
				$('tr#trECardsHeading').css("margin", "0px 0px 0px 0px");
				
				$('tr._MailALetterOnBehalf').css("float", "left");
				$('tr._MailALetterOnBehalf').css("width", "415px");
				$('tr._MailALetterOnBehalf').css("padding", "0 80px 0 0px");
					
				// Add custom IE styles to inputs
				if(window.location.href.match("#mailCard")) {
					$('.tributeState').css('width', '145px');
					$('.tributeCity').css('margin', '0px 0px 0px 0px');
					$('.tributeZip').css('width', '245px');
					tributeTypeCheck();
				}
					
				$('td[id*="_tdTribDescControls"] select').find("option[value=0]").removeAttr("selected");
				$('td[id*="_tdTribDescControls"] input[val=0]').removeAttr("selected");
				
				/*$('tr._TB_pnlRecurringGift input[id*="_rdoGiftType_1"]').click(function(){
					setTimeout('__doPostBack(\'PC1819$rdoGiftType$1\',\'\')', 0);
				});*/
				
				$('td[id*="_Recurrence_tdFrequency"]').remove();
				$('td.DonationFieldControlCell tr:contains("Installments")').remove();
				
				// placeholder polyfill
				function add() {
					if($(this).val() === ''){
						$(this).val($(this).attr('placeholder')).addClass('placeholder');
					}
				}
				// function to remove placeholder text
				function remove() {
					if($(this).val() === $(this).attr('placeholder')){
						$(this).val('').removeClass('placeholder');
					}
				}
				
				// Create a dummy element for feature detection
				if (!('placeholder' in $('<input>')[0])) {
		
					// Select the elements that have a placeholder attribute
					$('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
					
					//var formID = $("table[id$='tblAmount']").attr("id").split("_")[0];
					// Remove the placeholder text before the form is submitted
					$('.DonationSubmitButton').click(function(){
						//e.preventDefault();
						$('form').find('input[placeholder], textarea[placeholder], select[placeholder], option[placeholder]').each(remove);
						/*(function(btn){
							var bDisableMe=true;
							__doPostBack('PC1819$btnNext','');
							//__doPostBack('"'+formID+'"$btnNext','');
							btn.disabled=bDisableMe;
						})(this); return false;*/
						setTimeout("__doPostBack(\'PC1819$btnNext\',\'\')", 0);
					});
					$('form').submit(function(){
						// e.preventDefault();
						//$(this).find('input[placeholder], textarea[placeholder], select[placeholder], option[placeholder]').each(remove);
						setTimeout("__doPostBack(\'PC1819$btnNext\',\'\')", 0);
					}); 
				}
			}
				
		},
			
		preselectFields: function() {
			
		/*
		// If tribute name entered, auto show the section (after panel refreshes):	
		var tributeName = $('input[id*="_txtTribute"]').val();
		if (tributeName != "tribute name" && tributeName != "") {
			$('input#rdoHonorMem').trigger('click');
		}
		*/
				
			  // If company name entered, auto show the section (after panel refreshes):	
			  var companyName = $('input[id*="_DonationCapture1_MGCompany"]').val();
			  if (companyName != "company name" && companyName != "") {
				  $('input#rdoHonorMem').trigger('click');
			  }
		
		}
			
	}
}
	
	
};

// Run global scripts...
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {
	BBI.Methods.init();
	
	$(document).ready(function() {
	
		BBI.Methods.pageLoad();
		BBI.Methods.donation.init();
		
		//Show $6000 & $12000 Donation Options based on URL query and Select $6000 option		
				if (document.location.href.search("givingLevels=rdo_119_7")!=-1){
					$('input[value="rdo_107_7"]').parent().parent().hide();
					$('input[value="rdo_108_7"]').parent().parent().hide();
					$('input[value="rdo_109_7"]').parent().parent().hide();
					$('input[value="rdo_110_7"]').parent().parent().hide();
					$('input[value="rdo_111_7"]').parent().parent().hide();
					$("._TB_pnlRecurringGift").hide();
					$('tr[id*="_trOther"]').hide();
					$('input[value="rdo_119_7"]').parent().parent().show();
					$('input[value="rdo_120_7"]').parent().parent().show();
					$('input[value="rdo_119_7"]').trigger('click');
					$("tr._TB_pnlDonationType").hide();
					$('input[value="rdo_119_7"]').attr("checked", "checked");
					
				}
				
				//Show $6000 & $12000 Donation Options based on URL query and Select $12000 option	
				if (document.location.href.search("givingLevels=rdo_120_7")!=-1){
					$('input[value="rdo_107_7"]').parent().parent().hide();
					$('input[value="rdo_108_7"]').parent().parent().hide();
					$('input[value="rdo_109_7"]').parent().parent().hide();
					$('input[value="rdo_110_7"]').parent().parent().hide();
					$('input[value="rdo_111_7"]').parent().parent().hide();
					$("._TB_pnlRecurringGift").hide();
					$('tr[id*="_trOther"]').hide();
					$('input[value="rdo_119_7"]').parent().parent().show();
					$('input[value="rdo_120_7"]').parent().parent().show();
					$('input[value="rdo_120_7"]').trigger('click');
					$("tr._TB_pnlDonationType").hide();
					$('input[value="rdo_120_7"]').attr("checked", "checked");
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $25 option	
				if (document.location.href.search("givingLevels=rdo_107_5")!=-1){
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
					$('input[value="rdo_107_7"]').trigger('click');
					$('input[value="rdo_107_7"]').attr("checked", "checked");
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $50 option	
				if (document.location.href.search("givingLevels=rdo_108_5")!=-1){
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
					$('input[value="rdo_108_7"]').trigger('click');
					$('input[value="rdo_108_7"]').attr("checked", "checked");
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $100 option	
				if (document.location.href.search("givingLevels=rdo_109_5")!=-1){
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
					$('input[value="rdo_109_7"]').trigger('click');
					$('input[value="rdo_109_7"]').attr("checked", "checked");
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $250 option
					
				if (document.location.href.search("givingLevels=rdo_110_5")!=-1){
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
					$('input[value="rdo_110_7"]').trigger('click');
					$('input[value="rdo_110_7"]').attr("checked", "checked");
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $500 option
				if (document.location.href.search("givingLevels=rdo_111_5")!=-1){
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
					$('input[value="rdo_111_7"]').trigger('click');
					$('input[value="rdo_111_7"]').attr("checked", "checked");
					rdo_OnClick(this);
				}
				
				//Show $25 & $500 Donation Options based on URL query and Select $Other amount option	
				if (document.location.href.search("donation=other")!=-1){
					$('input[value="rdoOther"]').attr("checked", "checked");
					$('tr[id*="_trOther"] td[id*="_tdOther"] label').addClass("checked");
					$('input[value="rdoOther"]').trigger('click');
					$('input[value="rdo_119_7"]').parent().parent().hide();
					$('input[value="rdo_120_7"]').parent().parent().hide();
				}
		
	});
	

});
