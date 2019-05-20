export const ls = {
  setItem: function (obj, days) {
    let Days = days || 7
    let exp = new Date()
    let expires = exp.getTime() + Days * 24 * 60 * 60 * 1000
    let user = obj.user
    let token = 'Bearer ' + obj.token
    localStorage.setItem('Authorization', token)
    localStorage.setItem('userMessage', JSON.stringify([user, expires]))
  },
  getItem: function (key) {
    if (key === 'Authorization') {
      return localStorage.getItem('Authorization')
    } else if (key === 'userMessage') {
      let o = JSON.parse(localStorage.getItem(key))
      if (!o || o.expires < Date.now()) {
        return null
      } else {
        return o[0]
      }
    } else {
      return 'key不存在'
    }
  },

  removeItem: function () {
    localStorage.removeItem('Authorization')
    localStorage.removeItem('userMessage')
  }
}
