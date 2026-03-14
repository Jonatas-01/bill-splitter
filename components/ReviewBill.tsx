import { RiPencilLine } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import type { ExtractedBill } from "@/types/bill";

interface ReviewBillProps {
    bill: ExtractedBill;
}

export default function ReviewBill({ bill }: ReviewBillProps) {
    const subtotal = bill.items.reduce(
        (acc, item) => acc + item.price,
        0
    );

    return (
        <div>
            <div className="flex justify-center w-full mb-6">
                <h1 className="main-title">Review Bill</h1>
            </div>

            <div className="text-center mb-3">
                <p>Number of the items: <span className="font-bold text-[var(--color-text-primary)]">{bill.items.length}</span></p>
            </div>

            <div className="flex flex-col gap-3 mb-40">
                {bill.items.map((item, index) => (
                    <div key={index} className="main-card grid grid-cols-2 items-center">
                        <div className="font-bold line-clamp-1">{item.name}</div>
                        <div className="gap-2 flex items-center justify-evenly">
                            <span className="font-normal text-[var(--color-text-secondary)]">{bill.currency}</span>
                            <span className="font-bold text-start">{item.price.toFixed(2)}</span>
                            <span className="font-bold text-[var(--color-primary)] bg-[var(--color-primary-dark)] px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer"><RiPencilLine size={22} /> Edit</span>
                        </div>
                    </div>
                ))}
                <div className="">
                    <button className="add-item-btn w-full">
                        <BsPlusLg size={22} /> Add Item
                    </button>
                </div>
            </div>

            <div className="bottom-menu">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-bold">Subtotal</span>
                    <span className="text-[var(--color-primary)] font-bold">{bill.currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <button className="tertiary-button">
                        <LuMoveLeft size={26} /> Try Again
                    </button>
                    <button className="primary-button">
                        Confirm <LuMoveRight size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}