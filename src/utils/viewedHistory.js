
export const addToHistoryLoggedIn= async (userId,productId)=>{
    try {
        await fetch('http://localhost:5000/api/viewed-history/add-to-viewed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                productId,
            }),
        });
     } catch (err) {
        console.error('Lỗi khi lưu lịch sử xem server:', err);
    }
}