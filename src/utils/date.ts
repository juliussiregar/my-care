export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const getDayName = (date: Date): string => {
    return date.toLocaleDateString('id-ID', { weekday: 'long' });
};
