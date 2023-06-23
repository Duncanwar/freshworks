
init();

async function init() {
  client = await app.initialized();
  let context = await client.instance.context();
//   const textArea = document.getElementById('textarea');
//   textArea.innerHTML=context.data.conversation.body_text
  console.log(context,"activated1234");
  
}
