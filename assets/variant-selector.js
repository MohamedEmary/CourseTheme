class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange() {
    // Gets the selected options in dropdown menus
    this.getSelectedOptions();
    // Returns if the selected variant (options) is found
    this.getSelectedVariant();

    // if the selected variant is found, update
    // the URL, form ID, and price
    if (this.currentVariant) {
      this.updateURL();
      this.updateFormInputID();
      this.updatePrice();
    }
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (selectElement) => selectElement.value
    );
  }

  getVariantJSON() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJSON().find((variant) => {
      // variant.options => ["Small", "Blue"]
      // this.options => ["Small", "Blue"]
      const findings = !variant.options
        .map((opt, i) => this.options[i] === opt)
        .includes(false);
      if (findings) return variant;
    });
  }

  updateURL() {
    if (!this.currentVariant) return;
    window.history.replaceState(
      // TODO: Try to understand the params of this method better

      // state obj
      // An object that holds data associated with the new history entry
      // Used when navigating through history with popstate events
      {},
      // title
      // currently not used by browsers and kept for compatibility
      "",
      // url
      // The new history entry's URL
      // Must be same-origin URL (security requirement)
      `${this.dataset.url}?variant=${this.currentVariant.id}` // url
    );
  }

  // this function updates a hidden input field which
  // holds the id of the product variant
  updateFormInputID() {
    const hidden_input = document
      .getElementById("product-form")
      .querySelector('input[name="id"]');
    hidden_input.value = this.currentVariant.id;
  }

  // updateFormInputID() {
  //   const hidden_input = document
  //     .getElementById("product-form")
  //     .querySelector('input[name="id"]');
  //   hidden_input.value = this.currentVariant.id;
  // }

  updatePrice() {
    // Make an API call to get the price of that variant
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;

        // The API response is an HTML string so we use
        // DOMParser.parseFromString to convert it to a DOM object
        // It's like JSON.parse for HTML strings
        const html = new DOMParser().parseFromString(responseText, "text/html");

        const oldPrice = document.getElementById(id);
        const newPrice = html.getElementById(id);

        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;
      });
  }
}

customElements.define("variant-selector", VariantSelector);
