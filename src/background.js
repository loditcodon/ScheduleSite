import { Record } from "./Record.js";
import { RecordStorage } from "./RecordStorage.js";

const ScheduleBlock_messages = [
	"ScheduleBlock_RecordStorage_ImportSettings",		//  0
	"ScheduleBlock_RecordStorage_ExportSettings",		//  1
	"ScheduleBlock_InitializeOptions",					//  2
	"ScheduleBlock_SaveGeneralProperties",				//  3
	"ScheduleBlock_RefreshTable",						//  4
	"ScheduleBlock_OpenEditMenu",						//  5
	"ScheduleBlock_RecordStorage_CreateNewRecord",		//  6
	"ScheduleBlock_RecordStorage_MoveRecord",			//  7
	"ScheduleBlock_RecordStorage_EditRecord",			//  8
	"ScheduleBlock_RecordStorage_DeleteRecord",			//  9
	"ScheduleBlock_RecordStorage_TestWebsite",			// 10
	"ScheduleBlock_RecordStorage_GetWebsiteUnlockTime",	// 11
	"ScheduleBlock_InitialContentCheck",				// 12
	"CreateNewRecord"
];

function isValidURL(givenURL){
	if(givenURL){
	  if(givenURL.includes(".")){
		return true;
	  }
	  else{
		return false;
	  }
	}
	else{
	  return false;
	}
  }
  function secondsToString(seconds,compressed=false){
	  let hours = parseInt(seconds/3600);
	  seconds = seconds%3600;
	  let minutes= parseInt(seconds/60);
	  seconds = seconds%60;
	  let timeString = "";
	  if(hours){
		timeString += hours + " hrs ";
	  }
	  if(minutes){
		timeString += minutes + " min ";
	  }
	  if(seconds){
		timeString += seconds+ " sec ";
	  }
	  if(!compressed){
		return timeString;
	  }
	  else{
		if(hours){
		  return(`${hours}h`);
		}
		if(minutes){
		  return(`${minutes}m`);
		}
		if(seconds){
		  return(`${seconds}s`);
		}
	  }
	};
  
  function getDateString(nDate){
	let nDateDate=nDate.getDate();
	let nDateMonth=nDate.getMonth()+1;
	let nDateYear=nDate.getFullYear();
	if(nDateDate<10){nDateDate="0"+nDateDate;};
	if(nDateMonth<10){nDateMonth="0"+nDateMonth;};
	let presentDate = nDateYear+"-"+nDateMonth+"-"+nDateDate;
	return presentDate;
  }
//   function getDomain(tablink){
// 	if(tablink){
// 	  let url =  tablink[0].url;
// 	  return url.split("/")[2];
// 	}
// 	else{
// 	  return null;
// 	}
//   };
function getDomain(tablink) {
	if (tablink && tablink.length > 0 && tablink[0].url) {
	  let url = tablink[0].url;
	  return url.split("/")[2];
	} else {
	  return null;
	}
  }
  
  
function updateTime(){
	chrome.tabs.query({"active":true,"lastFocusedWindow": true},function(activeTab){
		let domain = getDomain(activeTab);
		if(isValidURL(domain)){
			let today = new Date();
			let presentDate = getDateString(today);
			let myObj = {};
			myObj[presentDate]={};
			myObj[presentDate][domain] = "";
			let timeSoFar = 0;
			chrome.storage.local.get(presentDate,function(storedObject){
				if(storedObject[presentDate]){
					if(storedObject[presentDate][domain]){
				  		timeSoFar = storedObject[presentDate][domain]+1;
				  		storedObject[presentDate][domain] = timeSoFar;
				  		chrome.storage.local.set(storedObject,function(){
					  		console.log("Set "+domain+" at "+storedObject[presentDate][domain]);
					  		chrome.action.setBadgeText({'text':secondsToString(timeSoFar,true)});
				  		});
					}else{
				  		timeSoFar++;
				  		storedObject[presentDate][domain] = timeSoFar;
				  		chrome.storage.local.set(storedObject,function(){
						console.log("Set "+domain+" at "+storedObject[presentDate][domain]);
						chrome.action.setBadgeText({'text':secondsToString(timeSoFar,true)});
				  	})
				}
			}else{
				timeSoFar++;
				storedObject[presentDate] = {};
				storedObject[presentDate][domain] = timeSoFar;
				chrome.storage.local.set(storedObject,function(){
					console.log("Set "+domain+" at "+storedObject[presentDate][domain]);
					chrome.action.setBadgeText({'text':secondsToString(timeSoFar,true)});
				})
			  }
		  });
		}
		else{
		  chrome.action.setBadgeText({'text':''});
		}
	});
  
	  // console.log(timeSoFar);
};
  
  var intervalID;
  
  intervalID = setInterval(updateTime,1000);
  setInterval(checkFocus,500)
  
  function checkFocus(){
	chrome.windows.getCurrent(function(window){
	  if(window.focused){
		if(!intervalID){
		  intervalID = setInterval(updateTime,1000);
		}
	  }
	  else{
		if(intervalID){
		  clearInterval(intervalID);
		  intervalID=null;
		}
	  }
	});
}

