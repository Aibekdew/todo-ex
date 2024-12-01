namespace TODO {
  type GetResponse = Todo[];
  type GetRequest = void;

  type PostResponse = Todo[];
  type PostRequest = Todo;

  type RemoveResponse = Todo[];

  type editResponse = void;
  type editRequest = {
    id: number;
    data: {
      title: string;
      img: string;
    };
  };
}
