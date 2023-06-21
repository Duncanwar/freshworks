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
  const base64Encoded = btoa(iparams.api_key);
  const fs_base64Encoded = btoa(iparams.fs_apiKey);

  try {
    const fd_ticket = await $request.post(
      `https://${iparams.domain_url}/api/v2/tickets`,
      {
        headers: {
          Authorization: `Basic ${base64Encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.ticket),
      }
    );

    const freshdesk_ticket_id = JSON.parse(fd_ticket.response).id;

    const fs_ticket = await $request.post(
      `https://${iparams.fs_domain_url}/api/v2/tickets`,
      {
        headers: {
          Authorization: `Basic ${fs_base64Encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data.ticket,
          custom_fields: {
            freshdesk_ticket_id: freshdesk_ticket_id.toString(),
          },
        }),
      }
    );

    const freshservice_ticket_id = JSON.parse(fs_ticket.response).ticket.id;
    await $request.put(
      `https://${iparams.domain_url}/api/v2/tickets/${freshdesk_ticket_id}`,
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
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
