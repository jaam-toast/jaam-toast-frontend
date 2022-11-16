interface Image {
  id: number;
  title: string;
  image: string;
  alt: string;
}

const imageList: Image[] = [
  {
    id: 0,
    title: "Develop",
    image: "develop_code.jpg",
    alt: "Develop",
  },
  {
    id: 1,
    title: "Programming",
    image: "programming_react.jpg",
    alt: "Programming",
  },
  {
    id: 2,
    title: "Co-working",
    image: "coworking.jpg",
    alt: "Co-working",
  },
  {
    id: 3,
    title: "Deploy",
    image: "github.jpg",
    alt: "Deploy",
  },
];

export type { Image };

export { imageList };
