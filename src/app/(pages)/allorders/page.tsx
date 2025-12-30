
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserToken } from "@/app/Helpers/getUserToken";
import { jwtDecode } from "jwt-decode";

import { MyToken, Order } from "@/interfaces";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import { LucideChevronDown } from "lucide-react";


export default async function AllOrders( ) {
  const token = await getUserToken()
  const {id} = jwtDecode<MyToken>(token!);
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + id)
  const orders: Order[] = await response.json()
  
  
  return (
    <div className="space-y-8">
       <h1 className="text-3xl font-semibold">All Orders</h1>
      {orders.map((order) => (
        <Card key={order.id} className="border rounded-xl shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Order Date: </span>
                {order.createdAt}
              </p>
              <p>
                <span className="font-medium text-foreground">Payment: </span>
                {order.paymentMethodType}{" "}
                <span className="text-green-600">({order.isPaid&&'Paid'})</span>
              </p>
              <p>
                <span className="font-medium text-foreground">Delivered: </span>
                {order.isDelivered? (
                  <span className="text-green-600">Yes</span>
                ) : (
                  <span className="text-red-600">No</span>
                )}
              </p>
              <p>
                <span className="font-medium text-foreground">Total: </span>
                {order.totalOrderPrice} EGP
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <h3 className="font-medium text-foreground">Shipping Address</h3>
              <p>{order.shippingAddress.details}.{ order.shippingAddress.city}</p>
              <p>Phone: {order.user.phone}</p>
            </div>
           
            <Dialog key={order.id}>
              <DialogTrigger asChild>
                <Button className="mt-4 cursor-pointer"  variant="secondary">
                  View Order Items <LucideChevronDown/>
                </Button>
              </DialogTrigger>

              <DialogContent className=" ">
                <DialogHeader>
                  <DialogTitle className="text-sm"></DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4 mt-2">
                  {order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex  justify-between items-center   border p-2 rounded-md"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-14 h-14 rounded-md object-cover mb-2"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.product.title.split(' ', 2).join(' ')}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.count} | Price: {item.price} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>


              </DialogContent>
            </Dialog>


          </CardContent>
          <CardFooter className="justify-end text-xs text-muted-foreground">
            Last updated: {order.updatedAt}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
