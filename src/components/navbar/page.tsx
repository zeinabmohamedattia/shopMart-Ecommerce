"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "../context/CartContext";
import { signOut, useSession } from "next-auth/react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import {
    Menu,
    ShoppingCartIcon,
    UserIcon,
    Loader,
    Heart,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { WishlistContext } from "../context/WishlistContext";

export default function Navbar() {
    const session = useSession();
    const { cartData, isLoading } = useContext(CartContext);
    const { wishlistData, isWishlistLoading } = useContext(WishlistContext);
    const pathname = usePathname();

    return (
        <nav className="bg-gray-100/75  shadow text-xl z-50 font-semibold p-3 sticky top-0">
            <div className="container mx-auto flex items-center justify-between">
                {/* LOGO */}
                <Link href={'/'} className="flex items-center gap-1" > <div className="bg-black text-white w-10 h-10 flex justify-center items-center cursor-pointer rounded-md text-xl font-bold">
                    S
                </div>
                    <span className="text-2xl font-semibold">ShopMart</span></Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-6">
                            <NavigationMenuItem>
                                <NavigationMenuLink className="cursor-pointer" asChild active={pathname.startsWith("/products")}>
                                    <Link href="/products">Products</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="cursor-pointer" asChild active={pathname.startsWith("/brands")}>
                                    <Link href="/brands">Brands</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className="cursor-pointer" asChild active={pathname.startsWith("/categories")}>
                                    <Link href="/categories">Categories</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                    {/* User + Cart */}
                <div className="hidden md:flex items-center gap-3">
                    {session.status === "authenticated" && (
                        <h2 className="text-base">Hi {session.data.user.name}</h2>
                    )}

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer outline-0">
                            <UserIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {session.status === "authenticated" ? (
                                <>
                            
                                    <Link  href="/allorders">
                                        <DropdownMenuItem className="cursor-pointer " >Orders</DropdownMenuItem>
                                    </Link>

                                    <DropdownMenuItem className="cursor-pointer"
                                        onClick={() =>
                                            signOut({
                                                callbackUrl: "/",
                                            })
                                        }
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                        <Link href="/login" className="cursor-pointer">
                                        <DropdownMenuItem>Login</DropdownMenuItem>
                                    </Link>
                                        <Link href="/register" className="cursor-pointer">
                                        <DropdownMenuItem>Register</DropdownMenuItem>
                                    </Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Cart */}
                    {session.status === "authenticated" && 
                        <>
                        <div className="relative cursor-pointer">
                            <Link href="/cart">
                                <ShoppingCartIcon />

                                <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono">
                                    {isLoading ? (
                                        <Loader className="animate-spin w-3 h-3" />
                                    ) : (
                                        cartData?.numOfCartItems
                                    )}
                                </Badge>
                            </Link>
                        </div>    
                        <div className="relative cursor-pointer">
                            <Link href="/wishlist">
                                <Heart />
                                <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono">
                                    {isWishlistLoading ? (
                                        <Loader className="animate-spin w-3 h-3" />
                                    ) : (
                                        wishlistData?.count
                                    )}
                                </Badge>
                            </Link>
                        </div>    
                    </>
                        
                    }
                </div>

                {/* Mobile Hamburger */}
                 <div className="md:hidden ">
                    <Sheet >
                        <SheetTrigger className="cursor-pointer">
                            <Menu />
                        </SheetTrigger>

                        <SheetContent side="right" className="w-64">

                            {/* Required Accessible Title (hidden visually) */}
                            <VisuallyHidden>
                                <SheetHeader>
                                    <SheetTitle>Mobile Menu</SheetTitle>
                                </SheetHeader>
                            </VisuallyHidden>

                            <div className="flex flex-col  p-4 gap-6 mt-10">
                                <Link
                                    href="/products"
                                    className={`  text-lg ${pathname.startsWith("/products") ? "font-bold" : ""}`}
                                >
                                    Products
                                </Link>

                                <Link
                                    href="/brands"
                                    className={`  text-lg ${pathname.startsWith("/brands") ? "font-bold" : ""}`}
                                >
                                    Brands
                                </Link>

                                <Link
                                    href="/categories"
                                    className={`  text-lg ${pathname.startsWith("/categories") ? "font-bold" : ""}`}
                                >
                                    Categories
                                </Link>

                                <hr />

                                {session.status === "authenticated" ? (
                                    <>
                                        <Link href="/allorders" className="text-lg cursor-pointer">Orders</Link>

                                        <button
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="text-left text-lg cursor-pointer text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="text-lg cursor-pointer">Login</Link>
                                            <Link href="/register" className="text-lg cursor-pointer">Register</Link>
                                    </>
                                )}

                                {session.status === "authenticated" &&
                                    
                                    <>
                                    <Link href="/cart" className="flex relative w-fit cursor-pointer items-center gap-3 text-lg">
                                        <ShoppingCartIcon />
                                        <Badge className=" size-5  absolute -top-3 -end-3 rounded-full px-1   font-mono">
                                            {isLoading ? (
                                                <Loader className="animate-spin w-3 h-3" />
                                            ) : (
                                                cartData?.numOfCartItems
                                            )}
                                        </Badge>
                                    </Link>
                                    
                                    <Link href="/wishlist" className="lex relative w-fit  items-center gap-3 text-lg cursor-pointer">
                                            <Heart />
                                            <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono">
                                            {isWishlistLoading ? (
                                                    <Loader className="animate-spin w-3 h-3" />
                                                ) : (
                                                    wishlistData?.count
                                                )}
                                            </Badge>
                                        </Link>
                                       
                                    </>
                                    


                               }
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    );
}

