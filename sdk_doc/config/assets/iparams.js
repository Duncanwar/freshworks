document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();
  async function renderApp() {
    try {
      client = await app.initialized();
      console.log(client);
    } catch (error) {
      return handleErr('error details', error);
    }
  }
};

async function domainUrlChange(url){
    const URL = `https://${url}`;
    // try {
        let response = await client.request.get(URL)
        console.log(response)
        // return response.status=
    // } catch (error) {
      console.log
     return response.status === 200 ? 'pick up': 'Invalid domain'
    // }
}

async function apiKeyChange(apiKey){

}