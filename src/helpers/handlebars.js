const Handlebars = require('handlebars')

module.exports = {
    sum: (a, b) => {
      return a + b;
    },

    sortable: (field, sort) => {
      const sortType = field === sort.column && ['desc', 'asc'].includes(sort.type) ? sort.type : 'default'

      const icons = {
        default: 'bi bi-arrow-down-up',
        asc: 'bi bi-sort-down-alt',
        desc: 'bi bi-sort-down',
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      }

      const icon = icons[sortType]
      const type = types[sortType]

      const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
      const result = `<a href="${href}"><i class="${icon}"></i></a>`

      return new Handlebars.SafeString(result);
    }
}