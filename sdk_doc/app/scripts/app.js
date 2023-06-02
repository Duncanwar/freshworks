var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  const contactData = await client.data.get('contact');
  const {
    contact: { name }
  } = contactData;
const params= await client.iparams.get()

  textElement.innerHTML = `Ticket is created by ${name}`;
}

async function changeStatus(){
  var headers = {
    Authorization: "Basic <%= encode(iparam.api_key) %>",
    "Content-Type": "application/json",
  };
  var options = { headers: headers };

  const params = await client.iparams.get()
  let {ticket} = await client.data.get('ticket');

  let url =`https://${params.domain_url}/api/v2/tickets`
  try {
    await updateTicket(url,ticket.id)
     window.location.reload()
    console.log("Updated")
  } catch (error) {
    console.log(error);
  }
}

async function updateTicket(url,id){
  return await client.request.put(`${url}/${id}`, {headers: headers , body:JSON.stringify({status:2})})
}