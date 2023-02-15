import ProductCategory from './models/ProductCategory';
import ProductSubCategory from './models/ProductSubCategory';
//TODO: create get route for categories & populate subcategories.

const seed = async () => {
  const computing = await ProductCategory.findOneAndUpdate(
    { name: 'Computing' },
    {},
    { upsert: true }
  );
  const phones = await ProductCategory.findOneAndUpdate(
    { name: 'Phones & Tablets' },
    {},
    { upsert: true }
  );
  await ProductSubCategory.bulkWrite([
    {
      updateOne: {
        filter: { name: 'Computers' },
        update: { name: 'Computers', category: computing._id },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Printers' },
        update: { name: 'Printers', category: computing._id },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Mobile Phones' },
        update: { name: 'Mobile Phones', category: phones._id },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Tablets' },
        update: { name: 'Tablets', category: phones._id },
        upsert: true
      }
    }
  ]);
};

export default seed;