'use client';

import { useState } from "react";
import UploadPhoto from "@/components/UploadPhoto";
import ReviewBill from "@/components/ReviewBill";
import AddPeople from "@/components/AddPeople";
import AssignDishes from "@/components/AssignDishes";
import type { ExtractedBill, FinalBill } from "@/types/bill";
import type { Person } from "@/types/person";
import BillSummary from "@/components/BillSummary";

type View = "upload" | "review" | "addPeople" | "assignDishes" | "billSummary";

export default function Home() {
    const [currentView, setCurrentView] = useState<View>("upload");
    const [billItems, setBillItems] = useState<ExtractedBill | null>(null);
    const [people, setPeople] = useState<Person[]>([]);
    const [finalBill, setFinalBill] = useState<FinalBill | null>(null);

    // Mock data for development
    // const [billItems, setBillItems] = useState<ExtractedBill | null>({
    //             "restaurantName": "Pizza Express",
    //             "items": [
    //                 { "id": "1", "name": "Mushroom Pizza", "price": 12.99, "assignedTo": ["Alice"] },
    //                 { "id": "2", "name": "French Fries", "price": 4.50, "assignedTo": ["Bob", "Alice"] },
    //                 { "id": "3", "name": "Pesto & Tomato Pasta", "price": 11.99, "assignedTo": ["Charlie", "Alice"] },
    //                 { "id": "4", "name": "Red Wine", "price": 16.50, "assignedTo": ["Alice", "Bob"] },
    //                 { "id": "5", "name": "Mushroom Pizza", "price": 12.99, "assignedTo": ["Bob"] },
    //                 { "id": "6", "name": "French Fries", "price": 4.50, "assignedTo": ["Bob"] },
    //                 { "id": "7", "name": "Pesto & Tomato Pasta", "price": 11.99, "assignedTo": ["Alice", "Charlie"] },
    //             ],
    //             "serviceChargePercent": 10,
    //             "currency": "£"});
    // const [people, setPeople] = useState<Person[]>([
    //     { "id": "1", "name": "Alice", "color": "#E9B935" },
    //     { "id": "2", "name": "Bob", "color": "#359EE9" },
    //     { "id": "3", "name": "Charlie", "color": "#E95335" },
    // ]);

    return (
        <main className="px-3 sm:max-w-md flex flex-col items-center justify-center w-full mx-auto">
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

            {currentView === "addPeople" && (
                <AddPeople
                    getPeople={people}
                    onBack={() => setCurrentView("review")}
                    onNext={(people) => {
                        setPeople(people);
                        setCurrentView("assignDishes");
                    }}
                />
            )}

            {currentView === "assignDishes" && billItems && people.length > 0 && (
                <AssignDishes
                    people={people}
                    bill={billItems}
                    onUpdateBill={(updatedBill) => {
                        setBillItems(updatedBill);
                    }}
                    onBack={() => setCurrentView("addPeople")}
                    onNext={() => setCurrentView("billSummary")}
                />
            )}

            {currentView === "billSummary" && billItems && people.length > 0 && (
                <BillSummary 
                    bill={billItems}
                    people={people}
                    onBack={() => setCurrentView("assignDishes")}
                    onNext={(finalBill) => {
                        setFinalBill(finalBill);
                        alert("Split complete!");
                        console.log("Final Bill:", finalBill);
                    }}
                />
            )}
        </main>
    );
}
