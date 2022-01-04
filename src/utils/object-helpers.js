export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if(u[objPropName] === itemId) {
            return {
                ...u,
                ...newObjProps // меняем свойство у объекта из массива users
            }
        }
        return u; // возвращаем 1 объект из массива users
    })
}