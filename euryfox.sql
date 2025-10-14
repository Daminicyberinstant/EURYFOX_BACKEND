use euryfoxdb


db.createUser({
  user: "euryfoxuser",
  pwd: "euryfox1234",   // choose a strong password
  roles: [
    { role: "readWrite", db: "euryfoxdb" }
  ]
})

mongosh -u "euryfoxuser" -p "euryfox1234" 



db.createCollection("product_categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "category", "description", "image"],
      properties: {
        title: { bsonType: "string" },
        icon: { bsonType: "string" },
        category: { bsonType: "string" },
        description: { bsonType: "string" },
        image: { bsonType: "string" }
      }
    }
  }
})
db.product_categories.createIndex(
  { title: 1 },
  { unique: true }
);





db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "unitId", "inStock", "categoryId"],
      properties: {
        name: { 
          bsonType: "string", 
          description: "Name of the product is required"
        },
        price: { 
          bsonType: "string", 
          description: "Price must be a string (e.g., '199.99')" 
        },
        originalPrice: { 
          bsonType: ["string", "null"], 
          description: "Optional original price before discount" 
        },
        unitId:{
          bsonType: "objectId", 
          description: "Reference to product unit" 
        },
        categoryId: { 
          bsonType: "objectId", 
          description: "Reference to categories collection" 
        },
        images: { 
          bsonType: "array", 
          description: "List of product image URLs", 
          items: { bsonType: "string" }
        },
        rating: { 
          bsonType: "double", 
          description: "Average customer rating (0.0 - 5.0)" 
        },
        reviews: { 
          bsonType: "int", 
          description: "Total number of customer reviews" 
        },
        inStock: { 
          bsonType: "bool", 
          description: "Availability of the product" 
        },
        stockCount: { 
          bsonType: "int", 
          description: "Number of items in stock" 
        },
        discount: { 
          bsonType: ["string", "null"], 
          description: "Discount info (e.g., '10%')" 
        },
        description: { 
          bsonType: ["string", "null"], 
          description: "Short description of the product" 
        },
        longDescription: { 
          bsonType: ["string", "null"], 
          description: "Detailed product description" 
        },
        features: { 
          bsonType: "array", 
          description: "List of product features", 
          items: { bsonType: "string" }
        },
        specifications: { 
          bsonType: "object", 
          description: "Technical specifications in key-value format" 
        },
        benefits: { 
          bsonType: "array", 
          description: "List of benefits", 
          items: { bsonType: "string" }
        }
      },
    }
  }
})

db.products.createIndex(
  { name: 1, categoryId: 1 },
  { unique: true }
);


db.createCollection("contact_info", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "mobileNumber",
        "infoEmail",
        "salesEmail",
        "supportEmail",
        "officeAddress",
        "phoneNumbers",
        "emails",
        "businessHours",
        "longitude",
        "latitude",
      ],
      properties: {
        mobileNumber: { bsonType: "string" },
        infoEmail: { bsonType: "string" },
        salesEmail: { bsonType: "string" },
        supportEmail: { bsonType: "string" },
        officeAddress: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        phoneNumbers: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        emails: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        businessHours: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },

        isActive: { bsonType: "bool" },   
      }
    }
  }
});




db.createCollection("team_members", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "role", "image", "description"],
      properties: {
        name: { bsonType: "string" },
        role: { bsonType: "string" },
        image: { bsonType: "string" },
        description: { bsonType: "string" },
        isActive: { bsonType: "bool" } 
      }
    }
  }
});


db.team_members.createIndex({ role: 1 }, { unique: true });






db.createCollection("currencies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["currency", "name", "flag", "rate", "symbol"],
      properties: {
        code: { bsonType: "string", description: "same as Currency" },
        name: { bsonType: "string", description: "Full currency name like Indian Rupee" },
        flag: { bsonType: "string", description: "Country flag code like IN, US, EU" },
        currency:{bsonType : "string",description:"Currency code like INR, USD, EUR"},
        rate: { bsonType: "string", description: "Rate in context of 1 INR" },
        symbol: { bsonType: "string", description: "Currency symbol like ₹, $, €" }
      }
    }
  }
})
db.currencies.createIndex({ name: 1 }, { unique: true });
db.currencies.createIndex({ flag: 1 }, { unique: true });
db.currencies.createIndex({ currency: 1 }, { unique: true });












