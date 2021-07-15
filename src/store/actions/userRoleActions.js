export const USER_ROLE = "USER_ROLE"

export function addUserRole(role){
        return{
                type: USER_ROLE,
                payload: role
        }
}
