import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './Product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import SearchFilterBar from './SearchFilterBar';

interface ProductGridProps {
  hideTitle?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ hideTitle = false }) => {
  const { t } = useTranslation();
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand);
    return [...new Set(allBrands)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [products, searchQuery, selectedBrand]);

  return (
    <section id="product-grid" className="py-24 bg-[#01261C]">
      <div className="container mx-auto px-6">
        {!hideTitle && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">{t('products.title')}</h2>
              <p className="text-gray-400 max-w-md">{t('products.description')}</p>
            </div>
            <button className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 hover:text-white hover:border-white transition-all">
              {t('products.explore_all')}
            </button>
          </div>
        )}

        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          brands={brands}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p>No products available yet. Add some in the Admin dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;