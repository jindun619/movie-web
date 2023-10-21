export default function DetailsLayout ({ children, label } : {
    children: React.ReactNode,
    label: string
}) {
    return (
        <div className="pt-5 px-2 md:px-auto border-b pb-8">
            <p className="text-xl text-primary-content font-bold">{label}</p>
            {children}
        </div>
    )
}