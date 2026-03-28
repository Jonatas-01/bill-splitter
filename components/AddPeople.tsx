import { RiDeleteBin6Line } from "react-icons/ri";;
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Person } from "@/types/person";

interface AddPeopleProps {
    getPeople: Person[];
    onBack: () => void;
    onNext: (people: Person[]) => void;
}

export default function AddPeople({ getPeople, onBack, onNext }: AddPeopleProps) {
    const [name, setName] = useState("");
    const [people, setPeople] = useState<Person[]>(getPeople);
    const [error, setError] = useState<string | null>(null);

    const colors = [
        "#E9B935",
        "#359EE9",
        "#E95335",
        "#35E97B",
        "#9B35E9",
        "#E935A8",
    ];

    useEffect(() => {
        if (!error) return;

        const timeoutId = setTimeout(() => {
            setError(null);
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [error]);

    function handleAddPerson(name: string) {
        if (!name.trim()) {
            setError("Name cannot be empty.");
            return;
        }
        if (name.length > 20) {
            setError("Name should be less than 20 characters.");
            return;
        }

        const newPerson: Person = {
            "id": Date.now().toString(),
            "name": name,
            "color": colors[people.length % colors.length]
        };
        setPeople([...people, newPerson]);
        setName("");
        setError(null);
    }

    function handleDeletePerson(personId: string) {
        setPeople(
            people.filter((person) => personId !== person.id)
        );
    }

    function handleOnNext(people: Person[]) {
        if (people.length < 2) {
            setError("Add at least two people to proceed.");
            return;
        }
        onNext(people);
    }

    return (
        <div className="w-full pb-32">
            <div className="flex justify-center w-full mb-4">
                <h1 className="main-title">Add People</h1>
            </div>

            <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none">
                <div
                    className={` max-w-md rounded-full border border-red-900 bg-red-950 p-3 px-5 text-center text-sm font-bold text-red-100 shadow-lg transition-all duration-300 ${error ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-2">Person&apos;s Name</h3>
                <div className="flex grid grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="e.g, John Doe"
                        className="input-field col-span-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="bg-[var(--color-primary)] text-black font-bold border rounded-lg col-span-1 active:bg-[var(--color-primary-dark)] active:text-white"
                        onClick={() => { handleAddPerson(name) }}
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-2xl">Added People ({people.length})</h3>
                {people.length > 0 ? (
                    <div className="flex flex-col gap-3 mt-2">
                        {people.map((person) => (
                            <div className="main-card flex items-center justify-between grid grid-cols-5" key={person.id}>
                                <span
                                    className="text-black font-bold rounded-full w-10 h-10 flex items-center justify-center col-span-1"
                                    style={{ backgroundColor: person.color }}
                                >
                                    {person.name.trim().charAt(0).toUpperCase()}
                                </span>
                                <span className="text-white col-span-3 text-lg">{person.name}</span>
                                <button
                                    className="text-red-500 cursor-pointer col-span-1 flex justify-center flex justify-center py-3 px-1 items-center rounded-full active:bg-red-500 active:text-white"
                                    onClick={() => { handleDeletePerson(person.id) }}>
                                    <RiDeleteBin6Line size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center mt-10">
                        <p>No one added yet</p>
                    </div>
                )}
            </div>

            <div className="mt-6 bottom-menu sm:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <div className="grid grid-cols-2 gap-6 items-center my-2">
                    <button className="tertiary-button" onClick={onBack}>
                        <LuMoveLeft size={26} /> Back
                    </button>
                    <button className="primary-button" onClick={() => handleOnNext(people)}>
                        Next <LuMoveRight size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}