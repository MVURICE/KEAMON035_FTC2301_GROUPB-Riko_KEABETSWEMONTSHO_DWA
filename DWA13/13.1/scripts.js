const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

/**
 * Logs each name to the console.
 *
 * @param {string} name - The name to be logged.
 */
names.forEach(name => {
    console.log(name);
  });

/**
 * Logs each name with a matching province to the console.
 *
 * @param {string} name - The name to be logged.
 * @param {number} index - The index of the name in the array.
 */
names.forEach((name, index) => {
    const province = provinces[index];
    console.log(`${name} (${province})`);
  });



// Converting all provinces to upperCASE
const uppercaseProvinces = provinces.map(province => province.toUpperCase());
console.log(uppercaseProvinces);

/**
 * Maps the length of each name in the array.
 *
 * @param {string} name - The name whose length will be calculated.
 * @returns {number} The length of the name.
 */
const nameLengths = names.map(name => name.length);
console.log(nameLengths);


// Arranging all provinces in Alphabetical order
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

/**
 * Filters the provinces array to remove those containing the word 'Cape'.
 *
 * @param {string} province - province name.
 * @returns {boolean} shows whether the province contains the word 'Cape'.
 */
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
const remainingProvinceCount = filteredProvinces.length;
console.log(remainingProvinceCount);


/**
 * Maps each name to a boolean value indicating if it contains the letter 'S'.
 *
 * @param {string} name - The name to check for the letter 'S'.
 * @returns {boolean} shows if the name contains the letter 'S'.
 */
const containsS = names.map(name => name.includes('S'));
console.log(containsS);


//using reduce to create an object showing  the province of each person
const provinceObject = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(provinceObject);