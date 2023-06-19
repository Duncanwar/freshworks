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
  const result = await client.request.get(`https://${iparams.domain_url}/api/v2/tickets/${ticket.id}?include=conversations`,{headers:headers})
  const tickets= JSON.parse(result.response)
  const conversations = tickets.conversations
  const theLatestConversation = conversations[conversations.length - 1]
  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let source ={
  0:'reply',
  2:'notes'
}
 
let modalContent = document.getElementsByClassName('modal-content')[0];
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  let textarea = document.createElement("textarea");
  let button = document.createElement("button");
  button.innerText="SEND"
  textarea.innerText = theLatestConversation.body_text;
  button.onclick = async function() {
    const fs_ticket_id= tickets.custom_fields.cf_fs_ticket_id
    var headers = {
      Authorization: "Basic <%= encode(iparam.fs_apiKey) %>",
      "Content-Type": "application/json",
    };
    console.log(theLatestConversation)
    const {body,attachments,user_id,cc_emails,bcc_emails} = theLatestConversation
    const typeOfConversation = source[theLatestConversation.source]
    const result = await client.request.post(`https://${iparams.fs_domain_url}/api/v2/tickets/${fs_ticket_id}/${typeOfConversation}`,{headers:headers,
  body:JSON.stringify({
  body:body,
  })
  })
    const fs_tickets= JSON.parse(result.response)
    console.log(fs_tickets)
  }
  modalContent.appendChild(textarea);
  modalContent.appendChild(button); 
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

