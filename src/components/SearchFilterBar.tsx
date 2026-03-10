import React from 'react';
import { Search } from 'lucide-react';

interface SearchFilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedBrand: string;
    setSelectedBrand: (brand: string) => void;
    brands: string[];
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    brands
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search Bar */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-500"
                />
            </div>

            {/* Brand Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button
                    onClick={() => setSelectedBrand('')}
                    className={`px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-colors ${selectedBrand === ''
                            ? 'bg-primary text-[#01261C]'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                        }`}
                >
                    All Brands
                </button>
                {brands.map(brand => (
                    <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-colors uppercase ${selectedBrand === brand
                                ? 'bg-primary text-[#01261C]'
                                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                            }`}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchFilterBar;
