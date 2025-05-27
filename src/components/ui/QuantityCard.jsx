import React, { useState } from "react";

const QuantityCard = ({ initial = 1, onChange }) => {
    const [quantity, setQuantity] = useState(initial);

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            onChange && onChange(newQty);
        }
    };

    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        onChange && onChange(newQty);
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={handleDecrease}>-</button>
            <span style={styles.quantity}>{quantity}</span>
            <button style={styles.button} onClick={handleIncrease}>+</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        border: "1px solid #ccc",
        padding: "10px 15px",
        borderRadius: "8px",
        width: "fit-content",
    },
    button: {
        padding: "5px 10px",
        fontSize: "16px",
        cursor: "pointer",
    },
    quantity: {
        minWidth: "20px",
        textAlign: "center",
        fontWeight: "bold",
    },
};

export default QuantityCard;
