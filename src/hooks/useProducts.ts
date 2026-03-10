import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { INITIAL_PRODUCTS } from '../lib/sampleData';

const STORAGE_KEY = 'aynawaj_products_fallback'; // Used only if Supabase fails

export const useProducts = () => {
    const queryClient = useQueryClient();

    // Fetch Products
    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('createdAt', { ascending: false });

            if (error) {
                console.error("Supabase fetch error:", error);

                // Fallback to local storage if DB is not setup yet
                const local = localStorage.getItem(STORAGE_KEY);
                if (local) return JSON.parse(local) as Product[];

                return INITIAL_PRODUCTS as Product[];
            }
            return data as Product[];
        }
    });

    // Add Product
    const addMutation = useMutation({
        mutationFn: async (newProduct: Omit<Product, 'id' | 'createdAt'>) => {
            const { data, error } = await supabase
                .from('products')
                .insert([newProduct])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (err) => {
            console.error("Failed to add product:", err);
            throw err;
        }
    });

    // Edit Product
    const editMutation = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Product> }) => {
            const { data, error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    // Delete Product
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });

    return {
        products,
        isLoading,
        isError,
        addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => addMutation.mutateAsync(p),
        editProduct: (id: string, updates: Partial<Product>) => editMutation.mutateAsync({ id, updates }),
        deleteProduct: (id: string) => deleteMutation.mutateAsync(id)
    };
};
