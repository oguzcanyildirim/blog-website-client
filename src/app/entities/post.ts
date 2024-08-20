export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  date: Date;
  preview: string;
  tags: Tag[];
}
