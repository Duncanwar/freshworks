let btoa = require("btoa");

exports = {
  onTicketCreateCallback: async function (args) {
    const { iparams, data } = args;

    try {
      await createTicket(iparams, data);
    } catch (err) {
      console.error(err);
    }
  },
};

async function createTicket(iparams, data) {

  try {
    const base64Encoded = btoa(iparams.api_key);
    const fs_encoded = btoa(iparams.fs_apiKey);

    const {description,subject,email,priority,status,cc_emails,id,phone} = data.ticket;
    const fs_ticket = await $request.post(
      `https://${iparams.fs_domain_url}/api/v2/tickets`,
      {
        headers: {
          Authorization: `Basic ${fs_encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description:description,
          subject:subject,
          email:email,
          priority:priority,
          status:status,
          phone:phone,
          requester_id:23000214863,
          cc_emails:cc_emails,
          custom_fields: {
            freshdesk_ticket_id: id.toString(),
          },
        }),
      }
    );
    const freshservice_ticket_id = JSON.parse(fs_ticket.response).ticket.id;
    await $request.put(
      `https://${iparams.domain_url}/api/v2/tickets/${data.ticket.id}`,
      {
        headers: {
          Authorization: `Basic ${base64Encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          custom_fields: {
            cf_fs_ticket_id: freshservice_ticket_id.toString(),
          },
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
}