export default {
  models: {
    users: {
      name: "User",
      fields: {
        id: "ID",
        name: "Name",
        username: "Username",
        email: "Email",
        address: "Address",
        phone: "Phone",
        website: "Website",
        company: "Company",
      },
    },
    posts: {
      name: "Post",
      fields: {
        id: "ID",
        userId: "User ID",
        title: "Title",
        body: "Content"
      },
    }
  }
};