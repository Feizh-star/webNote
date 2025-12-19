import axios from 'axios'

const temporaryToken =
  'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjA5ZjUyNDcwLTM4MWYtNGU5NC1iZmUyLTE3YWZjYjdjMjA1NiJ9.iBsjifJSmMNLcFR9Bch0nm4-fNMZrOj3iE_ACMciki_RNGe-rx0XfOxMVl_yeLqu8jhSXSzdeJqclvP1Can7Yw'

export function getJobStatusDict() {
  return axios
    .get('/dev-api/system/dict/data/type/sys_normal_disable', {
      headers: {
        Authorization: temporaryToken,
      },
    })
    .then((axiosRes) => {
      return axiosRes.data
    })
}

export function getJobList(params: any) {
  return axios
    .get('/dev-api/system/post/list', {
      headers: {
        Authorization: temporaryToken,
      },
      params: {
        ...params,
      },
    })
    .then((axiosRes) => {
      return axiosRes.data
    })
}

export function addJob(data: any) {
  return axios
    .post('/dev-api/system/post', data, {
      headers: {
        Authorization: temporaryToken,
      },
    })
    .then((axiosRes) => {
      return axiosRes.data
    })
}

export function updateJob(data: any) {
  return axios
    .put('/dev-api/system/post', data, {
      headers: {
        Authorization: temporaryToken,
      },
    })
    .then((axiosRes) => {
      return axiosRes.data
    })
}

export function deleteJob(jobId: any) {
  return axios
    .delete('/dev-api/system/post/' + jobId, {
      headers: {
        Authorization: temporaryToken,
      },
    })
    .then((axiosRes) => {
      return axiosRes.data
    })
}
