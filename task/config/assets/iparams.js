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
  const apiKey = document.querySelector(".fd-secure-field");
  const domain = document.querySelector(".fd-domain");
  const fs_api_key = document.querySelector(".fs-secure-field");
  const fs_domain = document.querySelector(".fs-domain");
  function postConfigs() {
    return {
      __meta: {
        secure: ["apiKey"],
      },
      api_key: apiKey.value,
      domain_url: domain.value,
      fs_apiKey: fs_api_key.value,
      fs_domain_url: fs_domain.value,
    };
  }

  function getConfigs(configs) {
    let { api_key, domain_url, fs_apiKey, fs_domain_url } = configs;
    console.log(configs)
    apiKey.value = api_key;
    domain.value = domain_url;
    fs_api_key.value= fs_apiKey;
    fs_domain.value = fs_domain_url
    return;
  }

  async function validate() {
    const URL = `https://${domain.value}/api/v2/tickets`;
    const fs_URL = `https://${fs_domain.value}/api/v2/tickets`;
    const base64Encoded = btoa(apiKey.value);
    const fs_base64Encoded = btoa(fs_api_key.value);
    let options = {
      headers: {
        Authorization: `Basic ${base64Encoded}`,
        "Content-Type": "application/json",
      },
    };
    let fs_options = {
      headers: {
        Authorization: `Basic ${fs_base64Encoded}`,
        "Content-Type": "application/json",
      },
    };
    try {
      let { status } = await client.request.get(URL, options);
      let { status: fs_status } = await client.request.get(
        fs_URL,
        fs_options
      );
      if (status == 200 && fs_status == 200) {
        Toastify({
          text: "Success",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #FF000,green)",
          },
        }).showToast();
        return true;
      }
    } catch (error) {
      const msg = await errorMessage(error.response);
      Toastify({
        text: msg,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FF0000,red)",
        },
      }).showToast();
      return false;
    }
  }

  function errorMessage(error) {
    if (error.includes("{")) {
      const message = JSON.parse(error);
      return message.message;
    } else {
      return error;
    }
  }