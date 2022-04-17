/*======================================================================
	This Session Helper Class contains a utility function to simplify
	working with browser local storage.
========================================================================*/
export class SessionHelper {
	constructor(key) {
		//*the constructor used to set local storage key name
		this.key = key;
		this.storageItem = localStorage.getItem(this.key);
	}
	// check if current storage key contains a value on it
	check() {
		return this.storageItem ? true : false;
	}
	store(data) {
		localStorage.setItem(this.key, JSON.stringify(data));
	}
	fetch() {
		//?try if the local storage content can be parsed to json
		try{
			return this.storageItem ? JSON.parse(this.storageItem) : null;
		}
		catch(error){
			return {};
		}
	}
	remove() {
		localStorage.removeItem(this.key);
	}
}
