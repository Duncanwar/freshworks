var client;
var retrieveDataValue;
init();

async function init() {
  client = await app.initialized();
  client.events.on("app.activated", renderText);
  let context = await client.instance.context();
  console.log(context);
}

async function renderText() {
 
  const textElement = document.getElementById("apptext");
  const contactData = await client.data.get("contact");

  const {
    contact: { name },
  } = contactData;

  const iparams = await client.iparams.get();
  const { ticket } = await client.data.get("ticket");

  var headers = {
    Authorization: "Basic <%= encode(iparam.api_key) %>",
    "Content-Type": "application/json",
  };
  const result = await client.request.get(
    `https://${iparams.domain_url}/api/v2/tickets/${ticket.id}?include=conversations`,
    { headers: headers }
  );
  const tickets = JSON.parse(result.response);
  const conversations = tickets.conversations;
  const theLatestConversation = conversations[conversations.length - 1];
  retrieveDataValue = theLatestConversation;
  const textArea = document.getElementById('text_area');
  console.log(textArea)
  textArea.innerHTML = retrieveDataValue.body_text
  console.log(retrieveDataValue)
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  let source = {
    0: "reply",
    2: "notes",
  };

  let modalContent = document.getElementsByClassName("modal-content")[0];
  // When the user clicks the button, open the modal
  btn.onclick = async function () {
    try {
      // app.js
      await client.interface.trigger("showModal", {
          title: "Sample Modal",
 
template: "modal.html",data:{title: "Sample Modal", conversation:retrieveDataValue }
      });
  } catch (error) {
      // failure operation
      console.error(error);
  }
    
    let textarea = document.createElement("textarea");
    let button = document.createElement("button");
    button.innerText = "SEND";
    textarea.innerText = theLatestConversation.body_text;
    button.onclick = async function () {
      const fs_ticket_id = tickets.custom_fields.cf_fs_ticket_id;
      var headers = {
        Authorization: "Basic <%= encode(iparam.fs_apiKey) %>",
        "Content-Type": "application/json",
      };
      const { body } = theLatestConversation;
      const typeOfConversation = source[theLatestConversation.source];
      await client.request.post(
        `https://${iparams.fs_domain_url}/api/v2/tickets/${fs_ticket_id}/${typeOfConversation}`,
        {
          headers: headers,
          body: JSON.stringify({
            body: body,
          }),
        }
      );
      await client.interface.trigger("showNotify", {
        type: "success",
        message: `Conversation created` /* The "message" should be plain text */,
      });
      modal.style.display = "none";
    };
    modalContent.appendChild(textarea);
    modalContent.appendChild(button);
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  textElement.innerHTML = `Ticket is created by ${name}`;
}
