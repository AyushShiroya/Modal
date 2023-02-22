export const userDetails = (data) => {
    return {
        type: "USER_DETAILS",
        payload: data,
    }
}
export const userDelete = (data) => {
    return {
        type: "USER_DELETE",
        payload: data,
    }
}
export const userEdit = (data) => {
    return {
        type: "USER_EDIT",
        payload: data,
    }
}
