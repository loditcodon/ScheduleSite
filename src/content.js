/**
 * @file Describes what happens every time any page is loaded.
<<<<<<< HEAD
 * @author sdasda7777
=======
 * @author khanhnguyenduy
>>>>>>> origin/main
 */

let documentLoaded = false;
window.addEventListener("load",
	() => {
		documentLoaded = true;
	}
);

// Logging function
<<<<<<< HEAD
function logJ()
{
	console.log.apply(this,
		Array.prototype.slice.call(arguments, 0).map((i)=>JSON.stringify(i)));
=======
function logJ() {
	console.log.apply(this,
		Array.prototype.slice.call(arguments, 0).map((i) => JSON.stringify(i)));
>>>>>>> origin/main
};

const defaultLocationChangeRegex = new RegExp("^window.location = '(?:[^\\']|\\.)*';$");

chrome.runtime.onMessage.addListener(
	(message) => {
<<<<<<< HEAD
		if(message.type === "ScheduleBlock_Content_ExecuteAction")
		{
			//logJ(message.action);
			if(message.action == "window.close();")
			{
				window.close();
			}
			else if(defaultLocationChangeRegex.test(message.action))
			{
				window.location = message.action.slice("window.location = '".length, -("';".length));
			}
			else if(message.action !== undefined)
			{
=======
		if (message.type === "ScheduleBlock_Content_ExecuteAction") {
			//logJ(message.action);
			if (message.action == "window.close();") {
				window.close();
			}
			else if (defaultLocationChangeRegex.test(message.action)) {
				window.location = message.action.slice("window.location = '".length, -("';".length));
			}
			else if (message.action !== undefined) {
>>>>>>> origin/main
				const scriptElement = document.createElement('div');
				scriptElement.setAttribute('onclick', message.action);
				document.documentElement.appendChild(scriptElement);
				scriptElement.click();
				scriptElement.remove();
			}
		}
<<<<<<< HEAD
		else if(message.type === "ScheduleBlock_Content_Initialize")
		{
=======
		else if (message.type === "ScheduleBlock_Content_Initialize") {
>>>>>>> origin/main
			// This sets up continuous hard lock checks
			let checker = setInterval(
				() => {
					// This condition prevents "Uncaught error: Extension context invalidated"
					//  (would otherwise happen when extension is unloaded during operation)
<<<<<<< HEAD
					if(chrome === undefined
					   || chrome.runtime === undefined
					   || chrome.runtime.id === undefined)
					{
=======
					if (chrome === undefined
						|| chrome.runtime === undefined
						|| chrome.runtime.id === undefined) {
>>>>>>> origin/main
						clearInterval(checker);
						return;
					}

					// Hard lock check
					let sending = chrome.runtime.sendMessage(
						{
							type: "ScheduleBlock_RecordStorage_TestWebsite",
							urlAddress: window.location.href,
							softCheck: false
						}
					);
				},
				message.properties.CheckFrequency * 1000
			);
		}
<<<<<<< HEAD
		else if(message.type === "ScheduleBlock_Content_CreateLockScreen")
		{
=======
		else if (message.type === "ScheduleBlock_Content_CreateLockScreen") {
>>>>>>> origin/main
			let createLockScreenLambda = () => {
				// Clear the website
				document.querySelector("html").innerHTML = "";

				// Initialize main elements
				let sourceUrl = atob(new URLSearchParams(window.location.search).get("source"));
				window.top.document.title = "Locked: " + sourceUrl;
				//let iconOverride = document.createElement("link");
				//iconOverride.rel = "icon";
				//iconOverride.href = chrome.runtime.getURL("images/ScheduleBlock128.png");
				//window.top.document.querySelector("head").appendChild(iconOverride);

				let sourceDisplay = document.createElement("h2");
				sourceDisplay.id = "sourceDisplay";
				sourceDisplay.innerText = sourceUrl;
				document.querySelector("body").appendChild(sourceDisplay);

				let remainingTimeDisplay = document.createElement("h2");
				remainingTimeDisplay.id = "remainingTimeDisplay";
				document.querySelector("body").appendChild(remainingTimeDisplay);

				let backButton = document.createElement("input");
				backButton.type = "button";
				backButton.value = "Go back";
				document.querySelector("body").appendChild(backButton);
<<<<<<< HEAD
				backButton.addEventListener("click", ()=>{window.location = sourceUrl;});
=======
				backButton.addEventListener("click", () => { window.location = sourceUrl; });
>>>>>>> origin/main

				// Create style tag, set background color
				console.log(message.properties);
				let styleSheet = document.createElement("style");
				styleSheet.type = "text/css";
				styleSheet.innerHTML = "*{background-color:" + message.properties.Background + ";}";
				document.querySelector("body").appendChild(styleSheet);

				// Initialize timer
				let unlockTime = 0;
				let displayIntervalHandle = null;

				chrome.runtime.onMessage.addListener(
					(message) => {
						console.log(message);

<<<<<<< HEAD
						if(message.type === "ScheduleBlock_LockScreen_SetUnlockTime")
						{
							if(displayIntervalHandle !== null)
								clearInterval(displayIntervalHandle);
							unlockTime = new Date(message.unlockTime);

							let updateTimeDisplay = () =>
							{
								if(chrome === undefined
								   || chrome.runtime === undefined
								   || chrome.runtime.id === undefined)
								{
=======
						if (message.type === "ScheduleBlock_LockScreen_SetUnlockTime") {
							if (displayIntervalHandle !== null)
								clearInterval(displayIntervalHandle);
							unlockTime = new Date(message.unlockTime);

							let updateTimeDisplay = () => {
								if (chrome === undefined
									|| chrome.runtime === undefined
									|| chrome.runtime.id === undefined) {
>>>>>>> origin/main
									clearInterval(displayIntervalHandle);
									return;
								}

								let currentTime = new Date();
<<<<<<< HEAD
								if(currentTime.getTime() >= unlockTime)
								{
									document.getElementById("remainingTimeDisplay").innerText = "00:00:00";
								}
								else
								{
=======
								if (currentTime.getTime() >= unlockTime) {
									document.getElementById("remainingTimeDisplay").innerText = "00:00:00";
								}
								else {
>>>>>>> origin/main
									let timeDifference = Math.floor((unlockTime - currentTime.getTime()) / 1000);

									let seconds = timeDifference % 60;
									let minutes = ((timeDifference - seconds) / 60) % 60;
<<<<<<< HEAD
									let hours =   ((timeDifference - 60 * minutes - seconds) / 3600);

									document.getElementById("remainingTimeDisplay").innerText
										= "" + String("0" + hours).slice(-2)
											+ ":" + String("0" + minutes).slice(-2)
											+ ":" + String("0" + seconds).slice(-2);
=======
									let hours = ((timeDifference - 60 * minutes - seconds) / 3600);

									document.getElementById("remainingTimeDisplay").innerText
										= "" + String("0" + hours).slice(-2)
										+ ":" + String("0" + minutes).slice(-2)
										+ ":" + String("0" + seconds).slice(-2);
>>>>>>> origin/main
								}
							};

							updateTimeDisplay();
							displayIntervalHandle = setInterval(updateTimeDisplay, 1000);
						}
					}
				);

				//TODO: clear interval on extension failure?
				let storageIntervalHandle = null;
<<<<<<< HEAD
				function updateTimeFromStorage()
				{
					if(chrome === undefined
					   || chrome.runtime === undefined
					   || chrome.runtime.id === undefined)
					{
=======
				function updateTimeFromStorage() {
					if (chrome === undefined
						|| chrome.runtime === undefined
						|| chrome.runtime.id === undefined) {
>>>>>>> origin/main
						clearInterval(storageIntervalHandle);
						return;
					}

					let sending = chrome.runtime.sendMessage(
						{
							type: "ScheduleBlock_RecordStorage_GetWebsiteUnlockTime",
							urlAddress: sourceUrl
						}
					);
				}

				updateTimeFromStorage();
<<<<<<< HEAD
				storageIntervalHandle = setInterval(updateTimeFromStorage, 3*60*1000);
			};

			if(documentLoaded)
			{
				createLockScreenLambda();
			}
			else
			{
=======
				storageIntervalHandle = setInterval(updateTimeFromStorage, 3 * 60 * 1000);
			};

			if (documentLoaded) {
				createLockScreenLambda();
			}
			else {
>>>>>>> origin/main
				window.addEventListener("load", createLockScreenLambda);
			}
		}
	}
);


let sending1 = chrome.runtime.sendMessage(
	{
		type: "ScheduleBlock_InitialContentCheck",
		urlAddress: window.location.href
	}
);

//console.log("content script initialized");
