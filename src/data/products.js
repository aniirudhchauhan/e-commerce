// tile info: name, tile image, and the folder its product photos live in
export const CATEGORIES = [
  { name: "Streetwear", slug: "streetwear", img: "/images/slide1.jpg" },
  { name: "Summer Tees", slug: "tees", img: "/images/slide2.jpg" },
  { name: "Sneakers", slug: "sneakers", img: "/images/slide3.jpg" },
  { name: "Handbags", slug: "handbags", img: "/images/slide4.jpg" },
  { name: "Glasses", slug: "glasses", img: "/images/slide5.jpg" },
];

// builds 10 products for one category.
// photos are expected at public/products/<slug>/1.jpg ... 10.jpg
function make(category, slug, startId, items) {
  return items.map(([title, price], i) => ({
    id: startId + i,
    title,
    price,
    category,
    thumbnail: `/products/${slug}/${i + 1}.jpg`,
  }));
}

export const PRODUCTS = [
  ...make("Streetwear", "streetwear", 1001, [
    ["Oversized Graphic Hoodie", 49],
    ["Cargo Utility Pants", 59],
    ["Boxy Denim Jacket", 79],
    ["Baggy Ripped Jeans", 55],
    ["Tie-Dye Crewneck", 45],
    ["Varsity Bomber Jacket", 89],
    ["Tech Windbreaker", 69],
    ["Washed Black Hoodie", 52],
    ["Puffer Vest", 75],
    ["Retro Track Jacket", 64],
  ]),

  ...make("Summer Tees", "tees", 1101, [
    ["Classic White Tee", 19],
    ["Vintage Wash Tee", 24],
    ["Striped Crew Tee", 22],
    ["Sage Pocket Tee", 21],
    ["Boxy Cropped Tee", 23],
    ["Tropical Print Tee", 26],
    ["Linen Blend Tee", 29],
    ["Ribbed Tank Top", 18],
    ["Oversized Sand Tee", 25],
    ["Knit Polo Tee", 32],
  ]),

  ...make("Sneakers", "sneakers", 1201, [
    ["Court Classic White", 79],
    ["Retro Runner", 89],
    ["High-Top Canvas", 59],
    ["Chunky Platform Sneaker", 95],
    ["Slip-On Knit Sneaker", 54],
    ["Trail Runner", 99],
    ["Low-Top Leather", 85],
    ["Skate Shoe", 69],
    ["Mesh Trainer", 74],
    ["Retro Basketball High", 110],
  ]),

  ...make("Handbags", "handbags", 1301, [
    ["Leather Tote", 129],
    ["Mini Crossbody", 89],
    ["Classic Satchel", 149],
    ["Bucket Bag", 99],
    ["Everyday Backpack", 79],
    ["Quilted Shoulder Bag", 119],
    ["Woven Straw Bag", 69],
    ["Evening Clutch", 59],
    ["Belt Bag", 49],
    ["Weekender Duffle", 139],
  ]),

  ...make("Glasses", "glasses", 1401, [
    ["Classic Aviator", 39],
    ["Retro Round", 35],
    ["Black Wayfarer", 42],
    ["Oversized Cat-Eye", 45],
    ["Square Tortoise", 40],
    ["Sport Wrap", 49],
    ["Mirrored Lens", 44],
    ["Clear Blue-Light Frame", 32],
    ["Shield Visor", 52],
    ["Vintage Oval", 38],
  ]),
];