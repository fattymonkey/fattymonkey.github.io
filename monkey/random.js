var posts=["post/10041.html","post/10042.html","post/10043.html","post/10022.html","post/10021.html","post/10023.html","post/10024.html","post/10025.html","post/10026.html","post/10005.html","post/10007.html","post/10008.html","post/10006.html","post/10009.html","post/10010.html","post/10011.html","post/10061.html","post/10062.html","post/10063.html","post/10065.html","post/10064.html","post/10066.html","post/10101.html","post/10102.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};