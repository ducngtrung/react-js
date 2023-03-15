// Lấy props "count" và "onAdd" từ Parent component
export default function ButtonAdd({ count, onAdd }) {
    
    const handleClick = () => {
        // Truyền dữ liệu về Parent component bằng cách gọi callback function từ props
        onAdd(2);
    };

    return (
        <>
        <h1>Count: {count}</h1>
        <button onClick={handleClick}>Plus 2</button>
        {/* hoặc:
        <button onClick={() => onAdd(2)}>Click</button> */}
        </>
    );
    
}