export const formatPriceVND = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number);
};