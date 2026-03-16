import { RiPencilLine } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

import type { BillItem, ExtractedBill } from "@/types/bill";
import EditItemModal from "./modals/ItemModal";
import { useEffect, useState } from "react";

interface ReviewBillProps {
    bill: ExtractedBill;
    onConfirm: (updatedBill: ExtractedBill) => void;
    onTryAgain: () => void;
}

export default function ReviewBill({ bill, onConfirm, onTryAgain }: ReviewBillProps) {
    const [billState, setBill] = useState(bill);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BillItem | null>(null);
    const [modalMode, setModalMode] = useState<"edit" | "add">("edit");

    useEffect(() => {
        setBill(bill);
    }, [bill]);

    const subtotal = billState.items.reduce(
        (acc, item) => acc + item.price,
        0
    );

    function handleOpenEdit(item: BillItem) {
        setIsItemModalOpen(true);
        setSelectedItem(item);
        setModalMode("edit");
    }

    function handleOpenAdd() {
        setModalMode("add");
        setSelectedItem(null);
        setIsItemModalOpen(true);
    }

    function handleSaveItem(updatedItem: BillItem) {
        if (modalMode === "add") {
            setBill((prevBill) => ({
                ...prevBill,
                items: [...prevBill.items, updatedItem],
            }));
        } else {
            setBill((prevBill) => ({
                ...prevBill,
                items: prevBill.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
            }));
        }
    }

    function handleDeleteItem(itemId: string) {
        setBill((prevBill) => ({
            ...prevBill,
            items: prevBill.items.filter((item) => item.id !== itemId),
        }));
    }

    return (
        <div>
            <div className="flex justify-center w-full mb-6">
                <h1 className="main-title">Review Bill</h1>
            </div>

            <div className="text-center mb-3">
                <p>Number of the items: <span className="font-bold text-[var(--color-text-primary)]">{billState.items.length}</span></p>
            </div>

            <div className="flex flex-col gap-3 mb-40">
                {billState.items.map((item) => (
                    <div key={item.id} className="main-card grid grid-cols-2 items-center">
                        <div className="font-bold line-clamp-1">{item.name}</div>
                        <div className="gap-2 flex items-center justify-evenly">
                            <span className="font-normal text-[var(--color-text-secondary)]">{billState.currency}</span>
                            <span className="font-bold text-start">{item.price.toFixed(2)}</span>
                            <button
                                type="button"
                                className="font-bold text-[var(--color-primary)] bg-[var(--color-primary-dark)] px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer active:bg-[var(--color-primary)] active:text-black"
                                onClick={() => handleOpenEdit(item)}
                            >
                                <RiPencilLine size={22} /> Edit
                            </button>
                        </div>
                    </div>
                ))}

                <div>
                    <button className="add-item-btn w-full active:bg-[var(--color-primary)] active:text-black" onClick={handleOpenAdd}>
                        <BsPlusLg size={22} /> Add Item
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {isItemModalOpen && (modalMode === "add" || selectedItem) && (
                <EditItemModal
                    mode={modalMode}
                    item={selectedItem}
                    onSave={handleSaveItem}
                    onDelete={handleDeleteItem}
                    onClose={() => {
                        setIsItemModalOpen(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            {/* Bottom Menu */}
            <div className="bottom-menu md:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-bold">Subtotal</span>
                    <span className="text-[var(--color-primary)] font-bold">{billState.currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <button className="tertiary-button" onClick={onTryAgain}>
                        <LuMoveLeft size={26} /> Try Again
                    </button>
                    <button className="primary-button" onClick={() => onConfirm(billState)}>
                        Confirm <LuMoveRight size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}