export class ProductItem {
   constructor(data) {
      this.productCode = data.productCode;
      this.price = data.price;
      this.discount = data.discount;
      this.type = data.type;
      this.description = data.description;

      this.availability = 'In stock';
      this.tags = ['Classic', 'Casual', 'V-neck', 'Loose'];
      this.image = 'shirt1.png';
      this.advantages = [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ];
   }
}

export class ProductFactory {
   create(data) {
      return new ProductItem(data);
   }
}


export let products = [
   {
      price: 107,
      discount: 10,
      image: 'shirt1.png',
      productCode: 499570,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   },
   {
      price: 120,
      discount: 10,
      image: 'shirt2.png',
      productCode: 499571,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   },
   {
      price: 115,
      discount: 10,
      image: 'shirt3.png',
      productCode: 499572,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   },
   {
      price: 125,
      discount: 10,
      image: 'shirt4.png',
      productCode: 499573,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   },
   {
      price: 107,
      discount: 10,
      image: 'shirt5.png',
      productCode: 499574,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   },
   {
      price: 107,
      discount: 10,
      image: 'shirt6.png',
      productCode: 499575,
      availability: 'In stock',
      type: 'ave classic sweatshirt',
      tags: ['Classic', 'Casual', 'V-neck', 'Loose'],
      advantages: [
         'Casual fit',
         '100% Cotton',
         'Elasticated cuffs',
         'Free shipping with 4 days delivery'
      ],
      description: `
         Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh 
         suspendisse est congue metus nunc, id viverra elit loreti rhoncus 
         quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.`
   }
];


export let localStore = [
   {
      city: 'London',
      tel: '0123-456-789',
      link: 'www.yourwebsite.com',
      email: 'support@yourwebsite.com',
      street: '80-182 REGENT STREET, LONDON, W1B 5BT',
      location: 'https://www.google.com/maps/d/embed?mid=1Pj2ly5dkJoaHqvs6qMmwFA6uajQ',
      time: 'Monday-Friday: 9am to 6pm Saturday: 10am to 6pm Sunday: 10am to 2pm',
      description: `
         Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. 
         Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec 
         tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. 
         Aliquam erat volutpat.
      `
   },
   {
      city: 'New York',
      tel: '0123-456-789',
      link: 'www.yourwebsite.com',
      email: 'support@yourwebsite.com',
      street: '109 COLUMBUS CIRCLE, NEW YORK, NY 10023',
      location: 'https://www.google.com/maps/d/embed?mid=1bf4qwgGAMWSKS2N2GnGJRONqRTs',
      time: 'Monday-Friday: 9am to 6pm Saturday: 10am to 6pm Sunday: 10am to 2pm',
      description: `
         Nunc non posuere nisl. Etiam finibus vel dui nec lobortis. Aliquam 
         egestas, sem quis condimentum venenatis, erat leo fermentum dolor, 
         non sollicitudin massa mi eu nibh. Nullam vitae aliquam dui, non 
         sodales nisl.
      `
   },
   {
      city: 'Paris',
      tel: '0123-456-789',
      link: 'www.yourwebsite.com',
      email: 'support@yourwebsite.com',
      street: '109 COLUMBUS CIRCLE, NEW YORK, NY 10023',
      location: 'https://www.google.com/maps/d/embed?mid=1y52IU40ssnocseXi8buDSZ3QXRw',
      time: 'Monday-Friday: 9am to 6pm Saturday: 10am to 6pm Sunday: 10am to 2pm',
      description: `
         Nunc non posuere nisl. Etiam finibus vel dui nec lobortis. Aliquam 
         egestas, sem quis condimentum venenatis, erat leo fermentum dolor, 
         non sollicitudin massa mi eu nibh. Nullam vitae aliquam dui, non 
         sodales nisl.
      `
   }
]