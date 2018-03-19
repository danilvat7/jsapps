const http = new easyHTTP();

// get posts

// const posts = http.get('https://jsonplaceholder.typicode.com/posts',
//     function(err, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(res);
//         }
// });

// create data
const data = {
  title: "Custom post",
  body: "asdasd;lasdlas;lasdladlasdasjd"
};
// http.post('https://jsonplaceholder.typicode.com/posts/1', data, function(
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

const posts = http.delete(
  "https://jsonplaceholder.typicode.com/posts/1",
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  }
);
