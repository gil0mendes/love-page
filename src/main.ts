import text from "./style.scss";

const API_URL = "https://api.love-page.net";

const CLASS_ANIMATION = "animate";
const CLASS_LOADING = "loading";

const Q_BUTTON = ".loveButton";
const Q_COUNT = ".loveCount";

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
  // Page URL which the loves will be associated with
  url: string;
  // Number of loves to be added to the page
  loves: number;
}

/**
 * Add a given amount of loves to the pager and returns the updated amount.
 *
 * @param numLoves Number of loves to add to the page.
 * @returns New number of loves.
 */
async function addLoves(url: string, numLoves = 1): Promise<number> {
  const payload: LovePagePayload = { url, loves: numLoves };

  const response = await fetch(`${API_URL}/love-page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return Number(await response.text());
}

let timer: number | undefined = undefined;

/**
 * Debounce a function call for x milliseconds.
 *
 * When another call is made between calling this function and the trigger the time is reset.
 *
 * @param fn Function to be debounced.
 * @param delay Time between function executions.
 * @returns Function with the debounce.
 */
const debounce = (fn: Function, delay: number) => {
  return function () {
    /* @ts-ignore-next-line */
    const context: any = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

class LovePageButton extends HTMLElement {
  #buttonEl!: HTMLButtonElement;
  #countEl!: HTMLSpanElement;

  /**
   * Initial clap count.
   */
  #initialLoveCount!: Promise<number>;

  /**
   * Claps that needs to be sent to the server.
   */
  #bufferedLoves = 0;

  /**
   * Total number of loves.
   */
  #totalLoves = 0;

  #updateLoves = debounce(async () => {
    if (!this.url) {
      return;
    }

    // call the API and update the internal love count
    this.#totalLoves = await addLoves(this.url, this.#bufferedLoves);
    this.#countEl.innerText = String(this.#totalLoves);

    // reset love buffer
    this.#bufferedLoves = 0;

    // fire a DOM event to notify that the counter was updated
    this.dispatchEvent(
      new CustomEvent("updated", {
        bubbles: true,
        detail: {
          loves: this.#totalLoves,
        },
      })
    );
  }, 2000);

  /**
   * Animate button when clicked.
   */
  #animeButton() {
    // reset animation
    this.#buttonEl.classList.remove(CLASS_ANIMATION);

    // add animation and them remove remove it
    this.#buttonEl.classList.add(CLASS_ANIMATION);
    setTimeout(() => {
      this.#buttonEl.classList.remove(CLASS_ANIMATION);
    }, 700);
  }

  /**
   * Get initial loves for this page.
   *
   * @param initialLoveCountResponse
   * @returns
   */
  async #getInitialLoves() {
    if (!this.url) {
      return;
    }

    const numLoves = await getLoves(this.url);
    this.classList.remove(CLASS_LOADING);

    // update love count and UI
    this.#totalLoves = numLoves;
    this.#countEl.innerHTML = String(this.#totalLoves);
  }

  async connectedCallback() {
    this.classList.add("loading");
    this.style.display = "inline-block";

    this.innerHTML = `
      <style>${text}</style>
      <button class="loveButton">
        <svg class="loveButton-heart" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <span class="buttonText">Love Page</span>
        <span class="loveCount">0</span>
      </button>
    `;

    // Get elements that will be used later
    this.#buttonEl = this.querySelector(Q_BUTTON) as HTMLButtonElement;
    this.#countEl = this.querySelector(Q_COUNT) as HTMLSpanElement;

    this.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }

      this.#animeButton();

      // buffer the new loves and request an async update
      this.#bufferedLoves += 1;
      this.#updateLoves();

      // we optimistic assume the request will happen just right
      this.#countEl.innerText = String(this.#totalLoves + this.#bufferedLoves);
    });

    // get initial loves from the page
    this.#getInitialLoves();
  }

  get initialLoveCount() {
    return this.#initialLoveCount;
  }

  set url(url: string | null) {
    if (url) {
      this.setAttribute("url", url);
    } else {
      this.removeAttribute("url");
    }
  }

  get url(): string | null {
    return this.getAttribute("url");
  }
}

customElements.define("love-page-button", LovePageButton);