db.createCollection("product_units", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "code",],
      properties: {
        name: { bsonType: "string", description: "Full name of the unit, e.g., Kilogram, Gram" },
        code: { bsonType: "string", description: "Short code of the unit, e.g., kg, g, pc" },
        type: { bsonType: "string", description: "Type of unit: weight, volume, count, length, area, other" },
        description: { bsonType: "string", description: "Optional description about the unit" },
      
      }
    }
  }
});
db.product_units.createIndex({ code: 1 }, { unique: true });
db.product_units.createIndex({ name: 1 }, { unique: true });


db.createCollection("unit_quantities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["unitId", "quantities"],
      properties: {
        unitId: { 
          bsonType: "objectId", 
          description: "Reference to product_units._id" 
        },
        quantities: {
          bsonType: "array",
          description: "Array of quantity objects for this unit",
          items: {
            bsonType: "object",
            required: ["value", "label", "multiplier"],
            properties: {
              value: { bsonType: "string", description: "Value code, e.g., kg, 10kg" },
              label: { bsonType: "string", description: "Display label, e.g., 1 kg" },
              multiplier: { bsonType: "number", description: "Multiplier relative to base unit" }
            }
          }
        }
      }
    }
  }
});
db.unit_quantities.createIndex({ unitId: 1 },{ unique: true });




db.createCollection("blogs_category", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name","category"],
      properties: {
        category:{bsonType:"string"},
        name: { bsonType: "string" },
        isActive: { bsonType: "bool" }
      }
    }
  }
});

db.blogs_category.createIndex(
  { name: 1 },
  { unique: true }
);






db.createCollection("blogs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "slug",
        "title",
        "excerpt",
        "content",
        "author",
        "date",
        "publishedAt",
        "categoryId",
        "isActive",
        "featured"
      ],
      properties: {
        name:{bsonType: "string"},
        slug: { bsonType: "string" },
        title: { bsonType: "string" },
        excerpt: { bsonType: "string" },
         content: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["heading", "para"],
            properties: {
              heading: { bsonType: "string" },
              para: { bsonType: "string" }
            }
          }
        },
        author: { bsonType: "string" },
        authorRole: { bsonType: ["string", "null"] },
        authorImage: { bsonType: ["string", "null"] },
        date: { bsonType: "date" },
        publishedAt: { bsonType: "date" },
        readTime: { bsonType: ["string", "null"] },
        categoryId: { bsonType: "objectId" },
        tags: { bsonType: "array", items: { bsonType: "string" } },
        image: { bsonType: ["string", "null"] },
        views: { bsonType: "int" },
        likes: { bsonType: "int" },
        comments: { bsonType: "int" },
        isActive: { bsonType: "bool" },
        featured: { bsonType: "bool" }
      }
    }
  }
});
db.blogs.createIndex({ name: 1, categoryId: 1 }, { unique: true });




