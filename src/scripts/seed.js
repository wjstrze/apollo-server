import faker from "faker";
var fs = require("fs");

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

export const createJson = () => {
  const blogs = [...Array(10).keys()].map((i) => ({
    _id: faker.datatype.uuid(),
    name: faker.name.title(),
  }));

  const posts = blogs.reduce((acc, blog) => {
    const blogPosts = [...Array(getRandomInt(10)).keys()].map((i) => ({
      _id: faker.datatype.uuid(),
      title: faker.name.title(),
      postBlogId: blog._id,
    }));

    return [...acc, ...blogPosts];
  }, []);

  const comments = posts.reduce((acc, post) => {
    const commentsPosts = [...Array(getRandomInt(10)).keys()].map((i) => ({
      _id: faker.datatype.uuid(),
      content: faker.random.words(getRandomInt(50)),
      commentPostId: post._id,
    }));

    return [...acc, ...commentsPosts];
  }, []);

  const users = [...Array(100).keys()].map((i) => ({
    _id: faker.datatype.uuid(),
    username: faker.name.findName(),
  }));

  const postEditor = posts.reduce((acc, post) => {
    const editors = [...Array(getRandomInt(10)).keys()].map((i) => ({
      _id: faker.datatype.uuid(),
      editorId: users[getRandomInt(100 - 1)]._id,
      postId: post._id,
    }));

    return [...acc, ...editors];
  }, []);

  const json = {
    blogs,
    posts,
    comments,
    users,
    postEditor,
  };

  fs.writeFileSync("./seed.json", JSON.stringify(json));
};

createJson();
