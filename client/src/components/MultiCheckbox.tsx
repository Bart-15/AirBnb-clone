import { useState } from 'react'
import { TPerks } from "@/types/forms.types";

type MultiCheckBoxProps = {
    options: TPerks[],
    selected: string[],
    onChange: (value:string[]) => void;
}

const MultiCheckBox = ({options, selected, onChange}: MultiCheckBoxProps) => {
    const [checkedAll, setCheckedAll] = useState<boolean>(false);

    function handleClick(event:  React.FormEvent<HTMLInputElement>): void{
        let uptList : string[] = [...selected]

        const { name, checked } = event.target as HTMLFormElement;
        if (checked) {
            uptList = [...selected, name]
        } else {
            uptList = [...selected.filter((selectedName) => selectedName !== name)]
        }

        uptList.length === options.length ? toggleSelectAll(): setCheckedAll(false);

        return onChange(uptList)
    }

    const toggleSelectAll = () => {
        console.log("toggle me");
        setCheckedAll(!checkedAll);
    
        let updatedList: string[] = [];
    
        if (!checkedAll) {
            options.forEach((item) => {
                updatedList.push(item._id);
            });
        
            onChange(updatedList);
        } else {
            updatedList = [];
        }
        
        onChange(updatedList);
    };
    
    return ( 
        <>
            <label className="border p-4 flex flex-wrap text-xs md:text-sm rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" value={checkedAll} checked={checkedAll} name="selectAll" onChange={(e) => toggleSelectAll()}/>
                <span>Select All</span>
            </label>
            {
            options?.map((checkBox, idx) => {
                return (
                    <label key={checkBox._id} className="border p-4 flex flex-wrap text-xs md:text-sm rounded-2xl gap-2 items-center cursor-pointer">
                        <input 
                        type="checkbox" 
                        name={checkBox._id}
                        value={checkBox._id}
                        checked={selected.includes(checkBox._id) }   
                        onChange={(e) => handleClick(e)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={checkBox.path} />
                        </svg>
                        <span>{checkBox.name}</span>
                    </label>
                )
            })
            }
        </>
        
    );
}
 
export default MultiCheckBox;