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
      width: 250,
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
      rate: 110,
    },
    {
      id: 3,
      name: "Angular",
      rate: 130,
      stars: 75,
    },
    {
      id: 4,
      name: "Reason",
      rate: 79,
    },
    {
      id: 5,
      rate: 105,
      name: "Node",
      stars: 98,
    },
    {
      id: 6,
      rate: 98,
      name: "Express",
      stars: 100,
    },
  ],
};

export default data;
