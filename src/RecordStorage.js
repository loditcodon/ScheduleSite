<<<<<<< HEAD
function logX(){console.log.apply(this, Array.prototype.slice.call(arguments, 0));};
=======
function logX() { console.log.apply(this, Array.prototype.slice.call(arguments, 0)); };
>>>>>>> origin/main

import { validateTimeString, validateTimeoutString } from './Misc.js';
import { Record } from './Record.js';

<<<<<<< HEAD
export class RecordStorage
{
=======
export class RecordStorage {
>>>>>>> origin/main
	/**
	 * #properties
	 * @type {!string} #properties.Language is name of preferred language (see TranslationProvider[0])
	 * @type {!int} #properties.CheckFrequency is check period in seconds
	 * @type {!string} #properties.Background is background color for the settings page
	 * @type {!string} #properties.LockScreenBase is a base URL for the lock screen
	 */
	#properties;

	/**
	 @type {!(chrome|browser)} #storageProvider
	 */
	#storageProvider;

	/**
	 * @param {!(chrome|browser)} storageProvider provider of the local storage functionality
	 */
<<<<<<< HEAD
	constructor(storageProvider = (typeof browser == 'undefined' ? chrome : browser))
	{
=======
	constructor(storageProvider = (typeof browser == 'undefined' ? chrome : browser)) {
>>>>>>> origin/main
		this.#storageProvider = storageProvider;
	}

	/**
	 * Validates settings JSON
	 * @param {string} jsonString
	 */
<<<<<<< HEAD
	validateExportedJSON(jsonString)
	{
		if(!jsonString)
		{
=======
	validateExportedJSON(jsonString) {
		if (!jsonString) {
>>>>>>> origin/main
			return "Settings file is empty or generally invalid";
		}

		let arr = null;
<<<<<<< HEAD
		try
		{
=======
		try {
>>>>>>> origin/main
			arr = Record.fromJSON(jsonString);
		}
		catch
		{
			return "Settings file could not be parsed by JSON parser";
		}

<<<<<<< HEAD
		if(!(arr instanceof Array))
		{
			return "Settings file does not parse into an array";
		}

		for(let ii = 0; ii < arr.length; ++ii)
		{
			if(!validateTimeString(arr[ii].getSoftHours()))
			{
				return "Settings invalid at record " + (ii+1) +
						" (regex '" + arr[ii].getRegex() +
						"'):\nSoft locked time '" + arr[ii].getSoftHours() + "' is invalid";
			}
			if(!validateTimeString(arr[ii].getHardHours()))
			{
				return "Settings invalid at record " + (ii+1) +
						" (regex '" + arr[ii].getRegex() +
						"'):\nHard locked time '" + arr[ii].getHardHours() + "' is invalid";
			}
			if(!validateTimeoutString(arr[ii].getTimeout()))
			{
				return "Settings invalid at record " + (ii+1) +
						" (regex '" + arr[ii].getRegex() +
						"'):\nTimeout string '" + arr[ii].getTimeout() + "' is invalid";
=======
		if (!(arr instanceof Array)) {
			return "Settings file does not parse into an array";
		}

		for (let ii = 0; ii < arr.length; ++ii) {
			if (!validateTimeString(arr[ii].getSoftHours())) {
				return "Settings invalid at record " + (ii + 1) +
					" (regex '" + arr[ii].getRegex() +
					"'):\nSoft locked time '" + arr[ii].getSoftHours() + "' is invalid";
			}
			if (!validateTimeString(arr[ii].getHardHours())) {
				return "Settings invalid at record " + (ii + 1) +
					" (regex '" + arr[ii].getRegex() +
					"'):\nHard locked time '" + arr[ii].getHardHours() + "' is invalid";
			}
			if (!validateTimeoutString(arr[ii].getTimeout())) {
				return "Settings invalid at record " + (ii + 1) +
					" (regex '" + arr[ii].getRegex() +
					"'):\nTimeout string '" + arr[ii].getTimeout() + "' is invalid";
>>>>>>> origin/main
			}
		}

		return true;
	}

	/**
	 * Imports previously exported settings, reloads table.
	 * @param {!string} jsonString - JSON representation of settings to be loaded
	 */
<<<<<<< HEAD
	async importSettings(jsonString)
	{
		let valid = this.validateExportedJSON(jsonString);
		if(valid !== true) return valid;
		await this.#storageProvider.storage.local.set({ScheduleBlock_Websites:jsonString});
=======
	async importSettings(jsonString) {
		let valid = this.validateExportedJSON(jsonString);
		if (valid !== true) return valid;
		await this.#storageProvider.storage.local.set({ ScheduleBlock_Websites: jsonString });
>>>>>>> origin/main
		return true;
	}

	/**
	 * Exports settings for later import.
	 * @returns {!string} JSON representation of the current settings
	 */
<<<<<<< HEAD
	async exportSettings()
	{
		let websites_result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let websites_safe = (websites_result && websites_result.ScheduleBlock_Websites
							 ? JSON.parse(websites_result.ScheduleBlock_Websites)
							 : []);

		for(let ii = 0; ii < websites_safe.length; ++ii)
		{
=======
	async exportSettings() {
		let websites_result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let websites_safe = (websites_result && websites_result.ScheduleBlock_Websites
			? JSON.parse(websites_result.ScheduleBlock_Websites)
			: []);

		for (let ii = 0; ii < websites_safe.length; ++ii) {
>>>>>>> origin/main
			delete websites_safe[ii].currentDuration;
			delete websites_safe[ii].lastCheck;
		}

		return JSON.stringify(websites_safe);
	}

	/**
	 * Get properties
	 * @returns {{Language: !string, CheckFrequency: !number, Background: !string, LockScreenBase: !string}} this.#properies
	 */
<<<<<<< HEAD
	async getGeneralProperties()
	{
		if(this.#properties === undefined)
		{
			const res = await this.#storageProvider
								.storage.local.get(['ScheduleBlock_Properties']);
			this.#properties = (res && res.ScheduleBlock_Properties
									? res.ScheduleBlock_Properties : {});

			if(!this.#properties.Language)
				this.#properties.Language = "english";
			if(!this.#properties.CheckFrequency)
				this.#properties.CheckFrequency = 15;
			if(!this.#properties.Background)
				this.#properties.Background = "#808080";
			if(!this.#properties.LockScreenBase)
=======
	async getGeneralProperties() {
		if (this.#properties === undefined) {
			const res = await this.#storageProvider
				.storage.local.get(['ScheduleBlock_Properties']);
			this.#properties = (res && res.ScheduleBlock_Properties
				? res.ScheduleBlock_Properties : {});

			if (!this.#properties.Language)
				this.#properties.Language = "english";
			if (!this.#properties.CheckFrequency)
				this.#properties.CheckFrequency = 15;
			if (!this.#properties.LockScreenBase)
>>>>>>> origin/main
				this.#properties.LockScreenBase = "https://www.iana.org";
		}

		return this.#properties;
	}

	/**
	 * Set properties
	 * @param {{Language: !string, CheckFrequency: !number, Background: !string, LockScreenBase: !string}} this.#properies
	 * @param {boolean} skipStorage whether to skip saving to storage or not
	 */
<<<<<<< HEAD
	async setGeneralProperties(newProperties, skipStorage = false){
		this.#properties = newProperties;
		if(!skipStorage)
			await this.#storageProvider
					.storage.local.set({ScheduleBlock_Properties: newProperties});
=======
	async setGeneralProperties(newProperties, skipStorage = false) {
		this.#properties = newProperties;
		if (!skipStorage)
			await this.#storageProvider
				.storage.local.set({ ScheduleBlock_Properties: newProperties });
>>>>>>> origin/main
	}


	/**
	 * Get all records stored in the local storage
	 * @returns {Array.<!Record>} array of Records stored in the local storage
	 */
<<<<<<< HEAD
	async getAll()
	{
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		return (result && result.ScheduleBlock_Websites
				? Record.fromJSON(result.ScheduleBlock_Websites) : []);
=======
	async getAll() {
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		return (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);
>>>>>>> origin/main
	}

	/**
	 * Get one record stored in the local storage by the order
	 * @param {!number} recordNumber
	 * @returns {?Record} Record stored at the given index in the local storage, or null
	 */
<<<<<<< HEAD
	async getOne(recordNumber)
	{
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		const arr = (result && result.ScheduleBlock_Websites
					 ? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if(recordNumber >= arr.length) return null;
=======
	async getOne(recordNumber) {
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		const arr = (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if (recordNumber >= arr.length) return null;
>>>>>>> origin/main

		return arr[recordNumber];
	}

	/**
	 * Create new record in the local storage with given regex
	 * @param {!string} regex
	 */
<<<<<<< HEAD
	async createNewRecord(regex)
	{
		let result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);
=======
	async createNewRecord(regex) {
		let result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);
>>>>>>> origin/main

		arr.push((new Record()).withRegex(regex));

		await this.#storageProvider
<<<<<<< HEAD
				.storage.local.set({ScheduleBlock_Websites:Record.toJSON(arr)});
=======
			.storage.local.set({ ScheduleBlock_Websites: Record.toJSON(arr) });
>>>>>>> origin/main
	}

	/**
	 * Move record from one position to another, pushing elements in between
	 * @param {!number} recordNumber original number
	 * @param {!number} newRecordNumber new number
	 * @returns {false} iff the operation failed
	 */
<<<<<<< HEAD
	async moveRecord(recordNumber, newRecordNumber)
	{
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if(recordNumber >= arr.length) return false;

		if(newRecordNumber < 0) newRecordNumber = 0;
=======
	async moveRecord(recordNumber, newRecordNumber) {
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if (recordNumber >= arr.length) return false;

		if (newRecordNumber < 0) newRecordNumber = 0;
>>>>>>> origin/main
		let tmp = arr.splice(recordNumber, 1);
		arr.splice(newRecordNumber, 0, tmp[0]);

		await this.#storageProvider
<<<<<<< HEAD
				.storage.local.set({ScheduleBlock_Websites:Record.toJSON(arr)});
=======
			.storage.local.set({ ScheduleBlock_Websites: Record.toJSON(arr) });
>>>>>>> origin/main
	}

	/**
	 * Set new record value
	 * @param {!number} recordNumber number of the record
	 * @param {!Record} newValue new Record value
	 * @returns {false} iff the operation failed
	 */
<<<<<<< HEAD
	async editRecord(recordNumber, newValue)
	{
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		let arr = (result && result.ScheduleBlock_Websites
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if(recordNumber >= arr.length) return false;
=======
	async editRecord(recordNumber, newValue) {
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		let arr = (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		if (recordNumber >= arr.length) return false;
>>>>>>> origin/main

		arr[recordNumber] = newValue;

		await this.#storageProvider
<<<<<<< HEAD
				.storage.local.set({ScheduleBlock_Websites:Record.toJSON(arr)});
=======
			.storage.local.set({ ScheduleBlock_Websites: Record.toJSON(arr) });
>>>>>>> origin/main
	}

	/**
	 * Delete a record
	 * @param {!number} recordNumber number of the record
	 * @returns {false} iff the operation failed
	 */
<<<<<<< HEAD
	async deleteRecord(recordNumber)
	{
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		let arr = (result && result.ScheduleBlock_Websites
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);
		if(arr.length == 0) return false;
=======
	async deleteRecord(recordNumber) {
		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);

		let arr = (result && result.ScheduleBlock_Websites
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);
		if (arr.length == 0) return false;
>>>>>>> origin/main

		arr.splice(recordNumber, 1);

		await this.#storageProvider
<<<<<<< HEAD
				.storage.local.set({ScheduleBlock_Websites:Record.toJSON(arr)});
=======
			.storage.local.set({ ScheduleBlock_Websites: Record.toJSON(arr) });
>>>>>>> origin/main
	}

	/**
	 * Tests whether website is currently denied
	 * @param {!string} urlAddress is the address
	 * @param {!boolean} softCheck
	 * @returns {(false|string)} false iff not denied, action JS otherwise
	 */
<<<<<<< HEAD
	async testWebsite(urlAddress, softCheck)
	{
=======
	async testWebsite(urlAddress, softCheck) {
>>>>>>> origin/main
		let updatedElements = {};
		let checkInterval = (await this.getGeneralProperties()).CheckFrequency * 1000;
		let nowDate = new Date();

		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
<<<<<<< HEAD
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		let testResult = false;
		for(let ii = 0; ii < arr.length && testResult === false; ++ii)
		{
			let incremented = arr[ii].getIncrementedTimeout(urlAddress, nowDate, checkInterval);
			if(incremented !== false)
=======
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);

		let testResult = false;
		for (let ii = 0; ii < arr.length && testResult === false; ++ii) {
			let incremented = arr[ii].getIncrementedTimeout(urlAddress, nowDate, checkInterval);
			if (incremented !== false)
>>>>>>> origin/main
				arr[ii] = incremented;

			//TODO: this will not work properly for
			//			allowed timeouts shorter than the checkInterval
			//			How to check it does work properly???
			testResult = arr[ii].testWebsite(urlAddress, softCheck, nowDate);
		}

<<<<<<< HEAD
		await this.#storageProvider.storage.local.set({ScheduleBlock_Websites:Record.toJSON(arr)});
=======
		await this.#storageProvider.storage.local.set({ ScheduleBlock_Websites: Record.toJSON(arr) });
>>>>>>> origin/main

		return (testResult === false ? false : testResult[1]);
	}

	/**
	 *
	 */
<<<<<<< HEAD
	async getWebsiteUnlockTime(urlAddress)
	{
=======
	async getWebsiteUnlockTime(urlAddress) {
>>>>>>> origin/main
		let updatedElements = {};
		let checkInterval = (await this.getGeneralProperties()).CheckFrequency * 1000;
		let nowDate = new Date();

		const result = await this.#storageProvider.storage.local.get(['ScheduleBlock_Websites']);
		let arr = (result && result.ScheduleBlock_Websites
<<<<<<< HEAD
						? Record.fromJSON(result.ScheduleBlock_Websites) : []);
=======
			? Record.fromJSON(result.ScheduleBlock_Websites) : []);
>>>>>>> origin/main

		let maxResult = new Date(nowDate.getTime() - 1);

		let testResult = false;
<<<<<<< HEAD
		for(let ii = 0; ii < arr.length; ++ii)
		{
			testResult = arr[ii].testWebsite(urlAddress, true, nowDate);

			if(testResult !== false && testResult[0] > maxResult)
			{
=======
		for (let ii = 0; ii < arr.length; ++ii) {
			testResult = arr[ii].testWebsite(urlAddress, true, nowDate);

			if (testResult !== false && testResult[0] > maxResult) {
>>>>>>> origin/main
				maxResult = testResult[0];
			}
		}

		return maxResult;
	}
}
