import { Product } from './product';
import { ClothingAttributes, ElectronicsAttributes } from './types';

// Defining the Inventory interface with a generic type T.
// This interface uses an index signature, allowing us to store products dynamically by their product ID.
interface Inventory<T> {
  [productId: string]: T; // The key is a string (product ID), and the value is of type T.
}

// Inventory stores Product objects with ElectronicsAttributes.
const electronicsInventory: Inventory<Product<ElectronicsAttributes>> = {};

// Inventory stores Product objects with ClothingAttributes.
const clothingInventory: Inventory<Product<ClothingAttributes>> = {};

// Add a product to the inventory.
function addProduct<TAttributes>(
  inventory: Inventory<Product<TAttributes>>, // The inventory to which the product will be added.
  product: Product<TAttributes> // The product to add, with attributes of type TAttributes.
): void {
  if (!validateProductType<TAttributes>(inventory, product)) {
    throw new Error('Product type does not match inventory type!');
  }
  console.log('product added!');
  inventory[product.id] = product; // Adds the product to the inventory using its ID as the key.
}

// Validation function to ensure the product type matches the inventory type.
function validateProductType<TAttributes>(
  inventory: Inventory<Product<TAttributes>>,
  product: Product<TAttributes>
): boolean {
  // Match the type of the product's attributes with a property in inventory (optional).
  return (
    (inventory === electronicsInventory &&
      product.attributes.type === 'electronics') ||
    (inventory === clothingInventory && product.attributes.type === 'clothes')
  );
}

// Function to retrieve a product from the inventory by its ID.
function getProduct<TAttributes>(
  inventory: Inventory<Product<TAttributes>>, // The inventory to search.
  productId: string // The ID of the product to retrieve.
): Product<TAttributes> | undefined {
  return inventory[productId]; // Accesses the product in the inventory by its ID.
}

// This product implements the Product interface with ElectronicsAttributes.
const phone: Product<ElectronicsAttributes> = {
  id: '1',
  name: 'Smartphone',
  price: 699,
  attributes: {
    warrantyPeriod: '2 years',
    brand: 'TechBrand',
    type: 'electronics',
  },
};

// This product implements the Product interface with ClothingAttributes.
const shirt: Product<ClothingAttributes> = {
  id: '2',
  name: 'T-Shirt',
  price: 25,
  attributes: {
    size: 'M',
    material: 'Cotton',
    type: 'clothes',
  },
};

// Adding the phone product to the electronics inventory.
addProduct(electronicsInventory, phone);

// Adding the shirt product to the clothing inventory.
addProduct(clothingInventory, shirt);

try {
  // Attempting to add the shirt to the electronics inventory will throw an error.
  addProduct(electronicsInventory, shirt);
} catch (error) {
  console.error(error.message);
}

// Retrieving product from the electronics inventory.
console.log(getProduct(electronicsInventory, '1'));

// Retrieving product from the clothing inventory.
console.log(getProduct(clothingInventory, '2'));

// Attempting to retrieve a product with an ID that doesn’t exist in the inventory.
console.log(getProduct(electronicsInventory, '2'));
