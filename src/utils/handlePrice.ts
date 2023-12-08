export const handlePrice = (price: any): string => {
    const data = new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return `${data} VND`;
};
