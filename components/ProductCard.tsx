"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import  {addToCart, removeFromCart} from "@/redux/features/cartSlice";
import {Product} from "@/type";
import {fetchCart, persistCart} from "@/redux/features/cartThunks";
import {useState, useEffect} from "react";
import {toast} from "@/hooks/use-toast";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    // Access the cart state function from Redux
    const cart = useAppSelector((state) => state.cartReducer);
    const [loadingPersist, setLoadingPersist] = useState(false);
    useEffect(() => {
        dispatch(fetchCart()); // Sync Redux state with persisted JSON cart
    }, [dispatch]);
    // Determine if the current product is already in the cart
    const isInCart = cart.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        // After updating the cart, persist the updated cart
        dispatch(persistCart([...cart, { ...product, quantity: 1 }]));
        // Show toast after adding the product to the cart
        toast({
            title: `${product.name} Added to Cart`,
            description: `You have successfully added ${product.name} to your cart.`,
            variant: "default", // You can customize the variant as per the ShadCN toast documentation
        });
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
        // After removing, persist the updated cart
        const updatedCart = cart.filter((item) => item.id !== product.id);
        dispatch(persistCart(updatedCart));
        // Show toast after removing the product from the cart
        toast({
            title: `${product.name} Removed from Cart`,
            description: `You have removed ${product.name} from your cart.`,
            variant: "destructive", // You can customize the variant
        });
    };

    return (
        <Card className="p-4 shadow-lg rounded-2xl border border-gray-200 ">
            <CardContent className="flex flex-col items-center ">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={350}
                    className="rounded-2xl object-cover"
                />
                <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-xl font-bold mt-2">${product.price}</p>
            </CardContent>

            <CardFooter className="flex justify-center">
                {isInCart ? (
                    <Button variant="destructive" className="w-full bg-red-500" onClick={handleRemoveFromCart}>
                        Remove from Cart
                    </Button>
                ) : (
                    <Button className="w-full" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
