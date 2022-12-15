import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Egg and Cheese Sandwich',
  'Bacon and Egg Sandwich',
  'Speakers for your Home',
  'Coffee and Tea',
  'Hats or Caps',
  'Sunglasses',
  'Honey gets you High',
  'The Best Coffee',
  'Sports Shoes',
  'The Best Shoes',
  'Sports Shoes',
  'The Best Shoes',
  'The Best T-Shirt',
  'Gardening Tools',
  'The Best Gardening Tools',
  'How to Grow Tomatoes',
  'The Best Tomatoes',
  'Enviormentally Friendly',
  'The Best T-Shirt',
  'Gardening Tools',
  'The Best Gardening Tools',
  'How to Grow Tomatoes',
  'The Best Tomatoes',
  'Enviormentally Friendly',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
