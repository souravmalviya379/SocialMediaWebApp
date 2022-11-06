{
   //method to submit form data for new post using ajax
   let createPost = function () {
      let newPostForm = $('#new-post-form');
      newPostForm.submit(function (e) {
         e.preventDefault();

         //using ajax to submit the form
         $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),      //this convert form data in json format
            success: function (data) {
               let newPost = newPostDom(data.data.post);
               $('#posts-display>ul').prepend(newPost);
               deletePost($(' .delete-post-button', newPost));
            },
            error: function (err) {
               console.log(err.responseText);
            }
         })
      });
   }

   //method to create a post in DOM
   let newPostDom = function (post) {

      return $(`<li id="post-${post._id}">
            <p>
               <a class='delete-post-button' href="/posts/destroy/${ post._id }" style="color: blue;"> X </a>
               <small>
                  ${post.user.fname}
               </small>

               ${post.content}
            </p>
            <div id="post-comments">
               <form action="/comments/create" method="POST">
                  <input type="text" name="content" placeholder="Comment here ...."   required>
                  <input type="hidden" name="post" value='${post._id}'>
                  <input type="submit" value="Add Comment">
               </form>
            </div>

            <div id="post-comments-list">
               <ul id="post-comments-${post._id}">
               
               </ul>
            </div>
        </li>`)
   }


   //method to delete a post from DOM
   let deletePost = function(deleteLink){
      $(deleteLink).click(function(e){
         e.preventDefault();
      
         $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
               $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error){
               console.log("Error: ",error.responseText);
            }
         })
      })
      
   }


   createPost();
}