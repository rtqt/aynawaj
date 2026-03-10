import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import HeritageSection from '../components/HeritageSection';

const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <ProductGrid />
            <HeritageSection />
        </main>
    );
};

export default Home;
