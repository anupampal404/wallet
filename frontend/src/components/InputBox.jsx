export const InputBox = ({label, holder, onChange}) => {
    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input type="text" onChange={onChange} placeholder={holder} className="focus: outline-none w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}