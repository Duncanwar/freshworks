var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  const contactData = await client.data.get('contact');

  const iparams =await client.iparams.get()
  const {ticket} = await client.data.get('ticket');

  const {
    contact: { name }
  } = contactData;
  var headers = {
    Authorization: "Basic <%= encode(iparam.api_key) %>",
    "Content-Type": "application/json",
  };
  const result = await client.request.get(`https://${iparams.domain_url}/api/v2/tickets/${ticket.id}/conversations`,{headers:headers})
  const filteredTicketsConversation = JSON.parse(result.response)
  
  console.log(filteredTicketsConversation[filteredTicketsConversation.length - 1])

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const modalContent = document.getElementsByClassName('modal-content')[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  let textarea = document.createElement("textarea");
  let button = document.createElement("button");
  textarea.innerText = filteredTicketsConversation[filteredTicketsConversation.length - 1].body_text;
  button.onclick = function() {
    
  }
  modalContent.appendChild(textarea);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  textElement.innerHTML = `Ticket is created by ${name}`;
}

