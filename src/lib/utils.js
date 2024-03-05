//* This function fetches AllProfiles from server
export async function getAllProfiles(token) {
  const getAllProfilesRoute = "http://127.0.0.1:4000/profile/list";
  console.log("testing this get all user profiles function!");

  const response = await fetch(getAllProfilesRoute, {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: token,
    }),
    method: "GET",
  });

  const results = await response.json();
  return results.getAllProfiles;
}

//* This function fetches AllPosts from server
export async function getAllPosts(token) {
  const getAllPostsRoute = "http://127.0.0.1:4000/post/list";
  console.log("testing this get all recipe posts function!");

  const response = await fetch(getAllPostsRoute, {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: token,
    }),
    method: "GET",
  });

  const results = await response.json();
  return results.getAllPosts;
}