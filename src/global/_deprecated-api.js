//deprecated
export function login_requestToken({userName = 'panhq', password= 'phq'}){
    return axiosByFormData({
        url: baseUrl + '/login',
        method: 'POST',
        data: {
            data:{ 
                userName, password
            }
        }
    })
}