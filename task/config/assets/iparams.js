document.onreadystatechange = function () {
    if (document.readyState === "interactive") renderApp();
    async function renderApp() {
      try {
        let client = await app.initialized();
        window.client = client;
      } catch (error) {
        return console.error(error);
      }
    }
  };
  