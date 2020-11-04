const data = {
  headers: [
    {
      dataIndex: "name",
      title: "Name",
      width: 130,
      sorter: false,
    },
    {
      dataIndex: "rate",
      title: "Rating",
      width: 120,
      sorter: true,
    },
    {
      dataIndex: "stars",
      title: "Stars",
      width: 120,
      sorter: true,
    },
  ],
  body: [
    {
      id: 1,
      rate: 120,
      name: "React",
    },
    {
      id: 2,
      name: "Vue",
      rate: 130,
    },
    {
      id: 3,
      name: "Angular",
      rate: 130,
      stars: 100,
    },
  ],
};

export default data;
