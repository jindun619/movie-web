interface DetailsLayoutProps {
  children: React.ReactNode;
  label: string;
}
export const DetailsLayout = ({ children, label }: DetailsLayoutProps) => {
  return (
    <div className="pt-5 px-2 md:px-auto border-b pb-8">
      <p className="text-xl text-primary-content font-bold">{label}</p>
      {children}
    </div>
  );
};
