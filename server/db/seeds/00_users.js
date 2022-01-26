
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        // {id: 1, uid: '8c641ac701e4fe6c', name: 'kho', email: 'kho@gmail.com', password: '$2a$10$WABN9o/kFK3RHXvP9k3vTOtpLxJpzcMGSCvVpHVs7EW94cTbRAxIO', created_at: 'Tue, 28 Dec 2021 10:35:10 GMT', updated_at: 'Tue, 28 Dec 2021 10:35:10 GMT'} 
      ]);
    });
};
