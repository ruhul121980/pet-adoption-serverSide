export function getFilteredVetPosts(vets) {
    const filteredPosts = [];
  
    for (const vet of vets) {
      if (vet.vet_posts) { // Check if user has a "posts" property
        for (const post of vet.vet_posts) {
          if (!post.banned) { // Use !post.banned for "not banned" check
            filteredPosts.push(post);
          }
        }
      }
    }
  
    return filteredPosts;
  }
  