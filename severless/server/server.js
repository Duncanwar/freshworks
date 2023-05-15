exports = {
  
  events:[{event:'onTicketCreate', callback:'OnTicketCreateHandler'}],
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onTicketCreateHandler: function(args) {
    // let client = args.data.client;
   let headers = {"Authorization": "Basic <%= encode(iparam.api_key) %>"};
   var options = { headers: headers };
    let reqBody = JSON.stringify(args);
    let options={
      
      body:reqBody,
    }
    client.request.post("https://enu9hl6lwwzbb.x.pipedream.net/newTicket", options)
  .then(
    function(data) {
      console.log(data)
      console.log("OK");
      //handle "data"
      //"data" is a json string with status, headers, and response.
    },
    function(error) {
      //handle failure
      console.log(error)
    }
  );
  }

};
