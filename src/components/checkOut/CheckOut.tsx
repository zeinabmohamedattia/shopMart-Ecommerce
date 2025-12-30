'use client'
import { useRef } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { checkOutAction } from './_actions/checkOut.action'
export default function CheckOut({ cartId }: { cartId: string }) {
    let detailsInput = useRef<HTMLInputElement | null>(null)
    let cityInput = useRef<HTMLInputElement | null>(null)
    let phoneInput = useRef<HTMLInputElement | null>(null)
    async function checkOutSession() {
        const details = detailsInput.current!.value;
        const city = cityInput.current!.value;
        const phone = phoneInput.current!.value;
      
        const data = await checkOutAction(cartId, details, city, phone)
        
        if (data.status == 'success') {
            window.open(data.session.url)
        }
    }
    return <>

        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full  text-lg mt-4' variant="outline">Proceed to Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add shipping Address</DialogTitle>
                        <DialogDescription>
                            Make Sure that your entered the correct address.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label >city</Label>
                            <Input ref={cityInput} id="city"  />
                        </div>
                        <div className="grid gap-3">
                            <Label >details</Label>
                            <Input ref={detailsInput} id="details" />
                        </div>
                        <div className="grid gap-3">
                            <Label >phone</Label>
                            <Input ref={phoneInput} id="phone" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={()=>checkOutSession()}>Visa</Button>
                        <Button type="submit">Cash</Button>
                        
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>

    </>
}
