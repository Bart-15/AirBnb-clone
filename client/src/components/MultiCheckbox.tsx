type Options = {
    id:number
    name:string,
    icon:string, 
}

type MultiCheckBoxProps = {
    options: Options[],
    selected: string[],
    onChange: (value:string[]) => void;
}

const MultiCheckBox = ({options, selected, onChange}: MultiCheckBoxProps) => {

    function handleClick(event:  React.FormEvent<HTMLInputElement>){
        const { name, checked } = event.target as HTMLFormElement;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter((selectedName:any) => selectedName !== name)]);
        }
    }
    
    return ( 
        <>
            {
            options.map((checkBox) => {
                return (
                    <label key={checkBox.id} className="border p-4 flex flex-wrap text-xs md:text-sm rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" name={checkBox.name} onClick={handleClick}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={checkBox.icon} />
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