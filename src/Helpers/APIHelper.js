//*this a helper class to simplify sending http requests to the server
export class APIHelper{
	#BASE_URL = 'http://127.0.0.1:8000/api/';
	#BASE_HEADERS = { "Accept": "application/json" };

	//ANCHOR send post requests
	post(URI, data, headers = {}){
		const requestURI = this.#BASE_URL+this.#prepareURI(URI);
		const requestHeaders = { ...this.#BASE_HEADERS, ...headers };
		//send ajax request
		return new Promise(async (resolve, reject) => {
			try{
				const connection = await fetch(requestURI, {
					method: "POST",
					headers: requestHeaders,
					body: data,
				});
				const response = await connection.json();
				resolve({code:connection.status, body:response});
			}
			catch(error){
				reject(error);
			}
		});
	}

	#prepareURI(URI){
		//remove the first slash if it exists
		if(URI.startsWith('/')){
			URI = URI.substring(1);
		}
		return URI;
	}
}