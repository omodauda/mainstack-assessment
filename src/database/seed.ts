import Product from './models/Product';
import ProductCategory from './models/ProductCategory';
import ProductSubCategory from './models/ProductSubCategory';

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

  // subcategories
  const computers = await ProductSubCategory.findOneAndUpdate(
    { name: 'Computers' },
    { category: computing.id },
    { upsert: true }
  );
  const printers = await ProductSubCategory.findOneAndUpdate(
    { name: 'Printers' },
    { category: computing.id },
    { upsert: true }
  );
  const mobiles = await ProductSubCategory.findOneAndUpdate(
    { name: 'Mobile Phones' },
    { category: phones.id },
    { upsert: true }
  );
  const tablets = await ProductSubCategory.findOneAndUpdate(
    { name: 'Tablets' },
    { category: phones.id },
    { upsert: true }
  );

  await Product.bulkWrite([
    {
      updateOne: {
        filter: { name: 'Apple macbook pro 2020' },
        update: {
          category: computing.id,
          subcategory: computers.id,
          name: 'Apple macbook pro 2020',
          brand: 'Apple',
          price: 570000,
          quantity: 2,
          description: 'The Apple M1 chip redefines the 13-inch MacBook Pro. Featuring an 8-core CPU that flies through complex workflows in photography, coding, video editing, and more. Incredible 8-core GPU that crushes graphics-intensive tasks and enables super-smooth gaming.An advanced 16-core Neural Engine for more machine learning power in your favorite apps. Superfast unified memory for fluid performance. And the longest-ever battery life in a Mac at up to 20 hours.² It’s Apple\'s most popular pro notebook.Way more performance and way more pro.',
          images: [
            { public_id: 'macbook_2_yshrl2', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546597/mainstack/macbook_2_yshrl2.jpg' },
            { public_id: 'macbook_1_vhh4jo', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546597/mainstack/macbook_1_vhh4jo.jpg' },
          ]
        },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Hp Laser MFP' },
        update: {
          category: computing.id,
          subcategory: printers.id,
          name: 'Hp Laser MFP',
          brand: 'Hp',
          price: 186000,
          quantity: 3,
          description: 'Easy mobile printing and scanning with HP Smart appPrint, scan, and copy from virtually anywhere, and get simple setup on your phone.',
          images: [
            { public_id: 'printer_luvho3', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546596/mainstack/printer_luvho3.jpg' },
          ]
        },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Samsung S21 plus' },
        update: {
          category: phones.id,
          subcategory: mobiles.id,
          name: 'Samsung S21 plus',
          brand: 'Samsung',
          price: 480000,
          quantity: 5,
          description: 'Meet the epic new Galaxy S21+ our latest device from the Galaxy Series offering you the best in cameras, helping you capture moments the best way you could. It comes with an array of cameras – a 64MP telephoto for detailed shots, a 12MP ultra wide to accommodate more, a 12MP wide to take the regular shots, a depth camera to add more life to portraits, and a 10MP front to capture your best selfies. Complementing it are amazing features, such as Bright Night – your night shots wouldn\'t be the same.Select the best shot with Single Take.',
          images: [
            { public_id: 's21-1_xf656q', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546597/mainstack/s21-1_xf656q.jpg' },
          ]
        },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'iPhone 13' },
        update: {
          category: phones.id,
          subcategory: mobiles.id,
          name: 'iPhone 13',
          brand: 'Apple',
          price: 575000,
          quantity: 3,
          description: 'Brand new iPhone 13 from Apple',
          images: [
            { public_id: '13_t5phag', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546596/mainstack/13_t5phag.jpg' },
          ]
        },
        upsert: true
      }
    },
    {
      updateOne: {
        filter: { name: 'Samsung Tab s7' },
        update: {
          category: phones.id,
          subcategory: tablets.id,
          name: 'Samsung Tab s7',
          brand: 'Samsung',
          price: 300000,
          quantity: 7,
          description: 'Brand new samsung galaxy tab s7',
          images: [
            { public_id: 's7-2_yny6xr', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546597/mainstack/s7-2_yny6xr.jpg' },
            { public_id: 's7_z4f3oo', url: 'https://res.cloudinary.com/omodauda/image/upload/v1676546597/mainstack/s7_z4f3oo.jpg' },
          ]
        },
        upsert: true
      }
    }
  ]);
};

export default seed;