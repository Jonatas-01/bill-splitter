import { RiDeleteBin6Line } from "react-icons/ri";;
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

interface AddPeopleProps {
    onBack: () => void;
}

export default function AddPeople({ onBack }: AddPeopleProps) {
    const people = [
        {
            "name": "Jonatas",
            "id": "01",
            "color": "#E9B935"
        },
        {
            "name": "Sabrina",
            "id": "02",
            "color": "#359EE9"
        },
        {
            "name": "Kael",
            "id": "03",
            "color": "#E95335"
        },
        {
            "name": "Clarice",
            "id": "04",
            "color": "#35E97B"
        }
    ];

    const colors = [
        "#E9B935",
        "#359EE9",
        "#E95335",
        "#35E97B",
        "#9B35E9",
        "#E935A8",
    ];


    return (
        <div className="w-full pb-32">
            <div className="flex justify-center w-full mb-6">
                <h1 className="main-title">Add People</h1>
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-2">Person&apos;s Name</h3>
                <div className="flex grid grid-cols-4 gap-3">
                    <input
                        type="text"
                        placeholder="e.g, John Doe"
                        className="input-field col-span-3"
                    />
                    <button className="bg-[var(--color-primary)] text-black font-bold border rounded-lg col-span-1 active:bg-[var(--color-primary-dark)] active:text-white">
                        Add
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-2xl">Added People ({people.length})</h3>
                {people ? (
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
                                <span className="text-red-500 cursor-pointer col-span-1 flex justify-center flex justify-center py-3 px-1 items-center rounded-full active:bg-red-500 active:text-white" onClick={() => {
                                    // Handle delete functionality
                                }}>
                                    <RiDeleteBin6Line size={24} />
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="">
                        <p>No one added yet</p>
                    </div>
                )}
            </div>

            <div className="mt-6 bottom-menu sm:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <div className="grid grid-cols-2 gap-6 items-center my-2">
                    <button className="tertiary-button" onClick={onBack}>
                        <LuMoveLeft size={26} /> Back
                    </button>
                    <button className="primary-button" >
                        Next <LuMoveRight size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}