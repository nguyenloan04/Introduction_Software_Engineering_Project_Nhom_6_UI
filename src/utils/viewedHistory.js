import { config } from "../config/apiConfig";

export const addToHistoryLoggedIn= async (userId,productId)=>{
    try {
        await fetch(`${config.BASE_URL}/api/viewed-history/add-to-viewed`, {
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