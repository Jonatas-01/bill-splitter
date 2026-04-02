
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useState } from "react";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import type { ExtractedBill, FinalBill } from "@/types/bill";
import type { Person } from "@/types/person";


interface BillSummaryProps {
    bill: ExtractedBill;
    people: Person[];
    onBack: () => void;
    onNext: (finalBill: FinalBill) => void;
}

export default function BillSummary({ bill, people, onBack, onNext }: BillSummaryProps) {
    const [serviceChargePercent, setServiceChargePercent] = useState(
        bill.serviceChargePercent ?? 0
    );

    const subtotal = bill.items.reduce((acc, item) => acc + item.price, 0);

    const serviceChargeAmount = (subtotal * serviceChargePercent) / 100;

    function handleDecrease() {
        setServiceChargePercent((prev) => Math.max(0, Number((prev - 0.5).toFixed(1))));
    }

    function handleIncrease() {
        setServiceChargePercent((prev) => Math.min(30, Number((prev + 0.5).toFixed(1))));
    }

    function formatPercent(value: number) {
        return Number.isInteger(value) ? value.toString() : value.toFixed(1);
    }

    const TotalAmount = subtotal + serviceChargeAmount;

    function handleOnNext() {
        const finalBill = {
            ...bill,
            serviceChargePercent,
            people,
        };

        // For later: send finalBill to database or API
        onNext(finalBill);
    }

    return (
        <div className="w-full pb-32">
            <div className="flex justify-center w-full mb-4">
                <h1 className="main-title">Bill Summary</h1>
            </div>

            <div className="main-card">
                <div className="flex items-center justify-between mb-4">
                    <div >
                        <h3 className="font-bold text-xl">Service Charge %</h3>
                        <p>Adjust the service fee</p>
                    </div>
                    <div className="">
                        <h3 className="text-xl font-bold text-[var(--color-primary)]">
                            +{bill.currency}{serviceChargeAmount.toFixed(2)}
                        </h3>
                    </div>
                </div>

                <div className="rounded-2xl border border-[var(--color-border-primary)] bg-[#141210] py-1.5 px-2 flex items-center justify-between">
                    <button
                        type="button"
                        aria-label="Decrease service charge"
                        onClick={handleDecrease}
                        className="h-14 w-14 rounded-xl bg-[var(--color-primary)] text-black flex items-center justify-center text-2xl active:scale-85 transition"
                    >
                        <BsDashLg size={32} />
                    </button>

                    <div className="text-5xl font-bold leading-none tracking-tight">
                        {formatPercent(serviceChargePercent)}
                        <span className="text-4xl ml-2">%</span>
                    </div>

                    <button
                        type="button"
                        aria-label="Increase service charge"
                        onClick={handleIncrease}
                        className="h-14 w-14 rounded-xl bg-[var(--color-primary)] text-black flex items-center justify-center text-2xl active:scale-85 transition"
                    >
                        <BsPlusLg size={32} />
                    </button>
                </div>

            </div>

            <div className="mt-5">
                <h3 className="text-xl font-bold mb-2">Individual Breakdown</h3>

                <div className="flex flex-col gap-3">
                    {people.map((person) => {
                        const assignedItems = bill.items.filter((item) =>
                            item.assignedTo?.includes(person.name)
                        );
                        const itemsTotal = assignedItems.reduce((acc, item) => acc + item.price / (item.assignedTo?.length || 1), 0);
                        const serviceChargeShare = itemsTotal * (serviceChargePercent / 100);
                        const totalOwed = itemsTotal + serviceChargeShare;

                        return (
                            <div key={person.id} className="main-card flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-black font-bold rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: person.color }}
                                    >
                                        {person.name.trim().charAt(0).toUpperCase()}
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-lg">{person.name}</h4>
                                        <p className="text-[var(--color-text-secondary)]">
                                            {assignedItems.length} items
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="font-bold text-xl">
                                        {bill.currency}{totalOwed.toFixed(2)}
                                    </h3>
                                    <p className="text-xs">Inc. service charge (£{serviceChargeShare.toFixed(2)})</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className=" mt-5">
                    <h3 className="text-xl font-bold mb-2">Grand Total</h3>

                    <div className="main-card">
                        <div className="flex flex-col pb-4 border-b border-[var(--color-border-primary)]">
                            <div className="flex justify-between px-1">
                                <h3 className="text-[var(--color-text-secondary)] text-lg">Subtotal</h3>
                                <h3 className="text-lg">{bill.currency}{subtotal.toFixed(2)}</h3>
                            </div>
                            <div className="flex justify-between px-1">
                                <h3 className="text-[var(--color-text-secondary)] text-lg">Service Charge ({serviceChargePercent}%)</h3>
                                <h3 className="text-lg">{bill.currency}{serviceChargeAmount.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="flex justify-between px-1 pt-2 mt-2">
                            <h3 className="text-3xl font-bold">Grand Total</h3>
                            <h3 className="text-3xl font-bold text-[var(--color-primary)]">{bill.currency}{TotalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bottom-menu sm:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <div className="grid grid-cols-2 gap-6 items-center my-1">
                    <button className="tertiary-button" onClick={onBack}>
                        <LuMoveLeft size={26} /> Back
                    </button>
                    <button className="primary-button" onClick={handleOnNext}>
                        Confirm <LuMoveRight size={26} />
                    </button>
                </div>
            </div>

        </div >
    )
}