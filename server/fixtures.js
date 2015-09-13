if (Codes.find().count() === 0) {
  Codes.insert({
    domain : 'amazon.com',
    code : '&tag=presentsocial-20'
  });

  Codes.insert({
    domain : 'www.amazon.com',
    code : '&tag=presentsocial-20'
  });
}

/*if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://www.alexwykoff.com/'
  });

  Posts.insert({
    title: 'Design',
    url: 'http://www.ac4d.com/'
  });

  Posts.insert({
    title: 'The LHU Book',
    url: 'http://www.lhup.edu/'
  });
}
if (Nodes.find().count() === 0) {
  Nodes.insert({
    name: "Base",
    description: "Your first node!",
    tags: ["basic"],
    image: "",
    content: "",
    children: [],
    parents: []
  });
}

if (Units.find().count() === 0) {
  Units.insert({
    name: "Base",
    description: "Your first Unit!",
    nodes: [],
    tags: []
  });
}*/
