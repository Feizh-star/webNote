import type { Router } from '@/types/router/router'

export function getRoutes(): Promise<Router.MyRawRoute[]> {
  return new Promise((resolve, reject) => {
    fetch('/dataset/router.json')
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => reject(error))
  })
}
