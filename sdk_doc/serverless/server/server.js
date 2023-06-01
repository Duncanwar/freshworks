let btoa=require('btoa')

exports = {
  onTicketUpdateCallback : async function(payload){
    try{
      const {iparams,data} =payload
      const response = await ticketInfo(iparams,data.ticket.id)
      let ticket = await JSON.parse(response.response);
console
      if(ticket.status === 5 && data.ticket.status === 2){
        await updateTicket(iparams,data.ticket)
        await addNote(iparams,ticket.id)
       console.log("success")
      }

  else  console.log("it must be from closed to open");
    // console.log("Response outputed: ",output);
  }catch(error){
      console.log("Error occured",error);
    }
  }

};

async function ticketInfo(iparams,id){
  try{
    return  $request.get(`${iparams.apiUrl}/tickets/${id}`,{  
      headers:{
        'Authorization': 'Basic ' + btoa(`${iparams.apiKey}`),
        'Content-Type': 'application/json'
      },
    })
  }catch(error){
    throw new Error(error)
  }
}

async function updateTicket(iparams,ticket){
  try {
    await $request.put(`${iparams.apiUrl}/tickets/${ticket.id}`,{  
      headers:{
          'Authorization': 'Basic ' + btoa(`${iparams.apiKey}`),
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "status":ticket.status,
         "priority":3
       })
     })
     console.log("success")
  } catch (error) {
    throw new Error(error)
  }
}

 async function addNote(iparams,id){
  try {

      await $request.post(`${iparams.apiUrl}/tickets/${id}/notes`,{  
        headers:{
            'Authorization': 'Basic ' + btoa(`${iparams.apiKey}`),
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
          body:"This ticket is a highy priority"
         })
       })
       console.log("success")
  } catch (error) {
   console.log("error: " + error)
  }

 }
