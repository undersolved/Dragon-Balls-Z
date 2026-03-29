export interface Character {
  id: number;
  name: string;
  ki: string;
  race: string;
  gender: string;
  description: string;
  image: string;
}

export interface ApiResponse {
  items: Character[];
  links: {
    next?: string;
  };
}
