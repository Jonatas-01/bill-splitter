'use client';

import { useState } from "react";
import UploadPhoto from "@/components/UploadPhoto";
import ReviewBill from "@/components/ReviewBill";
import type { ExtractedBill } from "@/types/bill";


export default function Home() {
    const [currentView, setCurrentView] = useState<"upload" | "review">("upload");
    const [billItems, setBillItems] = useState<ExtractedBill | null>(null);

    return (
        <main className="px-3 md:max-w-xl flex flex-col items-center justify-center w-full mx-auto">
            {/* <ReviewBill bill={{
                "restaurantName": "Pizza Express",
                "items": [
                    { "id": "1", "name": "Mushroom Pizza", "price": 12.99 },
                    { "id": "2", "name": "French Fries", "price": 4.50 },
                    { "id": "3", "name": "Pesto & Tomato Pasta", "price": 11.99 },
                    { "id": "4", "name": "Red Wine", "price": 16.50 },
                    { "id": "5", "name": "Mushroom Pizza", "price": 12.99 },
                    { "id": "6", "name": "French Fries", "price": 4.50 },
                    { "id": "7", "name": "Pesto & Tomato Pasta", "price": 11.99 },
                ],
                "serviceChargePercent": 12.5,
                "currency": "£"}} /> */}
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
                    onTryAgain={() => {
                        setBillItems(null);
                        setCurrentView("upload");
                    }}
                />
            )}
        </main>
    );
}
