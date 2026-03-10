import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Image as ImageIcon, Check, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const Admin: React.FC = () => {
    const { products, addProduct, editProduct, deleteProduct } = useProducts();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        brand: '',
        name: '',
        origin: '',
        quality: '',
        sizes: [],
        price: 0,
        contactPhone: '',
        telegramUsername: '',
        images: ['']
    });

    const [sizesInput, setSizesInput] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const resetForm = () => {
        setFormData({
            brand: '', name: '', origin: '', quality: '', sizes: [],
            price: 0, contactPhone: '', telegramUsername: '', images: ['']
        });
        setSizesInput('');
        setImageFiles([]);
        setExistingImages([]);
        setIsEditing(null);
    };

    const startEdit = (product: Product) => {
        setIsEditing(product.id);
        setFormData(product);
        setSizesInput(product.sizes.join(', '));
        setExistingImages(product.images || []);
        setImageFiles([]);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let sizes = sizesInput.split(',').map(s => s.trim()).filter(s => s);

        if (sizes.length === 0) {
            // Default sizes if empty
            sizes = ['40', '41', '42', '43'];
        }

        const finalDataDetails = {
            ...formData,
            origin: formData.origin?.trim() || 'made in vietnam',
            quality: formData.quality?.trim() || 'High quality',
            contactPhone: formData.contactPhone?.trim() || '0980233823',
            telegramUsername: formData.telegramUsername?.trim() || '@Aynawaj1',
        };

        if (imageFiles.length === 0 && existingImages.length === 0) {
            toast.error("Please provide at least one image.");
            return;
        }

        setIsSubmitting(true);
        try {
            const uploadedUrls: string[] = [];

            // Upload new images
            for (const file of imageFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath);

                uploadedUrls.push(data.publicUrl);
            }

            const finalImages = [...existingImages, ...uploadedUrls];
            const finalData = { ...finalDataDetails, sizes, images: finalImages } as Omit<Product, 'id' | 'createdAt'>;
            if (isEditing) {
                await editProduct(isEditing, finalData);
                toast.success("Product updated successfully!");
            } else {
                await addProduct(finalData);
                toast.success("Product added successfully!");
            }
            resetForm();
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "An error occurred while saving the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#01261C]">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-primary uppercase tracking-widest mb-2">Content Manager</h1>
                    <p className="text-gray-400">Manage your product inventory exactly like your Telegram channel.</p>
                </div>

                {/* Form Section */}
                <div className="bg-white/5 border border-primary/20 rounded-2xl p-8 mb-12 shadow-xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        {isEditing ? <Pencil className="text-primary" /> : <Plus className="text-primary" />}
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Brand</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Adidas"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={formData.brand || ''}
                                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Model Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. adistar"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={formData.name || ''}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Origin</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. made in vietnam"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={formData.origin || ''}
                                        onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quality</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. High quality"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={formData.quality || ''}
                                        onChange={e => setFormData({ ...formData, quality: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sizes (Comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 40, 41, 42, 43"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={sizesInput}
                                    onChange={e => setSizesInput(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Price (In Birr)</label>
                                <input
                                    required
                                    type="number"
                                    placeholder="e.g. 10000"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={formData.price || ''}
                                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Phone</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 0980233823"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={formData.contactPhone || ''}
                                        onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Telegram Username</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. @Aynawaj1"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={formData.telegramUsername || ''}
                                        onChange={e => setFormData({ ...formData, telegramUsername: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <ImageIcon size={14} /> Product Images
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-[#01261C] hover:file:bg-white"
                                    onChange={e => {
                                        if (e.target.files) {
                                            setImageFiles(Array.from(e.target.files));
                                        }
                                    }}
                                />
                                {/* Preview existing images when editing */}
                                {existingImages.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-2">
                                        {existingImages.map((url, idx) => (
                                            <div key={idx} className="relative group">
                                                <img src={url} alt="product" className="h-16 w-16 object-cover rounded-lg border border-white/10" />
                                                <button
                                                    type="button"
                                                    onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                            )}
                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-10 py-4 bg-primary text-[#01261C] rounded-xl font-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-white hover:text-[#01261C] hover:scale-105 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" /> : (isEditing ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
                                    {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Product')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Inventory ({products.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#01261C] to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="font-black text-xl text-white uppercase">{product.brand}</p>
                                        <p className="text-primary font-bold text-sm">{product.name}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center bg-black/20">
                                    <p className="font-bold text-white">{product.price.toLocaleString()} ETB</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEdit(product)}
                                            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this product?')) {
                                                    deleteProduct(product.id);
                                                }
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-500">
                                <p>No products found. Add some using the form above!</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
