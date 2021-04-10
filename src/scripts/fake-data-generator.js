import faker from "faker";
import fs from "fs";

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

export const generate = () => {
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

  const posteditors = posts.reduce((acc, post) => {
    const editors = [...Array(getRandomInt(10)).keys()].map((i) => ({
      _id: faker.datatype.uuid(),
      editorId: users[getRandomInt(100 - 1)]._id,
      postId: post._id,
    }));

    return [...acc, ...editors];
  }, []);

  return {
    blogs,
    posts,
    comments,
    users,
    posteditors,
  };
};

export const download = () => {
  const json = generate();

  Object.keys(json).map((key) => {
    fs.writeFileSync(`./${key}.json`, JSON.stringify(json[key]));
  });
};
