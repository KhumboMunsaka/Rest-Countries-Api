const search = document.getElementById("search-btn"); // Assuming the element has an ID of 'search'
const input = document.getElementById("input");
const flag = document.getElementById("flag");
const coatOfArms = document.getElementById("coat-of-arms");
const currency = document.getElementById("currency");
const capital = document.getElementById("capitals");
const population = document.getElementById("population");
const timeZone = document.getElementById("time-zone");
const isUnMember = document.getElementById("unMember");
const languages = document.getElementById("languages");
const errorEl = document.querySelector(".error");
const countryInformation = document.querySelector(".country-information");
const form = document.querySelector(".form");

// performing the search
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // validating the form
  if (input.value === "") {
    errorEl.textContent = `You Have To Put in A Country For This To Work (ㆆ_ㆆ)`;
    return;
  }
  // Use 'click' for click event
  let countryName = input.value.trim(); // Trim leading/trailing whitespaces
  let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  async function getCountries() {
    try {
      countryInformation.classList.remove("visible");
      countryInformation.classList.add("invisible");
      // getting the country information
      const response = await fetch(finalUrl);
      const json = await response.json();
      console.log(json[0]);
      if (!response.ok) {
        errorEl.textContent = `Maybe you have bad network ~_~`;
        throw new Error("Failed to fetch country data", error);
      }
      // changing the details
      flag.src = json[0].flags.svg;
      coatOfArms.src = json[0].coatOfArms.svg;
      isUnMember.textContent = `UnMember: ${json[0].unMember}`;
      population.textContent = `Population: ${json[0].population}`;
      capital.textContent = `Capital(s): ${Object.values(json[0].capital)
        .toString()
        .split(",")
        .join(", ")}`;
      languages.textContent = `Languages: ${Object.values(json[0].languages)
        .toString()
        .split(",")
        .join(", ")}`;
      // if a country has more than one currency
      currency.textContent = `Currency(s): ${Object.entries(json[0].currencies)
        .map(([code, currency]) => `${code} - ${currency.name}`)
        .join(", ")}`;

      timeZone.textContent = `Time Zone(s): ${Object.values(json[0].timezones)
        .toString()
        .split(",")
        .join(", ")}`;
      if (countryInformation.classList.contains("invisible")) {
        countryInformation.classList.toggle("invisible");
        countryInformation.classList.toggle("visible");
        errorEl.classList.add("invisible");
        errorEl.classList.remove("invisible");
      }
    } catch (error) {
      errorEl.textContent = `Not Sure that Country Exists (。﹏。*)`;
    }
  }

  getCountries();
});
