import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

// Temporary mock wine data
const mockProducts = [
  {
    id: 1,
    title: 'Cabernet Sauvignon',
    price: 29.99,
    description: 'A rich, full-bodied red with bold tannins and hints of blackcurrant.',
    image: 'https://images.unsplash.com/photo-1584467735871-20e01ad1bb7a'
  },
  {
    id: 2,
    title: 'Chardonnay',
    price: 21.50,
    description: 'A smooth white wine with notes of vanilla, butter, and citrus.',
    image: 'https://images.unsplash.com/photo-1601386329374-6e163f9b7014'
  },
  {
    id: 3,
    title: 'Pinot Noir',
    price: 24.99,
    description: 'Light-bodied red wine with cherry, raspberry, and earthy undertones.',
    image: 'https://images.unsplash.com/photo-1524594081293-190a2fe0baae'
  },
  {
    id: 4,
    title: 'Sauvignon Blanc',
    price: 18.75,
    description: 'Crisp white wine with grassy, citrus, and tropical fruit aromas.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f'
  },
  {
    id: 5,
    title: 'Rosé',
    price: 22.00,
    description: 'A refreshing rosé with strawberry, melon, and floral notes.',
    image: 'https://images.unsplash.com/photo-1607300804884-8c4211eb3521'
  },
  {
    id: 6,
    title: 'Merlot',
    price: 26.30,
    description: 'Smooth red wine with flavors of plum, chocolate, and herbs.',
    image: 'https://images.unsplash.com/photo-1612444530583-5c09f4b3b446'
  },
  {
    id: 7,
    title: 'Riesling',
    price: 20.45,
    description: 'Sweet white wine with apricot, honey, and floral notes.',
    image: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab'
  },
  {
    id: 8,
    title: 'Malbec',
    price: 27.80,
    description: 'Dark red wine with blackberry, plum, and smoky finish.',
    image: 'https://images.unsplash.com/photo-1602275167590-0807c17a6bba'
  },
  {
    id: 9,
    title: 'Zinfandel',
    price: 23.60,
    description: 'Fruity red wine with spice, jam, and black pepper hints.',
    image: 'https://images.unsplash.com/photo-1510626176961-4bfb7e60c5c3'
  },
  {
    id: 10,
    title: 'Champagne Brut',
    price: 35.00,
    description: 'Sparkling wine with crisp acidity, apple, and toasted brioche flavors.',
    image: 'https://images.unsplash.com/photo-1627641593583-b8fa9f2efc92'
  },
];

const Home = () => {
  return (
    <Container className="my-4">
      <h1>Featured Wines</h1>
      <Row>
        {mockProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;