db.products.insertMany([
  {
    name: "Potato Chips",
    price: "₹99.00",
    originalPrice: "₹120.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"), // Piece
    categoryId: ObjectId("68b56ba493d721e620eec4bb"), // Snacks
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.2,
    reviews: 300,
    inStock: true,
    stockCount: 500,
    discount: "20",
    description: "Crispy and crunchy potato chips.",
    longDescription: "Classic salted potato chips made from the finest potatoes for a perfect snack.",
    features: ["Crispy texture", "Lightly salted"],
    specifications: { weight: "100g", origin: "India" },
    benefits: ["Great taste", "Perfect party snack"]
  },
  {
    name: "Chocolate Cookies",
    price: "₹199.00",
    originalPrice: "₹250.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.8,
    reviews: 85,
    inStock: true,
    stockCount: 200,
    discount: "10",
    description: "Delicious chocolate chip cookies.",
    longDescription: "Freshly baked cookies with chunks of chocolate, perfect for tea-time or snacking.",
    features: ["Rich chocolate chips", "Freshly baked"],
    specifications: { weight: "150g", origin: "India" },
    benefits: ["Mood booster", "Kids love it"]
  },
  {
    name: "Roasted Cashews",
    price: "₹399.00",
    originalPrice: "₹450.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.6,
    reviews: 95,
    inStock: true,
    stockCount: 120,
    discount: "12",
    description: "Crunchy roasted cashew nuts.",
    longDescription: "Perfectly roasted cashews seasoned lightly to enhance the natural nutty flavor.",
    features: ["Rich in minerals", "Crispy texture"],
    specifications: { weight: "200g", origin: "Goa, India" },
    benefits: ["Supports immunity", "Healthy fat source"]
  },
  {
    name: "Trail Mix",
    price: "₹299.00",
    originalPrice: "₹350.00",
    unitId: ObjectId("68b563a693d721e620eec4b4"),
    categoryId: ObjectId("68b56ba493d721e620eec4bb"),
    images: [
      "uploads/products/organic-almondss_898724.jpeg",
      "uploads/products/product_247056.png",
      "uploads/products/deepak_178425.jpeg"
    ],
    rating: 4.4,
    reviews: 60,
    inStock: true,
    stockCount: 180,
    discount: "15",
    description: "Nutritious trail mix of dried fruits and nuts.",
    longDescription: "A balanced mix of raisins, almonds, cashews, and dried berries for a healthy snack option.",
    features: ["High in fiber", "Energy boosting"],
    specifications: { weight: "300g", origin: "India" },
    benefits: ["Great for fitness", "Quick energy supply"]
  }
]);



-- update products table
db.runCommand({
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "unitId", "inStock", "categoryId"], // thomps is NOT required
      properties: {
        name: { 
          bsonType: "string", 
          description: "Name of the product is required"
        },
        price: { 
          bsonType: "string", 
          description: "Price must be a string (e.g., '199.99')" 
        },
        originalPrice: { 
          bsonType: ["string", "null"], 
          description: "Optional original price before discount" 
        },
        unitId:{
          bsonType: "objectId", 
          description: "Reference to product unit" 
        },
        categoryId: { 
          bsonType: "objectId", 
          description: "Reference to categories collection" 
        },
        images: { 
          bsonType: "array", 
          description: "List of product image URLs", 
          items: { bsonType: "string" }
        },
        rating: { 
          bsonType: "double", 
          description: "Average customer rating (0.0 - 5.0)" 
        },
        reviews: { 
          bsonType: "int", 
          description: "Total number of customer reviews" 
        },
        inStock: { 
          bsonType: "bool", 
          description: "Availability of the product" 
        },
        stockCount: { 
          bsonType: "int", 
          description: "Number of items in stock" 
        },
        discount: { 
          bsonType: ["string", "null"], 
          description: "Discount info (e.g., '10%')" 
        },
        description: { 
          bsonType: ["string", "null"], 
          description: "Short description of the product" 
        },
        longDescription: { 
          bsonType: ["string", "null"], 
          description: "Detailed product description" 
        },
        features: { 
          bsonType: "array", 
          description: "List of product features", 
          items: { bsonType: "string" }
        },
        specifications: { 
          bsonType: "object", 
          description: "Technical specifications in key-value format" 
        },
        benefits: { 
          bsonType: "array", 
          description: "List of benefits", 
          items: { bsonType: "string" }
        },
        
        thomps: {
          bsonType: "bool",
          description: "Indicates if Thomps features are enabled (optional)"
        },
        bestSellingProducts: { 
          bsonType: "bool",
          description: "Indicates if this is a best-selling product; relevant only when thomps is true"
        },
        signatureFlavorsProducts: { 
          bsonType: "bool",
          description: "Indicates if signature product flavors are enabled; relevant only when thomps is true"
        }
      }
    }
  },
  validationLevel: "moderate"
});






db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["emailAddress"],
      properties: {
        fullName: { 
          bsonType: "string", 
          description: "Full name of the user" 
        },
        emailAddress: { 
          bsonType: "string", 
          description: "Email address of the user"
        },
        mobileNumber: { 
          bsonType: "string", 
          description: "Mobile number of the user"
        },
        address: { 
          bsonType: "string", 
          description: "Address of the user"
        }
      }
    }
  }
});
db.users.createIndex({ emailAddress: 1 }, { unique: true });
