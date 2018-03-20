/*jshint esversion: 6 */

// const http = new EasyHTTP();

// // get users

// const posts = http.get('https://jsonplaceholder.typicode.com/posts',
//     function(err, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res);
//         }
// });

// // create data
// const data = {
//   title: "Custom post",
//   body: "asdasd;lasdlas;lasdladlasdasjd"
// };
// // http.post('https://jsonplaceholder.typicode.com/posts/1', data, function(
//   err,
//   res
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(
//   err,
//   res
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// const posts = http.delete(
//   "https://jsonplaceholder.typicode.com/posts/1",
//   function(err, res) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   }
// );

const http = new EasyHTTP();

// get users

// http.get('https://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


const data = {
  name: 'Jhon Doe',
  username: 'jhondoe',
  email: 'email@email.com'
};


// post user
// http.post('https://jsonplaceholder.typicode.com/users', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// put user

// http.put('https://jsonplaceholder.typicode.com/users/1', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// delete user
// http.delete('https://jsonplaceholder.typicode.com/users/1')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));