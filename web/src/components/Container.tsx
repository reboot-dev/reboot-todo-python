const Container = ({
    children,
    title,
  }: {
    children: JSX.Element | JSX.Element[];
    title?: string;
  }) => {
    return (
      <div className="bg-[#f8f5ed] p-4 border rounded-md">
        {title && <h2 className="text-xl pb-2 text-black">{title}</h2>}
        <div>{children}</div>
      </div>
    );
  };
  
  export default Container;