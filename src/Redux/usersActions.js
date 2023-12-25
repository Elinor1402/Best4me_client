
export const loginAction = () => {
    console.log('try login action');
               const isLogged = true
               return {
                type: "LOGIN",
                payload: isLogged 
                }
           
    } 

export const logoutAction = () => {
   // localStorage.removeItem('token');
   console.log('try log out');
       localStorage.removeItem('token');
       localStorage.removeItem('CompanyID');
    const isLogged = false
    return {
        type: "LOGIN",
        payload: isLogged
    }
}

