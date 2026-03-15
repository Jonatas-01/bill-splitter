'use client';

import { useState } from "react";
import UploadPhoto from "@/components/UploadPhoto";
import ReviewBill from "@/components/ReviewBill";
import type { ExtractedBill } from "@/types/bill";


export default function Home() {
    const [currentView, setCurrentView] = useState<"upload" | "review" | "addPeople">("upload");
    const [billItems, setBillItems] = useState<ExtractedBill | null>(null);

    return (
        <main className="px-3 md:max-w-xl flex flex-col items-center justify-center w-full mx-auto">
            {currentView === "upload" && (
                <UploadPhoto
                    onSuccess={(bill) => {
                        setBillItems(bill);
                        setCurrentView("review");
                    }}
                />
            )}

            {currentView === "review" && billItems && (
                <ReviewBill
                    bill={billItems}
                    onConfirm={(updatedBill) => {
                        setBillItems(updatedBill)
                        setCurrentView("addPeople");
                    }}
                    onTryAgain={() => {
                        setBillItems(null);
                        setCurrentView("upload");
                    }}
                />
            )}
        </main>
    );
}
