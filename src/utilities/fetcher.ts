type FetcherT = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: object
}

type AuthFetcherT = {
  body: object
  action: 'register' | 'login' | 'password/forgetpassword' | 'password/resetpassword' | 'password/verifycode'
  isRememberMe?: boolean
}

export const authFetcher = async ({ body = {}, action, isRememberMe = false }: AuthFetcherT) => {
  console.log('object', body)
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/${action}`
  console.log('url ', fullUrl)
  const res = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  })
  const data = await res.json()

  if (action === 'login' && res.ok) {
    localStorage.setItem('accessToken', data.accessToken)
    if (action === 'login' && isRememberMe) localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('userId', data.data.id)
  }

  return data
}

export const fetcher = async ({ url, method = 'GET', body = {} }: FetcherT) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`
  const res = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${localStorage.getItem('accessToken')}`,
      refreshToken: `Bearer ${localStorage.getItem('refreshToken')}`
    },
    credentials: 'include',
    body: method === 'GET' ? undefined : JSON.stringify(body)
  })

  return await res.json()
}
