export function Move2ColumnsOfData(input, { xColumn, yColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}

export function Move3ColumnsOfData(input, { xColumn, yColumn, zColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn] }));
}


export function Move4ColumnsOfData(input, { xColumn, yColumn, zColumn, kColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn], k: i[kColumn] }));
}


