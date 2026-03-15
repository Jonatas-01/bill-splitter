import { IoCloseOutline, IoSaveSharp } from "react-icons/io5";
import { RiMenuAddLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import type { BillItem } from "@/types/bill";
import { useState } from "react";

interface EditItemModalProps {
    mode: "edit" | "add";
    item: BillItem | null;
    onSave: (updatedItem: BillItem) => void;
    onDelete: (itemId: string) => void;
    onClose: () => void;
}

export default function EditItemModal({ mode, item, onSave, onDelete, onClose }: EditItemModalProps) {
    const [name, setName] = useState(item ? item.name : "");
    const [price, setPrice] = useState(item ? item.price : 0);
    const [error, setError] = useState<string | null>(null);

    function handleSave() {
        if (!name || price <= 0) {
            setError("Please enter a valid name and price for the item.");
            return;
        }

        const updatedItem: BillItem = {
            id: item ? item.id : crypto.randomUUID(),
            name,
            price,
        };
        onSave(updatedItem);
        onClose();
    }

    function handleDelete() {
        if (!item) {
            return;
        }

        onDelete(item.id);
        onClose();
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3">
            <div className="modal-content w-full max-w-md">
                <div className="flex justify-between items-center mb-4 border-b border-[#705818] p-6">
                    <h2 className="text-xl font-bold text-[var(--color-primary)]">{mode === "edit" ? "Edit Item" : "Add Item"}</h2>
                    <button onClick={onClose}>
                        <IoCloseOutline size={36} color="var(--color-primary)" />
                    </button>
                </div>

                {error && (
                    <div className="px-6 pb-6">
                        <span className="text-red-500">{error}</span>
                    </div>
                )}

                {/* Form fields for editing item details */}
                <div className="px-6 pb-6">
                    <div>
                        <label className="block mb-1">Item Name</label>
                        <input
                            type="text"
                            className="w-full px-3 font-bold text-lg py-2 bg-[#2A2311] border border-[#705818] rounded-md focus:outline-none focus:ring-2 focus:ring-[#705818]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label className="block mb-1 mt-4">Price</label>
                        <input
                            type="number"
                            className="w-full font-bold text-lg px-3 py-2 bg-[#2A2311] border border-[#705818] rounded-md focus:outline-none focus:ring-2 focus:ring-[#705818]"
                            value={price}
                            step={0.01}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        {mode === "edit" && (
                            <div>
                                <button className="delete-button mt-10" onClick={handleDelete}>
                                    <MdDelete size={24} /> Delete Item
                                </button>
                                <button className="primary-button mt-3" onClick={handleSave}>
                                    <IoSaveSharp size={22} /> Save Changes
                                </button>
                            </div>
                        )}
                        {mode === "add" && (
                            <button className="primary-button mt-10 w-full" onClick={handleSave}>
                                <RiMenuAddLine size={22} /> Create New Item
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}