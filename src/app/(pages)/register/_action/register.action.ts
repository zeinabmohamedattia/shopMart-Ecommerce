'use server'
export async function signUp(userData:{}) {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify( userData ),
        headers:{'content-type':'application/json'}
    })    
    const data = await res.json()
    return data
}