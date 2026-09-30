export type Member = {
  firstName: string;
  lastName?: string;
  role: string;
  linkedin?: string;
  imgAvail?: boolean;
  imgSrc?: string;
  isHead?: boolean | string;
  boardRole?: string;
};

export type Department = {
  title: string;
  head?: string;
  members: Member[];
};