chrome.runtime.onMessage.addListener((message, sender, callback) => {
	// Handle the new message type "CreateNewRecord"
	if (message.type === "CreateNewRecord") {
	  const { domain } = message;
	  handleCreateNewRecord(domain);
	}
  
	// ... (existing message handling code)
  });

function handleCreateNewRecord(domain) {
	// Create a new record with the provided domain
	let recordStorage = new RecordStorage();
	recordStorage.createNewRecord(domain)
	  .then(() => {
		console.log(`Added ${domain} to createNewRecord`);
	  })
	  .catch((error) => {
		console.error("Error adding domain to createNewRecord:", error);
	  });
  }

export function main()
{
	let recordStorage = new RecordStorage();
	let currentLastPromise = Promise.resolve();

	async function asyncHandler(message, sender, callback)
	{
		console.log("background worker handling ", message, " from ", sender);

		let message_type = ScheduleBlock_messages.indexOf(message.type);
		if(message_type == 1)
		{
			//"ScheduleBlock_RecordStorage_ExportSettings"
			await recordStorage.exportSettings().then(
				(settings) => {
					chrome.tabs.sendMessage(
						sender.tab.id,
						{
							type: "ScheduleBlock_Options_Export",
							settings: settings
						}
					);
				}
			);
		}
		else if(message_type == 2)
		{
			//"ScheduleBlock_InitializeOptions"
			await recordStorage.getGeneralProperties().then(
				(properties) => {
					chrome.tabs.sendMessage(
						sender.tab.id,
						{
							type: "ScheduleBlock_Options_Initialize",
							properties: properties
						}
					);
				}
			);
		}
		else if(message_type == 3)
		{
			//"ScheduleBlock_SaveGeneralProperties"
			await recordStorage.setGeneralProperties(message.newProperties);
		}
		else if(message_type == 5)
		{
			//"ScheduleBlock_OpenEditMenu"
			await recordStorage.getOne(message.id).then(
				(element) => {
					let json = Record.toJSON([element]);
					//console.log(json);
					chrome.tabs.sendMessage(
						sender.tab.id,
						{
							type: "ScheduleBlock_Options_OpenEditMenu",
							data: json
						}
					);
				}
			);
		}
		else if(message_type == 0 || message_type == 4 || message_type == 6
				|| message_type == 7 || message_type == 8 || message_type == 9)
		{
			//"ScheduleBlock_RecordStorage_ImportSettings"
			//"ScheduleBlock_RefreshTable"
			//"ScheduleBlock_RecordStorage_CreateNewRecord"
			//"ScheduleBlock_RecordStorage_MoveRecord"
			//"ScheduleBlock_RecordStorage_EditRecord"
			//"ScheduleBlock_RecordStorage_DeleteRecord"

			(async () => {
				if(message_type == 0)
				{
					await recordStorage.importSettings(message.newSettings).then(
						(result) => {
							if(result !== true)
							{
								chrome.tabs.sendMessage(
									sender.tab.id,
									{
										type: "ScheduleBlock_Options_ImportFailed",
										reason: result
									}
								);
							}
						}
					);
				}
				else if(message_type == 6)
					await recordStorage.createNewRecord(message.regex);
				else if(message_type == 7)
					await recordStorage.moveRecord(message.id, message.newId);
				else if(message_type == 8)
					await recordStorage.editRecord(message.id, Record.fromJSON(message.newValue)[0]);
				else if(message_type == 9)
					await recordStorage.deleteRecord(message.id);
			})().then(
				async () => {
					await recordStorage.getAll().then(
						(arr) => {
							let json = Record.toJSON(arr);
							//console.log(json);
							chrome.tabs.sendMessage(
								sender.tab.id,
								{
									type: "ScheduleBlock_Options_SetTableData",
									data: json
								}
							);
						}
					);
				}
			);
		}
		else if(message_type == 10)
		{
			//"ScheduleBlock_RecordStorage_TestWebsite"
			await recordStorage.testWebsite(message.urlAddress, message.softCheck).then(
				async (userScript) => {
					if(userScript !== false)
					{
						await recordStorage.getGeneralProperties().then(
							(settings) => {
								console.log("Sending script '" + userScript + "' to '" + message.urlAddress + "'");
								chrome.tabs.sendMessage(
									sender.tab.id,
									{
										type: "ScheduleBlock_Content_ExecuteAction",
										action: userScript.replace("$ScheduleBlock_LockScreen$",
																	settings.LockScreenBase
																	+ "?requested_by=ScheduleBlock&source="
																	+ btoa(message.urlAddress))
									}
								);
							}
						);
					}
				}
			);
		}
		else if(message_type == 11)
		{
			//"ScheduleBlock_RecordStorage_GetWebsiteUnlockTime"
			await recordStorage.getWebsiteUnlockTime(message.urlAddress).then(
				(unlockTime) => {
					if(unlockTime !== false)
					{
						/*console.log("Sending script '" + userScript +
								"' to '" + message.urlAddress + "'");*/
						chrome.tabs.sendMessage(
							sender.tab.id,
							{
								type: "ScheduleBlock_LockScreen_SetUnlockTime",
								unlockTime: unlockTime.getTime()
							}
						);
					}
				}
			);
		}
		else if(message_type == 12)
		{
			//"ScheduleBlock_InitialContentCheck"
			await recordStorage.getGeneralProperties().then(
				async (settings) => {
					if(message.urlAddress.indexOf(settings.LockScreenBase) === 0
						&& message.urlAddress.indexOf('requested_by=ScheduleBlock') != -1)
					{
						// Create alock screen
						chrome.tabs.sendMessage(
							sender.tab.id,
							{
								type: "ScheduleBlock_Content_CreateLockScreen",
								properties: settings
							}
						);
						return;
					}

					await recordStorage.testWebsite(message.urlAddress, true).then(
						(userScript) => {
							if(userScript !== false)
							{
								// Execute action (such as a redirect)
								console.log("Sending script '" + userScript +
										"' to '" + message.urlAddress + "'");
								chrome.tabs.sendMessage(
									sender.tab.id,
									{
										type: "ScheduleBlock_Content_ExecuteAction",
										action: userScript.replace("$ScheduleBlock_LockScreen$",
																settings.LockScreenBase
																+ "?requested_by=ScheduleBlock&source="
																+ btoa(message.urlAddress))
									}
								);
							}
							else
							{
								// Establish check cycle
								chrome.tabs.sendMessage(
									sender.tab.id,
									{
										type: "ScheduleBlock_Content_Initialize",
										properties: settings
									}
								);
							}
						}
					);

					// Update the popup UI with the current page information
					chrome.runtime.sendMessage({
						type: "UpdateCurrentPage",
						currentWebsite: getDomain([sender.tab])
					});
				}
			);
		}
	}

	chrome.runtime.onMessage.addListener((message, sender, callback) => {
		//console.log("background worker got message ", message, " from ", sender);

		if(ScheduleBlock_messages.indexOf(message.type) != -1)
		{
			currentLastPromise = currentLastPromise
								.then(() => asyncHandler(message, sender, callback));
		}
	});

	//console.log(Record.toJSON([new Record()]));
	console.log("Background script initialized");
}
async function fetchDataFromApi() {
	let recordStorage = new RecordStorage();
    await fetchDataForCheckbox('flexSwitchCheckChecked1', 'Malicious_URL', 'https://schedulesite.gachcloud.net/api/data/maliciousUrl',recordStorage);
    await fetchDataForCheckbox('flexSwitchCheckChecked2', 'Phishing_URL', 'https://schedulesite.gachcloud.net/api/data/phishingUrl',recordStorage);
    await fetchDataForCheckbox('flexSwitchCheckChecked3', 'Pup_URL', 'https://schedulesite.gachcloud.net/api/data/pupUrl',recordStorage);
    await fetchDataForCheckbox('flexSwitchCheckChecked4', 'Tracking_URL', 'https://schedulesite.gachcloud.net/api/data/trackingUrl',recordStorage);
    await fetchDataForCheckbox('flexSwitchCheckChecked5', 'VNBad_URL', 'https://schedulesite.gachcloud.net/api/data/vnbadsiteUrl',recordStorage);
}
async function fetchDataForCheckbox(checkboxId, storageKey, url,recordStorage) {
	console.log(checkboxId, storageKey, url);
    getDataCheckbox(checkboxId, async function (value) {
        if (value !== undefined && value === true) {
            try {
                recordStorage.removeRecordCustom(storageKey);
                const response = await fetch(url);
                if (response.ok) {
                    const jsonData = await response.json();
                    const domains = jsonData.map(entry => entry.domain);
                    for (const domain of domains) {
                        await recordStorage[`createNewRecord${storageKey}`](domain);
                    }
                } else {
                    console.error(`Failed to fetch data from the API for ${storageKey}:`, response.status, response.statusText);
                }
            } catch (error) {
                console.error(`Error fetching data from the API for ${storageKey}:`, error);
            }
        }
    });
}
function getDataCheckbox(storageKey, callback) {
	chrome.storage.local.get(storageKey, function (result) {
		const savedState = result[storageKey];
		callback(savedState);
	});
}
setInterval(updateTime, 1000);

  setInterval(fetchDataFromApi, 3600000);