const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // Task 1: Use forEach to console.log each product name
  products.forEach(product => {
    console.log(product.product);
  });
  
  // Task 2: Use filter to filter out products with names longer than 5 characters
  const filteredProducts = products.filter(product => product.product.length <= 5);
  console.log(filteredProducts);
  
  // Task 3: Use filter, map, and reduce to calculate the combined price of all remaining products
  const combinedPrice = products
    .filter(product => product.price !== '' && !isNaN(product.price))
    .map(product => ({ ...product, price: parseFloat(product.price) }))
    .reduce((total, product) => total + product.price, 0);
  console.log(combinedPrice);
  
  // Task 4: Use reduce to concatenate all product names into a string
  const concatenatedNames = products.reduce((str, product) => {
    if (str === '') {
      return product.product;
    } else {
      return str + ', ' + product.product;
    }
  }, '');
  console.log(concatenatedNames);
  
  // Task 5: Use reduce to calculate the highest and lowest-priced items
  const { highest, lowest } = products.reduce((result, product) => {
    if (result.highest === null || product.price > result.highest.price) {
      result.highest = product;
    }
    if (result.lowest === null || product.price < result.lowest.price) {
      result.lowest = product;
    }
    return result;
  }, { highest: null, lowest: null });
  console.log(`Highest: ${highest.product}. Lowest: ${lowest.product}`);
  
  // Task 6: Use Object.entries and reduce to recreate the object with modified keys
  const modifiedProducts = Object.entries(products).reduce((newProducts, [key, value]) => {
    const modifiedKey = (key === 'product') ? 'name' : (key === 'price') ? 'cost' : key;
    newProducts[modifiedKey] = value;
    return newProducts;
  }, {});
  console.log(modifiedProducts);
  

  