
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, task: 'do the dishes again', created_at: 'Tue, 28 Dec 2021 12:15:18 GMT', updated_at: 'Tue, 28 Dec 2021 12:15:18 GMT', completed: 0, active: 1, priority: 0, user_uid: '8c641ac701e4fe6c' },
      ]);
    });
};
