import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/dbConfig";
import { Container, PostCard } from "../components";
function AllPost() {
  const [posts, setPosts] = useState([]);
  //TODO: no use of useEffect here
  useEffect(() => {
    appwriteService.getAllPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  
  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2  w-1/2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
