import text from "./style.scss";

// URL for the API entrypoint
const API_URL = "http://localhost:8080";

/**
 * Get number of loves the given page has.
 *
 * @param url target url to get number of loves to
 * @returns number of loves the page has
 */
async function getLoves(url: string): Promise<number> {
  const response = await fetch(`${API_URL}/page-loves?url=${url}`, {
    headers: {
      "Content-Type": "text/plain",
    },
  });

  return Number(await response.text());
}

// Payload for the method used to add loves to a page
interface LovePagePayload {
  // Number of loves to be added to the page
  loves: number;
}

/**
 * Add a given amount of loves to the pager and returns the updated amount.
 *
 * @param numLoves Number of loves to add to the page.
 * @returns New number of loves.
 */
async function addLoves(numLoves = 1): Promise<number> {
  const payload: LovePagePayload = { loves: numLoves };

  const response = await fetch(`${API_URL}/love-page`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(payload),
  });

  return Number(await response.text());
}

class LovePageButton extends HTMLElement {
  connectedCallback() {
    this.classList.add("loading");
    this.style.display = "block";

    this.innerHTML = `
      <style>${text}</style>
      <button class="loveButton">
        <svg class="loveButton-heart" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        Love Page
      </button>
    `;
  }
}

customElements.define("love-page-button", LovePageButton);
